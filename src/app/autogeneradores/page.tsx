// src/app/autogeneradores/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';

export default function AutogeneradoresPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">Autogeneradores</h1>
      
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 text-center mb-8">
          Permiten al usuario gestionar de una manera eficiente los objetivos.
          Seleccione una de nuestras plataformas para continuar:
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Opción 1: EHFACT2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Sistema EHFACT2</h2>
            <p className="text-gray-600 mb-4">
              Sistema de facturación eléctrica para la gestión eficiente de servicios.
            </p>
            <a 
              href="http://200.21.4.66:8070/ehfact2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-900 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Acceder a EHFACT2
            </a>
          </div>
          
          {/* Opción 2: Solicitante */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">Sistema Solicitante</h2>
            <p className="text-gray-600 mb-4">
              Portal para solicitantes donde puede gestionar sus solicitudes y trámites.
            </p>
            <a 
              href="http://35.184.36.98/solicitante/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center bg-blue-900 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Acceder a Solicitante
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}