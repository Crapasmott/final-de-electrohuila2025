// src/app/api/documents/create/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import path from 'path';
import fs from 'fs/promises';
import { writeFile } from 'fs/promises';

// Ruta al archivo JSON que almacenará los metadatos de los documentos
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'documents.json');

// Función para leer los documentos actuales
async function getDocuments() {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si el archivo no existe o hay error al leerlo, retornar estructura base
        return {
            'reporte-integrado': [],
            'plan-inversion': [],
            'informes-gestion': []
        };
    }
}

// Función para guardar los documentos
async function saveDocuments(documents) {
    // Asegurarse de que el directorio existe
    const dataDir = path.join(process.cwd(), 'data');
    try {
        await fs.access(dataDir);
    } catch (error) {
        await fs.mkdir(dataDir, { recursive: true });
    }

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(documents, null, 2), 'utf8');
}

export async function POST(request) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);
        console.log("Sesión del usuario:", session); // Log para verificar la sesión

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'No tienes permisos para crear documentos' },
                { status: 403 }
            );
        }

        const formData = await request.formData();
        // Log para verificar que los datos del formulario se están recibiendo
        console.log("Datos recibidos:", {
            title: formData.get('title'),
            type: formData.get('type'),
            file: formData.get('file') ? "Archivo presente" : "No hay archivo",
            position: formData.get('position')
        });
        const title = formData.get('title');
        const description = formData.get('description');
        const published = formData.get('published') === 'true';
        const type = formData.get('type');
        const file = formData.get('file');
        const fileName = formData.get('fileName');
        const author = formData.get('author') || 'No especificado';
        const category = formData.get('category') || 'General';
        const position = formData.get('position') || 'end'; // Obtener la posición, 'end' por defecto

        if (!title || !file || !type || !fileName) {
            return NextResponse.json(
                { success: false, message: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Obtener los datos del archivo
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Definir la ruta del directorio donde se guardarán los archivos
        const uploadDir = path.join(process.cwd(), 'public', 'documentos', 'informes');

        // Asegurarse de que el directorio existe
        try {
            await fs.access(uploadDir);
        } catch (error) {
            // Si el directorio no existe, crearlo
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Guardar el archivo
        const filePath = path.join(uploadDir, fileName);
        await writeFile(filePath, buffer);

        // Generar la URL para acceder al archivo
        const fileUrl = `/documentos/informes/${fileName}`;

        // Crear documento nuevo
        const documentId = `${type}-${Date.now()}`;
        const date = new Date().toLocaleDateString('es-ES');
        const fileSize = `${(buffer.length / (1024 * 1024)).toFixed(2)} MB`;

        const newDoc = {
            id: documentId,
            title,
            description,
            published,
            url: fileUrl,
            author,
            category,
            date,
            fileSize
        };

        // Obtener la lista actual de documentos
        const allDocuments = await getDocuments();

        // Asegurarse de que existe la categoría
        if (!allDocuments[type]) {
            allDocuments[type] = [];
        }

        // Añadir el nuevo documento en la posición correcta
        if (position === 'start') {
            // Añadir al inicio
            allDocuments[type] = [newDoc, ...allDocuments[type]];
        } else {
            // Añadir al final
            allDocuments[type] = [...allDocuments[type], newDoc];
        }

        // Guardar la lista actualizada
        await saveDocuments(allDocuments);

        return NextResponse.json({
            success: true,
            message: 'Documento creado correctamente',
            document: newDoc
        });

    } catch (error) {
        console.error('Error al crear documento:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar la solicitud: ' + error.message },
            { status: 500 }
        );
    }
}