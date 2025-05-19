"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Clock, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Tipos para TypeScript
interface Suggestion {
  id: string;
  text: string;
  url: string;
  category?: string;
  icon?: React.ReactNode;
}

// Sugerencias predefinidas - personaliza con tus propias opciones
const SUGGESTIONS: Suggestion[] = [
  { 
    id: 'factura', 
    text: 'Pago de factura', 
    url: '/pagos/factura',
    category: 'Pagos',
    icon: <Clock size={16} />
  },
  { 
    id: 'cortes', 
    text: 'Cortes programados', 
    url: '/servicios/cortes',
    category: 'Servicios',
    icon: <Lightbulb size={16} />
  },
  { 
    id: 'tarifas', 
    text: 'Tarifas', 
    url: '/servicios/tarifas',
    category: 'Servicios'
  },
  { 
    id: 'puntos', 
    text: 'Puntos de atención', 
    url: '/contactenos/puntos-atencion',
    category: 'Contacto'
  },
  { 
    id: 'pqrs', 
    text: 'PQRS', 
    url: '/contactenos/pqrs',
    category: 'Contacto'
  },
  { 
    id: 'consulta', 
    text: 'Consulta de facturas', 
    url: '/servicios/consulta-facturas',
    category: 'Pagos'
  },
  { 
    id: 'nueva', 
    text: 'Nueva conexión', 
    url: '/servicios/nuevas-conexiones',
    category: 'Servicios'
  },
  { 
    id: 'reclamos', 
    text: 'Reclamos', 
    url: '/servicios/reclamos',
    category: 'Servicios'
  }
];

const AnimatedSearchComponent: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cargar búsquedas recientes del localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSearches = localStorage.getItem('recentSearches');
      if (storedSearches) {
        try {
          setRecentSearches(JSON.parse(storedSearches));
        } catch (e) {
          console.error('Error parsing recent searches:', e);
        }
      }
    }
  }, []);

  // Guardar búsqueda reciente
  const saveRecentSearch = (search: string): void => {
    if (!search.trim()) return;
    
    const updatedSearches = [
      search, 
      ...recentSearches.filter(s => s !== search)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
  };

  // Filtrar sugerencias basado en la consulta
  useEffect(() => {
    if (query.trim()) {
      const filtered = SUGGESTIONS.filter(
        suggestion => suggestion.text.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limitar a 5 resultados
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [query]);

  // Cerrar el panel de búsqueda al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
        setTimeout(() => {
          if (!isFocused) setIsOpen(false);
        }, 200);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  // Manejar navegación con teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navegar entre resultados con las flechas
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => 
        prev < filteredSuggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0) {
        const selected = filteredSuggestions[selectedIndex];
        saveRecentSearch(selected.text);
        router.push(selected.url);
        setIsOpen(false);
        setIsExpanded(false);
      } else if (query.trim()) {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsExpanded(false);
      inputRef.current?.blur();
      setTimeout(() => setIsOpen(false), 200);
    }
  };

  // Abrir el buscador
  const openSearch = () => {
    setIsOpen(true);
    setTimeout(() => {
      setIsExpanded(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 150);
    }, 10);
  };

  // Manejar envío del formulario
  const handleSearch = (): void => {
    if (query.trim()) {
      saveRecentSearch(query);
      router.push(`/busqueda?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setIsExpanded(false);
    }
  };

  // Manejar clic en una sugerencia
  const handleSuggestionClick = (suggestion: Suggestion): void => {
    saveRecentSearch(suggestion.text);
    router.push(suggestion.url);
    setIsOpen(false);
    setIsExpanded(false);
  };

  return (
    <div ref={searchRef} className="relative z-20">
      {/* Botón de búsqueda */}
      {!isOpen ? (
        <button 
          onClick={openSearch}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          aria-label="Buscar"
        >
          <Search size={18} />
        </button>
      ) : (
        <div 
          className={`flex items-center rounded-full shadow-md bg-white border border-gray-200 transition-all duration-300 ease-out ${
            isExpanded ? 'w-64 md:w-72 opacity-100' : 'w-10 opacity-90'
          }`}
        >
          {/* Icono de búsqueda */}
          <div className="flex items-center justify-center h-10 w-10 text-gray-500">
            <Search size={18} className={`transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`} />
          </div>
          
          {/* Campo de búsqueda */}
          {isOpen && (
            <div className={`flex-1 overflow-hidden transition-all duration-300 ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Buscar en ElectroHuila..."
                className="w-full h-10 bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 pr-2"
              />
            </div>
          )}
          
          {/* Botón para cerrar o limpiar */}
          {isExpanded && (
            <button 
              onClick={() => {
                if (query) {
                  setQuery('');
                } else {
                  setIsExpanded(false);
                  setTimeout(() => setIsOpen(false), 200);
                }
              }}
              className="flex items-center justify-center h-10 w-10 text-gray-500 hover:text-gray-800 transition-colors"
              aria-label={query ? "Limpiar búsqueda" : "Cerrar búsqueda"}
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {/* Panel de sugerencias */}
      {isOpen && isExpanded && (
        <div 
          className={`absolute right-0 top-12 w-64 md:w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
          }`}
        >
          {/* Resultados/sugerencias */}
          {query.trim() ? (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs text-gray-500 font-medium">
                {filteredSuggestions.length > 0 ? 'Resultados' : 'Sin resultados'}
              </div>
              
              {filteredSuggestions.length > 0 ? (
                <div>
                  {filteredSuggestions.map((suggestion, index) => (
                    <div 
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-blue-50 ${
                        selectedIndex === index ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        {suggestion.icon || <Search size={14} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{suggestion.text}</div>
                        {suggestion.category && (
                          <div className="text-xs text-blue-600">{suggestion.category}</div>
                        )}
                      </div>
                      <ChevronRight size={14} className="text-gray-400 flex-shrink-0" />
                    </div>
                  ))}
                  
                  <div className="px-3 py-2 mt-1 border-t border-gray-100">
                    <button 
                      onClick={handleSearch}
                      className="w-full py-2 flex items-center justify-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      <span>Ver todos los resultados</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <div className="text-gray-500 mb-1">No se encontraron resultados</div>
                  <div className="text-xs text-gray-400">Intenta con otra búsqueda</div>
                </div>
              )}
            </div>
          ) : recentSearches.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs text-gray-500 font-medium">
                Búsquedas recientes
              </div>
              
              {recentSearches.map((search, index) => (
                <div 
                  key={`recent-${index}`}
                  onClick={() => {
                    setQuery(search);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-2 cursor-pointer flex items-center gap-2 hover:bg-blue-50"
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                    <Clock size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-gray-700 truncate">{search}</div>
                  </div>
                  <X 
                    size={14} 
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      const updated = recentSearches.filter(s => s !== search);
                      setRecentSearches(updated);
                      localStorage.setItem('recentSearches', JSON.stringify(updated));
                    }}
                  />
                </div>
              ))}
              
              <div className="px-3 py-2 border-t border-gray-100">
                <button 
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem('recentSearches');
                  }}
                  className="w-full py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Borrar búsquedas recientes
                </button>
              </div>
            </div>
          ) : (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs text-gray-500 font-medium">
                Búsquedas populares
              </div>
              
              <div className="px-3 py-2 flex flex-wrap gap-2">
                {SUGGESTIONS.slice(0, 5).map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimatedSearchComponent;