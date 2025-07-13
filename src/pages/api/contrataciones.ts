// pages/api/contrataciones.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface Contrato {
  id: string;
  numeroContrato: string;
  objeto: string;
  contratista: string;
  valor: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'en-proceso' | 'ejecutado' | 'terminado' | 'liquidado';
  modalidad: string;
  categoria: string;
  supervisor: string;
  documentos: string[];
  observaciones?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return handleGetContratos(req, res);
  } else if (req.method === 'POST') {
    return handleCreateContrato(req, res);
  } else if (req.method === 'PUT') {
    return handleUpdateContrato(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function handleGetContratos(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { estado, fechaInicio, fechaFin, busqueda, page = '1', limit = '10' } = req.query;
    
    // Leer base de datos de contratos
    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'contratos_registry.json');
    
    let contratos: Contrato[] = [];
    
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      contratos = JSON.parse(data);
    } else {
      // Si no existe, crear con datos de ejemplo
      contratos = createSampleContratos();
      fs.writeFileSync(dataFile, JSON.stringify(contratos, null, 2));
    }

    // Aplicar filtros
    let filteredContratos = contratos;

    // Filtro por estado
    if (estado && estado !== 'all') {
      filteredContratos = filteredContratos.filter(c => c.estado === estado);
    }

    // Filtro por rango de fechas
    if (fechaInicio) {
      filteredContratos = filteredContratos.filter(c => 
        new Date(c.fechaInicio) >= new Date(fechaInicio as string)
      );
    }

    if (fechaFin) {
      filteredContratos = filteredContratos.filter(c => 
        new Date(c.fechaFin) <= new Date(fechaFin as string)
      );
    }

    // Filtro por búsqueda
    if (busqueda) {
      const searchTerm = busqueda.toString().toLowerCase();
      filteredContratos = filteredContratos.filter(c =>
        c.numeroContrato.toLowerCase().includes(searchTerm) ||
        c.objeto.toLowerCase().includes(searchTerm) ||
        c.contratista.toLowerCase().includes(searchTerm) ||
        c.supervisor.toLowerCase().includes(searchTerm)
      );
    }

    // Paginación
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    
    const paginatedContratos = filteredContratos.slice(startIndex, endIndex);

    // Estadísticas
    const stats = {
      total: contratos.length,
      filtered: filteredContratos.length,
      'en-proceso': contratos.filter(c => c.estado === 'en-proceso').length,
      'ejecutado': contratos.filter(c => c.estado === 'ejecutado').length,
      'terminado': contratos.filter(c => c.estado === 'terminado').length,
      'liquidado': contratos.filter(c => c.estado === 'liquidado').length,
      valorTotal: contratos.reduce((sum, c) => sum + c.valor, 0)
    };

    res.status(200).json({
      contratos: paginatedContratos,
      stats: stats,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: filteredContratos.length,
        pages: Math.ceil(filteredContratos.length / limitNum)
      }
    });

  } catch (error) {
    console.error('Error fetching contratos:', error);
    res.status(500).json({ 
      message: 'Error fetching contratos',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleCreateContrato(req: NextApiRequest, res: NextApiResponse) {
  try {
    const contratoData = req.body;
    
    // Validar datos requeridos
    if (!contratoData.numeroContrato || !contratoData.objeto || !contratoData.contratista) {
      return res.status(400).json({ message: 'Datos requeridos faltantes' });
    }

    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'contratos_registry.json');
    let contratos: Contrato[] = [];
    
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      contratos = JSON.parse(data);
    }

    // Crear nuevo contrato
    const nuevoContrato: Contrato = {
      id: Date.now().toString(),
      ...contratoData,
      documentos: contratoData.documentos || []
    };

    contratos.push(nuevoContrato);
    fs.writeFileSync(dataFile, JSON.stringify(contratos, null, 2));

    res.status(201).json({
      success: true,
      message: 'Contrato creado exitosamente',
      contrato: nuevoContrato
    });

  } catch (error) {
    console.error('Error creating contrato:', error);
    res.status(500).json({ 
      message: 'Error creating contrato',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

async function handleUpdateContrato(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const updateData = req.body;
    
    if (!id) {
      return res.status(400).json({ message: 'ID del contrato requerido' });
    }

    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'contratos_registry.json');
    
    if (!fs.existsSync(dataFile)) {
      return res.status(404).json({ message: 'No se encontraron contratos' });
    }

    const data = fs.readFileSync(dataFile, 'utf8');
    let contratos: Contrato[] = JSON.parse(data);

    const contratoIndex = contratos.findIndex(c => c.id === id);
    
    if (contratoIndex === -1) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }

    // Actualizar contrato
    contratos[contratoIndex] = { ...contratos[contratoIndex], ...updateData };
    fs.writeFileSync(dataFile, JSON.stringify(contratos, null, 2));

    res.status(200).json({
      success: true,
      message: 'Contrato actualizado exitosamente',
      contrato: contratos[contratoIndex]
    });

  } catch (error) {
    console.error('Error updating contrato:', error);
    res.status(500).json({ 
      message: 'Error updating contrato',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

function createSampleContratos(): Contrato[] {
  return [
    {
      id: '1',
      numeroContrato: 'EH-2024-001',
      objeto: 'Mantenimiento preventivo y correctivo de líneas eléctricas sector urbano',
      contratista: 'Ingeniería Eléctrica del Huila S.A.S',
      valor: 150000000,
      fechaInicio: '2024-01-15',
      fechaFin: '2024-06-15',
      estado: 'ejecutado',
      modalidad: 'Contratación Directa',
      categoria: 'Mantenimiento',
      supervisor: 'Ing. Carlos Méndez',
      documentos: ['contrato_firmado.pdf', 'acta_inicio.pdf'],
      observaciones: 'Contrato ejecutado satisfactoriamente'
    },
    {
      id: '2',
      numeroContrato: 'EH-2024-002',
      objeto: 'Suministro e instalación de transformadores de distribución',
      contratista: 'Transformadores del Sur Ltda',
      valor: 280000000,
      fechaInicio: '2024-02-01',
      fechaFin: '2024-08-01',
      estado: 'en-proceso',
      modalidad: 'Licitación Pública',
      categoria: 'Suministros',
      supervisor: 'Ing. María González',
      documentos: ['contrato_firmado.pdf', 'poliza_cumplimiento.pdf'],
      observaciones: 'En ejecución según cronograma'
    },
    {
      id: '3',
      numeroContrato: 'EH-2024-003',
      objeto: 'Construcción de red eléctrica rural vereda San José',
      contratista: 'Construcciones Eléctricas HuilaTec',
      valor: 420000000,
      fechaInicio: '2024-03-10',
      fechaFin: '2024-12-10',
      estado: 'en-proceso',
      modalidad: 'Licitación Pública',
      categoria: 'Construcción',
      supervisor: 'Ing. Roberto Silva',
      documentos: ['contrato_firmado.pdf', 'acta_inicio.pdf', 'cronograma.pdf'],
      observaciones: 'Avance del 60% - dentro del cronograma'
    },
    {
      id: '4',
      numeroContrato: 'EH-2023-045',
      objeto: 'Auditoría externa estados financieros 2023',
      contratista: 'PKF Colombia S.A.S',
      valor: 85000000,
      fechaInicio: '2023-11-01',
      fechaFin: '2024-03-31',
      estado: 'terminado',
      modalidad: 'Invitación Privada',
      categoria: 'Consultoría',
      supervisor: 'CPA. Ana Rodríguez',
      documentos: ['contrato_firmado.pdf', 'informe_auditoria.pdf', 'acta_liquidacion.pdf'],
      observaciones: 'Auditoría completada con concepto favorable'
    },
    {
      id: '5',
      numeroContrato: 'EH-2024-004',
      objeto: 'Mantenimiento sistemas de información y software empresarial',
      contratista: 'TecnoSoft Huila',
      valor: 120000000,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      estado: 'ejecutado',
      modalidad: 'Contratación Directa',
      categoria: 'Tecnología',
      supervisor: 'Ing. Diana Torres',
      documentos: ['contrato_firmado.pdf', 'sla_acuerdo.pdf'],
      observaciones: 'Servicio 24/7 funcionando correctamente'
    },
    {
      id: '6',
      numeroContrato: 'EH-2024-005',
      objeto: 'Campaña de comunicaciones institucionales y educación energética',
      contratista: 'Publicidad y Mercadeo del Huila',
      valor: 95000000,
      fechaInicio: '2024-04-01',
      fechaFin: '2024-10-31',
      estado: 'en-proceso',
      modalidad: 'Invitación Privada',
      categoria: 'Publicidad',
      supervisor: 'Com. Social Laura Pérez',
      documentos: ['contrato_firmado.pdf', 'propuesta_creativa.pdf'],
      observaciones: 'Campaña en radio y medios digitales activa'
    },
    {
      id: '7',
      numeroContrato: 'EH-2023-042',
      objeto: 'Modernización sistema de medición sector comercial',
      contratista: 'Medidores Inteligentes Colombia',
      valor: 650000000,
      fechaInicio: '2023-08-15',
      fechaFin: '2024-02-15',
      estado: 'liquidado',
      modalidad: 'Licitación Pública',
      categoria: 'Modernización',
      supervisor: 'Ing. Fernando Vargas',
      documentos: ['contrato_firmado.pdf', 'acta_recibo.pdf', 'acta_liquidacion.pdf', 'garantia.pdf'],
      observaciones: 'Proyecto completado - 2,500 medidores instalados'
    },
    {
      id: '8',
      numeroContrato: 'EH-2024-006',
      objeto: 'Servicios de vigilancia y seguridad física instalaciones',
      contratista: 'Seguridad Total Huila',
      valor: 180000000,
      fechaInicio: '2024-01-01',
      fechaFin: '2024-12-31',
      estado: 'ejecutado',
      modalidad: 'Invitación Privada',
      categoria: 'Seguridad',
      supervisor: 'Adm. Jorge Ramírez',
      documentos: ['contrato_firmado.pdf', 'plan_seguridad.pdf'],
      observaciones: 'Servicio 24/7 en todas las subestaciones'
    }
  ];
}