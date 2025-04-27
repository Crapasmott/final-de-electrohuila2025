// Crea este archivo en: /src/app/api/documents/toggle-publish/route.js

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function POST(request) {
    try {
        // Verificar autenticación
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'No tienes permisos para modificar documentos' },
                { status: 403 }
            );
        }

        // Obtener datos de la solicitud
        const data = await request.json();
        const { id, published } = data;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'ID de documento no proporcionado' },
                { status: 400 }
            );
        }

        // En una aplicación real, actualizaríamos el documento en la base de datos
        // Para este ejemplo, simulamos una respuesta exitosa

        return NextResponse.json({
            success: true,
            message: `Documento ${published ? 'publicado' : 'despublicado'} correctamente`,
            document: {
                id,
                published
            }
        });

    } catch (error) {
        console.error('Error al modificar estado de publicación:', error);
        return NextResponse.json(
            { success: false, message: 'Error al procesar la solicitud' },
            { status: 500 }
        );
    }
}