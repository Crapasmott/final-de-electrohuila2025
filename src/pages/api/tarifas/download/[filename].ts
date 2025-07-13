// pages/api/tarifas/download/[filename].ts
// API para descargar archivos PDF de tarifas
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false,
      message: 'Method not allowed' 
    });
  }

  try {
    const { filename } = req.query;

    if (!filename || typeof filename !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Nombre de archivo requerido'
      });
    }

    // Validar extensión del archivo
    if (!filename.endsWith('.pdf')) {
      return res.status(400).json({
        success: false,
        message: 'Solo se permiten archivos PDF'
      });
    }

    // Por seguridad, validar que el filename no contenga caracteres peligrosos
    const safeFilename = path.basename(filename);
    if (safeFilename !== filename || filename.includes('..')) {
      return res.status(400).json({
        success: false,
        message: 'Nombre de archivo inválido'
      });
    }

    // Validar que sea un archivo de tarifas válido
    const validFilePattern = /^tarifas_(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)_\d{4}\.pdf$/i;
    if (!validFilePattern.test(safeFilename)) {
      return res.status(400).json({
        success: false,
        message: 'Archivo de tarifa no válido'
      });
    }

    // En un entorno real, aquí verificarías si el archivo existe en tu sistema de archivos
    // Por ahora, generamos un PDF simulado
    const simulatedPDFContent = generateTarifaPDF(safeFilename);

    // Headers para descarga de archivo
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Content-Length', simulatedPDFContent.length);
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.setHeader('Expires', '-1');
    res.setHeader('Pragma', 'no-cache');

    // Log de descarga para auditoría
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    
    console.log(`[DESCARGA TARIFA] ${new Date().toISOString()} - Archivo: ${safeFilename} - IP: ${ip} - User-Agent: ${userAgent.substring(0, 100)}`);

    return res.status(200).send(simulatedPDFContent);

  } catch (error) {
    console.error('Error en descarga de tarifa:', error);
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al procesar la descarga'
    });
  }
}

// Función para generar un PDF simulado de tarifa
function generateTarifaPDF(filename: string): Buffer {
  // Extraer información del nombre del archivo
  const match = filename.match(/tarifas_(\w+)_(\d{4})\.pdf/i);
  const month = match ? match[1] : 'mes';
  const year = match ? match[2] : '2024';
  
  // Mapear nombres de meses
  const monthNames: { [key: string]: string } = {
    'enero': 'Enero',
    'febrero': 'Febrero', 
    'marzo': 'Marzo',
    'abril': 'Abril',
    'mayo': 'Mayo',
    'junio': 'Junio',
    'julio': 'Julio',
    'agosto': 'Agosto',
    'septiembre': 'Septiembre',
    'octubre': 'Octubre',
    'noviembre': 'Noviembre',
    'diciembre': 'Diciembre'
  };

  const monthName = monthNames[month.toLowerCase()] || month;
  const currentDate = new Date().toLocaleDateString('es-ES');

  // Generar contenido PDF simulado con información de tarifas
  const pdfHeader = '%PDF-1.4\n';
  const pdfBody = `
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
/F2 6 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 1200
>>
stream
BT
/F1 16 Tf
50 750 Td
(ELECTRIFICADORA DEL HUILA - ELECTROHUILA) Tj
0 -30 Td
/F2 14 Tf
(Tarifas de Energia Electrica - ${monthName} ${year}) Tj
0 -40 Td
/F1 12 Tf
(Documento generado el: ${currentDate}) Tj
0 -60 Td
(TARIFAS VIGENTES PARA ${monthName.toUpperCase()} DE ${year}) Tj
0 -40 Td
/F2 10 Tf
(Usuarios Residenciales:) Tj
0 -20 Td
(- Estrato 1: $XXX.XX por kWh) Tj
0 -15 Td
(- Estrato 2: $XXX.XX por kWh) Tj
0 -15 Td
(- Estrato 3: $XXX.XX por kWh) Tj
0 -15 Td
(- Estrato 4: $XXX.XX por kWh) Tj
0 -15 Td
(- Estrato 5: $XXX.XX por kWh) Tj
0 -15 Td
(- Estrato 6: $XXX.XX por kWh) Tj
0 -30 Td
(Usuarios Comerciales:) Tj
0 -20 Td
(- Comercial General: $XXX.XX por kWh) Tj
0 -15 Td
(- Comercial Especial: $XXX.XX por kWh) Tj
0 -30 Td
(Usuarios Industriales:) Tj
0 -20 Td
(- Industrial General: $XXX.XX por kWh) Tj
0 -15 Td
(- Gran Industria: $XXX.XX por kWh) Tj
0 -40 Td
(Cargos Adicionales:) Tj
0 -20 Td
(- Cargo por Conexion: $XXX.XX) Tj
0 -15 Td
(- Cargo por Reconexion: $XXX.XX) Tj
0 -15 Td
(- Suspension del Servicio: $XXX.XX) Tj
0 -40 Td
/F1 8 Tf
(Nota: Este documento es generado automaticamente.) Tj
0 -15 Td
(Para consultas contacte a ElectroHuila al telefono XXX-XXXX) Tj
0 -15 Td
(o visite nuestro sitio web: www.electrohuila.com.co) Tj
0 -30 Td
(Fecha de vigencia: ${monthName} ${year}) Tj
0 -15 Td
(Resolucion CREG aplicable: XXX de ${year}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000120 00000 n 
0000000274 00000 n 
0000001530 00000 n 
0000001600 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
1670
%%EOF
`;

  return Buffer.from(pdfHeader + pdfBody, 'utf-8');
}

export const config = {
  api: {
    responseLimit: '10mb', // Permitir archivos de hasta 10MB
  },
}