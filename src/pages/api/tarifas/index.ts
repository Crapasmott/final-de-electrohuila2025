// pages/api/tarifas/index.ts
// API para obtener tarifas organizadas por año
import { NextApiRequest, NextApiResponse } from 'next';

interface TarifaFile {
  id: string;
  name: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
  downloadUrl: string;
  month: string;
  year: number;
}

interface TarifaYear {
  year: number;
  files: TarifaFile[];
  totalFiles: number;
}

interface ApiResponse {
  success: boolean;
  data: TarifaYear[];
  totalYears: number;
  message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      data: [],
      totalYears: 0,
      message: 'Method not allowed'
    });
  }

  try {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Datos de tarifas organizados por año
    const tarifasData: TarifaYear[] = [
      {
        year: 2024,
        totalFiles: 12,
        files: [
          {
            id: "tarifa_2024_12",
            name: "Tarifas Diciembre 2024",
            fileName: "tarifas_diciembre_2024.pdf",
            uploadDate: "2024-12-01T00:00:00Z",
            fileSize: "2.3 MB",
            downloadUrl: "/api/tarifas/download/tarifas_diciembre_2024.pdf",
            month: "Diciembre",
            year: 2024
          },
          {
            id: "tarifa_2024_11",
            name: "Tarifas Noviembre 2024",
            fileName: "tarifas_noviembre_2024.pdf",
            uploadDate: "2024-11-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_noviembre_2024.pdf",
            month: "Noviembre",
            year: 2024
          },
          {
            id: "tarifa_2024_10",
            name: "Tarifas Octubre 2024",
            fileName: "tarifas_octubre_2024.pdf",
            uploadDate: "2024-10-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_octubre_2024.pdf",
            month: "Octubre",
            year: 2024
          },
          {
            id: "tarifa_2024_09",
            name: "Tarifas Septiembre 2024",
            fileName: "tarifas_septiembre_2024.pdf",
            uploadDate: "2024-09-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_septiembre_2024.pdf",
            month: "Septiembre",
            year: 2024
          },
          {
            id: "tarifa_2024_08",
            name: "Tarifas Agosto 2024",
            fileName: "tarifas_agosto_2024.pdf",
            uploadDate: "2024-08-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_agosto_2024.pdf",
            month: "Agosto",
            year: 2024
          },
          {
            id: "tarifa_2024_07",
            name: "Tarifas Julio 2024",
            fileName: "tarifas_julio_2024.pdf",
            uploadDate: "2024-07-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_julio_2024.pdf",
            month: "Julio",
            year: 2024
          },
          {
            id: "tarifa_2024_06",
            name: "Tarifas Junio 2024",
            fileName: "tarifas_junio_2024.pdf",
            uploadDate: "2024-06-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_junio_2024.pdf",
            month: "Junio",
            year: 2024
          },
          {
            id: "tarifa_2024_05",
            name: "Tarifas Mayo 2024",
            fileName: "tarifas_mayo_2024.pdf",
            uploadDate: "2024-05-01T00:00:00Z",
            fileSize: "1.8 MB",
            downloadUrl: "/api/tarifas/download/tarifas_mayo_2024.pdf",
            month: "Mayo",
            year: 2024
          },
          {
            id: "tarifa_2024_04",
            name: "Tarifas Abril 2024",
            fileName: "tarifas_abril_2024.pdf",
            uploadDate: "2024-04-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_abril_2024.pdf",
            month: "Abril",
            year: 2024
          },
          {
            id: "tarifa_2024_03",
            name: "Tarifas Marzo 2024",
            fileName: "tarifas_marzo_2024.pdf",
            uploadDate: "2024-03-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_marzo_2024.pdf",
            month: "Marzo",
            year: 2024
          },
          {
            id: "tarifa_2024_02",
            name: "Tarifas Febrero 2024",
            fileName: "tarifas_febrero_2024.pdf",
            uploadDate: "2024-02-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_febrero_2024.pdf",
            month: "Febrero",
            year: 2024
          },
          {
            id: "tarifa_2024_01",
            name: "Tarifas Enero 2024",
            fileName: "tarifas_enero_2024.pdf",
            uploadDate: "2024-01-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_enero_2024.pdf",
            month: "Enero",
            year: 2024
          }
        ]
      },
      {
        year: 2023,
        totalFiles: 12,
        files: [
          {
            id: "tarifa_2023_12",
            name: "Tarifas Diciembre 2023",
            fileName: "tarifas_diciembre_2023.pdf",
            uploadDate: "2023-12-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_diciembre_2023.pdf",
            month: "Diciembre",
            year: 2023
          },
          {
            id: "tarifa_2023_11",
            name: "Tarifas Noviembre 2023",
            fileName: "tarifas_noviembre_2023.pdf",
            uploadDate: "2023-11-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_noviembre_2023.pdf",
            month: "Noviembre",
            year: 2023
          },
          {
            id: "tarifa_2023_10",
            name: "Tarifas Octubre 2023",
            fileName: "tarifas_octubre_2023.pdf",
            uploadDate: "2023-10-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_octubre_2023.pdf",
            month: "Octubre",
            year: 2023
          },
          {
            id: "tarifa_2023_09",
            name: "Tarifas Septiembre 2023",
            fileName: "tarifas_septiembre_2023.pdf",
            uploadDate: "2023-09-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_septiembre_2023.pdf",
            month: "Septiembre",
            year: 2023
          },
          {
            id: "tarifa_2023_08",
            name: "Tarifas Agosto 2023",
            fileName: "tarifas_agosto_2023.pdf",
            uploadDate: "2023-08-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_agosto_2023.pdf",
            month: "Agosto",
            year: 2023
          },
          {
            id: "tarifa_2023_07",
            name: "Tarifas Julio 2023",
            fileName: "tarifas_julio_2023.pdf",
            uploadDate: "2023-07-01T00:00:00Z",
            fileSize: "1.8 MB",
            downloadUrl: "/api/tarifas/download/tarifas_julio_2023.pdf",
            month: "Julio",
            year: 2023
          },
          {
            id: "tarifa_2023_06",
            name: "Tarifas Junio 2023",
            fileName: "tarifas_junio_2023.pdf",
            uploadDate: "2023-06-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_junio_2023.pdf",
            month: "Junio",
            year: 2023
          },
          {
            id: "tarifa_2023_05",
            name: "Tarifas Mayo 2023",
            fileName: "tarifas_mayo_2023.pdf",
            uploadDate: "2023-05-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_mayo_2023.pdf",
            month: "Mayo",
            year: 2023
          },
          {
            id: "tarifa_2023_04",
            name: "Tarifas Abril 2023",
            fileName: "tarifas_abril_2023.pdf",
            uploadDate: "2023-04-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_abril_2023.pdf",
            month: "Abril",
            year: 2023
          },
          {
            id: "tarifa_2023_03",
            name: "Tarifas Marzo 2023",
            fileName: "tarifas_marzo_2023.pdf",
            uploadDate: "2023-03-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_marzo_2023.pdf",
            month: "Marzo",
            year: 2023
          },
          {
            id: "tarifa_2023_02",
            name: "Tarifas Febrero 2023",
            fileName: "tarifas_febrero_2023.pdf",
            uploadDate: "2023-02-01T00:00:00Z",
            fileSize: "1.8 MB",
            downloadUrl: "/api/tarifas/download/tarifas_febrero_2023.pdf",
            month: "Febrero",
            year: 2023
          },
          {
            id: "tarifa_2023_01",
            name: "Tarifas Enero 2023",
            fileName: "tarifas_enero_2023.pdf",
            uploadDate: "2023-01-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_enero_2023.pdf",
            month: "Enero",
            year: 2023
          }
        ]
      },
      {
        year: 2022,
        totalFiles: 12,
        files: [
          {
            id: "tarifa_2022_12",
            name: "Tarifas Diciembre 2022",
            fileName: "tarifas_diciembre_2022.pdf",
            uploadDate: "2022-12-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_diciembre_2022.pdf",
            month: "Diciembre",
            year: 2022
          },
          {
            id: "tarifa_2022_11",
            name: "Tarifas Noviembre 2022",
            fileName: "tarifas_noviembre_2022.pdf",
            uploadDate: "2022-11-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_noviembre_2022.pdf",
            month: "Noviembre",
            year: 2022
          },
          {
            id: "tarifa_2022_10",
            name: "Tarifas Octubre 2022",
            fileName: "tarifas_octubre_2022.pdf",
            uploadDate: "2022-10-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_octubre_2022.pdf",
            month: "Octubre",
            year: 2022
          },
          {
            id: "tarifa_2022_09",
            name: "Tarifas Septiembre 2022",
            fileName: "tarifas_septiembre_2022.pdf",
            uploadDate: "2022-09-01T00:00:00Z",
            fileSize: "1.8 MB",
            downloadUrl: "/api/tarifas/download/tarifas_septiembre_2022.pdf",
            month: "Septiembre",
            year: 2022
          },
          {
            id: "tarifa_2022_08",
            name: "Tarifas Agosto 2022",
            fileName: "tarifas_agosto_2022.pdf",
            uploadDate: "2022-08-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_agosto_2022.pdf",
            month: "Agosto",
            year: 2022
          },
          {
            id: "tarifa_2022_07",
            name: "Tarifas Julio 2022",
            fileName: "tarifas_julio_2022.pdf",
            uploadDate: "2022-07-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_julio_2022.pdf",
            month: "Julio",
            year: 2022
          },
          {
            id: "tarifa_2022_06",
            name: "Tarifas Junio 2022",
            fileName: "tarifas_junio_2022.pdf",
            uploadDate: "2022-06-01T00:00:00Z",
            fileSize: "1.9 MB",
            downloadUrl: "/api/tarifas/download/tarifas_junio_2022.pdf",
            month: "Junio",
            year: 2022
          },
          {
            id: "tarifa_2022_05",
            name: "Tarifas Mayo 2022",
            fileName: "tarifas_mayo_2022.pdf",
            uploadDate: "2022-05-01T00:00:00Z",
            fileSize: "2.1 MB",
            downloadUrl: "/api/tarifas/download/tarifas_mayo_2022.pdf",
            month: "Mayo",
            year: 2022
          },
          {
            id: "tarifa_2022_04",
            name: "Tarifas Abril 2022",
            fileName: "tarifas_abril_2022.pdf",
            uploadDate: "2022-04-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_abril_2022.pdf",
            month: "Abril",
            year: 2022
          },
          {
            id: "tarifa_2022_03",
            name: "Tarifas Marzo 2022",
            fileName: "tarifas_marzo_2022.pdf",
            uploadDate: "2022-03-01T00:00:00Z",
            fileSize: "1.8 MB",
            downloadUrl: "/api/tarifas/download/tarifas_marzo_2022.pdf",
            month: "Marzo",
            year: 2022
          },
          {
            id: "tarifa_2022_02",
            name: "Tarifas Febrero 2022",
            fileName: "tarifas_febrero_2022.pdf",
            uploadDate: "2022-02-01T00:00:00Z",
            fileSize: "2.2 MB",
            downloadUrl: "/api/tarifas/download/tarifas_febrero_2022.pdf",
            month: "Febrero",
            year: 2022
          },
          {
            id: "tarifa_2022_01",
            name: "Tarifas Enero 2022",
            fileName: "tarifas_enero_2022.pdf",
            uploadDate: "2022-01-01T00:00:00Z",
            fileSize: "2.0 MB",
            downloadUrl: "/api/tarifas/download/tarifas_enero_2022.pdf",
            month: "Enero",
            year: 2022
          }
        ]
      }
    ];

    // Parámetros de query opcionales
    const { year } = req.query;

    let responseData = tarifasData;

    // Filtrar por año si se especifica
    if (year) {
      const selectedYear = parseInt(year as string, 10);
      responseData = tarifasData.filter(item => item.year === selectedYear);
    }

    // Ordenar por año de forma descendente (más reciente primero)
    responseData.sort((a, b) => b.year - a.year);

    return res.status(200).json({
      success: true,
      data: responseData,
      totalYears: responseData.length,
      message: year ? `Tarifas para el año ${year}` : 'Todas las tarifas disponibles'
    });

  } catch (error) {
    console.error('Error en API de tarifas:', error);
    return res.status(500).json({
      success: false,
      data: [],
      totalYears: 0,
      message: 'Error interno del servidor al cargar las tarifas'
    });
  }
}