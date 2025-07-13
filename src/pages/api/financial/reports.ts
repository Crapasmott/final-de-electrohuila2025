// pages/api/financial/reports.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { year, type } = req.query;
    
    // Leer registro de archivos
    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'files_registry.json');
    
    if (!fs.existsSync(dataFile)) {
      return res.status(200).json({ reports: [] });
    }

    const data = fs.readFileSync(dataFile, 'utf8');
    const registry = JSON.parse(data);

    // Filtrar solo archivos financieros
    let reports = registry.filter((file: any) => file.category === 'financieros');

    // Filtrar por año si se especifica
    if (year) {
      reports = reports.filter((file: any) => {
        const fileYear = new Date(file.uploadDate).getFullYear();
        return fileYear === parseInt(year as string);
      });
    }

    // Filtrar por tipo si se especifica (balance, estado-resultados, etc.)
    if (type) {
      reports = reports.filter((file: any) => 
        file.name.toLowerCase().includes(type.toString().toLowerCase())
      );
    }

    // Organizar por año y tipo
    const reportsOrganized: { [year: number]: { [type: string]: any[] } } = {};

    reports.forEach((report: any) => {
      const fechaSubida = new Date(report.uploadDate);
      const reportYear = fechaSubida.getFullYear();
      
      // Detectar tipo de reporte por el nombre
      let reportType = 'otros';
      const fileName = report.name.toLowerCase();
      
      if (fileName.includes('balance')) {
        reportType = 'balance-general';
      } else if (fileName.includes('estado') && fileName.includes('resultado')) {
        reportType = 'estado-resultados';
      } else if (fileName.includes('flujo') && fileName.includes('efectivo')) {
        reportType = 'flujo-efectivo';
      } else if (fileName.includes('patrimonio')) {
        reportType = 'cambios-patrimonio';
      } else if (fileName.includes('nota')) {
        reportType = 'notas-explicativas';
      } else if (fileName.includes('auditoria')) {
        reportType = 'auditoria';
      } else if (fileName.includes('presupuesto')) {
        reportType = 'presupuesto';
      }

      if (!reportsOrganized[reportYear]) {
        reportsOrganized[reportYear] = {};
      }
      if (!reportsOrganized[reportYear][reportType]) {
        reportsOrganized[reportYear][reportType] = [];
      }

      reportsOrganized[reportYear][reportType].push({
        ...report,
        reportType: reportType,
        year: reportYear
      });
    });

    // Formatear respuesta
    const response = Object.keys(reportsOrganized).map(year => ({
      year: parseInt(year),
      types: Object.keys(reportsOrganized[parseInt(year)]).map(type => ({
        type: type,
        typeName: getTypeDisplayName(type),
        files: reportsOrganized[parseInt(year)][type]
      }))
    }));

    res.status(200).json({ 
      reports: response,
      total: reports.length,
      year: year || 'all',
      type: type || 'all'
    });

  } catch (error) {
    console.error('Error fetching financial reports:', error);
    res.status(500).json({ 
      message: 'Error fetching financial reports',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function getTypeDisplayName(type: string): string {
  const typeNames: { [key: string]: string } = {
    'balance-general': 'Balance General',
    'estado-resultados': 'Estado de Resultados',
    'flujo-efectivo': 'Flujo de Efectivo',
    'cambios-patrimonio': 'Cambios en el Patrimonio',
    'notas-explicativas': 'Notas Explicativas',
    'auditoria': 'Informes de Auditoría',
    'presupuesto': 'Presupuesto',
    'otros': 'Otros Documentos'
  };
  
  return typeNames[type] || type;
}