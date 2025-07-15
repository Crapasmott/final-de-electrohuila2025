// components/SearchHeader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SECTIONS = [
  // ADMINISTRACIÓN
  { 
    title: 'Administración', 
    path: '/admin', 
    items: ['Panel administrativo', 'Gestión', 'Sistema'],
    categoria: 'Administración'
  },
  
  // API
  { 
    title: 'API', 
    path: '/api', 
    items: ['Interfaz', 'Programación', 'Aplicaciones', 'Servicios'],
    categoria: 'Técnico'
  },
  
  // AUTOGENERADORES
  { 
    title: 'Autogeneradores', 
    path: '/autogeneradores', 
    items: ['Generación eléctrica', 'Sistemas', 'Energía'],
    categoria: 'Servicios'
  },
  
  // BÚSQUEDA
  { 
    title: 'Búsqueda', 
    path: '/busqueda', 
    items: ['Buscar', 'Encontrar', 'Sistema', 'Herramientas'],
    categoria: 'Herramientas'
  },
  
  // COMUNICADOS
  { 
    title: 'Comunicados', 
    path: '/comunicados', 
    items: ['Oficiales', 'Noticias', 'Anuncios', 'Información'],
    categoria: 'Información'
  },
  
  // CONOCE TU FACTURA
  { 
    title: 'Conoce tu Factura', 
    path: '/conoce-tu-factura', 
    items: ['Factura', 'Energía', 'Detalle', 'Consumo'],
    categoria: 'Servicios'
  },
  
  // CONTÁCTENOS
  { 
    title: 'Contáctenos', 
    path: '/contactenos', 
    items: ['Contacto', 'Teléfono', 'Email', 'Dirección', 'Formulario'],
    categoria: 'Contacto'
  },
  
  // CONTRATOS
  { 
    title: 'Contratos', 
    path: '/contratos', 
    items: ['Gestión', 'Consulta', 'Acuerdos', 'Documentos'],
    categoria: 'Proveedores'
  },
  
  // ENLACES DE INTERÉS
  { 
    title: 'Enlaces de Interés', 
    path: '/enlaces-interes', 
    items: ['Links útiles', 'Recursos externos', 'Gremios', 'Asociaciones', 'Normativa'],
    categoria: 'Información'
  },
  
  // INSTITUCIONAL - ÉTICA Y CUMPLIMIENTO
  { 
    title: 'Ética y Cumplimiento', 
    path: '/institucional/etica-y-cumplimiento', 
    items: ['Código ética', 'Programas cumplimiento', 'Integridad'],
    categoria: 'Institucional'
  },
  
  // INSTITUCIONAL - GESTIÓN SOSTENIBILIDAD
  { 
    title: 'Gestión y Programas de Sostenibilidad', 
    path: '/institucional/gestion-y-programas-de-sostenibilidad', 
    items: ['Programas ambientales', 'Responsabilidad social'],
    categoria: 'Institucional'
  },
  
  // INSTITUCIONAL - GOBIERNO CORPORATIVO
  { 
    title: 'Gobierno Corporativo', 
    path: '/institucional/gobierno-corporativo', 
    items: ['Estructura empresa', 'Dirección', 'Organización'],
    categoria: 'Institucional'
  },
  
  // INSTITUCIONAL - INFORMES
  { 
    title: 'Informes', 
    path: '/institucional/informes', 
    items: ['Corporativos', 'Gestión', 'Resultados', 'Reportes'],
    categoria: 'Institucional'
  },
  
  // INSTITUCIONAL - JUNTA DIRECTIVA
  { 
    title: 'Junta Directiva', 
    path: '/institucional/junta-directiva', 
    items: ['Dirección', 'Miembros', 'Gobierno'],
    categoria: 'Institucional'
  },
  
  // LEY DE TRANSPARENCIA
  { 
    title: 'Ley de Transparencia', 
    path: '/ley-de-transparencia', 
    items: ['Información pública', 'Acceso', 'Transparencia'],
    categoria: 'Transparencia'
  },
  
  // LOGIN
  { 
    title: 'Login', 
    path: '/login', 
    items: ['Iniciar sesión', 'Acceso', 'Usuario'],
    categoria: 'Sistema'
  },
  
  // PÁGINAS
  { 
    title: 'Páginas', 
    path: '/pages', 
    items: ['Contenido', 'Sitio web', 'Información'],
    categoria: 'Contenido'
  },
  
  // PGRD
  { 
    title: 'PGRD', 
    path: '/pgrd', 
    items: ['Plan gestión', 'Riesgo', 'Desastres'],
    categoria: 'Gestión'
  },
  
  // POLÍTICAS
  { 
    title: 'Políticas', 
    path: '/politicas', 
    items: ['Corporativas', 'Empresa', 'Normativas', 'Lineamientos'],
    categoria: 'Institucional'
  },
  
  // PQR ANÓNIMO
  { 
    title: 'PQR Anónimo', 
    path: '/pqr-anonimo', 
    items: ['Peticiones', 'Quejas', 'Reclamos', 'Anónimo'],
    categoria: 'Servicios'
  },
  
  // PROTECCIÓN DATOS PERSONALES
  { 
    title: 'Protección de Datos Personales', 
    path: '/proteccion-datos-personales', 
    items: ['Privacidad', 'Política', 'Legal', 'Datos'],
    categoria: 'Legal'
  },
  
  // PROVEEDORES Y CONTRATISTAS
  { 
    title: 'Proveedores y Contratistas', 
    path: '/proveedores-contratistas', 
    items: ['Licitaciones', 'Contratos', 'Empresas'],
    categoria: 'Proveedores'
  },
  
  // PUNTOS DE ATENCIÓN
  { 
    title: 'Puntos de Atención', 
    path: '/puntos-de-atencion', 
    items: ['Cliente', 'Ubicaciones', 'Oficinas', 'Servicio'],
    categoria: 'Servicios'
  },
  
  // PUNTOS DE PAGO
  { 
    title: 'Puntos de Pago', 
    path: '/puntos-de-pago', 
    items: ['Facturas', 'Ubicaciones', 'Bancos', 'Pagos'],
    categoria: 'Servicios'
  },
  
  // QUIÉNES SOMOS
  { 
    title: 'Quiénes Somos', 
    path: '/quienes-somos', 
    items: ['Electrohuila', 'Empresa', 'Historia', 'Misión', 'Visión'],
    categoria: 'Institucional'
  },
  
  // SERVICIOS
  { 
    title: 'Servicios', 
    path: '/servicios', 
    items: ['Energía', 'Eléctricos', 'Suministro', 'Mantenimiento'],
    categoria: 'Servicios'
  },
  
  // SOSTENIBILIDAD
  { 
    title: 'Sostenibilidad', 
    path: '/sostenibilidad', 
    items: ['Ambiental', 'Responsabilidad social', 'Programas'],
    categoria: 'Sostenibilidad'
  },
  
  // SUSPENSIONES PROGRAMADAS
  { 
    title: 'Suspensiones Programadas', 
    path: '/suspensiones-programadas', 
    items: ['Boletines', 'Cortes', 'Servicio', 'Mantenimiento', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
    categoria: 'Servicios'
  },
  
  // TARIFAS
  { 
    title: 'Tarifas', 
    path: '/tarifas', 
    items: ['Energía eléctrica', 'Precios', 'Costos', 'Facturación'],
    categoria: 'Servicios'
  },
  
  // TRÁMITES
  { 
    title: 'Trámites', 
    path: '/tramites', 
    items: ['Procedimientos', 'Administrativos', 'Solicitudes', 'Documentos'],
    categoria: 'Servicios'
  },
  
  // TRÁMITES PROVEEDORES
  { 
    title: 'Trámites Proveedores', 
    path: '/tramites-proveedores', 
    items: ['Contratación', 'Documentos', 'Requisitos', 'Plan Anual', 'Manual'],
    categoria: 'Proveedores'
  },
  
  // TRÁMITES USUARIOS
  { 
    title: 'Trámites Usuarios', 
    path: '/tramites-usuarios', 
    items: ['Usuario', 'Trámites', 'Servicios'],
    categoria: 'Servicios'
  },
  
  // USO CONFIABLE ENERGÍA ELÉCTRICA
  { 
    title: 'Uso Confiable Energía Eléctrica', 
    path: '/uso-confiable-energia-electrica', 
    items: ['Eficiente', 'Consejos', 'Ahorro'],
    categoria: 'Servicios'
  },
  
  // USUARIOS
  { 
    title: 'Usuarios', 
    path: '/usuarios', 
    items: ['Portal', 'Servicios en línea', 'Cliente', 'Cuenta'],
    categoria: 'Servicios'
  }
];

const SearchHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Function to search content without a database
  const searchContent = (searchQuery) => {
    if (!searchQuery.trim()) {
      return [];
    }
    
    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    let matchedResults = [];
    
    // Search through all sections and items
    SECTIONS.forEach(section => {
      // Check if section title matches
      const titleMatches = searchTerms.some(term => 
        section.title.toLowerCase().includes(term)
      );
      
      // Check if category matches
      const categoryMatches = searchTerms.some(term => 
        section.categoria.toLowerCase().includes(term)
      );
      
      // Check if any items match
      const itemMatches = section.items.filter(item => 
        searchTerms.some(term => item.toLowerCase().includes(term))
      );
      
      // Add section if title or category matches
      if (titleMatches || categoryMatches) {
        matchedResults.push({
          type: 'section',
          title: section.title,
          path: section.path,
          categoria: section.categoria,
          relevance: titleMatches ? 3 : categoryMatches ? 2 : 1
        });
      }
      
      // Add matching items
      itemMatches.forEach(item => {
        matchedResults.push({
          type: 'item',
          title: item,
          section: section.title,
          path: `${section.path}`,
          categoria: section.categoria,
          relevance: 1
        });
      });
    });
    
    // Sort by relevance and limit results
    return matchedResults
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 12); // Increased to 12 results
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setResults(searchContent(value));
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      router.push(selected.path);
      setIsOpen(false);
      setQuery('');
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
    }
  };

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleKeyboardShortcut = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      document.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, []);

  // Toggle search visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setQuery('');
      setResults([]);
      setSelectedIndex(-1);
    }
  };

  // Get category color
  const getCategoryColor = (categoria) => {
    const colors = {
      'Servicios': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
      'Proveedores': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
      'Institucional': 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300',
      'Sostenibilidad': 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
      'Información': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300',
      'Contacto': 'bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300',
      'Transparencia': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
      'Legal': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
      'Administración': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300',
      'Técnico': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
    };
    return colors[categoria] || 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300';
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon Button */}
      <button 
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Buscar"
        title="Buscar (Ctrl+K)"
      >
        <Search size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Search Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="p-3 flex items-center border-b border-gray-200 dark:border-gray-700">
            <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar secciones, servicios, trámites..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500"
              autoComplete="off"
            />
            {query && (
              <button 
                onClick={() => {
                  setQuery('');
                  setResults([]);
                }} 
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {query && (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length > 0 ? (
                <>
                  <div className="px-3 py-1 text-xs text-gray-500 dark:text-gray-400">
                    {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                  </div>
                  {results.map((result, index) => (
                    <Link 
                      href={result.path} 
                      key={`${result.type}-${index}`}
                      onClick={() => {
                        setIsOpen(false);
                        setQuery('');
                      }}
                      className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-l-4 border-transparent hover:border-blue-500 ${
                        selectedIndex === index ? 'bg-gray-100 dark:bg-gray-700 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-gray-800 dark:text-gray-200 font-medium text-sm">
                            {result.title}
                          </div>
                          {result.type === 'item' && (
                            <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">
                              en {result.section}
                            </div>
                          )}
                        </div>
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getCategoryColor(result.categoria)}`}>
                          {result.categoria}
                        </span>
                      </div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="px-4 py-6 text-gray-500 dark:text-gray-400 text-center">
                  <Search className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                  <p>No se encontraron resultados para "{query}"</p>
                  <p className="text-xs mt-1">Intenta con otros términos</p>
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Búsquedas populares</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Suspensiones', 'Trámites', 'Facturas', 'Pagos', 
                  'Contratación', 'Sostenibilidad', 'Tarifas', 'PQR'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setResults(searchContent(term));
                    }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  💡 Usa <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded text-xs">Ctrl + K</kbd> para abrir búsqueda rápida
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;