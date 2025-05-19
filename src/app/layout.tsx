import './globals.css';
import './responsive.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';

// Importar ClientComponents de forma dinámica para evitar errores de carga en el servidor
const ClientComponents = dynamic(() => import('@/components/ClientComponents'), {
  ssr: false, // Desactivar SSR para este componente
});

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL('https://electrohuila.com.co'),
  title: 'Electrohuila - Energía que transforma',
  description: 'Empresa de Energía del Huila S.A. E.S.P.',
  viewport: 'width=device-width, initial-scale=1.0',
  openGraph: {
    title: 'Electrohuila - Energía que transforma',
    description: 'Empresa de Energía del Huila S.A. E.S.P.',
    url: 'https://electrohuila.com.co',
    siteName: 'Electrohuila',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrohuila - Energía que transforma',
    description: 'Empresa de Energía del Huila S.A. E.S.P.',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Quitamos getServerSession - no compatible con export estático

  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <div suppressHydrationWarning>
            {/* @ts-ignore - Ignoramos errores de tipos en tiempo de compilación */}
            <ClientComponents />
             <FloatingWhatsAppButton />
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}