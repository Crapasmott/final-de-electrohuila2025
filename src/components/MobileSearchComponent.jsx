"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Resultados de búsqueda de ejemplo
const mockResults = [
  { id: 'result-1', title: 'Pago en línea', description: 'Realiza tus pagos en línea', path: '/pagos/pago-en-linea', parentSection: 'Pagos' },
  { id: 'result-2', title: 'Factura electrónica', description: 'Consulta tu factura electrónica', path: '/servicios/factura', parentSection: 'Servicios' },
  { id: 'result-3', title: 'Puntos de atención', description: 'Encuentra nuestras oficinas', path: '/contactenos/puntos-atencion', parentSection: 'Contáctenos' },
  { id: 'result-4', title: 'Cortes programados', description: 'Consulta los cortes de energía', path: '/servicios/cortes', parentSection: 'Servicios' },
  { id: 'result-5', title: 'Nuevas conexiones', description: 'Solicita una nueva conexión', path: '/servicios/nuevas-conexiones', parentSection: 'Servicios' }
];

// Búsquedas populares
const POPULAR_SEARCHES = [
  'Factura', 'Pago en línea', 'Cortes programados', 'Puntos de atención', 'Tarifas'
];

// Función simple para filtrar resultados
const performSearch = (query) => {
  if (!query || query.trim() === '') return [];
  
  const lowercaseQuery = query.toLowerCase();
  return mockResults.filter(result => 
    result.title.toLowerCase().includes(lowercaseQuery) || 
    result.description.toLowerCase().includes(lowercaseQuery) ||
    (result.parentSection && result.parentSection.toLowerCase().includes(lowercaseQuery))
  );
};

const MobileSearchComponent = ({ isFullscreen = false, onClose, isDesktop = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Manejar clic fuera del componente
  useEffect(() => {
    if (!isFullscreen && !isDesktop) {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isFullscreen, isDesktop]);

  // Enfocar el input cuando se abre
  useEffect(() => {
    if ((isOpen || isFullscreen) && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isOpen, isFullscreen]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        const results = performSearch(query);
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Realizar búsqueda
  const handleSearch = (e) => {
    e && e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/busqueda?q=${encodeURIComponent(searchQuery)}`);
      if (isFullscreen && onClose) {
        onClose();
      } else {
        setIsOpen(false);
      }
    }
  };

  // Renderizar botón de búsqueda para escritorio
  if (isDesktop) {
    return (
      <div className="desktop-search" style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buscar"
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: '8px', 
            cursor: 'pointer', 
            display: 'flex',
            alignItems: 'center',
            color: '#333'
          }}
        >
          <Search size={20} />
        </button>
        
        {isOpen && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            right: 0, 
            width: '300px', 
            background: 'white', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
            borderRadius: '8px', 
            padding: '10px', 
            marginTop: '10px',
            zIndex: 100
          }}>
            <form onSubmit={handleSearch}>
              <div style={{ position: 'relative', marginBottom: '10px' }}>
                <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Buscar..."
                  style={{ 
                    width: '100%', 
                    padding: '10px 35px 10px 35px', 
                    border: '1px solid #ddd', 
                    borderRadius: '20px', 
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    style={{ 
                      position: 'absolute', 
                      right: '10px', 
                      top: '50%', 
                      transform: 'translateY(-50%)', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      color: '#777'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>
            
            {searchQuery.trim().length > 2 && (
              <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {isSearching ? (
                  <div style={{ padding: '15px', textAlign: 'center', color: '#777' }}>Buscando...</div>
                ) : searchResults.length > 0 ? (
                  <div>
                    {searchResults.slice(0, 5).map((result) => (
                      <Link
                        key={result.id}
                        href={result.path}
                        onClick={() => setIsOpen(false)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center', 
                          padding: '10px 15px', 
                          borderRadius: '6px', 
                          textDecoration: 'none', 
                          color: '#333', 
                          marginBottom: '5px'
                        }}
                      >
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ fontWeight: 500, marginBottom: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {result.title}
                          </div>
                          {result.parentSection && (
                            <div style={{ fontSize: '12px', color: '#0066cc' }}>
                              {result.parentSection}
                            </div>
                          )}
                        </div>
                        <ArrowRight size={14} style={{ marginLeft: '10px', color: '#999', flexShrink: 0 }} />
                      </Link>
                    ))}
                    
                    {searchResults.length > 5 && (
                      <Link
                        href={`/busqueda?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        style={{ 
                          display: 'block', 
                          textAlign: 'center', 
                          padding: '10px', 
                          color: '#0066cc', 
                          textDecoration: 'none', 
                          fontWeight: 500, 
                          borderTop: '1px solid #eee', 
                          marginTop: '5px'
                        }}
                      >
                        Ver todos los resultados ({searchResults.length})
                      </Link>
                    )}
                  </div>
                ) : (
                  <div style={{ padding: '15px', textAlign: 'center', color: '#777' }}>
                    No se encontraron resultados para "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Renderizar botón de búsqueda para móvil
  if (!isFullscreen) {
    return (
      <div ref={searchRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Buscar"
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: '8px', 
            cursor: 'pointer', 
            display: 'flex',
            alignItems: 'center',
            color: '#333',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <Search size={22} />
        </button>
        
        {isOpen && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            right: 0, 
            width: '280px', 
            background: 'white', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)', 
            borderRadius: '8px', 
            marginTop: '10px',
            zIndex: 100,
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', padding: '10px', borderBottom: '1px solid #eee' }}>
              <form onSubmit={handleSearch} style={{ flex: 1 }}>
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Buscar..."
                    style={{ 
                      width: '100%', 
                      padding: '8px 35px 8px 35px', 
                      border: '1px solid #ddd', 
                      borderRadius: '20px', 
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      style={{ 
                        position: 'absolute', 
                        right: '10px', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer',
                        color: '#777',
                        WebkitTapHighlightColor: 'transparent',
                        padding: '5px'
                      }}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              </form>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  marginLeft: '10px', 
                  cursor: 'pointer',
                  color: '#777',
                  display: 'flex',
                  alignItems: 'center',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <X size={22} />
              </button>
            </div>
            
            <div style={{ padding: '10px' }}>
              {searchQuery.trim().length > 2 ? (
                isSearching ? (
                  <div style={{ padding: '15px', textAlign: 'center', color: '#777', fontSize: '14px' }}>Buscando...</div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.slice(0, 5).map((result) => (
                      <Link
                        key={result.id}
                        href={result.path}
                        onClick={() => setIsOpen(false)}
                        style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'flex-start', 
                          padding: '12px', 
                          borderRadius: '6px', 
                          textDecoration: 'none', 
                          color: '#333', 
                          marginBottom: '8px', 
                          backgroundColor: '#f5f5f5'
                        }}
                      >
                        <div style={{ flex: 1, marginRight: '10px' }}>
                          <div style={{ fontWeight: 500, marginBottom: '3px' }}>{result.title}</div>
                          <div style={{ fontSize: '13px', color: '#666', marginBottom: '3px' }}>{result.description}</div>
                          {result.parentSection && (
                            <div style={{ fontSize: '12px', color: '#0066cc' }}>{result.parentSection}</div>
                          )}
                        </div>
                        <ArrowRight size={16} style={{ color: '#999', flexShrink: 0, alignSelf: 'center' }} />
                      </Link>
                    ))}
                    
                    {searchResults.length > 5 && (
                      <Link
                        href={`/busqueda?q=${encodeURIComponent(searchQuery)}`}
                        onClick={() => setIsOpen(false)}
                        style={{ 
                          display: 'block', 
                          textAlign: 'center', 
                          padding: '12px', 
                          color: '#0066cc', 
                          textDecoration: 'none', 
                          fontWeight: 500,
                          backgroundColor: '#f0f5ff',
                          borderRadius: '6px',
                          marginTop: '5px'
                        }}
                      >
                        Ver todos los resultados ({searchResults.length})
                      </Link>
                    )}
                  </>
                ) : (
                  <div style={{ 
                    padding: '15px', 
                    textAlign: 'center', 
                    color: '#777', 
                    backgroundColor: '#f5f5f5',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}>
                    No se encontraron resultados para "{searchQuery}"
                  </div>
                )
              ) : (
                <div style={{ padding: '15px' }}>
                  <div style={{ fontWeight: 500, marginBottom: '12px', color: '#555', fontSize: '14px' }}>
                    Búsquedas populares
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {POPULAR_SEARCHES.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(term);
                          const results = performSearch(term);
                          setSearchResults(results);
                        }}
                        style={{ 
                          backgroundColor: '#f5f5f5', 
                          border: 'none', 
                          padding: '8px 12px', 
                          borderRadius: '20px', 
                          fontSize: '13px', 
                          color: '#333', 
                          cursor: 'pointer'
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Renderizar búsqueda a pantalla completa para móvil
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      backgroundColor: 'white', 
      zIndex: 1200, 
      display: 'flex', 
      flexDirection: 'column'
    }}>
      <div style={{ 
        padding: '15px', 
        borderBottom: '1px solid #eee', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px'
      }}>
        <button 
          onClick={onClose}
          aria-label="Volver"
          style={{ 
            background: 'none', 
            border: 'none', 
            padding: '8px', 
            cursor: 'pointer', 
            color: '#333', 
            display: 'flex',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          <X size={24} />
        </button>
        
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar en ElectroHuila..."
              style={{ 
                width: '100%', 
                padding: '12px 40px 12px 40px', 
                border: '1px solid #ddd', 
                borderRadius: '20px', 
                fontSize: '16px',
                outline: 'none'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Limpiar"
                style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: '#777',
                  padding: '5px',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <X size={20} />
              </button>
            )}
          </div>
          
          <button 
            type="submit"
            disabled={!searchQuery.trim()}
            style={{ 
              backgroundColor: '#0066cc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              padding: '0 20px', 
              fontWeight: 500, 
              fontSize: '15px',
              opacity: !searchQuery.trim() ? 0.5 : 1
            }}
          >
            Buscar
          </button>
        </form>
      </div>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
        {searchQuery.trim().length > 2 ? (
          isSearching ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
              <div style={{ color: '#777', fontSize: '15px' }}>Buscando...</div>
            </div>
          ) : searchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={result.path}
                  onClick={onClose}
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    padding: '15px', 
                    backgroundColor: '#f5f5f5', 
                    borderRadius: '8px', 
                    textDecoration: 'none', 
                    color: '#333'
                  }}
                >
                  <div style={{ flex: 1, marginRight: '15px' }}>
                    <div style={{ fontWeight: 500, marginBottom: '5px', fontSize: '16px' }}>
                      {result.title}
                    </div>
                    <div style={{ color: '#666', marginBottom: '5px', fontSize: '14px' }}>
                      {result.description}
                    </div>
                    {result.parentSection && (
                      <div style={{ color: '#0066cc', fontSize: '13px', fontWeight: 500 }}>
                        {result.parentSection}
                      </div>
                    )}
                  </div>
                  <ArrowRight size={18} style={{ color: '#999', flexShrink: 0, alignSelf: 'center' }} />
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#f5f5f5', 
              borderRadius: '8px', 
              textAlign: 'center' 
            }}>
              <div style={{ fontWeight: 500, marginBottom: '15px', color: '#555' }}>
                No se encontraron resultados para "{searchQuery}"
              </div>
              <div style={{ marginBottom: '15px', color: '#666', fontSize: '14px' }}>
                Intenta con alguna de estas sugerencias:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                {POPULAR_SEARCHES.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSearchQuery(term);
                      const results = performSearch(term);
                      setSearchResults(results);
                    }}
                    style={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #ddd', 
                      padding: '8px 15px', 
                      borderRadius: '20px', 
                      fontSize: '14px', 
                      color: '#0066cc', 
                      cursor: 'pointer'
                    }}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )
        ) : (
          <div>
            <div style={{ fontWeight: 500, marginBottom: '15px', color: '#555' }}>
              Búsquedas populares
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
              {POPULAR_SEARCHES.map((term, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(term);
                    const results = performSearch(term);
                    setSearchResults(results);
                  }}
                  style={{ 
                    backgroundColor: '#f5f5f5', 
                    border: 'none', 
                    padding: '10px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: '#333', 
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
            
            <div style={{ 
              backgroundColor: '#f5f5f5', 
              padding: '15px', 
              borderRadius: '8px' 
            }}>
              <div style={{ fontWeight: 500, marginBottom: '12px', color: '#555' }}>
                Consejos de búsqueda
              </div>
              <ul style={{ paddingLeft: '20px', margin: 0, color: '#666', fontSize: '14px' }}>
                <li style={{ marginBottom: '8px' }}>Usa palabras clave específicas</li>
                <li style={{ marginBottom: '8px' }}>Evita preposiciones y artículos (el, la, los, del)</li>
                <li style={{ marginBottom: '8px' }}>Prueba con sinónimos si no encuentras resultados</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileSearchComponent;