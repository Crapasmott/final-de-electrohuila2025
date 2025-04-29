// Definimos los tipos de estado para procesos de contratación
export type EstadoProceso = 'ABIERTA' | 'CERRADA' | 'EVALUACIÓN' | 'ANULADA';

// Definimos la estructura de un proceso de contratación
export interface Proceso {
  id: string;
  codigo: string;
  objeto: string;
  descripcion: string;
  fechaPublicacion: string;
  fechaCierre: string;
  fechaApertura: string;
  estado: EstadoProceso;
  modalidad: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

// Interfaz para crear un nuevo proceso
export interface NuevoProceso {
  codigo: string;
  objeto: string;
  descripcion: string;
  fechaPublicacion: string;
  fechaCierre: string;
  fechaApertura: string;
  estado: EstadoProceso;
  modalidad: string;
}

// Interfaz para actualizar un proceso existente
export interface ActualizarProceso extends Partial<NuevoProceso> {}