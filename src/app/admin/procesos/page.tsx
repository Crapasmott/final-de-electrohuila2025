'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProcesos } from '../../context/procesos-context';
import { useAuth } from '../../context/auth-context';
import { EstadoProceso } from '../../context/tipos-procesos';

export default function ListadoProcesos() {
  const { procesos, loading, error, cambiarEstado, eliminarProceso } = useProcesos();
  const { user, logout } = useAuth();
  const router = useRouter();
  const [filtroEstado, setFiltroEstado] = useState<EstadoProceso | ''>('');
  const [filtroCodigo, setFiltroCodigo] = useState('');
  const [procesoCambiarEstado, setProcesoCambiarEstado] = useState<string | null>(null);
  const [procesoEliminar, setProcesoEliminar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Redireccionar si no está autenticado
  if (!user) {
    router.push('/login');
    return null;
  }
  
  // Aplicar filtros a los procesos
  const procesosFiltrados = procesos.filter(proceso => {
    const coincideEstado = !filtroEstado || proceso.estado === filtroEstado;
    const coincideCodigo = !filtroCodigo || 
      proceso.codigo.toLowerCase().includes(filtroCodigo.toLowerCase()) ||
      proceso.objeto.toLowerCase().includes(filtroCodigo.toLowerCase());
    
    return coincideEstado && coincideCodigo;
  });
  
  // Manejar el cambio de estado de un proceso
  const handleCambiarEstado = async (id: string, nuevoEstado: EstadoProceso) => {
    setIsLoading(true);
    
    try {
      const success = await cambiarEstado(id, nuevoEstado);
      if (success) {
        setProcesoCambiarEstado(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Manejar la eliminación de un proceso
  const handleEliminarProceso = async (id: string) => {
    setIsLoading(true);
    
    try {
      const success = await eliminarProceso(id);
      if (success) {
        setProcesoEliminar(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Color según el estado del proceso
  const getEstadoColor = (estado: EstadoProceso) => {
    switch (estado) {
      case 'ABIERTA':
        return 'bg-green-100 text-green-800';
      case 'CERRADA':
        return 'bg-red-100 text-red-800';
      case 'EVALUACIÓN':
        return 'bg-yellow-100 text-yellow-800';
      case 'ANULADA':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  // Formatear fecha para mostrar
  const formatearFecha = (fechaStr: string) => {
    if (!fechaStr) return '';
    const fecha = new Date(fechaStr);
    return fecha.toLocaleDateString('es-ES');
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Gestión de Procesos de Contratación</h1>
          <div className="flex items-center space-x-4">
            <span>Hola, {user.name}</span>
            <button 
              onClick={() => router.push('/admin/procesos/nuevo')}
              className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded"
            >
              Nuevo Proceso
            </button>
            <button 
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </nav>
      
      {/* Contenido principal */}
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Procesos de Contratación</h2>
          
          {/* Filtros */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buscar por código o nombre
              </label>
              <input
                type="text"
                value={filtroCodigo}
                onChange={(e) => setFiltroCodigo(e.target.value)}
                placeholder="Ej: EHUI-TD-032"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por estado
              </label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value as EstadoProceso | '')}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Todos</option>
                <option value="ABIERTA">ABIERTA</option>
                <option value="CERRADA">CERRADA</option>
                <option value="EVALUACIÓN">EVALUACIÓN</option>
                <option value="ANULADA">ANULADA</option>
              </select>
            </div>
          </div>
          
          {/* Tabla de procesos */}
          {loading ? (
            <div className="text-center py-4">Cargando procesos...</div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          ) : procesosFiltrados.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              No se encontraron procesos con los filtros aplicados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Código
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Objeto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Publicación
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cierre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {procesosFiltrados.map((proceso) => (
                    <tr key={proceso.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {proceso.codigo}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {proceso.objeto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatearFecha(proceso.fechaPublicacion)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatearFecha(proceso.fechaCierre)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getEstadoColor(proceso.estado)}`}>
                          {proceso.estado}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => router.push(`/admin/procesos/${proceso.id}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Ver
                          </button>
                          <button
                            onClick={() => router.push(`/admin/procesos/editar/${proceso.id}`)}
                            className="text-yellow-600 hover:text-yellow-900"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setProcesoCambiarEstado(proceso.id)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Estado
                          </button>
                          <button
                            onClick={() => setProcesoEliminar(proceso.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Modal para cambiar el estado */}
      {procesoCambiarEstado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Cambiar Estado</h3>
            <p className="mb-4">Seleccione el nuevo estado para el proceso:</p>
            
            <div className="mb-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => handleCambiarEstado(procesoCambiarEstado, 'ABIERTA')}
                className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                disabled={isLoading}
              >
                ABIERTA
              </button>
              <button
                onClick={() => handleCambiarEstado(procesoCambiarEstado, 'CERRADA')}
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                disabled={isLoading}
              >
                CERRADA
              </button>
              <button
                onClick={() => handleCambiarEstado(procesoCambiarEstado, 'EVALUACIÓN')}
                className="py-2 px-4 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                disabled={isLoading}
              >
                EVALUACIÓN
              </button>
              <button
                onClick={() => handleCambiarEstado(procesoCambiarEstado, 'ANULADA')}
                className="py-2 px-4 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:opacity-50"
                disabled={isLoading}
              >
                ANULADA
              </button>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setProcesoCambiarEstado(null)}
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mr-2"
                disabled={isLoading}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para confirmar eliminación */}
      {procesoEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Confirmar Eliminación</h3>
            <p className="mb-4">¿Está seguro de que desea eliminar este proceso? Esta acción no se puede deshacer.</p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setProcesoEliminar(null)}
                className="py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 mr-2"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                onClick={() => handleEliminarProceso(procesoEliminar)}
                className="py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Eliminando...' : 'Eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}