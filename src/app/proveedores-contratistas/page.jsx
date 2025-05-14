'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, Search, Filter, X } from 'lucide-react';

export default function ProveedoresContratistasPage() {
    // Estado para controlar los acordeones expandidos
    const [expandedSections, setExpandedSections] = useState([]);
    const [activeTab, setActiveTab] = useState('contratacion');
    
    // Estados para filtrado
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroTexto, setFiltroTexto] = useState('');
    const [mostrarRegistros, setMostrarRegistros] = useState(10);
    const [paginaActual, setPaginaActual] = useState(1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    // Función para manejar la expansión de secciones
    const toggleSection = (sectionId) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };
    
    // Verificar si una sección está expandida
    const isSectionExpanded = (sectionId) => {
        return expandedSections.includes(sectionId);
    };

    // Datos de los procesos de contratación en curso (ampliados con más datos)
    const procesosContratacion = [
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
        },
        {
            id: 'EHUI-SC-019-2025',
            title: 'Realizar la interventoría al contrato de brigadas de inspecciones',
            descripcion: 'Realizar la interventoría al contrato de brigadas de inspecciones suscrito por ElectroHuila S.A. E.S.P.',
            fecha_publicacion: '22/03/2025',
            fecha_cierre: '15/04/2025',
            fecha_apertura: '2025-04-08 18:11:00',
            estado: 'Abierto',
            modalidad: 'Solicitud de ofertas',
            url: '/contratos/EHUI-SC-019-2025'
        },
        {
            id: 'EHUI-ODO-014-2025',
            title: 'Solución integral de visualización',
            descripcion: 'Arrendar una solución integral de visualización y backup basada en una plataforma informática, de alto rendimiento para la Electrificadora del Huila S.A E.S.P.',
            fecha_publicacion: '18/03/2025',
            fecha_cierre: '10/04/2025',
            fecha_apertura: '2025-04-04 16:03:00',
            estado: 'Abierto',
            modalidad: 'Concurso abierto',
            url: '/contratos/EHUI-ODO-014-2025'
        },
        {
            id: 'EHUI-SAF-013-2025',
            title: 'Prestar el servicio de vigilancia y seguridad',
            descripcion: 'Prestar el servicio de vigilancia y seguridad privada permanente para todos los bienes muebles e inmuebles propiedad de la Electrificadora del Huila S.A. E.S.P., y de todos aquellos que por su custodia llegue a ser responsable.',
            fecha_publicacion: '15/03/2025',
            fecha_cierre: '05/04/2025',
            fecha_apertura: '2025-04-03 10:26:00',
            estado: 'Abierto',
            modalidad: 'Licitación pública',
            url: '/contratos/EHUI-SAF-013-2025'
        },
        {
            id: 'EHUI-SD-007-2025',
            title: 'Realizar la interventoría técnica, jurídica, administrativa',
            descripcion: 'Realizar la interventoría técnica, jurídica, administrativa, ambiental, social, financiera y predial a la construcción de redes eléctricas en vivienda rural dispersa en los municipios de: Palermo, Rivera, Campoalegre, Yaguará, Hobo, Santa María, Teruel, Iquira, Villavieja, Guadalupe, Garzón, Tesalia, Tello, Colombia, San Agustín y Palestina en el departamento del Huila, en el marco del contrato FAER GGC 1361 de 2024, suscrito entre la Nación – Ministerio de Minas y Energía y la Electrificadora del Huila S.A. E.S.P., ELECTROHUILA S.A. E.S.P adt como el apoyo a la ejecución del cronograma físico y al contrato interadministrativo de electrificación.',
            fecha_publicacion: '10/03/2025',
            fecha_cierre: '01/04/2025',
            fecha_apertura: '2025-04-19 13:22:00',
            estado: 'Abierto',
            modalidad: 'Convocatoria pública',
            url: '/contratos/EHUI-SD-007-2025'
        },
        {
            id: 'PC-2025-004',
            title: 'Servicio de transporte para personal técnico',
            descripcion: 'Servicio de transporte terrestre para el personal técnico que realiza mantenimiento en las redes de distribución en zonas urbanas y rurales del departamento del Huila.',
            fecha_publicacion: '22/03/2025',
            fecha_cierre: '15/04/2025',
            fecha_apertura: '2025-03-22 09:30:00',
            estado: 'Evaluación',
            modalidad: 'Solicitud de ofertas',
            url: '/contratos/PC-2025-004'
        }
    ];
    // Función para filtrar los procesos
    const filtrarProcesos = () => {
        return procesosContratacion
            .filter(proceso => 
                (filtroEstado === '' || proceso.estado === filtroEstado) &&
                (filtroTexto === '' || 
                proceso.id.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                proceso.title.toLowerCase().includes(filtroTexto.toLowerCase()) ||
                proceso.descripcion.toLowerCase().includes(filtroTexto.toLowerCase()))
            );
    };

    // Procesos filtrados
    const procesosFiltrados = filtrarProcesos();
    
    // Paginación
    const indexInicial = (paginaActual - 1) * mostrarRegistros;
    const indexFinal = indexInicial + mostrarRegistros;
    const procesosActuales = procesosFiltrados.slice(indexInicial, indexFinal);
    const totalPaginas = Math.ceil(procesosFiltrados.length / mostrarRegistros);

    // Cambiar página
    const cambiarPagina = (pagina) => {
        if (pagina > 0 && pagina <= totalPaginas) {
            setPaginaActual(pagina);
        }
    };

    // Datos de los documentos de contratación
    const documentosContratacion = [
        {
            id: 'doc-1',
            title: 'Manual de Contratación',
            description: 'Documento que establece las directrices y procedimientos para la contratación de bienes y servicios.',
            url: '/documentos/contratacion/manual-contratacion.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-2',
            title: 'Términos y Condiciones Generales',
            description: 'Condiciones generales aplicables a todos los contratos con proveedores.',
            url: '/documentos/contratacion/terminos-condiciones.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-3',
            title: 'Formulario de Registro de Proveedores',
            description: 'Formato para el registro e inscripción de nuevos proveedores.',
            url: '/documentos/contratacion/formulario-registro.docx',
            icon: 'FileText'
        },
        {
            id: 'doc-4',
            title: 'Código de Ética para Proveedores',
            description: 'Lineamientos éticos que deben cumplir los proveedores y contratistas.',
            url: '/documentos/contratacion/codigo-etica-proveedores.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-5',
            title: 'Plan Anual de Adquisiciones 2025',
            description: 'Proyección de las necesidades de contratación para el año en curso.',
            url: '/documentos/contratacion/plan-adquisiciones-2025.pdf',
            icon: 'Calendar'
        }
    ];
    
    // Preguntas frecuentes sobre contratación
    const preguntasFrecuentes = [
        {
            id: 'faq-1',
            pregunta: '¿Cómo puedo registrarme como proveedor?',
            respuesta: 'Para registrarse como proveedor, debe descargar y diligenciar el Formulario de Registro de Proveedores disponible en la sección de documentos. Una vez completado, debe enviarlo al correo proveedores@electrohuila.com.co junto con los documentos requeridos indicados en el formulario.'
        },
        {
            id: 'faq-2',
            pregunta: '¿Cuál es el proceso para participar en una licitación?',
            respuesta: 'Para participar en una licitación, debe estar registrado como proveedor, consultar regularmente la sección de procesos de contratación, descargar los pliegos de condiciones del proceso que le interese y presentar su oferta siguiendo las instrucciones específicas de cada proceso antes de la fecha de cierre.'
        },
        {
            id: 'faq-3',
            pregunta: '¿Cómo puedo conocer el estado de un proceso de contratación?',
            respuesta: 'El estado de los procesos de contratación se publica y actualiza regularmente en nuestra página web en la sección de Procesos de Contratación. También puede consultar directamente enviando un correo a contratacion@electrohuila.com.co indicando el número del proceso.'
        },
        {
            id: 'faq-4',
            pregunta: '¿Qué documentos debo presentar para participar en un proceso?',
            respuesta: 'Los documentos requeridos varían según el tipo de proceso. Generalmente se solicita: certificado de existencia y representación legal, RUT, certificaciones de experiencia, estados financieros y documentos específicos indicados en los pliegos de condiciones de cada proceso.'
        }
    ];

    // Guía de trámites para proveedores
    const guiaTramites = [
        {
            id: 'tramite-1',
            title: 'Registro de Proveedores',
            pasos: [
                'Descargar el formulario de registro de proveedores.',
                'Diligenciar completamente el formulario y reunir la documentación requerida.',
                'Enviar el formulario y documentos al correo proveedores@electrohuila.com.co.',
                'Esperar la confirmación de recepción y validación (2-3 días hábiles).',
                'Una vez aprobado, recibirá un código de proveedor que deberá utilizar en futuras interacciones.'
            ],
            documentos: [
                'Certificado de existencia y representación legal (no mayor a 30 días)',
                'RUT actualizado',
                'Estados financieros del último año',
                'Certificaciones de experiencia',
                'Certificaciones de calidad (si aplica)'
            ],
            tiempo: '5 días hábiles',
            costo: 'Gratuito'
        },
        {
            id: 'tramite-2',
            title: 'Actualización de Información',
            pasos: [
                'Descargar el formulario de actualización de información.',
                'Diligenciar los campos que requieren actualización.',
                'Adjuntar documentos de soporte de la nueva información.',
                'Enviar al correo actualizacion.proveedores@electrohuila.com.co.',
                'Esperar confirmación de la actualización (1-2 días hábiles).'
            ],
            documentos: [
                'Formulario de actualización',
                'Documentos soporte de la información a actualizar'
            ],
            tiempo: '3 días hábiles',
            costo: 'Gratuito'
        },
        {
            id: 'tramite-3',
            title: 'Facturación Electrónica',
            pasos: [
                'Enviar factura electrónica al correo facturacion@electrohuila.com.co.',
                'En el asunto indicar: Número de contrato o orden + Nombre del proveedor.',
                'Adjuntar documentos de soporte según el tipo de contrato.',
                'Verificar recepción mediante el acuse de recibo automático.',
                'Consultar el estado de pago en el portal de proveedores.'
            ],
            documentos: [
                'Factura electrónica que cumpla requisitos DIAN',
                'Certificación de cumplimiento firmada por el supervisor',
                'Informe de actividades (para contratos de servicios)',
                'Planillas de seguridad social (cuando aplique)'
            ],
            tiempo: 'Pago a 30 días después de radicada correctamente',
            costo: 'No aplica'
        }
    ];
    // Renderizado del contenido para la sección de Contratación (mejorada con filtros como en la Imagen 1)
    const renderSeccionContratacion = () => {
        return (
            <div id="contratacion" style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                    Contratación
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                    ElectroHuila cuenta con procesos de contratación transparentes y eficientes para la adquisición de bienes y servicios. 
                    A continuación encontrará la información necesaria para participar en nuestros procesos de contratación, 
                    así como los documentos y requisitos para registrarse como proveedor.
                </p>
                
                {/* Procesos de contratación en curso - MEJORADO CON ESTILO DE IMAGEN 1 */}
                <div className="header-section" style={{ 
                    backgroundColor: '#0098d9', 
                    padding: '15px 20px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <h3 style={{ fontSize: '22px', margin: 0, color: '#fff', fontWeight: '600' }}>
                        Procesos de Contratación en Curso
                    </h3>
                </div>
                
                {/* Filtros como en la imagen 1 */}
                <div style={{ 
                    backgroundColor: '#f8f9fa', 
                    padding: '20px', 
                    border: '1px solid #e0e0e0',
                    borderTopWidth: 0,
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', marginBottom: '15px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Estado:</label>
                            <div style={{ position: 'relative' }}>
                                <div 
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    style={{
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        padding: '8px 12px',
                                        cursor: 'pointer',
                                        backgroundColor: '#fff',
                                        width: '200px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}
                                >
                                    <span>{filtroEstado || '---SELECCIONE---'}</span>
                                    <ChevronDown size={16} color="#666" />
                                </div>
                                
                                {isDropdownOpen && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '100%',
                                        left: 0,
                                        width: '200px',
                                        backgroundColor: '#fff',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        zIndex: 10
                                    }}>
                                        <div 
                                            onClick={() => {
                                                setFiltroEstado('');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #eee',
                                                backgroundColor: filtroEstado === '' ? '#e9f7fe' : 'transparent'
                                            }}
                                        >
                                            ---SELECCIONE---
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setFiltroEstado('Abierto');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #eee',
                                                backgroundColor: filtroEstado === 'Abierto' ? '#e9f7fe' : 'transparent'
                                            }}
                                        >
                                            ABIERTA
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setFiltroEstado('Cerrado');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #eee',
                                                backgroundColor: filtroEstado === 'Cerrado' ? '#e9f7fe' : 'transparent'
                                            }}
                                        >
                                            CERRADA
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setFiltroEstado('Evaluación');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                cursor: 'pointer',
                                                borderBottom: '1px solid #eee',
                                                backgroundColor: filtroEstado === 'Evaluación' ? '#e9f7fe' : 'transparent'
                                            }}
                                        >
                                            EVALUACIÓN
                                        </div>
                                        <div 
                                            onClick={() => {
                                                setFiltroEstado('Anulada');
                                                setIsDropdownOpen(false);
                                            }}
                                            style={{
                                                padding: '10px 15px',
                                                cursor: 'pointer',
                                                backgroundColor: filtroEstado === 'Anulada' ? '#e9f7fe' : 'transparent'
                                            }}
                                        >
                                            ANULADA
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Mostrar:</label>
                            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                                <input 
                                    type="number" 
                                    value={mostrarRegistros}
                                    min="1"
                                    onChange={(e) => setMostrarRegistros(parseInt(e.target.value) || 10)}
                                    style={{ 
                                        padding: '8px', 
                                        border: '1px solid #ccc', 
                                        borderRadius: '4px',
                                        width: '60px',
                                        textAlign: 'center'
                                    }}
                                />
                                <span style={{ marginLeft: '8px', color: '#555' }}>registros</span>
                            </div>
                        </div>
                        
                        <div style={{ marginLeft: 'auto' }}>
                            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '14px', color: '#555' }}>Buscar:</label>
                            <div style={{ position: 'relative' }}>
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
                                <Search size={18} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Tabla de procesos mejorada con estilos similares a la imagen 1 */}
                <div className="table-responsive" style={{ overflowX: 'auto', marginBottom: '40px' }}>
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
                            {procesosActuales.length > 0 ? (
                                procesosActuales.map((proceso, index) => (
                                    <tr key={proceso.id} style={{ 
                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa',
                                        borderBottom: '1px solid #e0e0e0'
                                    }}>
                                        <td style={{ padding: '12px 15px', fontWeight: '500', color: '#0a3d62' }}>{proceso.id}</td>
                                        <td style={{ padding: '12px 15px' }}>
                                            <div style={{ fontWeight: '500', marginBottom: '5px' }}>{proceso.title}</div>
                                            <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.4' }}>{proceso.descripcion}</div>
                                        </td>
                                        <td style={{ padding: '12px 15px' }}>{proceso.fecha_publicacion}</td>
                                        <td style={{ padding: '12px 15px' }}>{proceso.fecha_cierre}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
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
                                        <td style={{ padding: '12px 15px', textAlign: 'center', fontSize: '14px' }}>{proceso.fecha_apertura}</td>
                                        <td style={{ padding: '12px 15px', textAlign: 'center' }}>
                                            <Link 
                                                href={proceso.url}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    color: '#0098d9',
                                                    textDecoration: 'none',
                                                    fontWeight: 'bold',
                                                    padding: '6px 12px',
                                                    border: '1px solid #0098d9',
                                                    borderRadius: '4px',
                                    fontSize: '14px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Search size={14} style={{ marginRight: '5px' }} />
                                Ver detalles
                            </Link>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#555' }}>
                        No se encontraron procesos de contratación que coincidan con los criterios de búsqueda.
                    </td>
                </tr>
            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {procesosFiltrados.length > 0 && (
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
                        
                        <div className="pagination" style={{ display: 'flex', gap: '5px' }}>
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
                
                {/* Botón de filtros adicionales - Similar a la imagen 1 */}
                <div style={{ marginBottom: '40px' }}>
                    <button 
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            backgroundColor: '#f27b13',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            fontSize: '14px'
                        }}
                    >
                        <Filter size={16} />
                        Búsqueda de procesos contractuales Secop II
                    </button>
                </div>
                
                {/* Documentos de contratación */}
                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                    Documentos de Contratación
                </h3>
                
                <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginBottom: '40px'
                }}>
                    {documentosContratacion.map((doc) => (
                        <div key={doc.id} style={{
                            backgroundColor: '#f8f9fa',
                            borderRadius: '8px',
                            padding: '20px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            border: '1px solid #eee'
                        }}>
                            <div style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '15px'
                            }}>
                                <div style={{
                                    backgroundColor: '#e9f7fe',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: '15px'
                                }}>
                                    <FileText size={20} color="#0098d9" />
                                </div>
                                <h4 style={{ margin: 0, fontSize: '18px', color: '#333' }}>
                                    {doc.title}
                                </h4>
                            </div>
                            <p style={{ color: '#555', marginBottom: '15px', fontSize: '14px' }}>
                                {doc.description}
                            </p>
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
                                    fontSize: '14px'
                                }}
                            >
                                <Download size={16} style={{ marginRight: '5px' }} />
                                Descargar documento
                            </a>
                        </div>
                    ))}
                </div>
                
                {/* Preguntas frecuentes */}
                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                    Preguntas Frecuentes
                </h3>
                
                <div className="accordion" style={{ marginBottom: '40px' }}>
                    {preguntasFrecuentes.map((pregunta) => (
                        <div key={pregunta.id} style={{
                            marginBottom: '10px',
                            border: '1px solid #e0e0e0',
                            borderRadius: '5px',
                            overflow: 'hidden'
                        }}>
                            <div 
                                onClick={() => toggleSection(pregunta.id)}
                                style={{
                                    padding: '15px 20px',
                                    backgroundColor: isSectionExpanded(pregunta.id) ? '#f8f9fa' : '#fff',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >
                                <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333' }}>
                                    {pregunta.pregunta}
                                </h4>
                                {isSectionExpanded(pregunta.id) ? 
                                    <ChevronDown size={18} color="#0098d9" /> : 
                                    <ChevronRight size={18} color="#0098d9" />
                                }
                            </div>
                            
                            {isSectionExpanded(pregunta.id) && (
                                <div style={{ padding: '15px 20px', backgroundColor: '#f8f9fa', borderTop: '1px solid #e0e0e0' }}>
                                    <p style={{ margin: 0, lineHeight: '1.6', color: '#555' }}>
                                        {pregunta.respuesta}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    // Renderizado del contenido para la sección de Guía de Trámites
    const renderSeccionGuiaTramites = () => {
        return (
            <div id="guia-tramites" style={{ marginBottom: '60px' }}>
                <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                    Guía de Trámites
                </h2>
                
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '30px' }}>
                    Esta guía proporciona información detallada sobre los trámites que deben realizar los proveedores 
                    y contratistas para establecer y mantener relaciones comerciales con ElectroHuila. 
                    Aquí encontrará los pasos, requisitos y tiempos de respuesta para cada trámite.
                </p>
                
                {/* Lista de trámites */}
                <div className="tramites-container">
                    {guiaTramites.map((tramite) => (
                        <div key={tramite.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '30px',
                            boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
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
                
                {/* Información de contacto */}
                <div style={{
                    backgroundColor: '#e9f7fe',
                    padding: '30px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#0098d9' }}>
                        Información de Contacto
                    </h3>
                    <p style={{ marginBottom: '15px', color: '#555' }}>
                        Para mayor información sobre los trámites y procesos de contratación, puede contactarnos a través de:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Departamento de Contratación:</p>
                            <p style={{ margin: 0, color: '#555' }}>contratacion@electrohuila.com.co</p>
                            <p style={{ margin: 0, color: '#555' }}>Tel: (608) 8719003 Ext. 1200</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Registro de Proveedores:</p>
                            <p style={{ margin: 0, color: '#555' }}>proveedores@electrohuila.com.co</p>
                            <p style={{ margin: 0, color: '#555' }}>Tel: (608) 8719003 Ext. 1205</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.31), rgba(0, 0, 0, 0.36)), url('/images/contratistas.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Proveedores y Contratistas</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Toda la información sobre nuestros procesos de contratación, documentación 
                        y guías para proveedores interesados en trabajar con ElectroHuila.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                {/* Breadcrumb */}
                <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                    <span style={{ marginLeft: '5px' }}>Proveedores y Contratistas</span>
                </div>
                
                {/* Tabs de navegación */}
                <div className="tabs-container" style={{ marginBottom: '40px' }}>
                    <div className="tabs" style={{
                        display: 'flex',
                        borderBottom: '1px solid #e0e0e0',
                        overflowX: 'auto',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
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
                                margin: '0 5px 0 0',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ marginRight: '10px' }}>✓</span>
                            Contratación
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
                                cursor: 'pointer',
                                margin: '0 5px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <span style={{ marginRight: '10px' }}>✓</span>
                            Guía de Trámites
                        </button>
                    </div>
                </div>
                
                {/* Contenido basado en la pestaña activa */}
                <div className="tab-content" style={{
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '5px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    {activeTab === 'contratacion' && renderSeccionContratacion()}
                    {activeTab === 'guia-tramites' && renderSeccionGuiaTramites()}
                </div>
                
                {/* Llamado a la acción */}
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
                            fontWeight: 'bold',
                            transition: 'background-color 0.3s'
                        }}
                    >
                        Descargar formulario de registro
                    </a>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="cta" style={{
                backgroundColor: '#0a3d62',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center',
                marginTop: '60px'
            }}>
                <div className="container">
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
        </div>
    );
}