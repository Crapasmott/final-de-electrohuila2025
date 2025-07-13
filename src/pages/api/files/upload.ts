// pages/api/files/upload.ts
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
    
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const category = Array.isArray(fields.category) ? fields.category[0] : fields.category;
    const uploadDate = Array.isArray(fields.uploadDate) ? fields.uploadDate[0] : fields.uploadDate;

    if (!file || !category) {
      return res.status(400).json({ message: 'File and category are required' });
    }

    // Validar tipo de archivo
    const allowedTypes = process.env.ALLOWED_FILE_TYPES?.split(',') || ['pdf', 'doc', 'docx', 'xlsx', 'xls'];
    const fileExtension = path.extname(file.originalFilename || '').toLowerCase().slice(1);
    
    if (!allowedTypes.includes(fileExtension)) {
      return res.status(400).json({ message: 'File type not allowed' });
    }

    // Crear estructura de carpetas por categoría
    const categoryPath = path.join(process.env.FILE_UPLOAD_PATH || './uploads', category);
    
    if (!fs.existsSync(categoryPath)) {
      fs.mkdirSync(categoryPath, { recursive: true });
    }

    // Generar nombre único para el archivo
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.originalFilename}`;
    const finalPath = path.join(categoryPath, fileName);

    // Mover archivo a la ubicación final
    fs.renameSync(file.filepath, finalPath);

    // Calcular tamaño del archivo
    const stats = fs.statSync(finalPath);
    const fileSize = `${(stats.size / 1024 / 1024).toFixed(2)} MB`;

    // Guardar información en base de datos o archivo JSON
    const fileInfo = {
      id: timestamp.toString(),
      name: file.originalFilename,
      fileName: fileName,
      category: category,
      uploadDate: uploadDate || new Date().toISOString(),
      fileSize: fileSize,
      filePath: finalPath,
      fileUrl: `/files/${category}/${fileName}`
    };

    // Guardar en archivo JSON (puedes cambiar por base de datos)
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
      fileUrl: fileInfo.fileUrl,
      fileName: fileInfo.fileName,
      fileSize: fileInfo.fileSize,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error uploading file',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}