'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UltimateSearchBar() {
  // Estados principales
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  // Referencias
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const router = useRouter();
  
  // Cargar el índice de búsqueda y búsquedas recientes al inicio
  useEffect(() => {
    // Cargar búsquedas recientes desde localStorage
    try {
      const savedSearches = localStorage.getItem('recent-searches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
      }
    } catch (error) {
      console.error('Error al cargar búsquedas recientes:', error);
    }

    // Cargar el índice de búsqueda
    loadSearchIndex();
  }, []);
  
  // Función para cargar el índice de búsqueda
  const loadSearchIndex = async () => {
    try {
      // Intentar cargar desde localStorage primero
      const cachedIndex = localStorage.getItem('search-index');
      const cachedTimestamp = localStorage.getItem('search-index-timestamp');
      
      if (cachedIndex && cachedTimestamp && 
          (Date.now() - parseInt(cachedTimestamp)) < 86400000) { // Caché válido por 24 horas
        console.log('Usando índice de búsqueda desde caché');
        setSearchIndex(JSON.parse(cachedIndex));
        return;
      }
      
      // Si no hay caché o está caducado, cargar desde el servidor
      setLoading(true);
      const response = await fetch('/search-index.json');
      if (!response.ok) {
        throw new Error('No se pudo cargar el índice de búsqueda');
      }
      
      const data = await response.json();
      console.log(`Índice de búsqueda cargado con ${data.length} elementos`);
      
      // Guardar en localStorage para futuros usos
      localStorage.setItem('search-index', JSON.stringify(data));
      localStorage.setItem('search-index-timestamp', Date.now().toString());
      
      setSearchIndex(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el índice de búsqueda:', error);
      // Cargar datos de respaldo
      setSearchIndex(fallbackSearchData);
      setLoading(false);
    }
  };
  
  // Cerrar resultados cuando se hace clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        setExpanded(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Manejar navegación con teclado
  useEffect(() => {
    function handleKeyDown(event) {
      if (!showResults) return;
      
      // Desplazarse por los resultados con las flechas
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (results.length > 0) {
          setSelectedResultIndex(prevIndex => 
            prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
          );
          
          // Desplazar a la vista si es necesario
          if (resultsRef.current && resultsRef.current.children[selectedResultIndex + 1]) {
            resultsRef.current.children[selectedResultIndex + 1].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }
        }
      }
      else if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (results.length > 0) {
          setSelectedResultIndex(prevIndex => 
            prevIndex > 0 ? prevIndex - 1 : 0
          );
          
          // Desplazar a la vista si es necesario
          if (resultsRef.current && resultsRef.current.children[selectedResultIndex - 1]) {
            resultsRef.current.children[selectedResultIndex - 1].scrollIntoView({
              behavior: 'smooth',
              block: 'nearest'
            });
          }
        }
      }
      else if (event.key === 'Enter') {
        // Navegar al resultado seleccionado o realizar búsqueda
        if (selectedResultIndex >= 0 && selectedResultIndex < results.length) {
          event.preventDefault();
          navigateToResult(results[selectedResultIndex].url);
        }
      }
      else if (event.key === 'Escape') {
        // Cerrar resultados
        event.preventDefault();
        setShowResults(false);
        setExpanded(false);
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showResults, results, selectedResultIndex]);
  
  // Restablecer el índice seleccionado cuando cambian los resultados
  useEffect(() => {
    setSelectedResultIndex(-1);
  }, [results]);
  
  // Realizar búsqueda mientras se escribe
  useEffect(() => {
    if (searchTerm.trim().length >= 2 && searchIndex.length > 0) {
      setLoading(true);
      
      // Generar sugerencias basadas en lo que el usuario está escribiendo
      const suggestions = generateSearchSuggestions(searchTerm.trim(), searchIndex);
      setSearchSuggestions(suggestions.slice(0, 3)); // Mostrar máximo 3 sugerencias
      
      // Buscar resultados después de una breve pausa para evitar demasiadas búsquedas mientras se escribe
      const timer = setTimeout(() => {
        const searchResults = performSearch(searchTerm);
        setResults(searchResults);
        setShowResults(true);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setSearchSuggestions([]);
      if (searchTerm.trim().length === 0) {
        setShowResults(false);
      }
    }
  }, [searchTerm, searchIndex]);
  
  // Función para generar sugerencias mientras el usuario escribe
  const generateSearchSuggestions = (term, index) => {
    if (term.length < 2) return [];
    
    const termLower = term.toLowerCase();
    
    // Buscar coincidencias en títulos para sugerencias
    const titleMatches = index
      .filter(item => item.title.toLowerCase().includes(termLower))
      .map(item => item.title)
      .slice(0, 10);
    
    // Eliminar duplicados y limitar a 5 sugerencias
    return [...new Set(titleMatches)];
  };
  
  // Función para realizar la búsqueda
  const performSearch = (term) => {
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
    return searchIndex
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
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // Limitar a 8 resultados para la vista rápida
  };
  
  // Activar el buscador y expandirlo
  const activateSearch = () => {
    setExpanded(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    if (searchTerm.trim().length >= 2) {
      setShowResults(true);
    }
  };
  
  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Manejar búsqueda completa
  const handleSearch = (term = searchTerm) => {
    if (term.trim().length >= 2) {
      // Guardar en búsquedas recientes
      const updatedSearches = [
        term,
        ...recentSearches.filter(search => search !== term)
      ].slice(0, 5);
      
      setRecentSearches(updatedSearches);
      try {
        localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
      } catch (error) {
        console.error('Error al guardar búsquedas recientes:', error);
      }
      
      // Navegar a la página de resultados
      navigateToResults(term);
    }
  };
  
  // Navegar a la página de resultados
  const navigateToResults = (term) => {
    router.push(`/busqueda?q=${encodeURIComponent(term)}`);
    setShowResults(false);
    setExpanded(false);
  };
  
  // Navegar a un resultado específico
  const navigateToResult = (url) => {
    router.push(url);
    setShowResults(false);
    setExpanded(false);
  };
  
  // Usar una sugerencia
  const useSuggestion = (suggestion) => {
    setSearchTerm(suggestion);
    handleSearch(suggestion);
  };
  
  // Usar una búsqueda reciente
  const useRecentSearch = (search) => {
    setSearchTerm(search);
    handleSearch(search);
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
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
  
  // Obtener icono para cada tipo
  const getTypeIcon = (type) => {
    switch(type) {
      case 'pago':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'facturacion':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      case 'tramite':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        );
      case 'tarifa':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };
  
  // Resaltar término de búsqueda
  const highlightSearchTerm = (text, term) => {
    if (!text || !term.trim()) return text;
    
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-100 px-1 rounded-sm">$1</mark>');
  };
  
  // Obtener la primera letra para iniciales
  const getInitials = (text) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase();
  };
  
  // Renderizar componente
  return (
    <div className="relative z-50" ref={searchRef}>
      {/* Botón de búsqueda (visible cuando no está expandido) */}
      {!expanded ? (
        <button 
          onClick={activateSearch}
          className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none p-2"
          aria-label="Buscar en ElectroHuila"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <span className="hidden md:inline-block ml-2">Buscar</span>
        </button>
      ) : (
        <div className="relative flex items-center">
          {/* Campo de búsqueda expandido */}
          <form onSubmit={handleSubmit} className="flex-grow">
            <div className="relative flex w-full md:w-96 items-center">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar en ElectroHuila..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 rounded-full border border-gray-300 shadow-sm
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            text-base transition-all duration-200"
                  aria-label="Buscar en el sitio"
                />
                
                {/* Botón de limpiar (aparece cuando hay texto) */}
                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    aria-label="Limpiar búsqueda"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Botón de cerrar búsqueda expandida */}
              <button
                type="button"
                onClick={() => {
                  setExpanded(false);
                  setShowResults(false);
                }}
                className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                aria-label="Cerrar búsqueda"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              
              {/* Botón de buscar */}
              <button
                type="submit"
                className="ml-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                         transition-colors duration-200 flex items-center justify-center"
                aria-label="Realizar búsqueda"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Panel de resultados */}
      {(showResults || (expanded && !searchTerm)) && (
        <div className="absolute right-0 mt-2 w-full md:w-96 bg-white rounded-lg shadow-lg border border-gray-200 
                      overflow-hidden max-h-[80vh] overflow-y-auto z-50">
          {/* Estados de carga y contenido */}
          {loading ? (
            <div className="p-6 text-center">
              <div className="inline-block w-8 h-8 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">Buscando...</p>
            </div>
          ) : searchTerm.length >= 2 ? (
            results.length > 0 ? (
              // Resultados encontrados
              <div>
                {/* Sugerencias (si hay) */}
                {searchSuggestions.length > 0 && (
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <p className="text-xs font-medium text-gray-500 mb-2">SUGERENCIAS:</p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => useSuggestion(suggestion)}
                          className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700
                                   text-sm hover:bg-blue-100 transition-colors whitespace-nowrap"
                        >
                          <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                          </svg>
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Contador de resultados */}
                <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                  <p className="text-xs text-gray-500">
                    {results.length} resultados para "{searchTerm}"
                  </p>
                </div>
                
                {/* Lista de resultados */}
                <div className="divide-y divide-gray-100" ref={resultsRef}>
                  {results.map((result, index) => (
                    <Link
                      key={result.id || index}
                      href={result.url}
                      className={`block px-4 py-3 hover:bg-blue-50 transition-colors ${
                        index === selectedResultIndex ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => navigateToResult(result.url)}
                      onMouseOver={() => setSelectedResultIndex(index)}
                    >
                      <div className="flex items-start">
                        {/* Avatar o icono */}
                        <div className="flex-shrink-0 mr-3">
                          <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-white
                            ${result.type === 'pago' ? 'bg-green-500' : 
                              result.type === 'facturacion' ? 'bg-blue-500' : 
                              result.type === 'tramite' ? 'bg-purple-500' : 
                              result.type === 'tarifa' ? 'bg-yellow-500' : 'bg-gray-500'}
                          `}>
                            {getTypeIcon(result.type)}
                          </div>
                        </div>
                        
                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <h4
                            className="text-base font-medium text-gray-900 truncate"
                            dangerouslySetInnerHTML={{
                              __html: highlightSearchTerm(result.title, searchTerm)
                            }}
                          ></h4>
                          
                          {result.description && (
                            <p
                              className="mt-1 text-sm text-gray-600 line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: highlightSearchTerm(result.description, searchTerm)
                              }}
                            ></p>
                          )}
                          
                          <div className="mt-1 flex items-center">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {getTypeLabel(result.type)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Botón para ver todos los resultados */}
                <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                  <button
                    onClick={() => navigateToResults(searchTerm)}
                    className="w-full py-2 px-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 
                             transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    Ver todos los resultados
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // Sin resultados
              <div className="p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                  </path>
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron resultados</h3>
                <p className="mt-1 text-sm text-gray-500">
                  No hay coincidencias para "{searchTerm}"
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={() => navigateToResults(searchTerm)}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md
                             shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Ver resultados avanzados
                  </button>
                </div>
              </div>
            )
          ) : (
            // Caso cuando no hay término de búsqueda pero está expandido
            <div>
              {/* Título */}
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-700">
                  Buscar en ElectroHuila
                </p>
              </div>
              
              {/* Búsquedas recientes */}
              {recentSearches.length > 0 && (
                <div className="px-4 py-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Búsquedas recientes
                  </h3>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => useRecentSearch(search)}
                        className="flex items-center w-full px-2 py-1.5 text-left text-sm text-gray-700
                                 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <svg className="mr-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Enlaces rápidos */}
              <div className="px-4 py-3 border-t border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Enlaces populares
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {popularLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100
                               rounded-md transition-colors"
                      onClick={() => {
                        setExpanded(false);
                        setShowResults(false);
                      }}
                    >
                      <div className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-white mr-3
                        ${link.type === 'pago' ? 'bg-green-500' : 
                          link.type === 'facturacion' ? 'bg-blue-500' : 
                          link.type === 'tramite' ? 'bg-purple-500' : 
                          link.type === 'tarifa' ? 'bg-yellow-500' : 'bg-gray-500'}
                      `}>
                        {getTypeIcon(link.type)}
                      </div>
                      <span className="truncate">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Ayuda */}
              <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                <div className="text-xs text-gray-500">
                  <p>Escribe para buscar o usa las flechas ↑↓ para navegar</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Enlaces populares predefinidos
const popularLinks = [
  {
    title: 'Pago de Facturas',
    url: '/pago',
    type: 'pago'
  },
  {
    title: 'Puntos de Pago',
    url: '/puntos-de-pago',
    type: 'pago'
  },
  {
    title: 'Tarifas Actuales',
    url: '/tarifas',
    type: 'tarifa'
  },
  {
    title: 'Consultar Factura',
    url: '/conoce-tu-factura',
    type: 'facturacion'
  },
  {
    title: 'Trámites',
    url: '/tramites',
    type: 'tramite'
  },
  {
    title: 'Contacto',
    url: '/contactenos',
    type: 'contacto'
  }
];

// Datos de respaldo en caso de que no se pueda cargar el índice
const fallbackSearchData = [
  {
    id: 'puntos-pago',
    title: 'Puntos de Pago',
    description: 'Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía.',
    url: '/puntos-de-pago',
    type: 'pago'
  },
  {
    id: 'pago-facturas',
    title: 'Pago de Facturas',
    description: 'Paga tu factura de energía de forma rápida y segura por diferentes medios.',
    url: '/pago',
    type: 'pago'
  },
  {
    id: 'tramites',
    title: 'Trámites Usuarios',
    description: 'Información sobre trámites para usuarios de ElectroHuila.',
    url: '/tramites',
    type: 'tramite'
  },
  {
    id: 'factura',
    title: 'Factura de venta',
    description: 'Información sobre tu factura de energía eléctrica.',
    url: '/conoce-tu-factura',
    type: 'facturacion'
  },
  {
    id: 'tarifas',
    title: 'Tarifas',
    description: 'Información sobre tarifas de energía eléctrica actualizadas.',
    url: '/tarifas',
    type: 'tarifa'
  }
];