'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProcesos } from '../../context/procesos-context';
import { Proceso, NuevoProceso, EstadoProceso } from '../../context/tipos-procesos';

interface FormularioProcesoProps {
  modo: 'crear' | 'editar';
  procesoId?: string;
}

export default function FormularioProceso({ modo, procesoId }: FormularioProcesoProps) {
  const { crearProceso, actualizarProceso, obtenerProcesoPorId, loading } = useProcesos();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Estado del formulario
  const [formData, setFormData] = useState<NuevoProceso>({
    codigo: '',
    objeto: '',
    descripcion: '',
    fechaPublicacion: '',
    fechaCierre: '',
    fechaApertura: '',
    estado: 'ABIERTA',
    modalidad: ''
  });
  
  // Cargar datos si estamos en modo editar
  useEffect(() => {
    if (modo === 'editar' && procesoId) {
      const proceso = obtenerProcesoPorId(procesoId);
      if (proceso) {
        // Formatear fechas para input type="date"
        const formatearFecha = (fechaStr: string) => {
          if (!fechaStr) return '';
          // Si la fecha ya tiene formato YYYY-MM-DD, devolverla tal cual
          if (/^\d{4}-\d{2}-\d{2}$/.test(fechaStr)) return fechaStr;
          
          const fecha = new Date(fechaStr);
          return fecha.toISOString().split('T')[0];
        };
        
        setFormData({
          codigo: proceso.codigo,
          objeto: proceso.objeto,
          descripcion: proceso.descripcion,
          fechaPublicacion: formatearFecha(proceso.fechaPublicacion),
          fechaCierre: formatearFecha(proceso.fechaCierre),
          fechaApertura: proceso.fechaApertura,
          estado: proceso.estado,
          modalidad: proceso.modalidad
        });
      } else {
        setError('No se encontró el proceso');
      }
    }
  }, [modo, procesoId, obtenerProcesoPorId]);
  
  // Manejar cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      let success = false;
      
      if (modo === 'crear') {
        success = await crearProceso(formData);
      } else if (modo === 'editar' && procesoId) {
        success = await actualizarProceso(procesoId, formData);
      }
      
      if (success) {
        router.push('/admin/procesos');
      } else {
        setError('Ha ocurrido un error al guardar el proceso');
      }
    } catch (err) {
      console.error(err);
      setError('Error en la operación');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-6">
        {modo === 'crear' ? 'Nuevo Proceso de Contratación' : 'Editar Proceso de Contratación'}
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Código */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código *
            </label>
            <input
              type="text"
              name="codigo"
              value={formData.codigo}
              onChange={handleChange}
              placeholder="Ej: EHUI-TD-032-2025"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Modalidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modalidad *
            </label>
            <select
              name="modalidad"
              value={formData.modalidad}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Seleccione...</option>
              <option value="Licitación pública">Licitación pública</option>
              <option value="Invitación directa">Invitación directa</option>
              <option value="Concurso de méritos">Concurso de méritos</option>
              <option value="Solicitud de ofertas">Solicitud de ofertas</option>
              <option value="Concurso abierto">Concurso abierto</option>
              <option value="Contratación directa">Contratación directa</option>
            </select>
          </div>
          
          {/* Objeto */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objeto *
            </label>
            <input
              type="text"
              name="objeto"
              value={formData.objeto}
              onChange={handleChange}
              placeholder="Título del proceso"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Descripción */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows={4}
              placeholder="Descripción detallada del proceso"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Fechas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Publicación *
            </label>
            <input
              type="date"
              name="fechaPublicacion"
              value={formData.fechaPublicacion}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Cierre *
            </label>
            <input
              type="date"
              name="fechaCierre"
              value={formData.fechaCierre}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha y Hora de Apertura *
            </label>
            <input
              type="datetime-local"
              name="fechaApertura"
              value={formData.fechaApertura}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          
          {/* Estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado *
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            >
              <option value="ABIERTA">ABIERTA</option>
              <option value="CERRADA">CERRADA</option>
              <option value="EVALUACIÓN">EVALUACIÓN</option>
              <option value="ANULADA">ANULADA</option>
            </select>
          </div>
        </div>
        
        {/* Botones */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => router.push('/admin/procesos')}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : modo === 'crear' ? 'Crear Proceso' : 'Guardar Cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}