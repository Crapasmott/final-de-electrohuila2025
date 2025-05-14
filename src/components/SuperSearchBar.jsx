'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuperSearchBar() {
  // Estados principales
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [searchHistory, setSearchHistory] = useState([]);
  const [helpVisible, setHelpVisible] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});
  
  // Referencias
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const router = useRouter();

  // Cargar búsquedas recientes y el índice al montar el componente
  useEffect(() => {
    try {
      // Cargar búsquedas recientes
      const savedSearches = localStorage.getItem('recent-searches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches).slice(0, 5));
      }
      
      // Cargar historial de navegación del usuario
      const savedHistory = localStorage.getItem('search-history');
      if (savedHistory) {
        setSearchHistory(JSON.parse(savedHistory).slice(0, 3));
      }
    } catch (error) {
      console.error('Error al cargar datos guardados:', error);
    }
    
    // Cargar el índice de búsqueda
    loadSearchIndex();
  }, []);
  
  // Función para cargar el índice de búsqueda
  const loadSearchIndex = async () => {
    try {
      // Intentar cargar desde localStorage
      const cachedIndex = localStorage.getItem('search-index');
      const cachedTimestamp = localStorage.getItem('search-index-timestamp');
      
      if (cachedIndex && cachedTimestamp && 
          (Date.now() - parseInt(cachedTimestamp)) < 86400000) { // 24 horas
        console.log('Usando índice de búsqueda desde caché');
        const parsedIndex = JSON.parse(cachedIndex);
        setSearchIndex(parsedIndex);
        
        // Calcular conteo de categorías
        calculateCategoryCounts(parsedIndex);
        return;
      }
      
      // Si no hay caché válido, cargar del servidor
      setLoading(true);
      const response = await fetch('/search-index.json');
      
      if (!response.ok) {
        throw new Error('Error al cargar el índice de búsqueda');
      }
      
      const data = await response.json();
      console.log(`Índice de búsqueda cargado con ${data.length} elementos`);
      
      // Guardar en localStorage
      localStorage.setItem('search-index', JSON.stringify(data));
      localStorage.setItem('search-index-timestamp', Date.now().toString());
      
      setSearchIndex(data);
      
      // Calcular conteo de categorías
      calculateCategoryCounts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el índice de búsqueda:', error);
      // Usar datos de respaldo
      setSearchIndex(fallbackSearchData);
      calculateCategoryCounts(fallbackSearchData);
      setLoading(false);
    }
  };
  
  // Calcular cuántos items hay por categoría
  const calculateCategoryCounts = (data) => {
    const counts = { todos: data.length };
    
    data.forEach(item => {
      if (item.type) {
        counts[item.type] = (counts[item.type] || 0) + 1;
      }
    });
    
    setCategoryCounts(counts);
  };
  
  // Cerrar resultados al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
        if (!isExpanded) {
          setHelpVisible(false);
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);
  
  // Manejar navegación por teclado
  useEffect(() => {
    function handleKeyDown(event) {
      if (!showResults) return;
      
      switch(event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedResult(prev => {
            const newIndex = prev < results.length - 1 ? prev + 1 : prev;
            scrollToResult(newIndex);
            return newIndex;
          });
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          setSelectedResult(prev => {
            const newIndex = prev > 0 ? prev - 1 : 0;
            scrollToResult(newIndex);
            return newIndex;
          });
          break;
          
        case 'Enter':
          if (selectedResult >= 0 && selectedResult < results.length) {
            event.preventDefault();
            navigateToResult(results[selectedResult].url);
          } else if (searchTerm.trim().length >= 2) {
            handleSearch();
          }
          break;
          
        case 'Escape':
          event.preventDefault();
          setShowResults(false);
          setHelpVisible(false);
          break;
          
        case '/':
          // Atajo de teclado para enfocar la búsqueda
          if (!isExpanded && !event.ctrlKey && !event.metaKey && !event.altKey) {
            event.preventDefault();
            activateSearch();
          }
          break;
          
        case '?':
          // Atajo para mostrar ayuda
          if (event.shiftKey) {
            event.preventDefault();
            setHelpVisible(!helpVisible);
          }
          break;
          
        default:
          break;
      }
    }
    
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showResults, results, selectedResult, searchTerm, isExpanded, helpVisible]);
  
  // Desplazar al resultado seleccionado
  const scrollToResult = (index) => {
    if (resultsRef.current && resultsRef.current.children[index]) {
      resultsRef.current.children[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  };
  
  // Restablecer selección cuando cambian los resultados
  useEffect(() => {
    setSelectedResult(-1);
  }, [results]);
  
  // Realizar búsqueda cuando se escribe
  useEffect(() => {
    if (searchTerm.trim().length >= 2 && searchIndex.length > 0) {
      setLoading(true);
      
      // Usar un temporizador para no hacer búsquedas con cada tecla
      const timer = setTimeout(() => {
        performSearch(searchTerm);
        setShowResults(true);
        setLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      if (searchTerm.trim().length === 0) {
        setResults([]);
        setShowResults(isExpanded);
      } else if (searchTerm.trim().length < 2) {
        setResults([]);
      }
    }
  }, [searchTerm, searchIndex, activeCategory, isExpanded]);
  
  // Realizar búsqueda
  const performSearch = (term) => {
    const searchTermLower = term.toLowerCase().trim();
    
    // Función para puntuar resultados
    const scoreResult = (item) => {
      let score = 0;
      
      // Título coincidente (mayor peso)
      if (item.title.toLowerCase().includes(searchTermLower)) {
        score += 10;
        // Título comienza con el término (más peso aún)
        if (item.title.toLowerCase().startsWith(searchTermLower)) {
          score += 5;
        }
        // Título es exactamente el término (máximo peso)
        if (item.title.toLowerCase() === searchTermLower) {
          score += 10;
        }
      }
      
      // Descripción coincidente
      if (item.description && item.description.toLowerCase().includes(searchTermLower)) {
        score += 5;
        // Si la descripción comienza con el término
        if (item.description.toLowerCase().startsWith(searchTermLower)) {
          score += 2;
        }
      }
      
      // Contenido coincidente
      if (item.content && item.content.toLowerCase().includes(searchTermLower)) {
        score += 2;
      }
      
      // Tipo coincidente
      if (item.type && item.type.toLowerCase().includes(searchTermLower)) {
        score += 3;
      }
      
      // URL coincidente
      if (item.url.toLowerCase().includes(searchTermLower)) {
        score += 1;
      }
      
      // Bonus por término exacto
      const words = searchTermLower.split(/\s+/);
      if (words.length > 1) {
        words.forEach(word => {
          if (item.title.toLowerCase().includes(word)) {
            score += 1;
          }
        });
      }
      
      return score;
    };
    
    // Filtrar resultados
    let filtered = searchIndex.filter(item => {
      return (
        item.title.toLowerCase().includes(searchTermLower) ||
        (item.description && item.description.toLowerCase().includes(searchTermLower)) ||
        (item.content && item.content.toLowerCase().includes(searchTermLower)) ||
        (item.type && item.type.toLowerCase().includes(searchTermLower)) ||
        item.url.toLowerCase().includes(searchTermLower)
      );
    });
    
    // Aplicar filtro por categoría si no es "todos"
    if (activeCategory !== 'todos') {
      filtered = filtered.filter(item => item.type === activeCategory);
    }
    
    // Puntuar y ordenar resultados
    filtered = filtered
      .map(item => ({ ...item, score: scoreResult(item) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10); // Limitar a 10 resultados
    
    setResults(filtered);
  };
  
  // Activar la búsqueda
  const activateSearch = () => {
    setIsExpanded(true);
    setShowResults(true);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Desactivar la búsqueda
  const deactivateSearch = () => {
    setIsExpanded(false);
    setShowResults(false);
    setHelpVisible(false);
    setSearchTerm('');
  };
  
  // Limpiar término de búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setShowResults(true);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // Manejar la búsqueda (envío del formulario)
  const handleSearch = () => {
    if (searchTerm.trim().length >= 2) {
      // Guardar en búsquedas recientes
      saveRecentSearch(searchTerm);
      
      // Navegar a la página de resultados
      navigateToResults(searchTerm);
    }
  };
  
  // Guardar búsqueda reciente
  const saveRecentSearch = (term) => {
    const trimmedTerm = term.trim();
    const updatedSearches = [
      trimmedTerm,
      ...recentSearches.filter(search => search !== trimmedTerm)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    
    try {
      localStorage.setItem('recent-searches', JSON.stringify(updatedSearches));
    } catch (error) {
      console.error('Error al guardar búsquedas recientes:', error);
    }
  };
  
  // Guardar en historial de navegación
  const saveToHistory = (url, title) => {
    const newEntry = { url, title, timestamp: new Date().toISOString() };
    const updatedHistory = [
      newEntry,
      ...searchHistory.filter(item => item.url !== url)
    ].slice(0, 5);
    
    setSearchHistory(updatedHistory);
    
    try {
      localStorage.setItem('search-history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error al guardar historial:', error);
    }
  };
  
  // Navegar a la página de resultados
  const navigateToResults = (term) => {
    setShowResults(false);
    setHelpVisible(false);
    router.push(`/busqueda?q=${encodeURIComponent(term)}`);
  };
  
  // Navegar a un resultado específico
  const navigateToResult = (url, title = '') => {
    saveToHistory(url, title);
    setShowResults(false);
    setHelpVisible(false);
    router.push(url);
  };
  
  // Usar búsqueda reciente
  const useRecentSearch = (term) => {
    setSearchTerm(term);
    handleSearch();
  };
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };
  
  // Cambiar categoría activa
  const changeCategory = (category) => {
    setActiveCategory(category);
    if (searchTerm.trim().length >= 2) {
      performSearch(searchTerm);
    }
  };
  
  // Obtener etiqueta para tipo
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
  
  // Obtener color para tipo
  const getTypeColor = (type) => {
    const colors = {
      'tarifa': 'bg-yellow-100 text-yellow-800',
      'facturacion': 'bg-blue-100 text-blue-800',
      'pago': 'bg-green-100 text-green-800',
      'servicio': 'bg-indigo-100 text-indigo-800',
      'tramite': 'bg-purple-100 text-purple-800',
      'proveedor': 'bg-amber-100 text-amber-800',
      'contacto': 'bg-red-100 text-red-800',
      'institucional': 'bg-teal-100 text-teal-800',
      'transparencia': 'bg-cyan-100 text-cyan-800',
      'suspension': 'bg-orange-100 text-orange-800',
      'atencion': 'bg-rose-100 text-rose-800'
    };
    
    return colors[type] || 'bg-gray-100 text-gray-800';
  };
  
  // Resaltar término de búsqueda
  const highlightSearchTerm = (text, term) => {
    if (!text || !term.trim()) return text;
    
    const termParts = term.trim().toLowerCase().split(/\s+/);
    let result = text;
    
    termParts.forEach(part => {
      if (part.length < 2) return;
      
      const regex = new RegExp(`(${part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      result = result.replace(regex, '<mark class="bg-yellow-100 rounded-sm px-1">$1</mark>');
    });
    
    return result;
  };
  
  // Obtener icono para tipo
  const getTypeIcon = (type) => {
    switch(type) {
      case 'pago':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
      case 'facturacion':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        );
      case 'tramite':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        );
      case 'tarifa':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
          </svg>
        );
      case 'servicio':
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        );
    }
  };
  
  // Obtener icono para el botón de búsqueda
  const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  );
  
  // Obtener icono para cerrar
  const CloseIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  );
  
  // Obtener icono para ver más
  const ChevronRightIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
    </svg>
  );
  
  // Obtener icono para ayuda
  const HelpIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  );
  
  // Renderizar componente
  return (
    <div className="relative z-50" ref={searchRef}>
      {/* Botón de búsqueda (cuando no está expandido) */}
      {!isExpanded ? (
        <div className="flex items-center">
          <button
            onClick={activateSearch}
            className="flex items-center text-gray-600 hover:text-gray-800 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Buscar en ElectroHuila"
          >
            <SearchIcon />
            <span className="hidden md:inline-block ml-2 text-sm">Buscar</span>
            <span className="hidden md:inline-block ml-1 opacity-50 text-xs">(Presiona /)</span>
          </button>
          
          <button
            onClick={() => setHelpVisible(!helpVisible)}
            className="ml-1 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Ayuda de búsqueda"
          >
            <HelpIcon />
          </button>
        </div>
      ) : (
        <div className="flex items-center max-w-3xl">
          {/* Formulario de búsqueda expandido */}
          <form onSubmit={handleSubmit} className="flex-grow flex items-center">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                <SearchIcon />
              </div>
              
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar en ElectroHuila... (consultas, trámites, tarifas, etc.)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 bg-white
                         shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:border-transparent"
                aria-label="Buscar en el sitio"
              />
              
              {/* Botón para limpiar el campo */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-700"
                  aria-label="Limpiar búsqueda"
                >
                  <CloseIcon />
                </button>
              )}
            </div>
            
            {/* Botón de búsqueda */}
            <button
              type="submit"
              className="ml-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 
                      shadow-sm transition-colors duration-200 flex items-center justify-center"
              aria-label="Buscar"
            >
              <SearchIcon />
            </button>
            
            {/* Botón para cerrar la búsqueda */}
            <button
              type="button"
              onClick={deactivateSearch}
              className="ml-2 p-2.5 text-gray-500 hover:text-gray-700 border border-gray-300
                      rounded-xl hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="Cerrar búsqueda"
            >
              <CloseIcon />
            </button>
          </form>
        </div>
      )}
      
      {/* Panel de ayuda flotante */}
      {helpVisible && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
          <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
            <h3 className="font-medium text-gray-900">Ayuda de búsqueda</h3>
            <button
              onClick={() => setHelpVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <CloseIcon />
            </button>
          </div>
          
          <div className="space-y-3 text-sm">
            <p className="font-medium text-gray-700">Atajos de teclado:</p>
            <div className="flex justify-between">
              <span className="text-gray-600">Activar búsqueda</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">/</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Navegar resultados</span>
              <div>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">↑</kbd>
                <kbd className="ml-1 px-2 py-1 bg-gray-100 rounded text-xs">↓</kbd>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Seleccionar resultado</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cerrar resultados</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Mostrar/ocultar ayuda</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Shift + ?</kbd>
            </div>
            
            <p className="pt-2 text-gray-500 text-xs">
              Use comillas ("") para buscar términos exactos. <br />
              Ejemplo: "tarifas 2025"
            </p>
          </div>
        </div>
      )}
      
      {/* Panel de resultados de búsqueda */}
      {showResults && (
        <div className="absolute right-0 mt-2 w-full md:w-[32rem] bg-white rounded-lg shadow-xl border 
                       border-gray-200 overflow-hidden max-h-[80vh] overflow-y-auto z-40">
          {/* Panel superior con categorías */}
          {Object.keys(categoryCounts).length > 1 && searchTerm.trim().length >= 2 && (
            <div className="sticky top-0 bg-white border-b border-gray-100 px-2 py-2 flex items-center
                           overflow-x-auto whitespace-nowrap gap-1 scrollbar-hide z-10">
              {Object.entries(categoryCounts).map(([category, count]) => (
                category !== 'todos' ? (
                  <button
                    key={category}
                    onClick={() => changeCategory(category)}
                    className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors
                              ${activeCategory === category 
                                ? getTypeColor(category) 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {getTypeLabel(category)} ({count})
                  </button>
                ) : (
                  <button
                    key={category}
                    onClick={() => changeCategory('todos')}
                    className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-colors
                              ${activeCategory === 'todos' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    Todos ({count})
                  </button>
                )
              ))}
            </div>
          )}
          
          {/* Estados diferentes según el contexto */}
          {loading ? (
            // Estado de carga
            <div className="p-6 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">Buscando...</p>
            </div>
          ) : searchTerm.trim().length >= 2 ? (
            results.length > 0 ? (
              // Resultados encontrados
              <div>
                {/* Resumen de resultados */}
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                  <p className="text-xs text-gray-500">
                    {results.length} resultados para "{searchTerm}"
                    {activeCategory !== 'todos' && ` en ${getTypeLabel(activeCategory).toLowerCase()}`}
                  </p>
                </div>
                
                {/* Lista de resultados */}
                <div ref={resultsRef}>
                  {results.map((result, index) => (
                    <div
                      key={result.id || index}
                      className={`border-b border-gray-100 last:border-0 transition-colors
                                ${index === selectedResult ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
                    >
                      <Link
                        href={result.url}
                        className="block px-4 py-3"
                        onClick={() => navigateToResult(result.url, result.title)}
                        onMouseEnter={() => setSelectedResult(index)}
                      >
                        <div className="flex items-start">
                          {/* Icono para el tipo */}
                          <div className="flex-shrink-0 mr-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white
                                          ${result.type === 'pago' ? 'bg-green-500' : 
                                            result.type === 'facturacion' ? 'bg-blue-500' : 
                                            result.type === 'tramite' ? 'bg-purple-500' : 
                                            result.type === 'tarifa' ? 'bg-yellow-500' : 
                                            result.type === 'servicio' ? 'bg-indigo-500' : 'bg-gray-500'}`}>
                              {getTypeIcon(result.type)}
                            </div>
                          </div>
                          
                          {/* Contenido del resultado */}
                          <div className="flex-1 min-w-0">
                            <h4 
                              className="text-base font-medium text-gray-900 mb-0.5"
                              dangerouslySetInnerHTML={{
                                __html: highlightSearchTerm(result.title, searchTerm)
                              }}
                            ></h4>
                            
                            {/* Ruta del resultado */}
                            <div className="text-xs text-gray-500 mb-1 truncate">
                              {result.url}
                            </div>
                            
                            {/* Descripción */}
                            {result.description && (
                              <p 
                                className="text-sm text-gray-600 line-clamp-2"
                                dangerouslySetInnerHTML={{
                                  __html: highlightSearchTerm(result.description, searchTerm)
                                }}
                              ></p>
                            )}
                            
                            {/* Etiqueta de tipo */}
                            <div className="mt-1.5">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                                {getTypeLabel(result.type)}
                              </span>
                            </div>
                          </div>
                          
                          {/* Indicador de selección */}
                          {index === selectedResult && (
                            <div className="ml-2 flex items-center self-center">
                              <span className="sr-only">Seleccionado</span>
                              <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                
                {/* Botón de ver todos los resultados */}
                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <button
                    onClick={() => navigateToResults(searchTerm)}
                    className="w-full py-2 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700
                             rounded-md transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    Ver todos los resultados
                    <svg className="ml-1.5 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              // Sin resultados
              <div className="p-6">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron resultados</h3>
                  <p className="mt-1 text-sm text-gray-500">No hay coincidencias para "{searchTerm}"</p>
                </div>
                
                <div className="mt-6">
                  {/* Sugerencias para mejorar la búsqueda */}
                  <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-3">Sugerencias:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                    <li>Revisa si hay errores de ortografía</li>
                    <li>Intenta con términos más generales</li>
                    <li>Prueba con sinónimos</li>
                    <li>Usa menos palabras en tu búsqueda</li>
                  </ul>
                  
                  {/* Enlaces populares como alternativa */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">Enlaces populares:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {popularLinks.slice(0, 4).map((link, index) => (
                        <Link
                          key={index}
                          href={link.url}
                          className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                          onClick={() => deactivateSearch()}
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          ) : (
            // Contenido cuando no hay término de búsqueda
            <div>
              {/* Búsquedas recientes */}
              {recentSearches.length > 0 && (
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
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
                        <svg className="mr-2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Historial de navegación */}
              {searchHistory.length > 0 && (
                <div className="p-4 border-b border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                    Visitado recientemente
                  </h3>
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <Link
                        key={index}
                        href={item.url}
                        className="flex items-center px-2 py-1.5 text-sm text-gray-700
                                hover:bg-gray-100 rounded-md transition-colors"
                        onClick={() => deactivateSearch()}
                      >
                        <svg className="mr-2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 5l7 7-7 7" />
                        </svg>
                        {item.title || item.url}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Enlaces populares */}
              <div className="p-4">
                <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Enlaces populares
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url}
                      className="flex items-center p-2 text-sm text-gray-700 hover:bg-gray-100
                              rounded-md transition-colors"
                      onClick={() => deactivateSearch()}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white mr-3
                                    ${link.type === 'pago' ? 'bg-green-500' : 
                                      link.type === 'facturacion' ? 'bg-blue-500' : 
                                      link.type === 'tramite' ? 'bg-purple-500' : 
                                      link.type === 'tarifa' ? 'bg-yellow-500' : 
                                      link.type === 'servicio' ? 'bg-indigo-500' : 'bg-gray-500'}`}>
                        {getTypeIcon(link.type)}
                      </div>
                      <span className="truncate">{link.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Ayuda */}
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <div className="text-xs text-gray-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Empieza a escribir para buscar o usa <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">↑</kbd> <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">↓</kbd> para navegar</span>
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
    title: 'Tarifas actuales',
    url: '/tarifas/actuales',
    type: 'tarifa'
  },
  {
    title: 'Pago de facturas',
    url: '/pago',
    type: 'pago'
  },
  {
    title: 'Trámites usuarios',
    url: '/tramites',
    type: 'tramite'
  },
  {
    title: 'Consulta tu factura',
    url: '/conoce-tu-factura',
    type: 'facturacion'
  },
  {
    title: 'Puntos de pago',
    url: '/puntos-de-pago',
    type: 'pago'
  },
  {
    title: 'Suspensiones programadas',
    url: '/suspensiones-programadas',
    type: 'servicio'
  }
];

// Datos de respaldo en caso de que no se pueda cargar el índice
const fallbackSearchData = [
  {
    id: 'tarifas',
    title: 'Tarifas',
    description: 'Información sobre tarifas de energía eléctrica actualizadas',
    url: '/tarifas',
    type: 'tarifa'
  },
  {
    id: 'tarifas-actuales',
    title: 'Tarifas Actuales',
    description: 'Consulta las tarifas vigentes del servicio de energía eléctrica',
    url: '/tarifas/actuales',
    type: 'tarifa'
  },
  {
    id: 'pago-factura',
    title: 'Pago de Factura',
    description: 'Opciones para pagar tu factura de energía eléctrica',
    url: '/pago',
    type: 'pago'
  },
  {
    id: 'puntos-pago',
    title: 'Puntos de Pago',
    description: 'Conoce los diferentes puntos autorizados para pagar tu factura',
    url: '/puntos-de-pago',
    type: 'pago'
  },
  {
    id: 'tramites-usuarios',
    title: 'Trámites Usuarios',
    description: 'Información sobre trámites para usuarios de ElectroHuila',
    url: '/tramites',
    type: 'tramite'
  },
  {
    id: 'factura',
    title: 'Conoce tu Factura',
    description: 'Información sobre tu factura de energía eléctrica',
    url: '/conoce-tu-factura',
    type: 'facturacion'
  },
  {
    id: 'busqueda',
    title: 'Búsqueda',
    description: 'Busca información sobre servicios, tarifas, trámites y más en ElectroHuila',
    url: '/busqueda',
    type: 'pagina'
  },
  {
    id: 'equipo-directivo',
    title: 'Equipo Directivo', 
    description: 'Información sobre el equipo directivo de ElectroHuila',
    url: '/institucional/gobierno-corporativo/equipo-directivo',
    type: 'institucional'
  }
];