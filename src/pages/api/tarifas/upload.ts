// pages/api/tarifas/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const form = formidable({
      uploadDir: process.env.FILE_UPLOAD_PATH || './uploads',
      keepExtensions: true,
      maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
    });

    const [fields, files] = await form.parse(req);
    
    const file = Array.isArray(files.tarifa) ? files.tarifa[0] : files.tarifa;
    const month = Array.isArray(fields.month) ? fields.month[0] : fields.month;
    const year = Array.isArray(fields.year) ? fields.year[0] : fields.year;

    if (!file || !month || !year) {
      return res.status(400).json({ message: 'File, month, and year are required' });
    }

    // Validar que sea PDF
    const fileExtension = path.extname(file.originalFilename || '').toLowerCase();
    if (fileExtension !== '.pdf') {
      return res.status(400).json({ message: 'Only PDF files are allowed for tarifas' });
    }

    // Crear estructura de carpetas por año
    const yearPath = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'tarifas', year);
    
    if (!fs.existsSync(yearPath)) {
      fs.mkdirSync(yearPath, { recursive: true });
    }

    // Generar nombre del archivo con formato: YYYY_MM_tarifa_mes.pdf
    const monthNames = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    
    const monthIndex = monthNames.indexOf(month.toLowerCase());
    const monthNumber = monthIndex >= 0 ? (monthIndex + 1).toString().padStart(2, '0') : '01';
    
    const fileName = `${year}_${monthNumber}_tarifa_${month}.pdf`;
    const finalPath = path.join(yearPath, fileName);

    // Verificar si ya existe una tarifa para ese mes
    if (fs.existsSync(finalPath)) {
      return res.status(400).json({ 
        message: `Ya existe una tarifa para ${month} de ${year}`,
        exists: true
      });
    }

    // Mover archivo a la ubicación final
    fs.renameSync(file.filepath, finalPath);

    // Calcular tamaño del archivo
    const stats = fs.statSync(finalPath);
    const fileSize = `${(stats.size / 1024 / 1024).toFixed(2)} MB`;

    // Guardar información en registro
    const fileInfo = {
      id: `${year}_${monthNumber}`,
      name: `Tarifa ${month} ${year}`,
      fileName: fileName,
      category: 'tarifas',
      uploadDate: new Date().toISOString(),
      fileSize: fileSize,
      filePath: finalPath,
      fileUrl: `/files/tarifas/${year}/${fileName}`,
      month: month,
      year: parseInt(year),
      monthNumber: parseInt(monthNumber)
    };

    // Actualizar registro general
    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'files_registry.json');
    let registry = [];
    
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf8');
      registry = JSON.parse(data);
    }
    
    registry.push(fileInfo);
    fs.writeFileSync(dataFile, JSON.stringify(registry, null, 2));

    res.status(200).json({
      success: true,
      message: `Tarifa de ${month} ${year} subida exitosamente`,
      fileInfo: fileInfo
    });

  } catch (error) {
    console.error('Upload tarifa error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading tarifa',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}