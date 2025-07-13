// /app/tarifas/[year]/page.js
'use client';

import { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

// Generar páginas estáticas para todos los años
export function generateStaticParams() {
  const years = [
    '2025', '2024', '2023', '2022', '2021', '2020', 
    '2019', '2018', '2017', '2016', '2015', '2014', 
    '2013', '2012', '2011', '2010', '2009', '2008'
  ];
  
  return years.map((year) => ({ year }));
}

export default function TarifaYearPage({ params }) {
  const [tarifas, setTarifas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { year } = params;

  useEffect(() => {
    const fetchTarifas = async () => {
      try {
        setLoading(true);
        
        // Intentar primero la API de WordPress
        const wpResponse = await fetch(`https://www.electrohuila.com.co/wp-json/electrohuila/v1/tarifas/${year}`);
        
        if (wpResponse.ok) {
          const wpData = await wpResponse.json();
          if (wpData.success && wpData.tarifas) {
            setTarifas(wpData.tarifas);
            setLoading(false);
            return;
          }
        }
        
        // Si WordPress falla, usar API local
        const localResponse = await fetch(`/api/tarifas?year=${year}`);
        const localData = await localResponse.json();
        
        if (localData.success && localData.tarifas[year]) {
          setTarifas(localData.tarifas[year]);
        } else {
          setTarifas({});
        }
        
      } catch (err) {
        console.error('Error fetching tarifas:', err);
        setError('Error al cargar las tarifas');
        // Fallback a datos vacíos
        setTarifas({});
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchTarifas();
    }
  }, [year]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando tarifas {year}...</p>
        </div>
      </div>
    );
  }

  const mesesOrdenados = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const tarifasDisponibles = mesesOrdenados.filter(mes => tarifas[mes] && tarifas[mes].length > 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tarifas {year}
            </h1>
            <p className="text-gray-600">
              Consulta las tarifas de ElectroHuila para el año {year}
            </p>
          </div>

          {/* Navegación de años */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Otros años disponibles:</h2>
            <div className="flex flex-wrap gap-2">
              {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008'].map(y => (
                <a
                  key={y}
                  href={`/tarifas/${y}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    y === year 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {y}
                </a>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {/* Tarifas */}
          {tarifasDisponibles.length > 0 ? (
            <div className="space-y-6">
              {tarifasDisponibles.map(mes => (
                <div key={mes} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <h3 className="text-xl font-semibold text-white capitalize">
                      {mes} {year}
                    </h3>
                  </div>
                  
                  <div className="p-6">
                    <div className="grid gap-4">
                      {tarifas[mes].map((tarifa, index) => (
                        <div 
                          key={tarifa.id || index} 
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {tarifa.nombre || `Tarifa ${mes} ${year}`}
                              </h4>
                              
                              <div className="space-y-1 text-sm text-gray-600">
                                {tarifa.vigencia && (
                                  <p><span className="font-medium">Vigencia:</span> {tarifa.vigencia}</p>
                                )}
                                {tarifa.resolucion && (
                                  <p><span className="font-medium">Resolución:</span> {tarifa.resolucion}</p>
                                )}
                                {tarifa.tamaño && (
                                  <p><span className="font-medium">Tamaño:</span> {tarifa.tamaño}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex-shrink-0">
                              {tarifa.url ? (
                                <a
                                  href={tarifa.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  Descargar PDF
                                </a>
                              ) : (
                                <span className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-500 rounded-lg">
                                  PDF no disponible
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay tarifas disponibles
              </h3>
              <p className="text-gray-600">
                No se encontraron tarifas para el año {year}
              </p>
            </div>
          )}
          
          {/* Botón volver */}
          <div className="mt-8 text-center">
            <a
              href="/tarifas"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver a todas las tarifas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}