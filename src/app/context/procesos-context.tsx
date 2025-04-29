'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { Proceso, NuevoProceso, ActualizarProceso, EstadoProceso } from './tipos-procesos';
import { useAuth } from './auth-context';

// Definir el tipo del contexto de procesos
interface ProcesosContextType {
  procesos: Proceso[];
  loading: boolean;
  error: string | null;
  crearProceso: (nuevoProceso: NuevoProceso) => Promise<boolean>;
  actualizarProceso: (id: string, datos: ActualizarProceso) => Promise<boolean>;
  eliminarProceso: (id: string) => Promise<boolean>;
  cambiarEstado: (id: string, nuevoEstado: EstadoProceso) => Promise<boolean>;
  obtenerProcesoPorId: (id: string) => Proceso | undefined;
}

// Crear el contexto
const ProcesosContext = createContext<ProcesosContextType | undefined>(undefined);

// Datos de ejemplo para procesos
const MOCK_PROCESOS: Proceso[] = [
  {
    id: '1',
    codigo: 'EHUI-TD-032-2025',
    objeto: 'Suministro de material eléctrico para redes de distribución',
    descripcion: 'Suministro, transporte hasta el centro de control, centro de gestión y sitios establecidos por ElectroHuila del mantenimiento preventivo, predictivo de la Electrificadora del Huila S.A.',
    fechaPublicacion: '2025-04-05',
    fechaCierre: '2025-04-25',
    fechaApertura: '2025-04-15 12:20:00',
    estado: 'ABIERTA',
    modalidad: 'Licitación pública',
    createdAt: '2025-04-01T10:30:00Z',
    updatedAt: '2025-04-01T10:30:00Z',
    createdBy: '1'
  },
  {
    id: '2',
    codigo: 'EHUI-SC-018-2025',
    objeto: 'Servicios de mantenimiento de instalaciones',
    descripcion: 'Prestar el servicio de brigadas de inspección para el control de pérdidas en los municipios de: Neiva, Zona: Norte, Centro, Occidente y Sur de ElectroHuila S.A E.S.P.',
    fechaPublicacion: '2025-04-08',
    fechaCierre: '2025-04-20',
    fechaApertura: '2025-04-08 13:17:20',
    estado: 'ABIERTA',
    modalidad: 'Invitación directa',
    createdAt: '2025-04-02T14:20:00Z',
    updatedAt: '2025-04-02T14:20:00Z',
    createdBy: '1'
  },
  {
    id: '3',
    codigo: 'EHUI-SC-016-2025',
    objeto: 'Desarrollo e implementación de software de gestión',
    descripcion: 'Prestar los servicios de verificación y consultoria técnica, incluido las correcciones, mantenimiento, y reposición de elementos del sistema de medición de los fronteras comerciales...',
    fechaPublicacion: '2025-04-01',
    fechaCierre: '2025-04-18',
    fechaApertura: '2025-04-08 17:06:00',
    estado: 'CERRADA',
    modalidad: 'Concurso de méritos',
    createdAt: '2025-03-20T09:15:00Z',
    updatedAt: '2025-04-19T11:45:00Z',
    createdBy: '2'
  },
  {
    id: '4',
    codigo: 'PC-2025-004',
    objeto: 'Servicio de transporte para personal técnico',
    descripcion: 'Servicio de transporte terrestre para el personal técnico que realiza mantenimiento en las redes de distribución en zonas urbanas y rurales del departamento del Huila.',
    fechaPublicacion: '2025-03-22',
    fechaCierre: '2025-04-15',
    fechaApertura: '2025-03-22 09:30:00',
    estado: 'EVALUACIÓN',
    modalidad: 'Solicitud de ofertas',
    createdAt: '2025-03-15T16:40:00Z',
    updatedAt: '2025-04-16T10:20:00Z',
    createdBy: '1'
  },
  {
    id: '5',
    codigo: 'EHUI-SAF-013-2025',
    objeto: 'Prestar el servicio de vigilancia y seguridad',
    descripcion: 'Prestar el servicio de vigilancia y seguridad privada permanente para todos los bienes muebles e inmuebles propiedad de la Electrificadora del Huila S.A. E.S.P...',
    fechaPublicacion: '2025-03-15',
    fechaCierre: '2025-04-05',
    fechaApertura: '2025-04-03 10:26:00',
    estado: 'ANULADA',
    modalidad: 'Licitación pública',
    createdAt: '2025-03-10T08:30:00Z',
    updatedAt: '2025-04-06T14:15:00Z',
    createdBy: '2'
  }
];

export function ProcesosProvider({ children }: { children: React.ReactNode }) {
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  // Cargar datos al iniciar
  useEffect(() => {
    // En un sistema real, aquí cargaríamos datos desde una API
    const cargarProcesos = async () => {
      try {
        // Simulamos una llamada a API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Recuperar datos del localStorage o usar datos de ejemplo
        const storedProcesos = localStorage.getItem('procesos');
        if (storedProcesos) {
          setProcesos(JSON.parse(storedProcesos));
        } else {
          setProcesos(MOCK_PROCESOS);
          localStorage.setItem('procesos', JSON.stringify(MOCK_PROCESOS));
        }
        
        setError(null);
      } catch (err) {
        setError('Error al cargar los procesos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    cargarProcesos();
  }, []);
  
  // Función para crear un nuevo proceso
  const crearProceso = async (nuevoProceso: NuevoProceso): Promise<boolean> => {
    if (!user) {
      setError('Debe iniciar sesión para realizar esta acción');
      return false;
    }
    
    try {
      setLoading(true);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Crear el nuevo proceso
      const now = new Date().toISOString();
      const proceso: Proceso = {
        ...nuevoProceso,
        id: String(Date.now()), // Generamos un ID único
        createdAt: now,
        updatedAt: now,
        createdBy: user.id
      };
      
      // Actualizar estado y localStorage
      const nuevosProcesos = [...procesos, proceso];
      setProcesos(nuevosProcesos);
      localStorage.setItem('procesos', JSON.stringify(nuevosProcesos));
      
      setError(null);
      return true;
    } catch (err) {
      setError('Error al crear el proceso');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Función para actualizar un proceso existente
  const actualizarProceso = async (id: string, datos: ActualizarProceso): Promise<boolean> => {
    if (!user) {
      setError('Debe iniciar sesión para realizar esta acción');
      return false;
    }
    
    try {
      setLoading(true);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Buscar el proceso a actualizar
      const indice = procesos.findIndex(p => p.id === id);
      if (indice === -1) {
        setError('Proceso no encontrado');
        return false;
      }
      
      // Crear la versión actualizada
      const procesoActualizado: Proceso = {
        ...procesos[indice],
        ...datos,
        updatedAt: new Date().toISOString()
      };
      
      // Actualizar estado y localStorage
      const nuevosProcesos = [...procesos];
      nuevosProcesos[indice] = procesoActualizado;
      setProcesos(nuevosProcesos);
      localStorage.setItem('procesos', JSON.stringify(nuevosProcesos));
      
      setError(null);
      return true;
    } catch (err) {
      setError('Error al actualizar el proceso');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Función para eliminar un proceso
  const eliminarProceso = async (id: string): Promise<boolean> => {
    if (!user) {
      setError('Debe iniciar sesión para realizar esta acción');
      return false;
    }
    
    try {
      setLoading(true);
      
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filtrar para eliminar el proceso
      const nuevosProcesos = procesos.filter(p => p.id !== id);
      
      // Verificar si se encontró el proceso
      if (nuevosProcesos.length === procesos.length) {
        setError('Proceso no encontrado');
        return false;
      }
      
      // Actualizar estado y localStorage
      setProcesos(nuevosProcesos);
      localStorage.setItem('procesos', JSON.stringify(nuevosProcesos));
      
      setError(null);
      return true;
    } catch (err) {
      setError('Error al eliminar el proceso');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Función específica para cambiar el estado de un proceso
  const cambiarEstado = async (id: string, nuevoEstado: EstadoProceso): Promise<boolean> => {
    return actualizarProceso(id, { estado: nuevoEstado });
  };
  
  // Función para obtener un proceso por ID
  const obtenerProcesoPorId = (id: string): Proceso | undefined => {
    return procesos.find(p => p.id === id);
  };
  
  // Valores que se pasan a través del contexto
  const value = {
    procesos,
    loading,
    error,
    crearProceso,
    actualizarProceso,
    eliminarProceso,
    cambiarEstado,
    obtenerProcesoPorId
  };
  
  return <ProcesosContext.Provider value={value}>{children}</ProcesosContext.Provider>;
}

// Hook para usar el contexto de procesos
export function useProcesos() {
  const context = useContext(ProcesosContext);
  if (context === undefined) {
    throw new Error('useProcesos debe usarse dentro de un ProcesosProvider');
  }
  return context;
}