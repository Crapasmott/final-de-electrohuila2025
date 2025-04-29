import './globals.css';
import './responsive.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthProvider from '@/components/AuthProvider';
import './globals.css'
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Electrohuila - Energía que transforma',
  description: 'Empresa de Energía del Huila S.A. E.S.P.',
  viewport: 'width=device-width, initial-scale=1.0',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}