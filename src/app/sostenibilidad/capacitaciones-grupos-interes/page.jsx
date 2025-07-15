'use client';

import { useState } from 'react';

export default function CapacitacionesGruposInteres() {
  const temas = [
    'Riesgo eléctrico',
    'Uso eficiente de energía', 
    'Medio ambiente',
    'Ética y cumplimiento'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <a href="/" className="text-orange-500 hover:text-orange-600">Inicio</a>
            <span>/</span>
            <a href="/institucional/gestion-y-programas-de-sostenibilidad" className="text-orange-500 hover:text-orange-600">Sostenibilidad</a>
            <span>/</span>
            <span className="text-gray-900">Capacitaciones Grupos de Interés</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Sostenibilidad</h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Imagen */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Círculo verde decorativo */}
              <div className="absolute -inset-4 bg-green-400 rounded-full opacity-20"></div>
              <div className="absolute -inset-2 border-4 border-green-400 rounded-full"></div>
              
              {/* Imagen principal */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/images/capacitaciones-estudiantes.jpg"
                  alt="Estudiantes en capacitación"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback content */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                  📚
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Capacitaciones Grupos de Interés
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Electrohuila capacita a estudiantes del Colegio Normal Superior de la Ciudad de 
              Neiva en:
            </p>

            {/* Lista de temas */}
            <ul className="space-y-4">
              {temas.map((tema, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-lg text-gray-700">{tema}</span>
                </li>
              ))}
            </ul>


          </div>
        </div>

        {/* Sección adicional de información */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {temas.map((tema, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tema}</h3>
              <p className="text-sm text-gray-600">
                Capacitación especializada en {tema.toLowerCase()} para estudiantes y grupos de interés.
              </p>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestro Compromiso con la Educación
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              En Electrohuila estamos comprometidos con la formación de las nuevas generaciones. 
              Nuestras capacitaciones buscan crear conciencia sobre el uso responsable de la energía, 
              la seguridad eléctrica y el cuidado del medio ambiente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm">
                🎓 Formación Educativa
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm">
                ⚡ Seguridad Eléctrica
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm">
                🌱 Sostenibilidad
              </span>
              <span className="px-4 py-2 bg-white text-gray-700 rounded-full shadow-sm">
                🤝 Responsabilidad Social
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}