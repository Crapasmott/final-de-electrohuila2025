'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, ExternalLink } from 'lucide-react';

export default function TransparenciaPage() {
    // Estado para controlar las secciones expandidas
    const [expandedSections, setExpandedSections] = useState([]);
    
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

    // Datos para las categorías de transparencia
    const categoriasTransparencia = [
        {
            id: 'Información de la entidad',
            title: 'Información de la entidad',
            items: [
                { id: 'contact-1', title: 'Misión, visión, funciones y deberes', url: '/institucional/quienes-somos' },
                { id: 'contact-2', title: 'Estructura orgánica y organigrama', url: '/transparencia/localizacion' },
                { id: 'contact-3', title: 'Mapas y cartas descriptivas de los procesos', url: 'mailto:notificaciones@electrohuila.com.co' },
                { id: 'contact-4', title: 'Directorio Institucional incluyendo sedes, oficinas, sucursales, o regionales, y dependencias', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-5', title: 'Directorio de entidades', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-6', title: 'Directorio de agremiaciones, asociaciones y otros grupos de interés', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-7', title: 'Servicio al público, normas, formularios y protocolos de atención', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-8', title: 'Mecanismo de presentación directa de solicitudes, quejas y reclamos a disposición del público en relación con acciones u omisiones del sujeto obligado', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-9', title: 'Información sobre decisiones que pueden afectar al público', url: '/transparencia/politicas-seguridad' },
                { id: 'contact-9', title: 'Entes y autoridades que lo vigilan', url: '/transparencia/politicas-seguridad' }
                
                
            ]
        },
        {
            id: 'normatividad',
            title: 'Normatividad',
            items: [
                { id: 'norm-1', title: 'Normativa de la entidad o autoridad', url: '/transparencia/normatividad-nacional' },
                { id: 'norm-2', title: 'Búsqueda de normas', url: 'https://www.suin-juriscol.gov.co/index.html' }
            ]
        },
        {
            id: 'Contratación',
            title: 'Contratación',
            items: [
                { id: 'struct-1', title: 'Plan Anual de Adquisiciones', url: '/institucional/quienes-somos#mision-vision' },
                { id: 'struct-2', title: 'Publicación de la información contractual', url: '/transparencia/funciones-deberes' },
                { id: 'struct-3', title: 'Publicación de la ejecución de los contratos', url: '/transparencia/procesos-procedimientos' },
                { id: 'struct-4', title: 'Manual de contratación, adquisición y/o compras', url: '/transparencia/organigrama' }
                
            ]
        },
        {
            id: 'Transparencia ética',
            title: 'Transparencia ética',
            items: [
                { id: 'info-1', title: 'Línea de transparencia', url: 'https://www.datos.gov.co/browse?q=electrohuila', external: true },
                { id: 'info-2', title: 'Programa de transparencia y ética empresarial', url: 'institucional/politicas' },
                { id: 'info-2', title: 'Protección de datos personales', url: 'https://www.suin-juriscol.gov.co/index.html' }
                
            ]
        },
        
        
        {
            id: 'Planeación',
            title: 'Planeación',
            items: [
                { id: 'budget-1', title: 'Informe de rendición de cuentas', url: '/documentos/transparencia/RENDICION-DE-CTAS-VF.pdf' },
                { id: 'budget-2', title: 'Informe de rendición de cuentas zona centro', url: '/documentos/transparencia/RENDICION-DE-CTAS-ZC.pdf' },
                { id: 'budget-3', title: 'Informe de rendición de cuentas zona occidente', url: '/documentos/transparencia/RENDICION-DE-CTAS-ZO.pdf' },
                { id: 'budget-3', title: 'Informe de rendición de cuentas zona sur', url: '/documentos/transparencia/RENDICION-DE-CTAS-ZS-VF.pdf' },
                { id: 'budget-3', title: 'Presupuesto general de ingresos, gastos e inversión', url: '/transparencia/estados-financieros' },
                { id: 'budget-3', title: 'Ejecución presupuestal', url: '/transparencia/estados-financieros' },
                { id: 'budget-3', title: 'Plan de Acción', url: '/transparencia/estados-financieros' },
                { id: 'budget-3', title: 'Informes de empalme', url: '/transparencia/estados-financieros' },
                { id: 'budget-3', title: 'Informes de gestión, evaluación y auditoría', url: '/transparencia/estados-financieros' },
                { id: 'budget-3', title: 'Informes trimestrales sobre acceso a información, quejas y reclamos', url: '/transparencia/estados-financieros' }
            ]
        },
        {
            id: 'Trámites',
            title: 'Trámites',
            items: [
                { id: 'plan-1', title: 'Trámites', url: '/transparencia/politicas-lineamientos-planeacion' },
                
            ]
        },
        {
            id: 'Datos Abiertos',
            title: 'Datos Abiertos',
            items: [
                { id: 'ctrl-1', title: 'Instrumentos de gestión de la información', url: '/transparencia/informes-gestion' },
                { id: 'ctrl-2', title: 'Sección de Datos Abiertos', url: '/transparencia/reportes-control-interno' },
                
            ]
        },
        {
            id: 'Información específica para grupos de interés',
            title: 'Información específica para grupos de interés',
            items: [
                { id: 'contr-1', title: 'Información para niños, niñas y adolescentes', url: '/proveedores-contratistas' },
                { id: 'contr-2', title: 'Información para Mujeres', url: '/transparencia/procedimientos-contratacion' },
                { id: 'contr-3', title: 'Otros de grupos de interés.', url: '/transparencia/plan-adquisiciones' }
            ]
        },
        
    
    ];

    // Datos para documentos destacados
    const documentosDestacados = [
        {
            id: 'doc-1',
            title: 'Ley 1712 de 2014',
            description: 'Ley de Transparencia y del Derecho de Acceso a la Información Pública Nacional',
            url: '/documentos/transparencia/Ley-1712-de-2014.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-2',
            title: 'Decreto 103 de 2015',
            description: 'Por el cual se reglamenta parcialmente la Ley 1712 de 2014',
            url: '/documentos/transparencia/Decreto_103_de_2015.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-3',
            title: 'Resolución 1519 de 2020',
            description: 'Estándares y directrices para la publicación de información',
            url: '/documentos/transparencia/articles-349495_recurso_138.pdf',
            icon: 'FileText'
        },
        {
            id: 'doc-4',
            title: 'Matriz ITA',
            description: 'Índice de Transparencia y Acceso a la Información - Vigencia 2024',
            url: '/documentos/transparencia/seguimientoMatrizDetallada (2024).pdf',
            icon: 'FileText'
        }
    ];

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.26), rgba(0, 0, 0, 0.33)), url('/images/transparencia.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Ley de Transparencia</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Cumplimiento de la Ley 1712 de 2014 - Transparencia y Acceso a la Información Pública
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                {/* Breadcrumb */}
                <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                    <Link href="/institucional" style={{ color: '#f27b13', textDecoration: 'none', margin: '0 5px' }}>Institucional</Link> / 
                    <span>Ley de Transparencia</span>
                </div>
                
                {/* Introducción */}
                <div style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333', borderBottom: '2px solid #0098d9', paddingBottom: '10px' }}>
                        Transparencia y Acceso a la Información Pública
                    </h2>
                    
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
                        En cumplimiento de la <strong>Ley 1712 del 6 de marzo de 2014</strong>, ElectroHuila pone a disposición de 
                        la ciudadanía la información de interés público relacionada con su estructura, servicios, procedimientos, 
                        funcionamiento y contratación, entre otros.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', marginBottom: '15px' }}>
                        El acceso a la información pública es un derecho fundamental que permite a cualquier persona conocer sobre 
                        la existencia y acceder a la información pública en posesión o bajo control de los sujetos obligados. 
                        Solo en casos excepcionales, según lo establece la ley, puede ser restringido este acceso.
                    </p>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                        En esta sección encontrará toda la información organizada según lo establecido en la 
                        <strong> Resolución 1519 de 2020</strong> y demás normatividad relacionada.
                    </p>
                </div>
                
                {/* Documentos destacados */}
                <div style={{ marginBottom: '50px' }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                        Documentos de Interés
                    </h3>
                    
                    <div style={{ 
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {documentosDestacados.map((doc) => (
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
                </div>
                
                {/* Categorías de Transparencia */}
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                        Categorías de Información
                    </h3>
                    
                    <div className="categorias-container">
                        {categoriasTransparencia.map((categoria) => (
                            <div key={categoria.id} style={{
                                marginBottom: '15px',
                                border: '1px solid #e0e0e0',
                                borderRadius: '5px',
                                overflow: 'hidden'
                            }}>
                                <div 
                                    onClick={() => toggleSection(categoria.id)}
                                    style={{
                                        padding: '15px 20px',
                                        backgroundColor: isSectionExpanded(categoria.id) ? '#f8f9fa' : '#fff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottom: isSectionExpanded(categoria.id) ? '1px solid #e0e0e0' : 'none'
                                    }}
                                >
                                    <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#333' }}>
                                        {categoria.title}
                                    </h4>
                                    {isSectionExpanded(categoria.id) ? 
                                        <ChevronDown size={20} color="#0098d9" /> : 
                                        <ChevronRight size={20} color="#0098d9" />
                                    }
                                </div>
                                
                                {isSectionExpanded(categoria.id) && (
                                    <div style={{ padding: '0' }}>
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            margin: 0, 
                                            padding: 0 
                                        }}>
                                            {categoria.items.map((item) => (
                                                <li key={item.id} style={{ 
                                                    borderBottom: '1px solid #f0f0f0',
                                                    ':last-child': {
                                                        borderBottom: 'none'
                                                    }
                                                }}>
                                                    <Link 
                                                        href={item.url}
                                                        target={item.external ? "_blank" : "_self"}
                                                        style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                            padding: '15px 20px',
                                                            color: '#555',
                                                            textDecoration: 'none',
                                                            ':hover': {
                                                                backgroundColor: '#f8f9fa'
                                                            }
                                                        }}
                                                    >
                                                        <span>{item.title}</span>
                                                        {item.external ? (
                                                            <ExternalLink size={16} color="#0098d9" />
                                                        ) : (
                                                            <ChevronRight size={16} color="#0098d9" />
                                                        )}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Información adicional */}
                <div style={{
                    backgroundColor: '#e9f7fe',
                    padding: '30px',
                    borderRadius: '8px',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#0098d9' }}>
                    Línea de Transparencia
                    </h3>
                    <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
                    La Electrificadora del Huila S.A. E.S.P., cuenta con un canal confidencial de reportes en donde sus grupos de interés pueden reportar posibles irregularidades que contraríen los valores y principios institucionales; tales como actos de corrupción, soborno, fraude, comportamientos inapropiados cometidos por nuestros funcionarios y el contratista.
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Presencial:</p>
                            <p style={{ margin: 0, color: '#555' }}>Carrera 8 No. 7-69 Neiva, Huila</p>
                            <p style={{ margin: 0, color: '#555' }}>Horario: Lunes a Viernes 7:00 am - 4:00 pm</p>
                        </div>
                        <div>
                            <p style={{ fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>Correo electrónico:</p>
                            <p style={{ margin: 0, color: '#555' }}>info@electrohuila.com.co</p>
                            <p style={{ margin: 0, color: '#555' }}>contactenos@electrohuila.com.co</p>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Link 
                            href="/contacto"
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
                            Formulario de Solicitud de Información
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* CTA Section */}
            <div className="cta" style={{
                backgroundColor: '#0a3d62',
                color: 'white',
                padding: '60px 0',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>Su participación es importante</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
                        ElectroHuila se compromete con la transparencia y el acceso a la información pública. 
                        Si tiene sugerencias o no encuentra la información que necesita, contáctenos.
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