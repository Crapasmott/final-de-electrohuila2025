"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, Clock, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Sugerencias predefinidas - personaliza con tus propias opciones
const SUGGESTIONS = [
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

export default function SearchComponent() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef(null);
  const inputRef = useRef(null);
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
  const saveRecentSearch = (search) => {
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
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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
  const handleKeyDown = (e) => {
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

  // Detectar tamaño de pantalla
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

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
  const handleSearch = () => {
    if (query.trim()) {
      saveRecentSearch(query);
      router.push(`/busqueda?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setIsExpanded(false);
    }
  };

  // Manejar clic en una sugerencia
  const handleSuggestionClick = (suggestion) => {
    saveRecentSearch(suggestion.text);
    router.push(suggestion.url);
    setIsOpen(false);
    setIsExpanded(false);
  };

  // Calcular el ancho adecuado para el campo de búsqueda
  const searchWidth = isMobile ? '160px' : '180px';

  return (
    <div className="navbar-search-container" style={{
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'absolute', 
      right: '20px',   // Posicionado absolutamente a la derecha
      top: '50%',      // Centrado verticalmente
      transform: 'translateY(-50%)', // Ajuste fino para centrado vertical
      zIndex: 30
    }}>
      <div 
        ref={searchRef} 
        style={{ 
          position: 'relative',
          zIndex: 20
        }}
      >
        {/* Botón de búsqueda */}
        {!isOpen ? (
          <button 
            onClick={openSearch}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '36px',
              width: '36px',
              borderRadius: '50%',
              backgroundColor: '#0066cc',
              color: 'white',
              border: 'none',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = '#0052a3';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = '#0066cc';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            aria-label="Buscar"
          >
            <Search size={18} />
          </button>
        ) : (
          <div 
            style={{
              position: 'absolute',
              right: '0',
              top: '0',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              width: isExpanded ? searchWidth : '36px',
              transition: 'all 0.3s ease-out',
              overflow: 'hidden',
            }}
          >
            {/* Icono de búsqueda */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minWidth: '36px',
              height: '36px',
              color: '#6b7280'
            }}>
              <Search size={18} style={{ 
                transition: 'opacity 0.2s', 
                opacity: isExpanded ? 1 : 0
              }} />
            </div>
            
            {/* Campo de búsqueda */}
            {isOpen && (
              <div style={{ 
                flex: 1, 
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                width: isExpanded ? '100%' : 0,
                opacity: isExpanded ? 1 : 0
              }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Buscar en ElectroHuila..."
                  style={{
                    width: '100%',
                    height: '36px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#1f2937',
                    paddingRight: '8px'
                  }}
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '36px',
                  width: '36px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#1f2937';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#6b7280';
                }}
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
            style={{
              position: 'absolute',
              right: '0',
              top: '44px',
              width: searchWidth,
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              maxHeight: '400px',
              transition: 'all 0.3s ease',
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? 'translateY(0)' : 'translateY(-8px)',
              zIndex: 30
            }}
          >
            {/* Resultados/sugerencias */}
            {query.trim() ? (
              <div style={{ padding: '8px 0' }}>
                <div style={{ 
                  padding: '4px 12px', 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  fontWeight: 500 
                }}>
                  {filteredSuggestions.length > 0 ? 'Resultados' : 'Sin resultados'}
                </div>
                
                {filteredSuggestions.length > 0 ? (
                  <div>
                    {filteredSuggestions.map((suggestion, index) => (
                      <div 
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: selectedIndex === index ? '#eff6ff' : 'transparent',
                          transition: 'background-color 0.15s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = '#eff6ff';
                        }}
                        onMouseOut={(e) => {
                          if (selectedIndex !== index) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        <div style={{
                          width: '32px',
                          height: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: '#dbeafe',
                          color: '#2563eb',
                          flexShrink: 0
                        }}>
                          {suggestion.icon || <Search size={14} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ 
                            fontWeight: 500, 
                            color: '#1f2937',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {suggestion.text}
                          </div>
                          {suggestion.category && (
                            <div style={{ 
                              fontSize: '0.75rem', 
                              color: '#2563eb' 
                            }}>
                              {suggestion.category}
                            </div>
                          )}
                        </div>
                        <ChevronRight size={14} style={{ color: '#9ca3af', flexShrink: 0 }} />
                      </div>
                    ))}
                    
                    <div style={{ 
                      padding: '8px 12px', 
                      marginTop: '4px', 
                      borderTop: '1px solid #f3f4f6' 
                    }}>
                      <button 
                        onClick={handleSearch}
                        style={{
                          width: '100%',
                          padding: '8px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          color: '#2563eb',
                          fontWeight: 500,
                          transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#1d4ed8';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = '#2563eb';
                        }}
                      >
                        <span>Ver todos los resultados</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    padding: '24px 16px', 
                    textAlign: 'center' 
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      margin: '0 auto 12px'
                    }}>
                      <Search size={20} style={{ color: '#9ca3af' }} />
                    </div>
                    <div style={{ 
                      color: '#6b7280', 
                      marginBottom: '4px' 
                    }}>
                      No se encontraron resultados
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: '#9ca3af' 
                    }}>
                      Intenta con otra búsqueda
                    </div>
                  </div>
                )}
              </div>
            ) : recentSearches.length > 0 ? (
              <div style={{ padding: '8px 0' }}>
                <div style={{ 
                  padding: '4px 12px', 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  fontWeight: 500 
                }}>
                  Búsquedas recientes
                </div>
                
                {recentSearches.map((search, index) => (
                  <div 
                    key={`recent-${index}`}
                    onClick={() => {
                      setQuery(search);
                      inputRef.current?.focus();
                    }}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'background-color 0.15s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div style={{
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      backgroundColor: '#f3f4f6',
                      color: '#6b7280',
                      flexShrink: 0
                    }}>
                      <Clock size={14} />
                    </div>
                    <div style={{ 
                      flex: 1, 
                      color: '#4b5563',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {search}
                    </div>
                    <X 
                      size={14} 
                      style={{ 
                        color: '#9ca3af',
                        cursor: 'pointer',
                        flexShrink: 0
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const updated = recentSearches.filter(s => s !== search);
                        setRecentSearches(updated);
                        localStorage.setItem('recentSearches', JSON.stringify(updated));
                      }}
                    />
                  </div>
                ))}
                
                <div style={{ 
                  padding: '8px 12px', 
                  borderTop: '1px solid #f3f4f6' 
                }}>
                  <button 
                    onClick={() => {
                      setRecentSearches([]);
                      localStorage.removeItem('recentSearches');
                    }}
                    style={{
                      width: '100%',
                      padding: '6px 0',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      color: '#6b7280',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#4b5563';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#6b7280';
                    }}
                  >
                    Borrar búsquedas recientes
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '8px 0' }}>
                <div style={{ 
                  padding: '4px 12px', 
                  fontSize: '0.75rem', 
                  color: '#6b7280', 
                  fontWeight: 500 
                }}>
                  Búsquedas populares
                </div>
                
                <div style={{ 
                  padding: '8px 12px', 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px' 
                }}>
                  {SUGGESTIONS.slice(0, 5).map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
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
    </div>
  );
}