// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { writeFile, mkdir, stat } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request) {
    // Información de debugging
    const debugInfo = {
        steps: [],
        currentDirectory: process.cwd(),
        publicExists: false,
        documentsExists: false,
        politicasExists: false,
        uploadSuccessful: false,
        filePath: '',
        error: null
    };

    try {
        // Paso 1: Procesar la solicitud multipart/form-data
        debugInfo.steps.push("1. Iniciando proceso de carga");
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            debugInfo.error = "No se ha proporcionado ningún archivo";
            debugInfo.steps.push("ERROR: No se encontró archivo en la solicitud");
            return NextResponse.json({ error: debugInfo.error, debug: debugInfo }, { status: 400 });
        }

        // Paso 2: Obtener información del archivo
        debugInfo.steps.push(`2. Archivo recibido: ${file.name} (${file.size} bytes)`);

        // Paso 3: Preparar el buffer del archivo
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replace(/\s+/g, '_');
        debugInfo.steps.push(`3. Buffer creado, nombre normalizado: ${filename}`);

        // Paso 4: Definir las rutas de directorios
        const publicDir = path.join(process.cwd(), 'public');
        const docsDir = path.join(publicDir, 'documentos');
        const uploadDir = path.join(docsDir, 'politicas');
        debugInfo.steps.push(`4. Directorios definidos:
      - public: ${publicDir}
      - documentos: ${docsDir}
      - politicas: ${uploadDir}`);

        // Verificar qué directorios existen
        debugInfo.publicExists = existsSync(publicDir);
        debugInfo.documentsExists = existsSync(docsDir);
        debugInfo.politicasExists = existsSync(uploadDir);
        debugInfo.steps.push(`5. Verificación de directorios:
      - public existe: ${debugInfo.publicExists}
      - documentos existe: ${debugInfo.documentsExists}
      - politicas existe: ${debugInfo.politicasExists}`);

        // Paso 5: Crear directorios si no existen
        if (!debugInfo.publicExists) {
            debugInfo.steps.push("6. Creando directorio public");
            await mkdir(publicDir, { recursive: true });
        }

        if (!debugInfo.documentsExists) {
            debugInfo.steps.push("7. Creando directorio documentos");
            await mkdir(docsDir, { recursive: true });
        }

        if (!debugInfo.politicasExists) {
            debugInfo.steps.push("8. Creando directorio politicas");
            await mkdir(uploadDir, { recursive: true });
        }

        // Paso 6: Guardar el archivo
        const filePath = path.join(uploadDir, filename);
        debugInfo.filePath = filePath;
        debugInfo.steps.push(`9. Intentando guardar archivo en: ${filePath}`);

        await writeFile(filePath, buffer);
        debugInfo.uploadSuccessful = true;
        debugInfo.steps.push("10. Archivo guardado exitosamente");

        // Verificar que el archivo se creó correctamente
        const fileStats = await stat(filePath);
        debugInfo.steps.push(`11. Verificación del archivo: 
      - Tamaño: ${fileStats.size} bytes
      - Creado: ${fileStats.birthtime}`);

        // Devolver la URL relativa al archivo
        const fileUrl = `/documentos/politicas/${filename}`;
        debugInfo.steps.push(`12. URL generada: ${fileUrl}`);

        return NextResponse.json({
            message: 'Archivo subido con éxito',
            url: fileUrl,
            debug: debugInfo
        });
    } catch (error) {
        debugInfo.error = error.message;
        debugInfo.steps.push(`ERROR: ${error.message}`);
        debugInfo.steps.push(`ERROR Stack: ${error.stack}`);

        return NextResponse.json({
            error: 'Error al procesar el archivo',
            details: error.message,
            debug: debugInfo
        }, { status: 500 });
    }
}