"use client";

import React, { useState, useEffect } from 'react';
import { Search, Filter, FileText, Download, Calendar, Building, User, MapPin, X, ChevronDown, ChevronUp } from 'lucide-react';

const ContratacionesElectrohuila = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [estados, setEstados] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: 'ABIERTA',
    buscar: '',
    pagina: 1,
    registrosPorPagina: 10
  });
  const [cargando, setCargando] = useState(false);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [modalDetalle, setModalDetalle] = useState(null);
  const [contratacionDetalle, setContratacionDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);

  const API_BASE = 'https://electrohuila.com.co/contratacion/wp-json/electrohuila/v1';

  // Cargar estados disponibles
  useEffect(() => {
    const cargarEstados = async () => {
      try {
        console.log('=== CARGANDO ESTADOS ===');
        const response = await fetch(`${API_BASE}/contrataciones/estados`);
        const data = await response.json();
        console.log('Estados recibidos:', data);
        
        if (data.success) {
          setEstados(data.estados);
          console.log('✅ Estados cargados:', data.estados);
        } else {
          console.error('❌ Error cargando estados:', data);
        }
      } catch (error) {
        console.error('❌ Error de red cargando estados:', error);
      }
    };
    cargarEstados();
  }, []);

  // Cargar contrataciones
  const cargarContrataciones = async () => {
    setCargando(true);
    try {
      const params = new URLSearchParams({
        estado: filtros.estado,
        buscar: filtros.buscar,
        pagina: filtros.pagina.toString(), // ASEGURAR QUE SEA STRING
        registros: filtros.registrosPorPagina.toString() // ASEGURAR QUE SEA STRING
      });

      const url = `${API_BASE}/contrataciones?${params}`;
      console.log('=== CARGANDO CONTRATACIONES ===');
      console.log('URL completa:', url);
      console.log('Filtros actuales:', filtros);
      
      const response = await fetch(url);
      const data = await response.json();
      
      console.log('Respuesta completa:', data);
      console.log('Página solicitada:', filtros.pagina);
      console.log('Página recibida:', data.pagina);
      console.log('Total registros:', data.total);
      console.log('Registros en esta página:', data.contrataciones?.length);
      
      if (data.success) {
        setContrataciones(data.contrataciones || []);
        setTotalRegistros(data.total || 0);
        console.log('✅ Datos cargados correctamente');
      } else {
        console.error('❌ Error en respuesta API:', data);
      }
    } catch (error) {
      console.error('❌ Error de red:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    console.log('=== EFECTO ACTIVADO ===');
    console.log('Filtros que activaron el efecto:', filtros);
    cargarContrataciones();
  }, [filtros]); // Se ejecuta cada vez que cambian los filtros

  // Cargar detalle de contratación
  const cargarDetalle = async (id) => {
    setCargandoDetalle(true);
    setModalDetalle(id);
    setContratacionDetalle(null);
    
    try {
      console.log('Cargando detalle ID:', id);
      const response = await fetch(`${API_BASE}/contratacion/${id}`);
      const data = await response.json();
      
      console.log('Detalle cargado:', data);
      
      if (data.success) {
        setContratacionDetalle(data.contratacion);
      } else {
        console.error('Error cargando detalle:', data);
        alert('Error al cargar el detalle del contrato');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar el detalle');
    } finally {
      setCargandoDetalle(false);
    }
  };

  const cerrarModal = () => {
    setModalDetalle(null);
    setContratacionDetalle(null);
  };

  const handleFiltroChange = (campo, valor) => {
    console.log('=== CAMBIO DE FILTRO ===');
    console.log(`Campo: ${campo}`);
    console.log(`Valor anterior:`, filtros[campo]);
    console.log(`Valor nuevo:`, valor);
    
    const nuevosFiltros = {
      ...filtros,
      [campo]: valor,
      pagina: campo === 'pagina' ? valor : 1 // Solo resetear página si no es navegación de página
    };
    
    console.log('Filtros actualizados:', nuevosFiltros);
    setFiltros(nuevosFiltros);
  };

  const getEstadoColor = (estado) => {
    const colores = {
      'ABIERTA': 'bg-green-100 text-green-800 border-green-200',
      'CERRADA': 'bg-gray-100 text-gray-800 border-gray-200',
      'DESIERTA': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'ANULADA': 'bg-red-100 text-red-800 border-red-200'
    };
    return colores[estado] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const DocumentoItem = ({ documento }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
      <div className="flex items-center space-x-3">
        <FileText className="h-5 w-5 text-red-500" />
        <div>
          <p className="font-medium text-gray-900">{documento.nombre}</p>
          <p className="text-sm text-gray-500">{documento.descripcion}</p>
          <p className="text-xs text-gray-400">
            Cargado: {formatearFecha(documento.fecha_carga)}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        {documento.url && documento.url !== '#' ? (
          <>
            <button
              onClick={() => window.open(documento.url, '_blank')}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 flex items-center space-x-1"
            >
              <FileText className="h-4 w-4" />
              <span>Ver</span>
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = documento.url;
                link.download = documento.nombre;
                link.click();
              }}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 flex items-center space-x-1"
            >
              <Download className="h-4 w-4" />
              <span>Descargar</span>
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-400">No disponible</span>
        )}
      </div>
    </div>
  );

  const FaseItem = ({ fase }) => (
    <div className="flex items-center space-x-4 p-3 border rounded-lg">
      <div className={`w-4 h-4 rounded-full ${
        fase.estado === 'completado' ? 'bg-green-500' : 
        fase.estado === 'activo' ? 'bg-blue-500' : 'bg-gray-300'
      }`}></div>
      <div className="flex-1">
        <h4 className="font-medium">{fase.fase}</h4>
        <p className="text-sm text-gray-500">
          {formatearFecha(fase.fecha_inicio)} - {formatearFecha(fase.fecha_fin)}
        </p>
      </div>
      <span className={`px-2 py-1 rounded text-xs ${
        fase.estado === 'completado' ? 'bg-green-100 text-green-800' :
        fase.estado === 'activo' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
      }`}>
        {fase.estado === 'completado' ? 'Completado' :
         fase.estado === 'activo' ? 'En Curso' : 'Pendiente'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Contrataciones Electrohuila</h1>
            <div className="flex items-center space-x-4">
              {/* BOTÓN TRÁMITES AGREGADO AQUÍ */}
              <button
                onClick={() => window.location.href = '/tramites-proveedores'}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 flex items-center space-x-2 transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Trámites</span>
              </button>
              <div className="text-sm text-gray-500">
                Total: {totalRegistros.toLocaleString()} contratos
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Mostrar:</span>
                <select
                  value={filtros.registrosPorPagina}
                  onChange={(e) => {
                    console.log('📊 Cambiando registros por página a:', e.target.value);
                    handleFiltroChange('registrosPorPagina', parseInt(e.target.value));
                  }}
                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
                <span className="text-sm text-gray-600">registros</span>
              </div>
            </div>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => {
                  console.log('🔄 Cambiando estado a:', e.target.value);
                  handleFiltroChange('estado', e.target.value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {estados.length > 0 ? (
                  estados.map((estado) => (
                    <option key={estado.valor} value={estado.valor}>
                      {estado.nombre}
                    </option>
                  ))
                ) : (
                  // FALLBACK SI NO CARGAN LOS ESTADOS
                  <>
                    <option value="TODOS">Todos los Estados</option>
                    <option value="ABIERTA">Abierta</option>
                    <option value="CERRADA">Cerrada</option>
                    <option value="DESIERTA">Desierta</option>
                    <option value="ANULADA">Anulada</option>
                  </>
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={filtros.buscar}
                  onChange={(e) => handleFiltroChange('buscar', e.target.value)}
                  placeholder="Buscar por código o descripción..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Contrataciones */}
        <div className="bg-white rounded-lg shadow-sm">
          {cargando ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-500">Cargando contrataciones...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objeto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Apertura
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contrataciones.map((contrato, index) => (
                    <tr key={`${contrato.id}-${index}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contrato.codigo}</div>
                        <div className="text-xs text-gray-500">{contrato.tabla_origen}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {contrato.objeto}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${getEstadoColor(contrato.estado)}`}>
                          {contrato.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatearFecha(contrato.fecha_apertura)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => cargarDetalle(contrato.id)}
                          className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                        >
                          <FileText className="h-4 w-4" />
                          <span>Ver Detalle</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {contrataciones.length === 0 && !cargando && (
                <div className="p-8 text-center text-gray-500">
                  No se encontraron contrataciones con los filtros aplicados.
                </div>
              )}
            </div>
          )}

          {/* Paginación */}
          {totalRegistros > filtros.registrosPorPagina && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Mostrando {((filtros.pagina - 1) * filtros.registrosPorPagina) + 1} a{' '}
                  {Math.min(filtros.pagina * filtros.registrosPorPagina, totalRegistros)} de{' '}
                  {totalRegistros} resultados
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      console.log(`Navegando a página anterior: ${filtros.pagina - 1}`);
                      handleFiltroChange('pagina', filtros.pagina - 1);
                    }}
                    disabled={filtros.pagina <= 1}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Anterior
                  </button>
                  
                  {/* Números de página */}
                  {Array.from({ length: Math.min(10, Math.ceil(totalRegistros / filtros.registrosPorPagina)) }, (_, i) => {
                    const startPage = Math.max(1, filtros.pagina - 5);
                    const pageNum = startPage + i;
                    const maxPage = Math.ceil(totalRegistros / filtros.registrosPorPagina);
                    
                    if (pageNum <= maxPage) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            console.log(`Navegando a página: ${pageNum}`);
                            handleFiltroChange('pagina', pageNum);
                          }}
                          className={`px-3 py-1 border rounded text-sm transition-colors ${
                            pageNum === filtros.pagina
                              ? 'bg-blue-500 text-white border-blue-500'
                              : 'border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  <button
                    onClick={() => {
                      console.log(`Navegando a página siguiente: ${filtros.pagina + 1}`);
                      handleFiltroChange('pagina', filtros.pagina + 1);
                    }}
                    disabled={filtros.pagina >= Math.ceil(totalRegistros / filtros.registrosPorPagina)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      {modalDetalle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header del Modal */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {cargandoDetalle ? 'Cargando...' : contratacionDetalle?.codigo || 'Detalle de Contratación'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Contenido del Modal */}
            <div className="p-6">
              {cargandoDetalle ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Cargando detalle...</p>
                </div>
              ) : contratacionDetalle ? (
                <div className="space-y-6">
                  {/* Información General */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Información General
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Empresa:</span>
                          <span className="text-sm font-medium">{contratacionDetalle.empresa}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Responsable:</span>
                          <span className="text-sm font-medium">{contratacionDetalle.responsable}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Etapa:</span>
                          <span className="text-sm font-medium">{contratacionDetalle.etapa}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Fecha Apertura:</span>
                          <span className="text-sm font-medium">
                            {formatearFecha(contratacionDetalle.fecha_apertura)}
                          </span>
                        </div>
                        {contratacionDetalle.fecha_cierre && (
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">Fecha Cierre:</span>
                            <span className="text-sm font-medium">
                              {formatearFecha(contratacionDetalle.fecha_cierre)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Descripción
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {contratacionDetalle.objeto}
                      </p>
                    </div>
                  </div>

                  {/* Documentos */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                      Documentos ({contratacionDetalle.documentos?.length || 0})
                    </h3>
                    {contratacionDetalle.documentos && contratacionDetalle.documentos.length > 0 ? (
                      <div className="grid gap-3">
                        {contratacionDetalle.documentos.map((documento) => (
                          <DocumentoItem key={documento.id} documento={documento} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No hay documentos disponibles para esta contratación.
                      </div>
                    )}
                  </div>

                  {/* Cronograma */}
                  {contratacionDetalle.cronograma && contratacionDetalle.cronograma.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                        Cronograma
                      </h3>
                      <div className="space-y-3">
                        {contratacionDetalle.cronograma.map((fase, index) => (
                          <FaseItem key={index} fase={fase} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Error al cargar el detalle de la contratación.
                </div>
              )}
            </div>

            {/* Footer del Modal con Botón Cerrar */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
              <button
                onClick={cerrarModal}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Cerrar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContratacionesElectrohuila;