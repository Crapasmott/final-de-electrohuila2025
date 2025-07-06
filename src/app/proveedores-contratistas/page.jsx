'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, Search, Filter, X } from 'lucide-react';

// 🟢 MODAL INCLUIDO EN EL MISMO ARCHIVO CON TODOS LOS DOCUMENTOS
const ContratoDetalleModal = ({ isOpen, onClose, contratoId }) => {
    const [contratoDetalle, setContratoDetalle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchContratoDetalle = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            // Simular carga
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            setContratoDetalle({
                codigo: id,
                empresa: '1 - ELECTRIFICADORA DEL HUILA S.A.',
                cuantia: '0',
                etapa: '01 - PRECONTRACTUAL',
                estado: 'ABIERTA',
                responsable: '01 - DIVISION SERVICIOS ADMINISTRATIVOS',
                fecha_creacion: '2025-07-02 14:32:00',
                tipo_invitacion: '01 - INVITACION PUBLICA',
                fecha_cierre: '2025-07-21 09:00:00',
                fecha_apertura: '2025-07-02 14:32:00',
                objeto: 'Prestar el servicio de telecomunicaciones de datos requeridos para comunicar los reconectadores eléctricos con el centro de control de la Electrificadora del Huila S.A. E.S.P.',
                documentos: [
                    {
                        nombre: 'TERMINOS DE REFERENCIA EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 TR`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/terminos-referencia.pdf'
                    },
                    {
                        nombre: 'ANEXO 9 Manual de Usuario de Inscripción de Proveedores EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A9`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-inscripcion.pdf'
                    },
                    {
                        nombre: 'ANEXO 10 MANUAL DE SUPERVISIÓN O INTERVENTORIA EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A10`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-supervision.pdf'
                    },
                    {
                        nombre: 'ANEXO 11 MANUAL SST PARA CONTRATISTAS Y PROVEEDORES EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A11`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-sst.pdf'
                    },
                    {
                        nombre: 'ANEXO 12 MANUAL GESTIÓN AMBIENTAL PROVEEDORES Y CONTRATISTAS EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A12`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-gestion-ambiental.pdf'
                    },
                    {
                        nombre: 'ANEXO 13 Reevaluación de Proveedores EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A13`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/reevaluacion-proveedores.pdf'
                    },
                    {
                        nombre: 'ANEXO 14 ESTUDIO DEL SECTOR EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A14`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/estudio-sector.pdf'
                    },
                    {
                        nombre: 'ANEXO 15 MATRIZ DE RIESGOS EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A15`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/matriz-riesgos.pdf'
                    },
                    {
                        nombre: 'ANEXO 16 GENERAL MINIMO DE GESTIÓN DE ACTIVOS PARA PROVEEDORES EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A16`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/gestion-activos.pdf'
                    },
                    {
                        nombre: 'ANEXO 18 FORMULARIO DE CONDICIONES TÉCNICAS EHUI-SD-041-2025',
                        codigo: `EHUI-SD-041-2025 A18`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/formulario-condiciones-tecnicas.pdf'
                    }
                ]
            });
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isOpen && contratoId) {
            fetchContratoDetalle(contratoId);
        }
    }, [isOpen, contratoId]);

    const handleClose = () => {
        setContratoDetalle(null);
        setError(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header */}
                <div style={{
                    backgroundColor: '#0098d9',
                    color: 'white',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>
                        Detalle del contrato código: {contratoId}
                    </h2>
                    <button
                        onClick={handleClose}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Contenido */}
                <div style={{ padding: '20px' }}>
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#0098d9' }}>
                            <p>Cargando detalles del contrato...</p>
                        </div>
                    )}

                    {contratoDetalle && (
                        <div>
                            {/* Información General */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '30px'
                            }}>
                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Empresa:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.empresa}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Etapa:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.etapa}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Responsable:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.responsable}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Tipo Invitación:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.tipo_invitacion}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Apertura:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_apertura}</p>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Cuantía:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.cuantia}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Código:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.codigo}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Estado:</strong>
                                        <span style={{
                                            display: 'inline-block',
                                            backgroundColor: '#e1f5e8',
                                            color: '#28a745',
                                            padding: '5px 10px',
                                            borderRadius: '15px',
                                            fontSize: '14px',
                                            fontWeight: 'bold'
                                        }}>
                                            {contratoDetalle.estado}
                                        </span>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Creación:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_creacion}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Cierre:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_cierre}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Objeto */}
                            <div style={{ marginBottom: '30px' }}>
                                <strong>Objeto:</strong>
                                <p style={{ 
                                    margin: '10px 0 0 0', 
                                    color: '#555', 
                                    lineHeight: '1.6',
                                    backgroundColor: '#f8f9fa',
                                    padding: '15px',
                                    borderRadius: '5px'
                                }}>
                                    {contratoDetalle.objeto}
                                </p>
                            </div>

                            {/* Documentos */}
                            {contratoDetalle.documentos && contratoDetalle.documentos.length > 0 && (
                                <div>
                                    <h3 style={{ 
                                        fontSize: '18px', 
                                        marginBottom: '15px', 
                                        color: '#0098d9',
                                        borderBottom: '2px solid #0098d9',
                                        paddingBottom: '5px'
                                    }}>
                                        Documentos
                                    </h3>
                                    
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ 
                                            width: '100%', 
                                            borderCollapse: 'collapse',
                                            border: '1px solid #e0e0e0'
                                        }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Documento
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Código Doc.
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'center', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Fecha de carga
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'center', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Link de Descarga
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contratoDetalle.documentos.map((doc, index) => (
                                                    <tr key={index} style={{ 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                                                    }}>
                                                        <td style={{ padding: '12px', fontSize: '14px' }}>
                                                            {doc.nombre}
                                                        </td>
                                                        <td style={{ padding: '12px', fontSize: '14px', color: '#0098d9' }}>
                                                            {doc.codigo}
                                                        </td>
                                                        <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                                                            {doc.fecha_carga}
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                                            <a
                                                                href={doc.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    color: '#0098d9',
                                                                    textDecoration: 'none',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '14px',
                                                                    padding: '5px 10px',
                                                                    border: '1px solid #0098d9',
                                                                    borderRadius: '4px'
                                                                }}
                                                            >
                                                                <Download size={14} style={{ marginRight: '5px' }} />
                                                                Descargar
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px 20px',
                    borderTop: '1px solid #e0e0e0',
                    textAlign: 'right',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            backgroundColor: '#f27b13',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

// 🟢 COMPONENTE PRINCIPAL
export default function ProveedoresContratistasPage() {
    // Estados existentes
    const [expandedSections, setExpandedSections] = useState([]);
    const [activeTab, setActiveTab] = useState('contratacion');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroTexto, setFiltroTexto] = useState('');
    const [mostrarRegistros, setMostrarRegistros] = useState(10);
    const [paginaActual, setPaginaActual] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Estados para WordPress
    const [procesosContratacion, setProcesosContratacion] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para el modal
    const [modalOpen, setModalOpen] = useState(false);
    const [contratoSeleccionado, setContratoSeleccionado] = useState(null);

    // Funciones para el modal
    const abrirModal = (contratoId) => {
        setContratoSeleccionado(contratoId);
        setModalOpen(true);
    };

    const cerrarModal = () => {
        setModalOpen(false);
        setContratoSeleccionado(null);
    };

    // 🟢 FUNCIÓN ACTUALIZADA PARA CONECTAR CON WORDPRESS REAL
    const fetchContratosFromWordPress = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🔄 Obteniendo contratos desde WordPress...');
            
            const response = await fetch('/api/contratos', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            console.log('📡 Respuesta del servidor:', response.status, response.statusText);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            console.log('✅ Datos recibidos:', result);
            
            if (result.success && result.data && result.data.length > 0) {
                console.log(`🎉 ${result.data.length} contratos cargados desde WordPress`);
                setProcesosContratacion(result.data);
                setError(null); // ✅ Limpiar errores si los datos llegan correctamente
            } else {
                throw new Error('No se recibieron datos válidos de WordPress');
            }
            
        } catch (err) {
            console.error('💥 Error al conectar con WordPress:', err);
            
            // ✅ Solo usar fallback si WordPress no responde
            console.log('📋 Usando datos de respaldo...');
            
            const fallbackData = [
                {
                    id: 'EHUI-SD-041-2025',
                    title: 'Prestar el servicio de telecomunicaciones de datos requeridos para comunicar los reconectadores eléctricos con el centro de control de la Electrificadora del Huila S.A. E.S.P.',
                    descripcion: 'Prestar el servicio de telecomunicaciones de datos requeridos para comunicar los reconectadores eléctricos con el centro de control de la Electrificadora del Huila S.A. E.S.P.',
                    fecha_publicacion: '2025-07-02',
                    fecha_cierre: '2025-07-21 09:00:00',
                    fecha_apertura: '2025-07-02 14:32:00',
                    estado: 'ABIERTA', // ✅ Estado real de WordPress
                    modalidad: 'Invitación Pública',
                    url: '/contratos/EHUI-SD-041-2025'
                },
                {
                    id: 'EHUI-SD-032-2025',
                    title: 'Prestar el servicio de Línea Viva a contacto y distancia con el fin de llevar a cabo mantenimientos integrales en las redes de energía eléctrica',
                    descripcion: 'Prestar el servicio de Línea Viva a contacto y distancia con el fin de llevar a cabo mantenimientos integrales en las redes de energía eléctrica en el sistema a cargo del operador de red Electrohuila S.A E.S.P., abarcando los municipios de las Zonas Norte, Centro, Occidente y Sur del departamento del Huila.',
                    fecha_publicacion: '2025-05-29',
                    fecha_cierre: '2025-06-15 17:00:00',
                    fecha_apertura: '2025-05-29 10:05:00',
                    estado: 'CERRADA', // ✅ Estado real de WordPress
                    modalidad: 'Licitación Pública',
                    url: '/contratos/EHUI-SD-032-2025'
                },
                {
                    id: 'EHUI-SC-018-2025',
                    title: 'Prestar el servicio de brigadas de inspección para el control de pérdidas en los sectores de Neiva, Zonas Norte, Centro, Occidente y Sur de Electrohuila S.A E.S.P.',
                    descripcion: 'Prestar el servicio de brigadas de inspección para el control de pérdidas en los sectores de Neiva, Zonas Norte, Centro, Occidente y Sur de Electrohuila S.A E.S.P.',
                    fecha_publicacion: '2025-04-08',
                    fecha_cierre: '2025-04-25 17:00:00',
                    fecha_apertura: '2025-04-08 19:17:00',
                    estado: 'DESIERTA', // ✅ Estado real de WordPress
                    modalidad: 'Contratación Directa',
                    url: '/contratos/EHUI-SC-018-2025'
                },
                {
                    id: 'EHUI-OSO-014-2025',
                    title: 'Arrendar una solución integral de virtualización y backup basada en una plataforma robusta y de alto rendimiento para la Electrificadora del Huila S.A. E.S.P.',
                    descripcion: 'Arrendar una solución integral de virtualización y backup basada en una plataforma robusta y de alto rendimiento para la Electrificadora del Huila S.A. E.S.P.',
                    fecha_publicacion: '2025-04-04',
                    fecha_cierre: '2025-04-18 17:00:00',
                    fecha_apertura: '2025-04-04 18:01:00',
                    estado: 'ANULADA', // ✅ Estado real de WordPress
                    modalidad: 'Mínima Cuantía',
                    url: '/contratos/EHUI-OSO-014-2025'
                }
            ];
            
            setProcesosContratacion(fallbackData);
            setError('⚠️ Mostrando datos de ejemplo. Verifica la conexión con WordPress.');
        } finally {
            setLoading(false);
        }
    };

    // 🟢 FUNCIÓN DE FILTRADO CON ESTADOS REALES DE WORDPRESS
    const filtrarProcesos = () => {
        return procesosContratacion
            .filter(proceso => {
                // ✅ Filtro por estado con valores exactos de WordPress
                const coincideEstado = filtroEstado === '' || proceso.estado === filtroEstado;
                
                // ✅ Filtro por texto en múltiples campos
                const coincideTexto = filtroTexto === '' || 
                    proceso.id.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                    proceso.title.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                    proceso.descripcion.toLowerCase().includes(filtroTexto.toLowerCase());
                
                return coincideEstado && coincideTexto;
            });
    };

    // Resto de funciones (sin cambios)
    const formatearFecha = (fecha) => {
        if (!fecha) return 'No definida';
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatearFechaHora = (fecha) => {
        if (!fecha) return 'No definida';
        const date = new Date(fecha);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        fetchContratosFromWordPress();
    }, []);

    const recargarDatos = () => {
        fetchContratosFromWordPress();
    };

    const toggleSection = (sectionId) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };
    
    const isSectionExpanded = (sectionId) => {
        return expandedSections.includes(sectionId);
    };

    const procesosFiltrados = filtrarProcesos();
    const indexInicial = (paginaActual - 1) * mostrarRegistros;
    const indexFinal = indexInicial + mostrarRegistros;
    const procesosActuales = procesosFiltrados.slice(indexInicial, indexFinal);
    const totalPaginas = Math.ceil(procesosFiltrados.length / mostrarRegistros);

    const cambiarPagina = (pagina) => {
        if (pagina > 0 && pagina <= totalPaginas) {
            setPaginaActual(pagina);
        }
    };

    // Datos estáticos
    const documentosContratacion = [
        {
            id: 'doc-1',
            title: 'Manual de Contratación',
            description: 'Documento que establece las directrices y procedimientos para la contratación de bienes y servicios.',
            url: '/documentos/contratacion/manual-contratacion.pdf'
        },
        {
            id: 'doc-2',
            title: 'Términos y Condiciones Generales',
            description: 'Condiciones generales aplicables a todos los contratos con proveedores.',
            url: '/documentos/contratacion/terminos-condiciones.pdf'
        }
    ];
    
    const preguntasFrecuentes = [
        {
            id: 'faq-1',
            pregunta: '¿Cómo puedo registrarme como proveedor?',
            respuesta: 'Para registrarse como proveedor, debe descargar y diligenciar el Formulario de Registro de Proveedores disponible en la sección de documentos.'
        }
    ];

    const guiaTramites = [
        {
            id: 'tramite-1',
            title: 'Registro de Proveedores',
            pasos: ['Descargar formulario', 'Diligenciar datos', 'Enviar documentos'],
            documentos: ['Certificado existencia', 'RUT', 'Estados financieros'],
            tiempo: '5 días hábiles',
            costo: 'Gratuito'
        }
    ];

    const renderSeccionContratacion = () => {
        return (
            <div id="contratacion" style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                    Contratación
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                    ElectroHuila cuenta con procesos de contratación transparentes y eficientes para la adquisición de bienes y servicios.
                </p>
                
                {/* Header */}
                <div style={{ 
                    backgroundColor: '#0098d9', 
                    padding: '15px 20px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h3 style={{ fontSize: '22px', margin: 0, color: '#fff', fontWeight: '600' }}>
                        Procesos de Contratación en Curso
                    </h3>
                    <button 
                        onClick={recargarDatos}
                        disabled={loading}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.3)',
                            borderRadius: '4px',
                            padding: '8px 15px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        {loading ? 'Cargando...' : 'Actualizar datos'}
                    </button>
                </div>
                
                {/* Estados de carga */}
                {loading && (
                    <div style={{ 
                        backgroundColor: '#f8f9fa', 
                        padding: '20px', 
                        textAlign: 'center',
                        border: '1px solid #e0e0e0',
                        borderTop: 0
                    }}>
                        <p style={{ margin: 0, color: '#0098d9' }}>Cargando procesos de contratación desde WordPress...</p>
                    </div>
                )}
                
                {/* Mensaje de error/advertencia */}
                {error && (
                    <div style={{ 
                        backgroundColor: '#fff3cd', 
                        padding: '15px', 
                        border: '1px solid #ffeaa7',
                        borderTop: 0,
                        color: '#856404'
                    }}>
                        <p style={{ margin: 0 }}>{error}</p>
                    </div>
                )}
                
                {/* 🟢 FILTROS CON ESTADOS REALES DE WORDPRESS */}
                <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '20px', 
                    border: '1px solid #e0e0e0',
                    borderTopWidth: 0,
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Estado:</label>
                            <select 
                                value={filtroEstado}
                                onChange={(e) => setFiltroEstado(e.target.value)}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    width: '200px'
                                }}
                            >
                                <option value="">---SELECCIONE---</option>
                                <option value="ABIERTA">ABIERTA</option>
                                <option value="CERRADA">CERRADA</option>
                                <option value="DESIERTA">DESIERTA</option>
                                <option value="ANULADA">ANULADA</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Mostrar:</label>
                            <input 
                                type="number" 
                                value={mostrarRegistros}
                                min="1"
                                onChange={(e) => setMostrarRegistros(parseInt(e.target.value) || 10)}
                                style={{ 
                                    padding: '8px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '4px',
                                    width: '60px'
                                }}
                            />
                            <span style={{ marginLeft: '8px', color: '#555' }}>registros</span>
                        </div>
                        
                        <div style={{ marginLeft: 'auto' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Buscar:</label>
                            <input 
                                type="text"
                                value={filtroTexto}
                                onChange={(e) => setFiltroTexto(e.target.value)}
                                placeholder="Buscar proceso..."
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px',
                                    width: '250px'
                                }}
                            />
                        </div>
                    </div>
                </div>
                
                {/* Tabla */}
                <div style={{ overflowX: 'auto', marginBottom: '40px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e0e0e0' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#0098d9', color: 'white' }}>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Código</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Objeto</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Publicación</th>
                                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Cierre</th>
                                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Estado</th>
                                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Fecha Apertura</th>
                                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading && procesosActuales.length > 0 ? (
                                procesosActuales.map((proceso, index) => (
                                    <tr key={proceso.id} style={{ 
                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}>
                                        <td style={{ padding: '12px 15px', fontWeight: '500', color: '#0a3d62' }}>{proceso.id}</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <div style={{ fontWeight: '500', marginBottom: '5px' }}>{proceso.title}</div>
                                            <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>
                                                {proceso.descripcion.substring(0, 150)}...
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>{proceso.fecha_publicacion}</td>
                                        <td style={{ padding: '12px 15px' }}>{proceso.fecha_cierre}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: '5px 10px',
                                                borderRadius: '20px',
                                                backgroundColor: 
                                                    proceso.estado === 'ABIERTA' ? '#e1f5e8' : 
                                                    proceso.estado === 'CERRADA' ? '#fee2e2' :
                                                    proceso.estado === 'DESIERTA' ? '#fff4e5' :
                                                    proceso.estado === 'ANULADA' ? '#f3f4f6' : '#e9f7fe',
                                                color: 
                                                    proceso.estado === 'ABIERTA' ? '#28a745' : 
                                                    proceso.estado === 'CERRADA' ? '#e63946' :
                                                    proceso.estado === 'DESIERTA' ? '#f5a623' :
                                                    proceso.estado === 'ANULADA' ? '#6b7280' : '#0098d9',
                                                fontSize: '14px',
                                                fontWeight: 'bold'
                                            }}>
                                                {proceso.estado}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 15px', textAlign: 'center', fontSize: '14px' }}>{proceso.fecha_apertura}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                            <button
                                                onClick={() => abrirModal(proceso.id)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#0098d9',
                                                    backgroundColor: 'transparent',
                                                    border: '1px solid #0098d9',
                                                    borderRadius: '4px',
                                                    padding: '6px 12px',
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold',
                                                    fontSize: '14px',
                                                    transition: 'all 0.2s'
                                                }}
                                                onMouseOver={(e) => {
                                                    e.target.style.backgroundColor = '#0098d9';
                                                    e.target.style.color = 'white';
                                                }}
                                                onMouseOut={(e) => {
                                                    e.target.style.backgroundColor = 'transparent';
                                                    e.target.style.color = '#0098d9';
                                                }}
                                            >
                                                <Search size={14} style={{ marginRight: '5px' }} />
                                                Ver detalles
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : !loading ? (
                                <tr>
                                    <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#555' }}>
                                        No se encontraron procesos de contratación que coincidan con los criterios de búsqueda.
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {!loading && procesosFiltrados.length > 0 && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '30px',
                        fontSize: '14px',
                        color: '#555'
                    }}>
                        <div>
                            Mostrando {indexInicial + 1} a {Math.min(indexFinal, procesosFiltrados.length)} de {procesosFiltrados.length} registros
                        </div>
                        
                        <div style={{ display: 'flex', gap: '5px' }}>
                            <button 
                                onClick={() => cambiarPagina(paginaActual - 1)} 
                                disabled={paginaActual === 1}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    backgroundColor: paginaActual === 1 ? '#f8f9fa' : '#fff',
                                    color: paginaActual === 1 ? '#aaa' : '#0098d9',
                                    borderRadius: '4px',
                                    cursor: paginaActual === 1 ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Anterior
                            </button>
                            
                            {[...Array(totalPaginas)].map((_, index) => (
                                <button 
                                    key={index}
                                    onClick={() => cambiarPagina(index + 1)}
                                    style={{
                                        padding: '8px 12px',
                                        border: '1px solid #ddd',
                                        backgroundColor: paginaActual === index + 1 ? '#0098d9' : '#fff',
                                        color: paginaActual === index + 1 ? '#fff' : '#0098d9',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            
                            <button 
                                onClick={() => cambiarPagina(paginaActual + 1)} 
                                disabled={paginaActual === totalPaginas}
                                style={{
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    backgroundColor: paginaActual === totalPaginas ? '#f8f9fa' : '#fff',
                                    color: paginaActual === totalPaginas ? '#aaa' : '#0098d9',
                                    borderRadius: '4px',
                                    cursor: paginaActual === totalPaginas ? 'not-allowed' : 'pointer'
                                }}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                )}
                
                {/* 🟢 BOTÓN NARANJA SECOP II AGREGADO */}
                <div style={{ marginTop: '30px', textAlign: 'left' }}>
                    <a
                        href="https://www.colombiacompra.gov.co/secop-ii"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-block',
                            backgroundColor: '#f27b13',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#e06a0a';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#f27b13';
                        }}
                    >
                        Búsqueda de procesos contractuales Secop II
                    </a>
                </div>
            </div>
        );
    };

    const renderSeccionGuiaTramites = () => {
        return (
            <div id="guia-tramites" style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                    Guía de Trámites
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                    Esta guía proporciona información detallada sobre los trámites que deben realizar los proveedores.
                </p>
                
                <div>
                    {guiaTramites.map((tramite) => (
                        <div key={tramite.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '30px',
                            marginBottom: '30px',
                            border: '1px solid #eee'
                        }}>
                            <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#0098d9' }}>
                                {tramite.title}
                            </h3>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
                                    Pasos a seguir
                                </h4>
                                <ol style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
                                    {tramite.pasos.map((paso, index) => (
                                        <li key={index} style={{ marginBottom: '8px' }}>{paso}</li>
                                    ))}
                                </ol>
                            </div>
                            
                            <div style={{ marginBottom: '20px' }}>
                                <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#333' }}>
                                    Documentos requeridos
                                </h4>
                                <ul style={{ paddingLeft: '20px', color: '#555', lineHeight: '1.6' }}>
                                    {tramite.documentos.map((doc, index) => (
                                        <li key={index} style={{ marginBottom: '8px' }}>{doc}</li>
                                    ))}
                                </ul>
                            </div>
                            
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                backgroundColor: '#f8f9fa',
                                padding: '15px 20px',
                                borderRadius: '5px'
                            }}>
                                <div>
                                    <h4 style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                                        Tiempo estimado
                                    </h4>
                                    <p style={{ color: '#0098d9', fontWeight: 'bold', margin: 0 }}>
                                        {tramite.tiempo}
                                    </p>
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '16px', marginBottom: '5px', color: '#333' }}>
                                        Costo del trámite
                                    </h4>
                                    <p style={{ color: '#0098d9', fontWeight: 'bold', margin: 0 }}>
                                        {tramite.costo}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.54)), url('/images/proveedores.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Proveedores y Contratistas</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Toda la información sobre nuestros procesos de contratación, documentación 
                        y guías para proveedores interesados en trabajar con ElectroHuila.
                    </p>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                    <span style={{ marginLeft: '5px' }}>Proveedores y Contratistas</span>
                </div>
                
                {/* Tabs */}
                <div style={{ marginBottom: '40px' }}>
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #e0e0e0'
                    }}>
                        <button 
                            onClick={() => setActiveTab('contratacion')}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: activeTab === 'contratacion' ? '#0098d9' : '#ebeef1',
                                color: activeTab === 'contratacion' ? 'white' : '#333',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer',
                                marginRight: '5px'
                            }}
                        >
                            ✓ Contratación
                        </button>
                        <button 
                            onClick={() => setActiveTab('guia-tramites')}
                            style={{
                                padding: '15px 30px',
                                backgroundColor: activeTab === 'guia-tramites' ? '#0098d9' : '#ebeef1',
                                color: activeTab === 'guia-tramites' ? 'white' : '#333',
                                borderTopLeftRadius: '4px',
                                borderTopRightRadius: '4px',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            ✓ Guía de Trámites
                        </button>
                    </div>
                </div>
                
                {/* Contenido */}
                <div style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    {activeTab === 'contratacion' && renderSeccionContratacion()}
                    {activeTab === 'guia-tramites' && renderSeccionGuiaTramites()}
                </div>
                
                {/* CTA */}
                <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    marginTop: '30px'
                }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
                        ¿Interesado en ser proveedor de ElectroHuila?
                    </h3>
                    <p style={{ marginBottom: '25px', color: '#555' }}>
                        Complete el formulario de registro y comience su proceso para convertirse en proveedor.
                    </p>
                    <a 
                        href="/documentos/contratacion/formulario-registro.docx"
                        download
                        style={{
                            display: 'inline-block',
                            padding: '12px 25px',
                            backgroundColor: '#0098d9',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '5px',
                            fontWeight: 'bold'
                        }}
                    >
                        Descargar formulario de registro
                    </a>
                </div>
            </div>
            
            {/* Final CTA */}
            <div style={{
                backgroundColor: '#0a3d62',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>¿Necesitas más información?</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
                        Nuestro equipo está disponible para asistirte con cualquier consulta relacionada con 
                        procesos de contratación y trámites para proveedores.
                    </p>
                    <Link 
                        href="/contacto" 
                        style={{
                            backgroundColor: '#f27b13',
                            color: 'white',
                            padding: '14px 28px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '16px'
                        }}
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>

            {/* Modal */}
            <ContratoDetalleModal 
                isOpen={modalOpen}
                onClose={cerrarModal}
                contratoId={contratoSeleccionado}
            />
        </div>
    );
}