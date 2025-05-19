'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, X } from 'lucide-react';

// Componentes de página
import Breadcrumb from '@/components/Breadcrumb';

export default function BusquedaPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({});

  // Cargar el índice de búsqueda
  useEffect(() => {
    async function loadSearchIndex() {
      setLoading(true);
      try {
        const response = await fetch('/search-index.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar el índice de búsqueda');
        }
        const data = await response.json();
        console.log(`Índice de búsqueda cargado con ${data.length} elementos`);
        setSearchIndex(data);
      } catch (error) {
        console.error('Error al cargar el índice de búsqueda:', error);
        // Aquí podrías cargar datos de respaldo si es necesario
      } finally {
        setLoading(false);
      }
    }
    
    loadSearchIndex();
  }, []);

  // Realizar búsqueda cuando cambia el término o cuando se carga el índice
  useEffect(() => {
    if (query && searchIndex.length > 0) {
      performSearch(query);
    }
  }, [query, searchIndex]);

  // Función para realizar la búsqueda
  const performSearch = (term) => {
    if (!term.trim() || term.trim().length < 2 || searchIndex.length === 0) {
      setResults([]);
      setFilteredResults([]);
      return;
    }

    setLoading(true);
    
    // Simular un pequeño retraso para mejorar UX
    setTimeout(() => {
      const searchTermLower = term.toLowerCase();
      
      // Función de puntuación para resultados más relevantes
      const getScore = (item) => {
        let score = 0;
        
        // Título coincidente (mayor peso)
        if (item.title.toLowerCase().includes(searchTermLower)) {
          score += 10;
          // Título comienza con el término (aún mayor peso)
          if (item.title.toLowerCase().startsWith(searchTermLower)) {
            score += 5;
          }
        }
        
        // Descripción coincidente
        if (item.description && item.description.toLowerCase().includes(searchTermLower)) {
          score += 5;
        }
        
        // Contenido coincidente
        if (item.content && item.content.toLowerCase().includes(searchTermLower)) {
          score += 2;
        }
        
        // Tipo coincidente
        if (item.type && item.type.toLowerCase().includes(searchTermLower)) {
          score += 3;
        }
        
        // URL coincidente (menor peso)
        if (item.url.toLowerCase().includes(searchTermLower)) {
          score += 1;
        }
        
        return score;
      };
      
      // Filtrar y ordenar resultados
      const searchResults = searchIndex
        .filter(item => {
          return (
            item.title.toLowerCase().includes(searchTermLower) ||
            (item.description && item.description.toLowerCase().includes(searchTermLower)) ||
            (item.content && item.content.toLowerCase().includes(searchTermLower)) ||
            (item.type && item.type.toLowerCase().includes(searchTermLower)) ||
            item.url.toLowerCase().includes(searchTermLower)
          );
        })
        .map(item => ({ ...item, score: getScore(item) }))
        .sort((a, b) => b.score - a.score);
      
      console.log(`Término de búsqueda: "${searchTermLower}" - ${searchResults.length} resultados`);
      
      // Configurar filtros disponibles
      const filters = {};
      searchResults.forEach(item => {
        if (item.type) {
          filters[item.type] = (filters[item.type] || 0) + 1;
        }
      });
      
      setResults(searchResults);
      setFilteredResults(searchResults);
      setAvailableFilters(filters);
      setLoading(false);
    }, 300);
  };

  // Función para manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch(searchTerm);
    
    // Actualizar URL con el nuevo término de búsqueda
    const url = new URL(window.location);
    url.searchParams.set('q', searchTerm);
    window.history.pushState({}, '', url);
  };

  // Función para aplicar filtros
  const toggleFilter = (filter) => {
    let newFilters;
    
    if (activeFilters.includes(filter)) {
      newFilters = activeFilters.filter(f => f !== filter);
    } else {
      newFilters = [...activeFilters, filter];
    }
    
    setActiveFilters(newFilters);
    
    // Aplicar filtros a los resultados
    if (newFilters.length === 0) {
      setFilteredResults(results);
    } else {
      setFilteredResults(results.filter(item => newFilters.includes(item.type)));
    }
  };

  // Función para limpiar filtros
  const clearFilters = () => {
    setActiveFilters([]);
    setFilteredResults(results);
  };

  // Traducir tipos a español
  const getTypeLabel = (type) => {
    const types = {
      'tarifa': 'Tarifa',
      'facturacion': 'Facturación',
      'pago': 'Pagos',
      'servicio': 'Servicio',
      'tramite': 'Trámite',
      'proveedor': 'Proveedores',
      'contacto': 'Contacto',
      'pagina': 'Página',
      'institucional': 'Institucional',
      'transparencia': 'Transparencia',
      'suspension': 'Suspensión',
      'atencion': 'Atención'
    };
    
    return types[type] || 'Página';
  };

  // Función para resaltar el término de búsqueda en el texto
  const highlightSearchTerm = (text, term) => {
    if (!text || !term.trim()) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark style="background-color: #e9f7fe; font-weight: 500; padding: 0 2px;">$1</mark>');
  };

  // Función para extraer fragmento relevante del contenido
  const getContentSnippet = (content, term) => {
    if (!content || !term.trim()) return '';
    
    const termLower = term.toLowerCase();
    const contentLower = content.toLowerCase();
    const index = contentLower.indexOf(termLower);
    
    if (index === -1) return content.slice(0, 150) + '...';
    
    const start = Math.max(0, index - 75);
    const end = Math.min(content.length, index + term.length + 75);
    let snippet = content.slice(start, end);
    
    if (start > 0) snippet = '... ' + snippet;
    if (end < content.length) snippet = snippet + ' ...';
    
    return snippet;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Inicio', url: '/' },
          { label: 'Búsqueda', url: '/busqueda' }
        ]}
      />
      
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Resultados de búsqueda</h1>
      
      {/* Formulario de búsqueda */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search color="#0098d9" size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en ElectroHuila..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Buscar en el sitio"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors"
          >
            Buscar
          </button>
        </form>
      </div>
      
      {/* Contenido principal */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar con filtros */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <X size={16} className="mr-1" /> Limpiar
                </button>
              )}
            </div>
            
            {Object.keys(availableFilters).length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-2">Tipo de contenido:</p>
                {Object.entries(availableFilters)
                  .sort((a, b) => b[1] - a[1])
                  .map(([type, count]) => (
                    <div key={type} className="flex items-center">
                      <button
                        onClick={() => toggleFilter(type)}
                        className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${
                          activeFilters.includes(type)
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <span className="flex-grow text-left">{getTypeLabel(type)}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                          {count}
                        </span>
                      </button>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No hay filtros disponibles</p>
            )}
          </div>
        </div>
        
        {/* Resultados de búsqueda */}
        <div className="flex-grow">
          {loading ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Buscando resultados...</p>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="space-y-4">
              <p className="text-gray-600 mb-6">
                {filteredResults.length} resultados {activeFilters.length > 0 ? 'filtrados ' : ''}
                para "{query}"
              </p>
              
              {filteredResults.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <Link href={item.url} className="block">
                    <h2 className="text-xl font-semibold text-blue-600 mb-2 hover:underline" 
                        dangerouslySetInnerHTML={{ __html: highlightSearchTerm(item.title, query) }}>
                    </h2>
                    
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="inline-block px-2 py-1 bg-gray-100 rounded-full mr-2 text-gray-600">
                        {getTypeLabel(item.type)}
                      </span>
                      <span className="truncate max-w-sm">
                        {item.url}
                      </span>
                    </div>
                    
                    {item.description && (
                      <p className="text-gray-700 mb-3" 
                         dangerouslySetInnerHTML={{ __html: highlightSearchTerm(item.description, query) }}>
                      </p>
                    )}
                    
                    {item.content && (
                      <p className="text-sm text-gray-600" 
                         dangerouslySetInnerHTML={{ __html: highlightSearchTerm(getContentSnippet(item.content, query), query) }}>
                      </p>
                    )}
                  </Link>
                </div>
              ))}
              
              {/* Paginación (si es necesaria) */}
              {filteredResults.length > 20 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                      Anterior
                    </button>
                    <button className="px-3 py-1 rounded bg-blue-100 border border-blue-300 text-blue-600 font-medium">
                      1
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                      2
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                      3
                    </button>
                    <button className="px-3 py-1 rounded border border-gray-300 text-gray-500 hover:bg-gray-50">
                      Siguiente
                    </button>
                  </nav>
                </div>
              )}
            </div>
          ) : query ? (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <div className="text-gray-400 mb-4">
                <Search size={48} strokeWidth={1} className="mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
              <p className="text-gray-600 mb-6">
                No encontramos coincidencias para "{query}"
              </p>
              <div className="text-sm text-gray-600 max-w-md mx-auto">
                <p className="font-medium mb-2">Sugerencias:</p>
                <ul className="list-disc text-left pl-5 space-y-1">
                  <li>Revisa si hay errores de ortografía</li>
                  <li>Intenta usar palabras más generales</li>
                  <li>Prueba con sinónimos</li>
                  <li>Usa menos palabras en tu búsqueda</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
              <p className="text-gray-600">
                Ingresa un término de búsqueda para ver resultados
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}