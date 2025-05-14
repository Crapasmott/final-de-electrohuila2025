'use client';

import React from 'react';
import Link from 'next/link';

export default function TramitesUI() {
  const tramites = [
    {
      title: "Trámites Usuarios",
      link: "/tramites-usuarios"
    },
    {
      title: "Paga tu Factura",
      link: "/pagar-factura"
    },
    {
      title: "ElectroHuila en Línea",
      link: "/electrohuila-en-linea"
    },
    {
      title: "Contrato de Condiciones Uniformes",
      link: "/contrato-condiciones"
    },
    {
      title: "Puntos de Pago",
      link: "/puntos-pago"
    },
    {
      title: "Puntos de Atención",
      link: "/puntos-atencion"
    },
    {
      title: "Tarifas",
      link: "/tarifas"
    },
    {
      title: "Suspensiones Programadas",
      link: "/suspensiones"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Trámites y Servicios</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tramites.map((tramite, index) => (
          <Link 
            key={index} 
            href={tramite.link}
            className="block p-4 border border-gray-200 rounded bg-white hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            {tramite.title}
          </Link>
        ))}
      </div>
    </div>
  );
}