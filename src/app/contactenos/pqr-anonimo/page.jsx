'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Importación dinámica para manejar componentes del lado del cliente
const FormularioPQRAnonimo = dynamic(() => import('../../../components/FormularioPQRAnonimo'), {
  ssr: false,
});

const PQRAnonimoPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 mb-10">
      <div className="bg-blue-50 p-6 rounded-lg mb-10">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">
          Sistema de Peticiones, Quejas y Reclamos Anónimos
        </h1>
        <p className="text-gray-700 mb-4">
          En Electrohuila valoramos tu opinión. Puedes presentar tus peticiones, quejas, reclamos o sugerencias
          de manera anónima a través de este formulario.
        </p>
        <p className="text-gray-700 mb-4">
          Si deseas realizar un seguimiento a tu solicitud, tienes la opción de proporcionar tus datos de contacto
          o simplemente conservar el código de radicado que se generará al enviar el formulario.
        </p>
        <div className="flex items-start p-5 bg-blue-100 rounded-lg">
          <div className="mr-4 mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-blue-800 mb-2">
              Importante:
            </h3>
            <p className="text-gray-700">
              Utilizamos tus comentarios para mejorar continuamente nuestros servicios. 
              Toda la información proporcionada es tratada con confidencialidad según la 
              legislación vigente.
            </p>
          </div>
        </div>
      </div>
      
      <FormularioPQRAnonimo />
      
      <div className="mt-10 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Marco Normativo
        </h2>
        <ul className="list-disc pl-8 space-y-2 text-gray-700">
          <li><strong>Ley 1755 de 2015</strong> – Derecho de petición</li>
          <li><strong>Ley 142 de 1994</strong> – Régimen de servicios públicos domiciliarios</li>
          <li><strong>Ley 1581 de 2012</strong> – Protección de datos personales</li>
          <li><strong>Decreto 1077 de 2015</strong> – Reglamentario del sector vivienda, ciudad y territorio</li>
        </ul>
        
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">
            ¿Ya radicaste una solicitud?
          </h3>
          <p className="text-gray-700">
            Si ya has enviado una solicitud y deseas consultar su estado, puedes hacerlo 
            a través de nuestro <a href="/consulta-pqr" className="text-blue-600 hover:underline">
            sistema de consulta de PQR</a> utilizando el código de radicado que recibiste.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PQRAnonimoPage;