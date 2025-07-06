'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, Search, Filter, X } from 'lucide-react';

// 🟢 MODAL INCLUIDO EN EL MISMO ARCHIVO
const ContratoDetalleModal = ({ isOpen, onClose, contrato }) => {
  const [detalleContrato, setDetalleContrato] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchContratoDetalle = async (contratoId) => {
    setLoading(true);
    try {
      // Simular API call - En producción esto vendría de WordPress
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockDetalle = {
        ...contrato,
        documentos: [
          {
            nombre: 'TERMINOS DE REFERENCIA',
            codigo: 'EHUI-SD-041-2025 A01',
            fechaCarga: '2025-01-15',
            url: '/documentos/terminos-referencia.pdf'
          },
          {
            nombre: 'ANEXO 9 Manual de Usuario de la Plataforma de Gestión de Telecomunicaciones',
            codigo: 'EHUI-SD-041-2025 A09',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-9-manual-usuario.pdf'
          },
          {
            nombre: 'ANEXO 10 MANUAL DE SUPERVISIÓN TÉCNICA',
            codigo: 'EHUI-SD-041-2025 A10',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-10-supervision.pdf'
          },
          {
            nombre: 'ANEXO 11 MANUAL SST',
            codigo: 'EHUI-SD-041-2025 A11',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-11-sst.pdf'
          },
          {
            nombre: 'ANEXO 12 Manual de Gestión Ambiental',
            codigo: 'EHUI-SD-041-2025 A12',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-12-ambiental.pdf'
          },
          {
            nombre: 'ANEXO 13 Reevaluación de Proveedores',
            codigo: 'EHUI-SD-041-2025 A13',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-13-proveedores.pdf'
          },
          {
            nombre: 'ANEXO 14 Estudio del Sector',
            codigo: 'EHUI-SD-041-2025 A14',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-14-sector.pdf'
          },
          {
            nombre: 'ANEXO 15 Matriz de Riesgos',
            codigo: 'EHUI-SD-041-2025 A15',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-15-riesgos.pdf'
          },
          {
            nombre: 'ANEXO 16 Gestión de Activos',
            codigo: 'EHUI-SD-041-2025 A16',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-16-activos.pdf'
          },
          {
            nombre: 'ANEXO 18 Formulario Condiciones Técnicas',
            codigo: 'EHUI-SD-041-2025 A18',
            fechaCarga: '2025-01-15',
            url: '/documentos/anexo-18-condiciones.pdf'
          }
        ]
      };
      
      setDetalleContrato(mockDetalle);
    } catch (error) {
      console.error('Error al cargar detalle:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && contrato) {
      fetchContratoDetalle(contrato.id);
    }
  }, [isOpen, contrato]);

  if (!isOpen) return null;

  const getEstadoColor = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'ABIERTA': return 'bg-green-100 text-green-800 border-green-200';
      case 'CERRADA': return 'bg-red-100 text-red-800 border-red-200';
      case 'DESIERTA': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ANULADA': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header del Modal */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              {contrato?.codigo || 'Cargando...'}
            </h2>
            <p className="text-blue-100 mb-3">
              {contrato?.titulo || 'Cargando título...'}
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full border ${getEstadoColor(contrato?.estado)}`}>
                {contrato?.estado || 'N/A'}
              </span>
              <span className="bg-blue-500 bg-opacity-50 px-3 py-1 rounded">
                {contrato?.modalidad || 'No especificada'}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Cargando detalles...</span>
            </div>
          ) : detalleContrato ? (
            <div className="space-y-6">
              {/* Información General */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Información General</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Código:</span>
                      <span className="ml-2">{detalleContrato.codigo}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Estado:</span>
                      <span className={`ml-2 px-2 py-1 rounded text-xs ${getEstadoColor(detalleContrato.estado)}`}>
                        {detalleContrato.estado}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Modalidad:</span>
                      <span className="ml-2">{detalleContrato.modalidad}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Etapa:</span>
                      <span className="ml-2">{detalleContrato.etapa}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-3">Fechas y Valores</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">Fecha de apertura:</span>
                      <span className="ml-2">{detalleContrato.fechaApertura}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Fecha de cierre:</span>
                      <span className="ml-2">{detalleContrato.fechaCierre}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Cuantía:</span>
                      <span className="ml-2 font-semibold text-green-600">{detalleContrato.cuantia}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Descripción</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {detalleContrato.descripcion}
                </p>
              </div>

              {/* Documentos */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="mr-2" size={20} />
                  Documentos del Proceso ({detalleContrato.documentos?.length || 0})
                </h3>
                <div className="bg-white border rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Documento
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Código
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha de Carga
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Acciones
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {detalleContrato.documentos?.map((doc, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="flex items-center">
                                <FileText className="mr-3 text-gray-400" size={16} />
                                <span className="font-medium">{doc.nombre}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {doc.codigo}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {doc.fechaCarga}
                            </td>
                            <td className="px-6 py-4 text-sm">
                              <button
                                onClick={() => window.open(doc.url, '_blank')}
                                className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                              >
                                <Download size={14} className="mr-1" />
                                Descargar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No se pudieron cargar los detalles del contrato.</p>
            </div>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// 🟢 COMPONENTE PRINCIPAL
export default function ProveedoresContratistasPage() {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtros, setFiltros] = useState({
    busqueda: '',
    estado: '',
    fechaDesde: '',
    fechaHasta: ''
  });
  const [paginacion, setPaginacion] = useState({
    paginaActual: 1,
    registrosPorPagina: 10
  });
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  // 🔄 FUNCIÓN PARA OBTENER DATOS DE WORDPRESS
  const fetchContratosFromWordPress = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Obteniendo contratos...');
      const response = await fetch('/api/contratos', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Contratos obtenidos:', data.length);
      
      if (data && data.length > 0) {
        setContratos(data);
      } else {
        console.log('⚠️ No se encontraron contratos');
        setContratos([]);
      }
    } catch (error) {
      console.error('❌ Error al obtener contratos:', error);
      setError(`Error al cargar los datos: ${error.message}`);
      setContratos([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 AUTO-ACTUALIZACIÓN cada 30 segundos
  useEffect(() => {
    fetchContratosFromWordPress();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 Auto-actualizando datos cada 30 segundos...');
      fetchContratosFromWordPress();
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, []);

  const recargarDatos = () => {
    fetchContratosFromWordPress();
  };

  // 🔍 FUNCIÓN DE FILTRADO
  const contratosFiltrados = contratos.filter(contrato => {
    const cumpleBusqueda = !filtros.busqueda || 
      contrato.codigo?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      contrato.titulo?.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      contrato.descripcion?.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    const cumpleEstado = !filtros.estado || contrato.estado === filtros.estado;
    
    return cumpleBusqueda && cumpleEstado;
  });

  // 📄 PAGINACIÓN
  const indiceInicio = (paginacion.paginaActual - 1) * paginacion.registrosPorPagina;
  const contratosPaginados = contratosFiltrados.slice(
    indiceInicio, 
    indiceInicio + paginacion.registrosPorPagina
  );
  const totalPaginas = Math.ceil(contratosFiltrados.length / paginacion.registrosPorPagina);

  const cambiarPagina = (nuevaPagina) => {
    setPaginacion(prev => ({
      ...prev,
      paginaActual: nuevaPagina
    }));
  };

  const getEstadoColor = (estado) => {
    switch (estado?.toUpperCase()) {
      case 'ABIERTA': return 'bg-green-100 text-green-800 border-green-200';
      case 'CERRADA': return 'bg-red-100 text-red-800 border-red-200';
      case 'DESIERTA': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'ANULADA': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const abrirModal = (contrato) => {
    setContratoSeleccionado(contrato);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setContratoSeleccionado(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Proveedores y Contratistas
                </h1>
                <p className="mt-2 text-gray-600">
                  Consulta los procesos contractuales disponibles
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    🔄 Auto-actualización: 30s
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✅ WordPress conectado
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={recargarDatos}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    loading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {loading ? 'Actualizando...' : 'Actualizar datos'}
                </button>
                <Link
                  href="/"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Filter className="mr-2" size={20} />
              Filtros de búsqueda
            </h2>
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {mostrarFiltros ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="ml-1">{mostrarFiltros ? 'Ocultar' : 'Mostrar'} filtros</span>
            </button>
          </div>

          {mostrarFiltros && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Código, título o descripción..."
                    value={filtros.busqueda}
                    onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Todos los estados</option>
                  <option value="ABIERTA">ABIERTA</option>
                  <option value="CERRADA">CERRADA</option>
                  <option value="DESIERTA">DESIERTA</option>
                  <option value="ANULADA">ANULADA</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registros por página
                </label>
                <select
                  value={paginacion.registrosPorPagina}
                  onChange={(e) => setPaginacion(prev => ({ 
                    ...prev, 
                    registrosPorPagina: parseInt(e.target.value),
                    paginaActual: 1 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5 registros</option>
                  <option value={10}>10 registros</option>
                  <option value={20}>20 registros</option>
                  <option value={50}>50 registros</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setFiltros({
                      busqueda: '',
                      estado: '',
                      fechaDesde: '',
                      fechaHasta: ''
                    });
                    setPaginacion(prev => ({ ...prev, paginaActual: 1 }));
                  }}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Estadísticas */}
        <div className="mb-6 bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Mostrando {contratosPaginados.length} de {contratosFiltrados.length} contratos
                {filtros.busqueda || filtros.estado ? ' (filtrados)' : ''}
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Última actualización: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Cargando contratos...</span>
            </div>
          ) : contratosPaginados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {filtros.busqueda || filtros.estado 
                  ? 'No se encontraron contratos con los filtros aplicados.' 
                  : 'No hay contratos disponibles.'
                }
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Código
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha de cierre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cuantía
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {contratosPaginados.map((contrato, index) => (
                      <tr key={contrato.id || index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {contrato.codigo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs truncate" title={contrato.titulo}>
                            {contrato.titulo}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getEstadoColor(contrato.estado)}`}>
                            {contrato.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {contrato.fechaCierre}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          {contrato.cuantia}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => abrirModal(contrato)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
                          >
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPaginas > 1 && (
                <div className="bg-white px-4 py-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm text-gray-700">
                        Página <span className="font-medium">{paginacion.paginaActual}</span> de{' '}
                        <span className="font-medium">{totalPaginas}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => cambiarPagina(paginacion.paginaActual - 1)}
                        disabled={paginacion.paginaActual === 1}
                        className={`px-3 py-1 rounded text-sm ${
                          paginacion.paginaActual === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Anterior
                      </button>
                      
                      {/* Números de página */}
                      {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                        let numeroPage;
                        if (totalPaginas <= 5) {
                          numeroPage = i + 1;
                        } else if (paginacion.paginaActual <= 3) {
                          numeroPage = i + 1;
                        } else if (paginacion.paginaActual >= totalPaginas - 2) {
                          numeroPage = totalPaginas - 4 + i;
                        } else {
                          numeroPage = paginacion.paginaActual - 2 + i;
                        }
                        
                        return (
                          <button
                            key={numeroPage}
                            onClick={() => cambiarPagina(numeroPage)}
                            className={`px-3 py-1 rounded text-sm ${
                              paginacion.paginaActual === numeroPage
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {numeroPage}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => cambiarPagina(paginacion.paginaActual + 1)}
                        disabled={paginacion.paginaActual === totalPaginas}
                        className={`px-3 py-1 rounded text-sm ${
                          paginacion.paginaActual === totalPaginas
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        Siguiente
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón SECOP II */}
              <div className="bg-gray-50 px-6 py-4 border-t">
                <div className="text-center">
                  <a
                    href="https://www.colombiacompra.gov.co/secop-ii"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-sm"
                  >
                    <span className="mr-2">🔍</span>
                    Búsqueda de procesos contractuales Secop II
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <ContratoDetalleModal
        isOpen={modalAbierto}
        onClose={cerrarModal}
        contrato={contratoSeleccionado}
      />
    </div>
  );
}