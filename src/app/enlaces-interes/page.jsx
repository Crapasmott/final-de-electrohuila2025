'use client';

import { useState } from 'react';

export default function EnlacesInteres() {
  const [acordeonesAbiertos, setAcordeonesAbiertos] = useState({});

  const toggleAcordeon = (id) => {
    setAcordeonesAbiertos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const gremiosAsociaciones = [
    {
      nombre: "ANDESCO",
      url: "https://andesco.org.co/"
    },
    {
      nombre: "ANDI",
      url: "https://www.andi.com.co/"
    },
    {
      nombre: "Cámara de comercio del Huila",
      url: "https://www.cchuila.org/"
    },
    {
      nombre: "Confecámaras",
      url: "https://confecamaras.org.co/"
    },
    {
      nombre: "Fenalco",
      url: "https://www.fenalco.com.co/"
    },
    {
      nombre: "Red del Pacto Global Colombia",
      url: "https://www.pactoglobal-colombia.org/"
    },
    {
      nombre: "XM",
      url: "https://xm.com.co"
    }
  ];

  const directorioEntidades = [
    {
      nombre: "Comisión de Regulación de Energía y Gas -CREG",
      url: "https://creg.gov.co/"
    },
    {
      nombre: "Contraloría General de la República",
      url: "https://www.contraloria.gov.co/"
    },
    {
      nombre: "Ministerio de Minas y Energía",
      url: "https://www.minenergia.gov.co/es/"
    },
    {
      nombre: "Procuraduría General de la Nación",
      url: "https://www.procuraduria.gov.co/Pages/Inicio.aspx"
    },
    {
      nombre: "Superintendencia de Servicios Públicos Domiciliarios",
      url: "https://www.superservicios.gov.co/"
    },
    {
      nombre: "UPME",
      url: "https://www1.upme.gov.co/"
    }
  ];

  const normativa = [
    {
      nombre: "Ley 142 de 1994",
      url: "https://www.funcionpublica.gov.co/eva"
    },
    {
      nombre: "Ley 143 de 1994",
      url: "https://www.funcionpublica.gov.co/eva"
    },
    {
      nombre: "Resolución 156 de 2011",
      url: "#"
    },
    {
      nombre: "Aplicación Resolución CREG 156 de 2011",
      url: "#"
    },
    {
      nombre: "Resolución CREG 038 de 2014",
      url: "#"
    },
    {
      nombre: "Decreto Único Reglamentario del Sector Minas y Energía (Decreto 1073 de 2015)",
      url: "#"
    }
  ];

  const acordeones = [
    {
      id: "contratos-calidad",
      titulo: "Contratos de calidad extra",
      contenido: "Información sobre contratos de calidad extra y sus regulaciones específicas."
    },
    {
      id: "resolucion-creg-080",
      titulo: "Resolución CREG 080",
      contenido: "Detalles sobre la Resolución CREG 080 y su aplicación en el sector energético."
    },
    {
      id: "mecanismos-cubrimiento",
      titulo: "Mecanismos de cubrimiento",
      contenido: "Información sobre los mecanismos de cubrimiento disponibles en el sector."
    },
    {
      id: "norma-tecnica",
      titulo: "Norma técnica",
      contenido: "Documentación técnica y estándares aplicables en el sector energético."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <nav className="flex space-x-2 text-sm text-gray-600">
                <a href="/" className="hover:text-blue-600">Inicio</a>
                <span>|</span>
                <span className="text-gray-900">Enlaces de Interés</span>
              </nav>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">
              Enlaces <span className="text-orange-500">de Interés</span>
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Gremios y Asociaciones */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Gremios y Asociaciones
            </h2>
            <div className="space-y-4">
              {gremiosAsociaciones.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {item.nombre}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Normativa */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Normativa
            </h2>
            <div className="space-y-4">
              {normativa.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <a 
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      {item.nombre}
                    </a>
                  </div>
                </div>
              ))}

              {/* Acordeones */}
              <div className="mt-6 space-y-2">
                {acordeones.map((acordeon) => (
                  <div key={acordeon.id} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleAcordeon(acordeon.id)}
                      className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <span className="text-blue-600 font-medium">{acordeon.titulo}</span>
                      {acordeonesAbiertos[acordeon.id] ? (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </button>
                    {acordeonesAbiertos[acordeon.id] && (
                      <div className="px-4 py-3 bg-white border-t border-gray-200">
                        <p className="text-gray-600 text-sm">
                          {acordeon.contenido}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Directorio de entidades - Ancho completo */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Directorio de entidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {directorioEntidades.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <a 
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {item.nombre}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}