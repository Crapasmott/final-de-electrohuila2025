import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { isAdmin: false, message: 'No autenticado' },
                { status: 401 }
            );
        }

        const isAdmin = session.user.role === 'admin';

        return NextResponse.json({ isAdmin });
    } catch (error) {
        console.error('Error verificando estado de administrador:', error);
        return NextResponse.json(
            { isAdmin: false, message: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}