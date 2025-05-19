'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function NuestraEmpresaPage() {
    // Estado para controlar las secciones expandidas en móvil
    const [expandedSection, setExpandedSection] = useState(null);

    // Función para manejar la expansión de secciones
    const toggleSection = (sectionId) => {
        if (expandedSection === sectionId) {
            setExpandedSection(null);
        } else {
            setExpandedSection(sectionId);
        }
    };

    // Datos de las secciones y subsecciones
    const sections = [
        {
            id: 'institucional',
            title: 'Institucional',
            icon: '🏢',
            description: 'Conoce nuestra historia, misión, visión y valores que nos definen como empresa.',
            items: [
                { id: 'quienes-somos', title: 'Quiénes Somos', url: 'institucional/quienes-somos' },
                { id: 'politicas', title: 'Políticas', url: '/institucional/politicas' },
                { id: 'informes', title: 'Informes', url: '/institucional/informes' }
            ]
        },
        {
            id: 'gobernanza',
            title: 'Gobernanza',
            icon: '⚖️',
            description: 'La estructura de gobierno y los principios éticos que guían nuestra toma de decisiones.',
            items: [
                { id: 'gobierno-corporativo', title: 'Gobierno Corporativo', url: '/institucional/gobierno-corporativo' },
                { id: 'etica-cumplimiento', title: 'Ética y Cumplimiento', url: '/institucional/etica-y-cumplimiento' },
                { id: 'transparencia', title: 'Transparencia y Acceso a la Información Pública', url: '/ley-de-transparencia' },
                { id: 'proteccion-datos', title: 'Protección de Datos', url: '/institucional/proteccion-datos-personales' }
            ]
        },
        {
            id: 'sostenibilidad',
            title: 'Sostenibilidad',
            icon: '🌱',
            description: 'Nuestro compromiso con el desarrollo sostenible y la responsabilidad con el medio ambiente.',
            items: [
                { id: 'programas-sostenibilidad', title: 'Gestión Programas de Sostenibilidad', url: '/institucional/gestion-y-programas-de-sostenibilidad' },
                { id: 'gestion-riesgos', title: 'Plan de Gestión de Riesgos y Desastres', url: '/institucional/pgrd' }
            ]
        }
    ];

    // Datos destacados para mostrar en las tarjetas de estadísticas
    const datosDestacados = [
        { id: 1, title: 'Años de servicio', value: '25+', icon: '🗓️' },
        { id: 2, title: 'Clientes atendidos', value: '450,000+', icon: '👥' },
        { id: 3, title: 'Municipios cubiertos', value: '35', icon: '🏙️' },
        { id: 4, title: 'Satisfacción de clientes', value: '95%', icon: '⭐' }
    ];

    // Logros o reconocimientos recientes
    const logrosRecientes = [
        {
            id: 1,
            title: 'Certificación ISO 9001',
            description: 'Reconocimiento a nuestro sistema de gestión de calidad.',
            year: '2024'
        },
        {
            id: 2,
            title: 'Premio a la Eficiencia Energética',
            description: 'Otorgado por el Ministerio de Minas y Energía.',
            year: '2023'
        },
        {
            id: 3,
            title: 'Reconocimiento Ambiental',
            description: 'Por nuestra contribución a la conservación del medio ambiente.',
            year: '2023'
        }
    ];

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.53)), url('/images/equipodecampo.JPG') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Nuestra Empresa</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Comprometidos con el desarrollo energético del Huila y con brindar un servicio de calidad a todos nuestros usuarios.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                {/* Breadcrumb */}
                <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> /
                    <span style={{ marginLeft: '5px' }}>Nuestra Empresa</span>
                </div>

                {/* Introducción */}
                <div style={{ marginBottom: '50px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
                        Conoce a ElectroHuila
                    </h2>
                    <p style={{ fontSize: '18px', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto', color: '#555' }}>
                        La Empresa de Energía del Huila S.A. E.S.P., ElectroHuila, es una empresa de servicios públicos mixta,
                        comprometida con el desarrollo del departamento del Huila y la prestación de un servicio de energía
                        eléctrica confiable y de calidad.
                    </p>
                </div>

                {/* Datos destacados */}
                <div style={{ marginBottom: '60px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '20px'
                    }}>
                        {datosDestacados.map((dato) => (
                            <div key={dato.id} style={{
                                backgroundColor: '#f8f9fa',
                                borderRadius: '8px',
                                padding: '30px',
                                textAlign: 'center',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                border: '1px solid #eee'
                            }}>
                                <div style={{ fontSize: '40px', marginBottom: '15px' }}>{dato.icon}</div>
                                <h3 style={{ fontSize: '28px', marginBottom: '10px', color: '#0098d9' }}>{dato.value}</h3>
                                <p style={{ fontSize: '16px', color: '#555' }}>{dato.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Secciones Principales */}
                <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center', color: '#333' }}>
                    Información Corporativa
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    {sections.map((section) => (
                        <div key={section.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: '8px',
                            padding: '30px',
                            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                            border: '1px solid #eee',
                            height: '100%'
                        }}>
                            {/* Encabezado de sección */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px'
                            }}>
                                <div style={{
                                    fontSize: '30px',
                                    marginRight: '15px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '50%',
                                    width: '60px',
                                    height: '60px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {section.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '22px', marginBottom: '5px', color: '#0098d9' }}>
                                        {section.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Descripción */}
                            <p style={{ marginBottom: '20px', color: '#555', lineHeight: '1.5' }}>
                                {section.description}
                            </p>

                            {/* Enlaces de subsecciones - versión escritorio */}
                            <div className="desktop-menu" style={{
                                display: 'block',
                                '@media (max-width: 768px)': {
                                    display: 'none'
                                }
                            }}>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                    {section.items.map((item) => (
                                        <li key={item.id} style={{ marginBottom: '10px' }}>
                                            <Link
                                                href={item.url}
                                                style={{
                                                    color: '#333',
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    padding: '8px 12px',
                                                    borderRadius: '4px',
                                                    transition: 'background-color 0.3s',
                                                    ':hover': {
                                                        backgroundColor: '#f5f5f5',
                                                        color: '#0098d9'
                                                    }
                                                }}
                                            >
                                                <ChevronRight size={16} style={{ color: '#0098d9', marginRight: '8px' }} />
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Enlaces de subsecciones - versión móvil (con acordeón) */}
                            <div className="mobile-menu" style={{
                                display: 'none',
                                '@media (max-width: 768px)': {
                                    display: 'block'
                                }
                            }}>
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: '#f5f5f5',
                                        border: 'none',
                                        borderRadius: '4px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        cursor: 'pointer',
                                        marginBottom: expandedSection === section.id ? '10px' : '0'
                                    }}
                                >
                                    <span>Ver secciones</span>
                                    <span>{expandedSection === section.id ? '▲' : '▼'}</span>
                                </button>

                                {expandedSection === section.id && (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                        {section.items.map((item) => (
                                            <li key={item.id} style={{ marginBottom: '10px' }}>
                                                <Link
                                                    href={item.url}
                                                    style={{
                                                        color: '#333',
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        padding: '8px 12px',
                                                        borderRadius: '4px'
                                                    }}
                                                >
                                                    <ChevronRight size={16} style={{ color: '#0098d9', marginRight: '8px' }} />
                                                    {item.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Logros y reconocimientos */}
                <div style={{ marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '30px', textAlign: 'center', color: '#333' }}>
                        Logros y Reconocimientos
                    </h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {logrosRecientes.map((logro) => (
                            <div key={logro.id} style={{
                                backgroundColor: '#fff',
                                borderRadius: '8px',
                                padding: '25px',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                                border: '1px solid #eee',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    backgroundColor: '#e9f7fe',
                                    color: '#0098d9',
                                    padding: '5px 10px',
                                    borderRadius: '20px',
                                    fontSize: '14px',
                                    fontWeight: 'bold'
                                }}>
                                    {logro.year}
                                </div>
                                <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333', paddingRight: '60px' }}>
                                    {logro.title}
                                </h3>
                                <p style={{ color: '#555', marginBottom: '0' }}>
                                    {logro.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lllamado a la acción */}
                <div style={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    marginBottom: '30px'
                }}>
                    <h3 style={{ fontSize: '24px', marginBottom: '15px', color: '#333' }}>
                        ¿Quieres saber más sobre nuestra empresa?
                    </h3>
                    <p style={{ marginBottom: '25px', color: '#555' }}>
                        Explora nuestras secciones para conocer más sobre nuestra historia, políticas, gobernanza y compromiso con la sostenibilidad.
                    </p>
                    <Link
                        href="/institucional/quienes-somos"
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
                        Conoce nuestra historia
                    </Link>
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
                    <h2 style={{ fontSize: '32px', marginBottom: '20px' }}>¿Necesitas más información?</h2>
                    <p style={{ fontSize: '18px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
                        Nuestro equipo está disponible para asistirte con cualquier consulta adicional sobre nuestra empresa.
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