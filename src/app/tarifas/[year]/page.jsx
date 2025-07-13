'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TarifasYearPage({ params }) {
  const year = params?.year || '2025';
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewingFile, setViewingFile] = useState(null);

  // Categorías por año
  const getCategoryId = (year) => {
    const yearNum = parseInt(year);
    if (yearNum >= 2024) return 109; // Tarifas recientes
    if (yearNum >= 2020) return 124; // Tarifas anteriores
    return 119; // Tarifas históricas
  };

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const categoryId = getCategoryId(year);
        
        // Llamar a la nueva API personalizada
        const response = await fetch(
          `https://www.electrohuila.com.co/wp-json/electrohuila/v2/files/${categoryId}/${year}`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        if (data.success && data.files) {
          console.log(`✅ Archivos cargados para ${year}:`, data.files);
          setArchivos(data.files);
        } else {
          // Fallback si no hay archivos reales
          console.log('⚠️ No hay archivos reales, usando datos de ejemplo');
          setArchivos(generateFallbackFiles(year));
        }
        
      } catch (error) {
        console.error('❌ Error cargando archivos:', error);
        setError(error.message);
        // Usar datos de ejemplo como fallback
        setArchivos(generateFallbackFiles(year));
      } finally {
        setLoading(false);
      }
    };

    fetchArchivos();
  }, [year]);

  const generateFallbackFiles = (year) => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return meses.map((mes, index) => ({
      id: `fallback-${index + 1}`,
      title: `Tarifas ${mes} ${year}`,
      filename: `tarifas-${mes.toLowerCase()}-${year}.pdf`,
      size: '850 KB',
      size_bytes: 870400,
      hits: Math.floor(Math.random() * 500) + 100,
      created: `${year}-${String(index + 1).padStart(2, '0')}-01`,
      extension: 'pdf',
      category_id: getCategoryId(year),
      exists: false,
      download_url: `#fallback-${mes}`,
      direct_url: `#fallback-${mes}`,
      is_fallback: true
    }));
  };

  const handleVer = async (archivo) => {
    if (archivo.is_fallback) {
      alert('Este es un archivo de ejemplo. Configure la API de WordPress para ver archivos reales.');
      return;
    }

    try {
      console.log('🔍 Cargando archivo para vista:', archivo.download_url);
      
      // Crear URL de vista previa usando la API personalizada
      const viewUrl = archivo.download_url;
      
      setViewingFile({
        ...archivo,
        viewUrl: viewUrl
      });
      
    } catch (error) {
      console.error('❌ Error cargando vista previa:', error);
      alert('Error al cargar el archivo para vista previa');
    }
  };

  const handleDescargar = async (archivo) => {
    if (archivo.is_fallback) {
      alert('Este es un archivo de ejemplo. Configure la API de WordPress para descargar archivos reales.');
      return;
    }

    try {
      console.log('📥 Descargando archivo:', archivo.download_url);
      
      // Abrir en nueva ventana para descarga
      window.open(archivo.download_url, '_blank');
      
    } catch (error) {
      console.error('❌ Error en descarga:', error);
      alert('Error al descargar el archivo');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Conectando con WordPress para {year}...</p>
            <p className="text-sm text-gray-500 mt-2">Obteniendo archivos reales desde el servidor</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">|</span>
          <Link href="/tarifas" className="hover:text-blue-600">Tarifas</Link>
          <span className="mx-2">|</span>
          <span>{year}</span>
        </nav>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{year}</h1>
          
          {/* Indicador de fuente de datos */}
          <div className="text-sm text-gray-500">
            {archivos.length > 0 && archivos[0].is_fallback ? (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                📝 Datos de ejemplo
              </span>
            ) : (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                ✅ Datos desde WordPress
              </span>
            )}
          </div>
          
          {/* Navegación entre años */}
          <div className="flex gap-2">
            {parseInt(year) > 2008 && (
              <Link 
                href={`/tarifas/${parseInt(year) - 1}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                ← {parseInt(year) - 1}
              </Link>
            )}
            {parseInt(year) < 2025 && (
              <Link 
                href={`/tarifas/${parseInt(year) + 1}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {parseInt(year) + 1} →
              </Link>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800">
              ⚠️ Problema de conexión: {error}
            </p>
            <p className="text-sm text-yellow-600 mt-1">
              Mostrando datos de ejemplo. Verifique la configuración de WordPress.
            </p>
          </div>
        )}
      </div>

      {/* Lista de archivos */}
      <div className="grid gap-4 md:grid-cols-2">
        {archivos.map((archivo) => (
          <div key={archivo.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icono PDF */}
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  archivo.extension === 'pdf' ? 'bg-red-100' : 'bg-orange-100'
                }`}>
                  <svg className={`w-6 h-6 ${
                    archivo.extension === 'pdf' ? 'text-red-600' : 'text-orange-600'
                  }`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Información del archivo */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{archivo.title}</h3>
                <div className="text-sm text-gray-500 mb-2">
                  <span>{archivo.size}</span>
                  <span className="mx-2">•</span>
                  <span>{archivo.hits} descargas</span>
                  {archivo.is_fallback && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-yellow-600">Ejemplo</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVer(archivo)}
                    className={`px-3 py-1 text-white text-sm rounded transition-colors ${
                      archivo.is_fallback 
                        ? 'bg-gray-400 hover:bg-gray-500' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    👁️ Ver {archivo.extension.toUpperCase()}
                  </button>
                  <button
                    onClick={() => handleDescargar(archivo)}
                    className={`px-3 py-1 text-white text-sm rounded transition-colors ${
                      archivo.is_fallback 
                        ? 'bg-gray-400 hover:bg-gray-500' 
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    📥 Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver archivo */}
      {viewingFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{viewingFile.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDescargar(viewingFile)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  📥 Descargar
                </button>
                <button
                  onClick={() => setViewingFile(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl px-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={viewingFile.viewUrl}
                className="w-full h-full border rounded"
                title={viewingFile.title}
              />
            </div>
          </div>
        </div>
      )}

      {archivos.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hay archivos disponibles</h3>
            <p>No se encontraron tarifas para el año {year}</p>
          </div>
        </div>
      )}
    </div>
  );
}