// pages/api/files/test.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const uploadPath = process.env.FILE_UPLOAD_PATH || './uploads';
    
    // Verificar que el directorio de uploads existe
    if (!fs.existsSync(uploadPath)) {
      // Crear directorio si no existe
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Crear directorios de categorías si no existen
    const categories = ['tarifas', 'financieros', 'politicas', 'informes'];
    categories.forEach(category => {
      const categoryPath = path.join(uploadPath, category);
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }
    });

    // Verificar permisos de escritura
    const testFile = path.join(uploadPath, 'test_write.txt');
    try {
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'No write permissions in upload directory',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Verificar archivo de registro
    const registryFile = path.join(uploadPath, 'files_registry.json');
    if (!fs.existsSync(registryFile)) {
      fs.writeFileSync(registryFile, JSON.stringify([], null, 2));
    }

    res.status(200).json({
      success: true,
      message: 'File system is working correctly',
      uploadPath: uploadPath,
      categories: categories
    });

  } catch (error) {
    console.error('File system test error:', error);
    res.status(500).json({
      success: false,
      message: 'File system test failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}