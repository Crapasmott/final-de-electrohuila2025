'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight, FileText, Download, Calendar, ExternalLink } from 'lucide-react';

// Componente de Revelado para elementos que aparecen con animación
const RevealElement = ({ children, direction = 'bottom', delay = 0, threshold = 0.1 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [threshold]);

    // Estilos para diferentes direcciones de animación
    const getAnimationStyle = () => {
        let baseStyle = {
            opacity: isVisible ? 1 : 0,
            transition: `opacity 0.8s ease, transform 0.8s ease ${delay}s`,
        };

        switch (direction) {
            case 'left':
                return {
                    ...baseStyle,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                };
            case 'right':
                return {
                    ...baseStyle,
                    transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
                };
            case 'bottom':
                return {
                    ...baseStyle,
                    transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                };
            case 'top':
                return {
                    ...baseStyle,
                    transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
                };
            default:
                return baseStyle;
        }
    };

    return (
        <div ref={ref} style={getAnimationStyle()}>
            {children}
        </div>
    );
};
export default function TransparenciaPage() {
    // Estado para controlar la sección expandida (solo una a la vez)
    const [expandedSection, setExpandedSection] = useState(null);

    // Estado para controlar navegación de pestañas
    const [activeTab, setActiveTab] = useState('transparency');

    // Función para manejar la expansión de secciones
    const toggleSection = (sectionId) => {
        if (expandedSection === sectionId) {
            // Si la sección que se hizo clic ya está abierta, la cerramos
            setExpandedSection(null);
        } else {
            // Si es una sección diferente, cerramos la anterior y abrimos la nueva
            setExpandedSection(sectionId);
        }
    };

    // Verificar si una sección está expandida
    const isSectionExpanded = (sectionId) => {
        return expandedSection === sectionId;
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
                    <RevealElement direction="top">
                        <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Ley de Transparencia</h1>
                    </RevealElement>
                    <RevealElement direction="bottom" delay={0.2}>
                        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                            Cumplimiento de la Ley 1712 de 2014 - Transparencia y Acceso a la Información Pública
                        </p>
                    </RevealElement>
                </div>
            </div>

            {/* Navegación de pestañas */}
            <RevealElement direction="top">
                <div style={{
                    display: 'flex',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    margin: '20px auto',
                    maxWidth: '1200px'
                }}>
                    <div
                        className={`navTab ${activeTab === 'transparency' ? 'active' : ''}`}
                        onClick={() => setActiveTab('transparency')}
                        style={{
                            flex: 1,
                            padding: '15px 10px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'transparency' ? '#444' : '#f5f5f5',
                            color: activeTab === 'transparency' ? 'white' : '#666',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            borderRadius: '8px 0 0 8px'
                        }}
                    >
                        <span>🔍</span>
                        <span>Transparencia y acceso a la información</span>
                    </div>
                    <div
                        className={`navTab ${activeTab === 'attention' ? 'active' : ''}`}
                        onClick={() => setActiveTab('attention')}
                        style={{
                            flex: 1,
                            padding: '15px 10px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'attention' ? '#444' : '#f5f5f5',
                            color: activeTab === 'attention' ? 'white' : '#666',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <span>👥</span>
                        <span>Atención y servicios a la ciudadanía</span>
                    </div>
                    <div
                        className={`navTab ${activeTab === 'participate' ? 'active' : ''}`}
                        onClick={() => setActiveTab('participate')}
                        style={{
                            flex: 1,
                            padding: '15px 10px',
                            textAlign: 'center',
                            backgroundColor: activeTab === 'participate' ? '#444' : '#f5f5f5',
                            color: activeTab === 'participate' ? 'white' : '#666',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            borderRadius: '0 8px 8px 0'
                        }}
                    >
                        <span>👍</span>
                        <span>Participa</span>
                    </div>
                </div>
            </RevealElement>
            <div className="container" style={{ padding: '30px 0 60px 0', maxWidth: '1200px', margin: '0 auto' }}>
                {/* Breadcrumb */}
                <RevealElement direction="left">
                    <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                        <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> /
                        <Link href="/institucional" style={{ color: '#f27b13', textDecoration: 'none', margin: '0 5px' }}>Institucional</Link> /
                        <span>Ley de Transparencia</span>
                    </div>
                </RevealElement>

                {/* Sección 1: Transparencia y acceso a la información */}
                {activeTab === 'transparency' && (
                    <>
                        {/* Introducción */}
                        <RevealElement direction="bottom">
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
                        </RevealElement>
                        {/* Documentos destacados */}
                        <RevealElement direction="bottom">
                            <div style={{ marginBottom: '50px' }}>
                                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                                    Documentos de Interés
                                </h3>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                                    gap: '20px'
                                }}>
                                    {documentosDestacados.map((doc, index) => (
                                        <RevealElement key={doc.id} direction={index % 2 === 0 ? "left" : "right"} delay={0.1 * index}>
                                            <div style={{
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
                                        </RevealElement>
                                    ))}
                                </div>
                            </div>
                        </RevealElement>
                        {/* Categorías de Transparencia */}
                        <RevealElement direction="bottom">
                            <div style={{ marginBottom: '40px' }}>
                                <h3 style={{ fontSize: '24px', marginBottom: '20px', color: '#0098d9' }}>
                                    Categorías de Información
                                </h3>

                                <div className="categorias-container">
                                    {categoriasTransparencia.map((categoria, index) => (
                                        <RevealElement key={categoria.id} direction="left" delay={0.05 * index}>
                                            <div style={{
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
                                                        borderBottom: isSectionExpanded(categoria.id) ? '1px solid #e0e0e0' : 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#f27b13';
                                                        e.currentTarget.style.color = '#fff';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = isSectionExpanded(categoria.id) ? '#f8f9fa' : '#fff';
                                                        e.currentTarget.style.color = '#333';
                                                    }}
                                                >
                                                    <h4 style={{
                                                        margin: 0,
                                                        fontSize: '18px',
                                                        fontWeight: '600',
                                                        color: 'inherit',
                                                        transition: 'color 0.3s ease'
                                                    }}>
                                                        {categoria.title}
                                                    </h4>
                                                    {isSectionExpanded(categoria.id) ?
                                                        <ChevronDown size={20} color="#0098d9" /> :
                                                        <ChevronRight size={20} color="#0098d9" />
                                                    }
                                                </div>

                                                {isSectionExpanded(categoria.id) && (
                                                    <div style={{
                                                        padding: '0',
                                                        animation: 'fadeIn 0.5s ease-out'
                                                    }}>
                                                        <ul style={{
                                                            listStyle: 'none',
                                                            margin: 0,
                                                            padding: 0
                                                        }}>
                                                            {categoria.items.map((item, itemIndex) => (
                                                                <li key={item.id} style={{
                                                                    borderBottom: '1px solid #f0f0f0',
                                                                    animation: `slideIn 0.3s ease forwards ${0.05 * itemIndex}s`,
                                                                    opacity: 0,
                                                                    transform: 'translateY(10px)'
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
                                                                            transition: 'background-color 0.3s ease, color 0.3s ease'
                                                                        }}
                                                                        onMouseEnter={(e) => {
                                                                            e.currentTarget.style.backgroundColor = '#f8f9fa';
                                                                            e.currentTarget.style.color = '#f27b13';
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            e.currentTarget.style.backgroundColor = '';
                                                                            e.currentTarget.style.color = '#555';
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
                                        </RevealElement>
                                    ))}
                                </div>
                            </div>
                        </RevealElement>
                        {/* Información adicional */}
                        <RevealElement direction="bottom">
                            <div style={{
                                backgroundColor: '#e9f7fe',
                                padding: '30px',
                                borderRadius: '8px',
                                marginBottom: '30px'
                            }}>
                                <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#0098d9' }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0098d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                        </svg>
                                        Línea de Transparencia
                                    </span>
                                </h3>
                                <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.6' }}>
                                    La Electrificadora del Huila S.A. E.S.P., cuenta con un canal confidencial de reportes en donde sus grupos de interés pueden reportar posibles irregularidades que contraríen los valores y principios institucionales; tales como actos de corrupción, soborno, fraude, comportamientos inapropiados cometidos por nuestros funcionarios y el contratista.
                                </p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <p style={{
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                            color: '#333',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0098d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                            </svg>
                                            Presencial:
                                        </p>
                                        <p style={{ margin: '0 0 5px 26px', color: '#555' }}>Carrera 8 No. 7-69 Neiva, Huila</p>
                                        <p style={{ margin: '0 0 0 26px', color: '#555' }}>Horario: Lunes a Viernes 7:00 am - 4:00 pm</p>
                                    </div>
                                    <div>
                                        <p style={{
                                            fontWeight: 'bold',
                                            marginBottom: '5px',
                                            color: '#333',
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0098d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                                <polyline points="22,6 12,13 2,6"></polyline>
                                            </svg>
                                            Correo electrónico:
                                        </p>
                                        <p style={{ margin: '0 0 5px 26px', color: '#555' }}>
                                            <a href="mailto:info@electrohuila.com.co" style={{ color: '#0098d9', textDecoration: 'none' }}>
                                                info@electrohuila.com.co
                                            </a>
                                        </p>
                                        <p style={{ margin: '0 0 0 26px', color: '#555' }}>
                                            <a href="mailto:contactenos@electrohuila.com.co" style={{ color: '#0098d9', textDecoration: 'none' }}>
                                                contactenos@electrohuila.com.co
                                            </a>
                                        </p>
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
                                            transition: 'background-color 0.3s',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                        </svg>
                                        Formulario de Solicitud de Información
                                    </Link>
                                </div>
                            </div>
                        </RevealElement>
                    </>
                )}

                {/* Sección 2: Atención y servicios a la ciudadanía */}
                {activeTab === 'attention' && (
                    <RevealElement direction="bottom">
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            padding: '30px',
                            marginBottom: '30px'
                        }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)',
                                gap: '30px'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Canales de atención</h3>
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/contacto" style={{ color: '#555', textDecoration: 'none' }}>
                                                Contáctenos
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Servicios</h3>
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/servicios/tramites" style={{ color: '#555', textDecoration: 'none' }}>
                                                Trámites Usuarios
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>PQR</h3>
                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/servicios/en-linea" style={{ color: '#555', textDecoration: 'none' }}>
                                                Electrohuila en línea
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </RevealElement>
                )}
                {/* Sección 3: Participa */}
                {activeTab === 'participate' && (
                    <RevealElement direction="bottom">
                        <div style={{
                            backgroundColor: '#f5f5f5',
                            borderRadius: '8px',
                            padding: '30px',
                            marginBottom: '30px'
                        }}>
                            <p style={{
                                fontSize: '16px',
                                lineHeight: '1.6',
                                color: '#555',
                                marginBottom: '25px'
                            }}>
                                En este espacio podrás encontrar información sobre los mecanismos que tiene Electrohuila para conectar con los usuarios y la ciudadanía en general, así como los proyectos sociales, ambientales y de gobernanza que se vienen adelantando durante la vigencia.
                            </p>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '40px'
                            }}>
                                <div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Publicación temas de interés</h3>

                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/noticias" style={{ color: '#555', textDecoration: 'none' }}>
                                                Noticias
                                            </Link>
                                        </li>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/boletines" style={{ color: '#555', textDecoration: 'none' }}>
                                                Boletines de prensa
                                            </Link>
                                        </li>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/comunicados" style={{ color: '#555', textDecoration: 'none' }}>
                                                Comunicados
                                            </Link>
                                        </li>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/reportes" style={{ color: '#555', textDecoration: 'none' }}>
                                                Reporte integrado de gestión
                                            </Link>
                                        </li>
                                    </ul>

                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginTop: '25px',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Conectados con la comunidad</h3>

                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/programas-sostenibilidad" style={{ color: '#555', textDecoration: 'none' }}>
                                                Gestión programas de sostenibilidad
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Caja de herramientas</h3>

                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/tramites" style={{ color: '#555', textDecoration: 'none' }}>
                                                Trámites
                                            </Link>
                                        </li>
                                    </ul>

                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginTop: '25px',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Línea de transparencia</h3>

                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/linea-transparencia/electrohuila" style={{ color: '#555', textDecoration: 'none' }}>
                                                Canal Electrohuila
                                            </Link>
                                        </li>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/linea-transparencia/minenergia" style={{ color: '#555', textDecoration: 'none' }}>
                                                Canal MinEnergía
                                            </Link>
                                        </li>
                                    </ul>

                                    <h3 style={{
                                        fontSize: '20px',
                                        color: '#333',
                                        marginTop: '25px',
                                        marginBottom: '15px',
                                        borderBottom: '2px solid #f27b13',
                                        paddingBottom: '8px'
                                    }}>Canales de consulta</h3>

                                    <ul style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        margin: 0
                                    }}>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/pqr" style={{ color: '#555', textDecoration: 'none' }}>
                                                PQR
                                            </Link>
                                        </li>
                                        <li style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: '10px'
                                        }}>
                                            <span style={{
                                                display: 'inline-block',
                                                width: '8px',
                                                height: '8px',
                                                backgroundColor: '#ff6600',
                                                borderRadius: '50%',
                                                marginRight: '10px'
                                            }}></span>
                                            <Link href="/contactenos" style={{ color: '#555', textDecoration: 'none' }}>
                                                Contáctenos
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </RevealElement>
                )}
            </div>

            {/* CTA Section */}
            <RevealElement direction="bottom">
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
            </RevealElement>

            {/* Estilos globales para animaciones */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideIn {
                    from { 
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}