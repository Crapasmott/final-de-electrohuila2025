// src/app/api/documents/list/route.js
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Ruta al archivo JSON que almacena los metadatos de los documentos
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'documents.json');

export async function GET() {
    try {
        // Intentar leer el archivo de documentos
        try {
            const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
            const documents = JSON.parse(data);
            return NextResponse.json({ success: true, documents });
        } catch (error) {
            // Si el archivo no existe, devolver la estructura predeterminada
            return NextResponse.json({
                success: true,
                documents: {
                    'reporte-integrado': {
                        title: "Reporte Integrado",
                        reports: []
                    },
                    'plan-inversion': {
                        title: "Plan de Inversión",
                        reports: []
                    },
                    'informes-gestion': {
                        title: "Informes",
                        reports: []
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error al listar documentos:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar la solicitud: ' + error.message },
            { status: 500 }
        );
    }
}