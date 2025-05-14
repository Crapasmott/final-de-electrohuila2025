// src/app/puntos-de-pago/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Puntos de Pago | Electrohuila',
  description: 'Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía de Electrohuila. Encuentra el punto más cercano a tu ubicación.',
  keywords: 'puntos de pago, Electrohuila, factura de energía, pago de servicios, Suchance, Banco Occidente, Credifuturo, oficinas de pago',
  openGraph: {
    title: 'Puntos de Pago | Electrohuila',
    description: 'Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía de Electrohuila.',
    url: 'https://www.electrohuila.com.co/puntos-de-pago',
    siteName: 'Electrohuila',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function PuntosPagoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}