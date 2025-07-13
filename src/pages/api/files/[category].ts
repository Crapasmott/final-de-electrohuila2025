// pages/api/files/[category].ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { category, year } = req.query;
    
    if (!category || typeof category !== 'string') {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Leer registro de archivos
    const dataFile = path.join(process.env.FILE_UPLOAD_PATH || './uploads', 'files_registry.json');
    
    if (!fs.existsSync(dataFile)) {
      return res.status(200).json({ files: [] });
    }

    const data = fs.readFileSync(dataFile, 'utf8');
    const registry = JSON.parse(data);

    // Filtrar por categoría
    let files = registry.filter((file: any) => file.category === category);

    // Filtrar por año si se especifica
    if (year) {
      files = files.filter((file: any) => {
        const fileYear = new Date(file.uploadDate).getFullYear();
        return fileYear === parseInt(year as string);
      });
    }

    // Ordenar por fecha de subida (más reciente primero)
    files.sort((a: any, b: any) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());

    res.status(200).json({ 
      files: files,
      total: files.length,
      category: category,
      year: year || 'all'
    });

  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ 
      message: 'Error fetching files',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}