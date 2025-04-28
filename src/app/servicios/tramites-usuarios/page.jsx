'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Componente para cada trámite (elemento del acordeón)
const TramiteItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div style={{ 
            borderBottom: '1px solid #e0e0e0',
            overflow: 'hidden'
        }}>
            <div 
                style={{ 
                    padding: '15px 20px',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        color: '#0099cc', 
                        marginRight: '10px', 
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        {isOpen ? '-' : '+'}
                    </span>
                    <span style={{ color: '#0099cc', fontWeight: '500' }}>{title}</span>
                </div>
                <span style={{ color: '#0099cc' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        style={{
                            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease'
                        }}
                    >
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </span>
            </div>
            {isOpen && (
                <div style={{ 
                    padding: '20px',
                    backgroundColor: '#f9f9f9',
                    color: '#555',
                    borderTop: '1px solid #e0e0e0'
                }}>
                    {children || (
                        <div>
                            <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '15px' }}>Descripción del Trámite</h3>
                            <p style={{ marginBottom: '15px' }}>
                                Este trámite permite a los usuarios de Electrohuila realizar solicitudes relacionadas con {title.toLowerCase()}.
                            </p>
                            
                            <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '15px' }}>Requisitos</h3>
                            <ul style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                                <li style={{ marginBottom: '5px' }}>Factura de energía reciente</li>
                                <li style={{ marginBottom: '5px' }}>Documento de identidad del titular</li>
                                <li style={{ marginBottom: '5px' }}>Formulario de solicitud diligenciado</li>
                            </ul>
                            
                            <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '15px' }}>Cómo Realizar el Trámite</h3>
                            <ol style={{ paddingLeft: '20px', marginBottom: '15px' }}>
                                <li style={{ marginBottom: '8px' }}>Descargue y diligencie el formulario de solicitud</li>
                                <li style={{ marginBottom: '8px' }}>Reúna los documentos requeridos</li>
                                <li style={{ marginBottom: '8px' }}>Presente la solicitud en cualquiera de nuestras oficinas o a través de la plataforma digital</li>
                            </ol>
                            
                            <div style={{ marginTop: '20px' }}>
                                <a 
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: '#0099cc',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        fontWeight: '500',
                                        marginRight: '15px'
                                    }}
                                >
                                    Descargar Formulario
                                </a>
                                <a 
                                    href="#"
                                    style={{
                                        display: 'inline-block',
                                        backgroundColor: '#f27b13',
                                        color: 'white',
                                        padding: '10px 20px',
                                        borderRadius: '5px',
                                        textDecoration: 'none',
                                        fontWeight: '500'
                                    }}
                                >
                                    Realizar Trámite en Línea
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// Componente principal
export default function TramitesUsuariosPage() {
    // Lista de trámites disponibles
    const tramites = [
        { id: 1, title: 'Trámite para la reclamación de fallas en la prestación del servicio' },
        { id: 2, title: 'Trámite legalización proyectos y cuentas nuevas' },
        { id: 3, title: 'Trámite de recurso de reposición - apelación' },
        { id: 4, title: 'Trámite para la denuncia de arrendamiento' },
        { id: 5, title: 'Trámite para la reclamación de facturación' },
        { id: 6, title: 'Trámite para solicitud de cambio de información del cliente' },
        { id: 7, title: 'Trámite de pago no ingresado' },
        { id: 8, title: 'Trámite para la reposición del medidor de energía' },
        { id: 9, title: 'Terminación del contrato por orden del suscriptor' },
        { id: 10, title: 'Plan de mantenimiento de pérdidas' }
    ];

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/servicios-bg.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "60px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "38px", marginBottom: "15px" }}>Servicios</h1>
                </div>
            </div>

            {/* Contenido Principal */}
            <div style={{ 
                maxWidth: '1200px', 
                margin: '0 auto', 
                padding: '40px 20px'
            }}>
                {/* Breadcrumb */}
                <div style={{ 
                    width: '100%',
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '14px'
                }}>
                    <div>
                        <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                        <span style={{ marginLeft: '5px', color: '#555' }}>Trámites Usuarios</span>
                    </div>
                </div>

                {/* Título de Sección */}
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ 
                        fontSize: '32px', 
                        color: '#333',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        Trámites <span style={{ color: '#f27b13', marginLeft: '10px' }}>Usuarios</span>
                    </h1>
                </div>
                
                {/* Lista de Trámites */}
                <div style={{ 
                    maxWidth: '900px',
                    border: '1px solid #e0e0e0',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: '40px'
                }}>
                    {tramites.map((tramite) => (
                        <TramiteItem key={tramite.id} title={tramite.title} />
                    ))}
                </div>
                
                {/* Botones de descarga */}
                <div style={{ 
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    justifyContent: 'center',
                    maxWidth: '900px'
                }}>
                    <a 
                        href="/documentos/medidores-telegestión.pdf"
                        target="_blank"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0099cc',
                            color: 'white',
                            padding: '15px 30px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            width: '100%',
                            maxWidth: '440px'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Medidores soportados para Telegestión
                    </a>
                    
                    <a 
                        href="/documentos/formatos-parametrizacion.pdf"
                        target="_blank"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#0099cc',
                            color: 'white',
                            padding: '15px 30px',
                            borderRadius: '50px',
                            textDecoration: 'none',
                            fontWeight: '500',
                            width: '100%',
                            maxWidth: '440px'
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        Formatos solicitud de parametrización
                    </a>
                </div>
                
                {/* Información adicional */}
                <div style={{ 
                    marginTop: '40px',
                    backgroundColor: '#f5f5f5',
                    padding: '25px',
                    borderRadius: '8px',
                    maxWidth: '900px'
                }}>
                    <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '10px' }}>¿Necesita ayuda con sus trámites?</h3>
                    <p style={{ color: '#555', marginBottom: '15px' }}>
                        Si requiere asistencia adicional o tiene preguntas sobre alguno de estos trámites, 
                        puede comunicarse con nuestro equipo de servicio al cliente:
                    </p>
                    <ul style={{ paddingLeft: '20px', color: '#555' }}>
                        <li style={{ marginBottom: '8px' }}>Línea de atención: <strong>018000 112 115</strong></li>
                        <li style={{ marginBottom: '8px' }}>Email: <a href="mailto:servicioalcliente@electrohuila.com.co" style={{ color: '#0099cc', textDecoration: 'none' }}>servicioalcliente@electrohuila.com.co</a></li>
                        <li>Visite cualquiera de nuestras <a href="/servicios/oficinas" style={{ color: '#0099cc', textDecoration: 'none' }}>oficinas comerciales</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}