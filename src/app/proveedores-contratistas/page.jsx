'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, Search, Filter, X, Eye, Clock } from 'lucide-react';

// Modal para mostrar detalles de contratación
const ContratoDetalleModal = ({ isOpen, onClose, contrato }) => {
  if (!isOpen || !contrato) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{contrato.codigo}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                contrato.estado === 'ABIERTA' ? 'bg-green-100 text-green-800' :
                contrato.estado === 'CERRADA' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {contrato.estado}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Objeto del Contrato</h3>
            <p className="text-gray-700 leading-relaxed">{contrato.objeto}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Fecha de Apertura</h4>
              <p className="text-gray-600">{contrato.fecha_apertura_formateada}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Estado</h4>
              <p className="text-gray-600">{contrato.estado}</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Documentos</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="text-red-500" size={20} />
                  <span className="text-gray-700">Pliego de Condiciones</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="text-red-500" size={20} />
                  <span className="text-gray-700">Estudios Previos</span>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Cronograma</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Publicación</p>
                  <p className="text-sm text-gray-600">Completado</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Calendar size={16} className="inline mr-1" />
                  Completado
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Presentación de Propuestas</p>
                  <p className="text-sm text-gray-600">En curso</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Clock size={16} className="inline mr-1" />
                  Activo
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Evaluación</p>
                  <p className="text-sm text-gray-600">Pendiente</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Calendar size={16} className="inline mr-1" />
                  Pendiente
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const ContratacionesComponent = () => {
  const [contrataciones, setContrataciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtros
  const [estado, setEstado] = useState('ABIERTA');
  const [buscar, setBuscar] = useState('');
  const [registrosPorPagina, setRegistrosPorPagina] = useState(10);
  
  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  
  // Modal
  const [modalAbierto, setModalAbierto] = useState(false);
  const [contratoSeleccionado, setContratoSeleccionado] = useState(null);
  
  // Estados disponibles
  const [estados, setEstados] = useState([
    { valor: 'ABIERTA', nombre: 'ABIERTA' },
    { valor: 'CERRADA', nombre: 'CERRADA' },
    { valor: 'ANULADA', nombre: 'ANULADA' }
  ]);

  // Función para cargar estados
  const cargarEstados = async () => {
    try {
      const response = await fetch('https://electrohuila.com.co/contratacion/wp-json/electrohuila/v1/contrataciones/estados');
      const data = await response.json();
      
      if (data.success) {
        setEstados(data.estados);
      }
    } catch (error) {
      console.error('Error al cargar estados:', error);
      // Mantener estados por defecto si hay error
    }
  };

  // Función para cargar contrataciones
  const cargarContrataciones = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        estado: estado,
        buscar: buscar,
        pagina: paginaActual.toString(),
        registros: registrosPorPagina.toString()
      });
      
      const response = await fetch(`https://electrohuila.com.co/contratacion/wp-json/electrohuila/v1/contrataciones?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setContrataciones(data.contrataciones || []);
        setTotalPaginas(Math.ceil(data.total / registrosPorPagina));
      } else {
        throw new Error(data.error || 'Error al cargar contrataciones');
      }
    } catch (err) {
      console.error('Error al cargar contrataciones:', err);
      setError(err.message);
      // Cargar datos de ejemplo en caso de error
      cargarDatosEjemplo();
    } finally {
      setLoading(false);
    }
  };

  // Función para cargar datos de ejemplo
  const cargarDatosEjemplo = () => {
    const ejemplos = [
      {
        id: 1,
        codigo: 'EHUI-SD-057-2025',
        objeto: 'Selección de un Inversionista para el diseño, suministro y construcción de la subestación Huila Norte 115 kV, dos transformadores 230/115 kV, líneas de transmisión asociadas a Huila Norte 115 kV y la línea de transmisión Huila – Oriente a 115 kV.',
        estado: 'ABIERTA',
        fecha_apertura: '2025-07-07 13:37:00',
        fecha_apertura_formateada: '2025-07-07 13:37:00'
      },
      {
        id: 2,
        codigo: 'EHUI-SD-041-2025',
        objeto: 'Prestar el servicio de telecomunicaciones de datos requeridos para comunicar los reconectadores eléctricos con el centro de control de la Electrificadora del Huila S.A. E.S.P.',
        estado: 'ABIERTA',
        fecha_apertura: '2025-07-02 14:32:00',
        fecha_apertura_formateada: '2025-07-02 14:32:00'
      }
    ];
    
    setContrataciones(ejemplos);
    setTotalPaginas(1);
  };

  // Efectos
  useEffect(() => {
    cargarEstados();
  }, []);

  useEffect(() => {
    cargarContrataciones();
  }, [estado, buscar, paginaActual, registrosPorPagina]);

  // Función para ver detalles
  const verDetalle = (contrato) => {
    setContratoSeleccionado(contrato);
    setModalAbierto(true);
  };

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    try {
      const fechaObj = new Date(fecha);
      return fechaObj.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return fecha;
    }
  };

  // Función para obtener color del estado
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case 'ABIERTA':
        return 'bg-green-100 text-green-800';
      case 'CERRADA':
        return 'bg-red-100 text-red-800';
      case 'ANULADA':
        return 'bg-gray-100 text-gray-800';
      case 'EN_EVALUACION':
        return 'bg-yellow-100 text-yellow-800';
      case 'ADJUDICADA':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para manejar búsqueda
  const manejarBusqueda = (e) => {
    e.preventDefault();
    setPaginaActual(1);
    cargarContrataciones();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Procesos de <span className="text-orange-500">Contratación</span>
        </h1>
        <nav className="text-sm text-gray-500">
          <span>Inicio</span> | <span>Procesos de Contratación</span>
        </nav>
      </div>

      {/* Filtros */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Estado:</label>
          <select 
            value={estado} 
            onChange={(e) => {
              setEstado(e.target.value);
              setPaginaActual(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {estados.map(est => (
              <option key={est.valor} value={est.valor}>{est.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Mostrar</label>
          <select 
            value={registrosPorPagina} 
            onChange={(e) => {
              setRegistrosPorPagina(Number(e.target.value));
              setPaginaActual(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-700">registros</span>
        </div>

        <div className="flex-1 max-w-md">
          <form onSubmit={manejarBusqueda} className="flex gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error: {error}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Tabla de contrataciones */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Objeto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Fecha Apertura
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : contrataciones.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                contrataciones.map((contrato) => (
                  <tr key={contrato.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {contrato.codigo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={contrato.objeto}>
                        {contrato.objeto}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${obtenerColorEstado(contrato.estado)}`}>
                        {contrato.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatearFecha(contrato.fecha_apertura)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => verDetalle(contrato)}
                        className="text-blue-600 hover:text-blue-900 font-medium"
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="mt-6 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button
              onClick={() => setPaginaActual(Math.max(1, paginaActual - 1))}
              disabled={paginaActual === 1}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            
            {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setPaginaActual(pageNum)}
                  className={`px-3 py-2 text-sm rounded-md ${
                    paginaActual === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setPaginaActual(Math.min(totalPaginas, paginaActual + 1))}
              disabled={paginaActual === totalPaginas}
              className="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Siguiente
            </button>
          </nav>
        </div>
      )}

      {/* Botón de Secop II */}
      <div className="mt-8">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
          Búsqueda de procesos contractuales Secop II
        </button>
      </div>

      {/* Modal de detalles */}
      <ContratoDetalleModal 
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        contrato={contratoSeleccionado}
      />
    </div>
  );
};

export default ContratacionesComponent;