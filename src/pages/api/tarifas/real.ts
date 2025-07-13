// pages/api/tarifas/real.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { year } = req.query;
    
    // Leer registro de archivos
    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'files_registry.json');
    
    if (!fs.existsSync(dataFile)) {
      return res.status(200).json({ tarifas: [] });
    }

    const data = fs.readFileSync(dataFile, 'utf8');
    const registry = JSON.parse(data);

    // Filtrar solo archivos de tarifas
    let tarifas = registry.filter((file: any) => file.category === 'tarifas');

    // Filtrar por año si se especifica
    if (year) {
      tarifas = tarifas.filter((file: any) => {
        const fileYear = new Date(file.uploadDate).getFullYear();
        return fileYear === parseInt(year as string);
      });
    }

    // Organizar por año y mes
    const tarifasOrganizadas: { [year: number]: { [month: number]: any[] } } = {};

    tarifas.forEach((tarifa: any) => {
      const fechaSubida = new Date(tarifa.uploadDate);
      const tarifaYear = fechaSubida.getFullYear();
      const tarifaMonth = fechaSubida.getMonth() + 1;

      if (!tarifasOrganizadas[tarifaYear]) {
        tarifasOrganizadas[tarifaYear] = {};
      }
      if (!tarifasOrganizadas[tarifaYear][tarifaMonth]) {
        tarifasOrganizadas[tarifaYear][tarifaMonth] = [];
      }

      // Intentar extraer mes del nombre del archivo
      const monthNames = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      
      let detectedMonth = tarifaMonth;
      const fileName = tarifa.name.toLowerCase();
      
      monthNames.forEach((monthName, index) => {
        if (fileName.includes(monthName)) {
          detectedMonth = index + 1;
        }
      });

      tarifasOrganizadas[tarifaYear][detectedMonth] = tarifasOrganizadas[tarifaYear][detectedMonth] || [];
      tarifasOrganizadas[tarifaYear][detectedMonth].push({
        ...tarifa,
        month: detectedMonth,
        year: tarifaYear,
        monthName: monthNames[detectedMonth - 1]
      });
    });

    // Formatear respuesta
    const response = Object.keys(tarifasOrganizadas).map(year => ({
      year: parseInt(year),
      months: Object.keys(tarifasOrganizadas[parseInt(year)]).map(month => ({
        month: parseInt(month),
        monthName: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                   'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'][parseInt(month) - 1],
        files: tarifasOrganizadas[parseInt(year)][parseInt(month)]
      }))
    }));

    res.status(200).json({ 
      tarifas: year ? response : response,
      total: tarifas.length,
      year: year || 'all'
    });

  } catch (error) {
    console.error('Error fetching tarifas:', error);
    res.status(500).json({ 
      message: 'Error fetching tarifas',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}