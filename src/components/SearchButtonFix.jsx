// components/BuscadorCompleto.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, Calendar, Building, Users, Leaf } from 'lucide-react';

const BuscadorCompleto = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  // Datos de todas las secciones de tu página
  const secciones = [
    // ADMIN
    {
      id: 'admin',
      titulo: 'Administración',
      descripcion: 'Panel administrativo del sistema',
      url: '/admin',
      icono: Building,
      categoria: 'Administración',
      keywords: ['admin', 'administracion', 'panel', 'administrativo', 'gestion']
    },
    
    // API
    {
      id: 'api',
      titulo: 'API',
      descripcion: 'Interfaces de programación de aplicaciones',
      url: '/api',
      icono: FileText,
      categoria: 'Técnico',
      keywords: ['api', 'interfaz', 'programacion', 'aplicaciones', 'servicios']
    },
    
    // AUTOGENERADORES
    {
      id: 'autogeneradores',
      titulo: 'Autogeneradores',
      descripcion: 'Información sobre sistemas de autogeneración eléctrica',
      url: '/autogeneradores',
      icono: Calendar,
      categoria: 'Servicios',
      keywords: ['autogeneradores', 'generacion', 'electrica', 'energia', 'sistemas']
    },
    
    // BÚSQUEDA
    {
      id: 'busqueda',
      titulo: 'Búsqueda',
      descripcion: 'Sistema de búsqueda del sitio web',
      url: '/busqueda',
      icono: Search,
      categoria: 'Herramientas',
      keywords: ['busqueda', 'buscar', 'encontrar', 'sistema', 'herramientas']
    },
    
    // COMUNICADOS
    {
      id: 'comunicados',
      titulo: 'Comunicados',
      descripcion: 'Comunicados oficiales de Electrohuila',
      url: '/comunicados',
      icono: FileText,
      categoria: 'Información',
      keywords: ['comunicados', 'oficiales', 'noticias', 'anuncios', 'informacion']
    },
    
    // CONOCE TU FACTURA
    {
      id: 'conoce-tu-factura',
      titulo: 'Conoce tu Factura',
      descripcion: 'Información detallada sobre tu factura de energía',
      url: '/conoce-tu-factura',
      icono: FileText,
      categoria: 'Servicios',
      keywords: ['factura', 'energia', 'conoce', 'detalle', 'informacion', 'consumo']
    },
    
    // CONTÁCTENOS
    {
      id: 'contactenos',
      titulo: 'Contáctenos',
      descripcion: 'Información de contacto y formularios',
      url: '/contactenos',
      icono: Users,
      categoria: 'Contacto',
      keywords: ['contacto', 'contactenos', 'telefono', 'email', 'direccion', 'formulario']
    },
    
    // CONTRATOS
    {
      id: 'contratos',
      titulo: 'Contratos',
      descripcion: 'Gestión y consulta de contratos',
      url: '/contratos',
      icono: Building,
      categoria: 'Proveedores',
      keywords: ['contratos', 'gestion', 'consulta', 'acuerdos', 'documentos']
    },
    
    // ENLACES INTERÉS
    {
      id: 'enlaces-interes',
      titulo: 'Enlaces de Interés',
      descripcion: 'Links útiles y recursos externos',
      url: '/enlaces-interes',
      icono: FileText,
      categoria: 'Información',
      keywords: ['enlaces', 'interes', 'links', 'recursos', 'externos', 'utiles']
    },
    
    // INSTITUCIONAL
    {
      id: 'etica-cumplimiento',
      titulo: 'Ética y Cumplimiento',
      descripcion: 'Código de ética y programas de cumplimiento',
      url: '/institucional/etica-y-cumplimiento',
      icono: Building,
      categoria: 'Institucional',
      keywords: ['etica', 'cumplimiento', 'codigo', 'programa', 'integridad']
    },
    {
      id: 'gestion-sostenibilidad',
      titulo: 'Gestión y Programas de Sostenibilidad',
      descripcion: 'Programas ambientales y de sostenibilidad',
      url: '/institucional/gestion-y-programas-de-sostenibilidad',
      icono: Leaf,
      categoria: 'Institucional',
      keywords: ['gestion', 'programas', 'sostenibilidad', 'ambiental', 'responsabilidad']
    },
    {
      id: 'gobierno-corporativo',
      titulo: 'Gobierno Corporativo',
      descripcion: 'Estructura y gobierno de la empresa',
      url: '/institucional/gobierno-corporativo',
      icono: Building,
      categoria: 'Institucional',
      keywords: ['gobierno', 'corporativo', 'estructura', 'direccion', 'organizacion']
    },
    {
      id: 'informes',
      titulo: 'Informes',
      descripcion: 'Informes corporativos y de gestión',
      url: '/institucional/informes',
      icono: FileText,
      categoria: 'Institucional',
      keywords: ['informes', 'corporativos', 'gestion', 'resultados', 'reportes']
    },
    {
      id: 'junta-directiva',
      titulo: 'Junta Directiva',
      descripcion: 'Información de la junta directiva',
      url: '/institucional/junta-directiva',
      icono: Users,
      categoria: 'Institucional',
      keywords: ['junta', 'directiva', 'direccion', 'miembros', 'gobierno']
    },
    
    // LEY DE TRANSPARENCIA
    {
      id: 'ley-transparencia',
      titulo: 'Ley de Transparencia',
      descripcion: 'Información pública según ley de transparencia',
      url: '/ley-de-transparencia',
      icono: FileText,
      categoria: 'Transparencia',
      keywords: ['ley', 'transparencia', 'publica', 'informacion', 'acceso']
    },
    
    // PÁGINAS
    {
      id: 'pages',
      titulo: 'Páginas',
      descripcion: 'Páginas del sitio web',
      url: '/pages',
      icono: FileText,
      categoria: 'Contenido',
      keywords: ['paginas', 'contenido', 'sitio', 'web', 'informacion']
    },
    
    // PQR ANÓNIMO
    {
      id: 'pqr-anonimo',
      titulo: 'PQR Anónimo',
      descripcion: 'Sistema de peticiones, quejas y reclamos anónimos',
      url: '/pqr-anonimo',
      icono: FileText,
      categoria: 'Servicios',
      keywords: ['pqr', 'anonimo', 'peticiones', 'quejas', 'reclamos', 'sistema']
    },
    
    // POLÍTICAS
    {
      id: 'politicas',
      titulo: 'Políticas',
      descripcion: 'Políticas corporativas y de la empresa',
      url: '/politicas',
      icono: Building,
      categoria: 'Institucional',
      keywords: ['politicas', 'corporativas', 'empresa', 'normativas', 'lineamientos']
    },
    
    // PROTECCIÓN DATOS PERSONALES
    {
      id: 'proteccion-datos',
      titulo: 'Protección de Datos Personales',
      descripcion: 'Política de protección de datos personales',
      url: '/proteccion-datos-personales',
      icono: FileText,
      categoria: 'Legal',
      keywords: ['proteccion', 'datos', 'personales', 'privacidad', 'politica', 'legal']
    },
    
    // PROVEEDORES Y CONTRATISTAS
    {
      id: 'proveedores-contratistas',
      titulo: 'Proveedores y Contratistas',
      descripcion: 'Información para proveedores y contratistas',
      url: '/proveedores-contratistas',
      icono: Building,
      categoria: 'Proveedores',
      keywords: ['proveedores', 'contratistas', 'licitaciones', 'contratos', 'empresas']
    },
    
    // PUNTOS DE ATENCIÓN
    {
      id: 'puntos-atencion',
      titulo: 'Puntos de Atención',
      descripcion: 'Ubicaciones de puntos de atención al cliente',
      url: '/puntos-de-atencion',
      icono: Users,
      categoria: 'Servicios',
      keywords: ['puntos', 'atencion', 'cliente', 'ubicaciones', 'oficinas', 'servicio']
    },
    
    // PUNTOS DE PAGO
    {
      id: 'puntos-pago',
      titulo: 'Puntos de Pago',
      descripcion: 'Ubicaciones para realizar pagos de facturas',
      url: '/puntos-de-pago',
      icono: Calendar,
      categoria: 'Servicios',
      keywords: ['puntos', 'pago', 'facturas', 'ubicaciones', 'bancos', 'pagos']
    },
    
    // QUIÉNES SOMOS
    {
      id: 'quienes-somos',
      titulo: 'Quiénes Somos',
      descripcion: 'Información sobre Electrohuila',
      url: '/quienes-somos',
      icono: Building,
      categoria: 'Institucional',
      keywords: ['quienes', 'somos', 'electrohuila', 'empresa', 'historia', 'mision', 'vision']
    },
    
    // SERVICIOS
    {
      id: 'servicios',
      titulo: 'Servicios',
      descripcion: 'Servicios ofrecidos por Electrohuila',
      url: '/servicios',
      icono: Calendar,
      categoria: 'Servicios',
      keywords: ['servicios', 'energia', 'electricos', 'suministro', 'mantenimiento']
    },
    
    // SOSTENIBILIDAD
    {
      id: 'sostenibilidad',
      titulo: 'Sostenibilidad',
      descripcion: 'Programas y políticas de sostenibilidad',
      url: '/sostenibilidad',
      icono: Leaf,
      categoria: 'Sostenibilidad',
      keywords: ['sostenibilidad', 'ambiental', 'responsabilidad', 'social', 'programas']
    },
    
    // SUSPENSIONES PROGRAMADAS
    {
      id: 'suspensiones-programadas',
      titulo: 'Suspensiones Programadas',
      descripcion: 'Boletines de suspensiones programadas del servicio',
      url: '/suspensiones-programadas',
      icono: Calendar,
      categoria: 'Servicios',
      keywords: ['suspensiones', 'programadas', 'boletines', 'cortes', 'servicio', 'mantenimiento']
    },
    
    // TARIFAS
    {
      id: 'tarifas',
      titulo: 'Tarifas',
      descripcion: 'Tarifas del servicio de energía eléctrica',
      url: '/tarifas',
      icono: FileText,
      categoria: 'Servicios',
      keywords: ['tarifas', 'energia', 'electrica', 'precios', 'costos', 'facturacion']
    },
    
    // TRÁMITES
    {
      id: 'tramites',
      titulo: 'Trámites',
      descripcion: 'Trámites y procedimientos administrativos',
      url: '/tramites',
      icono: FileText,
      categoria: 'Servicios',
      keywords: ['tramites', 'procedimientos', 'administrativos', 'solicitudes', 'documentos']
    },
    
    // TRÁMITES PROVEEDORES
    {
      id: 'tramites-proveedores',
      titulo: 'Trámites Proveedores',
      descripcion: 'Trámites específicos para proveedores',
      url: '/tramites-proveedores',
      icono: Building,
      categoria: 'Proveedores',
      keywords: ['tramites', 'proveedores', 'contratacion', 'documentos', 'requisitos']
    },
    
    // USO CONFIABLE ENERGÍA ELÉCTRICA
    {
      id: 'uso-confiable-energia',
      titulo: 'Uso Confiable Energía Eléctrica',
      descripcion: 'Información sobre uso eficiente y confiable de la energía',
      url: '/uso-confiable-energia-electrica',
      icono: Calendar,
      categoria: 'Servicios',
      keywords: ['uso', 'confiable', 'energia', 'electrica', 'eficiente', 'consejos', 'ahorro']
    },
    
    // USUARIOS
    {
      id: 'usuarios',
      titulo: 'Usuarios',
      descripcion: 'Portal de usuarios y servicios en línea',
      url: '/usuarios',
      icono: Users,
      categoria: 'Servicios',
      keywords: ['usuarios', 'portal', 'servicios', 'linea', 'cliente', 'cuenta']
    }
  ];

  // Función de búsqueda
  const buscar = (termino) => {
    if (!termino.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simular delay de búsqueda
    setTimeout(() => {
      const terminoLower = termino.toLowerCase();
      
      const resultados = secciones.filter(seccion => {
        // Buscar en título
        const tituloMatch = seccion.titulo.toLowerCase().includes(terminoLower);
        
        // Buscar en descripción
        const descripcionMatch = seccion.descripcion.toLowerCase().includes(terminoLower);
        
        // Buscar en keywords
        const keywordsMatch = seccion.keywords.some(keyword => 
          keyword.toLowerCase().includes(terminoLower)
        );
        
        // Buscar en categoría
        const categoriaMatch = seccion.categoria.toLowerCase().includes(terminoLower);
        
        return tituloMatch || descripcionMatch || keywordsMatch || categoriaMatch;
      });
      
      setResults(resultados);
      setIsSearching(false);
    }, 300);
  };

  // Efecto para búsqueda en tiempo real
  useEffect(() => {
    buscar(searchTerm);
  }, [searchTerm]);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Función para ir a una sección
  const irASeccion = (url) => {
    window.location.href = url;
    setIsOpen(false);
  };

  // Resaltar texto coincidente
  const resaltarTexto = (texto, termino) => {
    if (!termino) return texto;
    
    const regex = new RegExp(`(${termino})`, 'gi');
    const partes = texto.split(regex);
    
    return partes.map((parte, index) => 
      regex.test(parte) ? 
        <span key={index} className="bg-yellow-200 font-medium">{parte}</span> : 
        parte
    );
  };

  const getCategoriaColor = (categoria) => {
    const colores = {
      'Servicios': 'bg-blue-100 text-blue-800',
      'Proveedores': 'bg-green-100 text-green-800',
      'Sostenibilidad': 'bg-orange-100 text-orange-800',
      'Información': 'bg-purple-100 text-purple-800'
    };
    return colores[categoria] || 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Botón de búsqueda */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all duration-200"
        aria-label="Abrir búsqueda"
      >
        <Search className="h-5 w-5 text-gray-500" />
        <span className="text-gray-500 hidden sm:block">Buscar...</span>
        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs font-mono bg-gray-100 text-gray-600 rounded">
          Ctrl K
        </kbd>
      </button>

      {/* Modal de búsqueda */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative min-h-screen flex items-start justify-center p-4 pt-16">
            <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-2xl">
              {/* Header de búsqueda */}
              <div className="flex items-center border-b border-gray-200 p-4">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar en toda la página..."
                  className="flex-1 text-lg border-none outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="ml-3 p-1 hover:bg-gray-100 rounded"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Resultados */}
              <div className="max-h-96 overflow-y-auto p-4">
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-500">Buscando...</span>
                  </div>
                ) : searchTerm && results.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No se encontraron resultados para "{searchTerm}"</p>
                  </div>
                ) : searchTerm && results.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-500 mb-4">
                      {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                    </p>
                    {results.map((result) => {
                      const IconComponent = result.icono;
                      return (
                        <div
                          key={result.id}
                          onClick={() => irASeccion(result.url)}
                          className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        >
                          <div className="flex-shrink-0">
                            <IconComponent className="h-5 w-5 text-gray-400 mt-1" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="text-sm font-medium text-gray-900">
                                {resaltarTexto(result.titulo, searchTerm)}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getCategoriaColor(result.categoria)}`}>
                                {result.categoria}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {resaltarTexto(result.descripcion, searchTerm)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Escribe para buscar en toda la página</p>
                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      <div className="text-left">
                        <p className="font-medium mb-1">Puedes buscar:</p>
                        <ul className="space-y-1">
                          <li>• Suspensiones</li>
                          <li>• Contrataciones</li>
                          <li>• Trámites</li>
                        </ul>
                      </div>
                      <div className="text-left">
                        <p className="font-medium mb-1">También:</p>
                        <ul className="space-y-1">
                          <li>• Sostenibilidad</li>
                          <li>• Capacitaciones</li>
                          <li>• Enlaces</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-lg">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Presiona Enter para ir al primer resultado</span>
                  <span>ESC para cerrar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuscadorCompleto;