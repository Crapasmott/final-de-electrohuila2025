'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, Plus, Search, Filter, X, LogOut, Save, X as XIcon } from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  
  // Estado para los procesos de contratación
  const [procesos, setProcesos] = useState([]);
  const [procesoSeleccionado, setProcesoSeleccionado] = useState(null);
  
  // Estado para el formulario
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  
  // Estado para filtros
  const [filtroEstado, setFiltroEstado] = useState('');
  const [busqueda, setBusqueda] = useState('');
  
  // Valores del formulario
  const [formValues, setFormValues] = useState({
    id: '',
    title: '',
    descripcion: '',
    fecha_publicacion: '',
    fecha_cierre: '',
    fecha_apertura: '',
    estado: 'Abierto',
    modalidad: 'Licitación pública',
    url: ''
  });
  
  // Cargar datos iniciales (simulación)
  useEffect(() => {
    // En una implementación real, estos datos vendrían de una API
    const datos = [
      {
        id: 'EHUI-TD-032-2025',
        title: 'Suministro de material eléctrico para redes de distribución',
        descripcion: 'Suministro, transporte hasta el centro de control, centro de gestión y sitios establecidos por ElectroHuila del mantenimiento preventivo, predictivo de la Electrificadora del Huila S.A.',
        fecha_publicacion: '05/04/2025',
        fecha_cierre: '25/04/2025',
        fecha_apertura: '2025-04-15 12:20:00',
        estado: 'Abierto',
        modalidad: 'Licitación pública',
        url: '/contratos/EHUI-TD-032-2025'
      },
      {
        id: 'EHUI-SC-018-2025',
        title: 'Servicios de mantenimiento de instalaciones',
        descripcion: 'Prestar el servicio de brigadas de inspección para el control de pérdidas en los municipios de: Neiva, Zona: Norte, Centro, Occidente y Sur de ElectroHuila S.A E.S.P.',
        fecha_publicacion: '08/04/2025',
        fecha_cierre: '20/04/2025',
        fecha_apertura: '2025-04-08 13:17:20',
        estado: 'Abierto',
        modalidad: 'Invitación directa',
        url: '/contratos/EHUI-SC-018-2025'
      },
      {
        id: 'EHUI-SC-016-2025',
        title: 'Desarrollo e implementación de software de gestión',
        descripcion: 'Prestar los servicios de verificación y consultoria técnica, incluido las correcciones, mantenimiento, y reposición de elementos del sistema de medición de los fronteras comerciales, de distribución, de generación y puntas de medición de control de transformadores de ElectroHuila S.A E.S.P (69) y de reporte al ASIC, actuados o actuables, todos cumplimiento a lo indicado en el 2017 (Código de Medida), incluido los pruebas de rutina a los puntos de medición de tensión 4, 3, 2.',
        fecha_publicacion: '01/04/2025',
        fecha_cierre: '18/04/2025',
        fecha_apertura: '2025-04-08 17:06:00',
        estado: 'Abierto',
        modalidad: 'Concurso de méritos',
        url: '/contratos/EHUI-SC-016-2025'
      }
    ];
    
    setProcesos(datos);
  }, []);
  
  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };
  
  // Función para filtrar procesos
  const procesosFiltrados = procesos.filter(proceso => {
    const coincideEstado = filtroEstado === '' || proceso.estado === filtroEstado;
    const coincideBusqueda = 
      busqueda === '' || 
      proceso.id.toLowerCase().includes(busqueda.toLowerCase()) ||
      proceso.title.toLowerCase().includes(busqueda.toLowerCase()) ||
      proceso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return coincideEstado && coincideBusqueda;
  });
  
  // Función para crear un nuevo proceso
  const crearProceso = () => {
    setFormValues({
      id: '',
      title: '',
      descripcion: '',
      fecha_publicacion: '',
      fecha_cierre: '',
      fecha_apertura: '',
      estado: 'Abierto',
      modalidad: 'Licitación pública',
      url: ''
    });
    setModoEdicion(false);
    setMostrarFormulario(true);
  };
  
  // Función para editar un proceso existente
  const editarProceso = (proceso) => {
    setFormValues({...proceso});
    setModoEdicion(true);
    setMostrarFormulario(true);
  };
  
  // Función para eliminar un proceso
  const eliminarProceso = (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este proceso de contratación?')) {
      setProcesos(procesos.filter(proceso => proceso.id !== id));
    }
  };
  
  // Función para guardar un proceso (crear o actualizar)
  const guardarProceso = (e) => {
    e.preventDefault();
    
    if (modoEdicion) {
      // Actualizar proceso existente
      setProcesos(procesos.map(p => p.id === formValues.id ? formValues : p));
    } else {
      // Crear nuevo proceso
      // Generar un ID automático si no se proporciona uno
      const nuevoId = formValues.id || `EHUI-${Math.floor(Math.random() * 1000)}-${new Date().getFullYear()}`;
      const nuevoProceso = {...formValues, id: nuevoId};
      setProcesos([...procesos, nuevoProceso]);
    }
    
    // Cerrar formulario después de guardar
    setMostrarFormulario(false);
  };
  
  // Función para ver detalles de un proceso
  const verDetalleProceso = (proceso) => {
    setProcesoSeleccionado(proceso);
  };
  
  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  
  // Renderizar el formulario de proceso
  const renderFormularioProceso = () => {
    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          width: '600px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: 0, color: '#003366' }}>
              {modoEdicion ? 'Editar Proceso de Contratación' : 'Nuevo Proceso de Contratación'}
            </h2>
            <button 
              onClick={() => setMostrarFormulario(false)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              <XIcon size={24} color="#333" />
            </button>
          </div>
          
          <form onSubmit={guardarProceso}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Código
              </label>
              <input 
                type="text"
                name="id"
                value={formValues.id}
                onChange={handleInputChange}
                placeholder="Ej. EHUI-TD-032-2025"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
              {!modoEdicion && (
                <small style={{ color: '#666', fontSize: '12px' }}>
                  Si deja este campo vacío, se generará un código automáticamente.
                </small>
              )}
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Título *
              </label>
              <input 
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
                required
                placeholder="Título del proceso de contratación"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Descripción *
              </label>
              <textarea 
                name="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                required
                placeholder="Descripción detallada del proceso"
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Fecha de Publicación *
                </label>
                <input 
                  type="text"
                  name="fecha_publicacion"
                  value={formValues.fecha_publicacion}
                  onChange={handleInputChange}
                  required
                  placeholder="DD/MM/YYYY"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Fecha de Cierre *
                </label>
                <input 
                  type="text"
                  name="fecha_cierre"
                  value={formValues.fecha_cierre}
                  onChange={handleInputChange}
                  required
                  placeholder="DD/MM/YYYY"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                Fecha y Hora de Apertura *
              </label>
              <input 
                type="text"
                name="fecha_apertura"
                value={formValues.fecha_apertura}
                onChange={handleInputChange}
                required
                placeholder="YYYY-MM-DD HH:MM:SS"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Estado *
                </label>
                <select 
                  name="estado"
                  value={formValues.estado}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Abierto">Abierto</option>
                  <option value="Evaluación">Evaluación</option>
                  <option value="Cerrado">Cerrado</option>
                  <option value="Anulada">Anulada</option>
                </select>
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  Modalidad *
                </label>
                <select 
                  name="modalidad"
                  value={formValues.modalidad}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="Licitación pública">Licitación pública</option>
                  <option value="Concurso de méritos">Concurso de méritos</option>
                  <option value="Invitación directa">Invitación directa</option>
                  <option value="Solicitud de ofertas">Solicitud de ofertas</option>
                  <option value="Concurso abierto">Concurso abierto</option>
                  <option value="Convocatoria pública">Convocatoria pública</option>
                </select>
              </div>
            </div>
            
            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                URL del proceso
              </label>
              <input 
                type="text"
                name="url"
                value={formValues.url}
                onChange={handleInputChange}
                placeholder="/contratos/CODIGO-PROCESO"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
              marginTop: '20px'
            }}>
              <button 
                type="button"
                onClick={() => setMostrarFormulario(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              
              <button 
                type="submit"
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: '#0098d9',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Save size={16} />
                {modoEdicion ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  // Renderizar modal de detalle del proceso
  const renderDetalleProceso = () => {
    if (!procesoSeleccionado) return null;
    
    return (
      <div style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{ 
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          width: '700px',
          maxWidth: '90vw',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px'
          }}>
            <div>
              <h2 style={{ 
                margin: '0 0 5px 0', 
                color: '#003366' 
              }}>
                {procesoSeleccionado.title}
              </h2>
              <div style={{ color: '#0098d9', fontWeight: 'bold' }}>
                {procesoSeleccionado.id}
              </div>
            </div>
            <button 
              onClick={() => setProcesoSeleccionado(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px'
              }}
            >
              <XIcon size={24} color="#333" />
            </button>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>Descripción</h3>
            <p style={{ margin: 0, color: '#555', lineHeight: '1.6' }}>
              {procesoSeleccionado.descripcion}
            </p>
          </div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            marginBottom: '25px'
          }}>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>Detalles del Proceso</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>Fecha de Publicación:</td>
                    <td style={{ padding: '8px 0' }}>{procesoSeleccionado.fecha_publicacion}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>Fecha de Cierre:</td>
                    <td style={{ padding: '8px 0' }}>{procesoSeleccionado.fecha_cierre}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>Fecha de Apertura:</td>
                    <td style={{ padding: '8px 0' }}>{procesoSeleccionado.fecha_apertura}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '10px', color: '#333' }}>Información Adicional</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>Estado:</td>
                    <td style={{ padding: '8px 0' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '5px 10px',
                        borderRadius: '20px',
                        backgroundColor: 
                          procesoSeleccionado.estado === 'Abierto' ? '#e1f5e8' : 
                          procesoSeleccionado.estado === 'Evaluación' ? '#fff4e5' :
                          procesoSeleccionado.estado === 'Cerrado' ? '#fee' : 
                          procesoSeleccionado.estado === 'Anulada' ? '#f5e1e1' : '#e9f7fe',
                        color: 
                          procesoSeleccionado.estado === 'Abierto' ? '#28a745' : 
                          procesoSeleccionado.estado === 'Evaluación' ? '#f5a623' :
                          procesoSeleccionado.estado === 'Cerrado' ? '#e63946' : 
                          procesoSeleccionado.estado === 'Anulada' ? '#dc3545' : '#0098d9',
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}>
                        {procesoSeleccionado.estado}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>Modalidad:</td>
                    <td style={{ padding: '8px 0' }}>{procesoSeleccionado.modalidad}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 0', color: '#666', fontWeight: '500' }}>URL:</td>
                    <td style={{ padding: '8px 0' }}>
                      <a 
                        href={procesoSeleccionado.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0098d9' }}
                      >
                        {procesoSeleccionado.url}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '20px',
            borderTop: '1px solid #eee',
            paddingTop: '20px'
          }}>
            <button 
              onClick={() => {
                setProcesoSeleccionado(null);
                editarProceso(procesoSeleccionado);
              }}
              style={{
                padding: '10px 20px',
                border: '1px solid #0098d9',
                borderRadius: '4px',
                backgroundColor: '#fff',
                color: '#0098d9',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Edit size={16} />
              Editar
            </button>
            
            <button 
              onClick={() => {
                const id = procesoSeleccionado.id;
                setProcesoSeleccionado(null);
                eliminarProceso(id);
              }}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#dc3545',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <Trash2 size={16} />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Barra superior de administración */}
      <div style={{ 
        backgroundColor: '#003366', 
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
          ElectroHuila - Panel de Administración
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div>
            Bienvenido, {user?.username}
          </div>
          
          <button 
            onClick={handleLogout}
            style={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h1 style={{ margin: 0, color: '#003366' }}>Gestión de Procesos de Contratación</h1>
          
          <button 
            onClick={crearProceso}
            style={{
              backgroundColor: '#0098d9',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold'
            }}
          >
            <Plus size={18} />
            Nuevo Proceso
          </button>
        </div>
        
        {/* Filtros */}
        <div style={{ 
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h2 style={{ fontSize: '18px', margin: '0 0 15px 0', color: '#003366' }}>
            Filtros de búsqueda
          </h2>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                Estado
              </label>
              <select 
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  width: '200px'
                }}
              >
                <option value="">Todos</option>
                <option value="Abierto">Abierto</option>
                <option value="Evaluación">Evaluación</option>
                <option value="Cerrado">Cerrado</option>
                <option value="Anulada">Anulada</option>
              </select>
            </div>
            
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#666' }}>
                Buscar
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por código, título o descripción..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    paddingRight: '35px',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                  }}
                />
                {busqueda ? (
                  <button 
                    onClick={() => setBusqueda('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0',
                      display: 'flex'
                    }}
                  >
                    <X size={16} color="#666" />
                  </button>
                )
                : (
                    <Search size={16} style={{ 
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#666'
                    }} />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Tabla de procesos */}
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Código</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Título</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Fecha Pub.</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Fecha Cierre</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Estado</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#444', fontWeight: '600', borderBottom: '1px solid #eee' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {procesosFiltrados.length > 0 ? (
                  procesosFiltrados.map((proceso) => (
                    <tr key={proceso.id} style={{ 
                      borderBottom: '1px solid #eee',
                      transition: 'background-color 0.2s'
                    }}>
                      <td style={{ padding: '15px', color: '#0098d9', fontWeight: '500' }}>{proceso.id}</td>
                      <td style={{ padding: '15px' }}>
                        <div style={{ fontWeight: '500', marginBottom: '5px' }}>{proceso.title}</div>
                        <div style={{ 
                          fontSize: '13px', 
                          color: '#666', 
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '300px'
                        }}>
                          {proceso.descripcion}
                        </div>
                      </td>
                      <td style={{ padding: '15px' }}>{proceso.fecha_publicacion}</td>
                      <td style={{ padding: '15px' }}>{proceso.fecha_cierre}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '5px 10px',
                          borderRadius: '20px',
                          backgroundColor: 
                            proceso.estado === 'Abierto' ? '#e1f5e8' : 
                            proceso.estado === 'Evaluación' ? '#fff4e5' :
                            proceso.estado === 'Cerrado' ? '#fee' : 
                            proceso.estado === 'Anulada' ? '#f5e1e1' : '#e9f7fe',
                          color: 
                            proceso.estado === 'Abierto' ? '#28a745' : 
                            proceso.estado === 'Evaluación' ? '#f5a623' :
                            proceso.estado === 'Cerrado' ? '#e63946' : 
                            proceso.estado === 'Anulada' ? '#dc3545' : '#0098d9',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}>
                          {proceso.estado}
                        </span>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                          <button 
                            onClick={() => verDetalleProceso(proceso)}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#0098d9',
                              border: '1px solid #0098d9',
                              borderRadius: '4px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px'
                            }}
                          >
                            <Search size={14} />
                            Detalles
                          </button>
                          
                          <button 
                            onClick={() => editarProceso(proceso)}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#3b7dd8',
                              border: '1px solid #3b7dd8',
                              borderRadius: '4px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                          >
                            <Edit size={14} />
                          </button>
                          
                          <button 
                            onClick={() => eliminarProceso(proceso.id)}
                            style={{
                              backgroundColor: 'transparent',
                              color: '#dc3545',
                              border: '1px solid #dc3545',
                              borderRadius: '4px',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              fontSize: '13px'
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                      No se encontraron procesos de contratación que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Mostrar formulario si está activo */}
        {mostrarFormulario && renderFormularioProceso()}
        
        {/* Mostrar detalle si hay un proceso seleccionado */}
        {procesoSeleccionado && renderDetalleProceso()}
      </div>
    );
  }