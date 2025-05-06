'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Componente para mostrar un documento
const DocumentItem = ({ title, size, updateDate, pdfUrl }) => {
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            borderRadius: '8px',
            backgroundColor: 'white',
            marginBottom: '15px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '15px', color: '#f27b13' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                </div>
                <div>
                    <h3 style={{ 
                        margin: '0 0 5px 0', 
                        fontSize: '16px', 
                        fontWeight: '600',
                        color: '#333'
                    }}>
                        {title}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#777' }}>
                        <span>Tamaño: {size}</span>
                        <span style={{ margin: '0 10px' }}>•</span>
                        <span>Actualizado: {updateDate}</span>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
                <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#0099cc',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Ver
                </a>
                <a 
                    href={pdfUrl} 
                    download
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#0099cc',
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '5px' }}>
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Descargar
                </a>
            </div>
        </div>
    );
};

// Componente de Acordeón para elementos desplegables
const AccordionItem = ({ title, documents = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div style={{ 
            border: '1px solid #e6e6e6', 
            marginBottom: '8px',
            borderRadius: '4px',
            overflow: 'hidden'
        }}>
            <div 
                style={{ 
                    padding: '15px 20px',
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ 
                        color: '#f27b13', 
                        marginRight: '10px', 
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}>
                        {isOpen ? '-' : '+'}
                    </span>
                    <span style={{ color: '#f27b13', fontWeight: '500' }}>{title}</span>
                </div>
                <span style={{ color: '#f27b13' }}>
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
                    borderTop: '1px solid #e6e6e6',
                    backgroundColor: '#f9f9f9',
                    color: '#666'
                }}>
                    {documents.length > 0 ? (
                        documents.map((doc, index) => (
                            <DocumentItem 
                                key={index}
                                title={doc.title}
                                size={doc.size}
                                updateDate={doc.updateDate}
                                pdfUrl={doc.pdfUrl}
                            />
                        ))
                    ) : (
                        <p>Contenido en desarrollo. Próximamente más información.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default function JuntaDirectivaPage() {
    // Estados para manejar formulario y autenticación
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Datos de documentos para cada sección del acordeón
    const accordionItems = [
        { 
            id: 1, 
            title: 'Conformación Asamblea de Accionistas',
            documents: [
                { 
                    title: 'Política de Contratación 2024', 
                    size: '1.2 MB', 
                    updateDate: '15/01/2024',
                    pdfUrl: '/documentos/politica-contratacion-2024.pdf'
                },
                { 
                    title: 'Manual de Funciones y Competencias', 
                    size: '3.5 MB', 
                    updateDate: '20/02/2024',
                    pdfUrl: '/documentos/manual-funciones-competencias.pdf'
                },
                { 
                    title: 'Reglamento Interno de Trabajo', 
                    size: '2.1 MB', 
                    updateDate: '10/06/2023',
                    pdfUrl: '/documentos/reglamento-interno-trabajo.pdf'
                }
            ]
        },
        { 
            id: 2, 
            title: 'Conformación Junta Directiva',
            documents: [
                { 
                    title: 'Miembros Junta Directiva 2024', 
                    size: '0.8 MB', 
                    updateDate: '30/01/2024',
                    pdfUrl: '/documentos/miembros-junta-2024.pdf'
                },
                { 
                    title: 'Hojas de Vida Directivos', 
                    size: '4.2 MB', 
                    updateDate: '05/02/2024',
                    pdfUrl: '/documentos/hojas-vida-directivos.pdf'
                }
            ]
        },
        { 
            id: 3, 
            title: 'Informes de Gestión',
            documents: [
                { 
                    title: 'Informe de Gestión 2023', 
                    size: '5.3 MB', 
                    updateDate: '28/03/2024',
                    pdfUrl: '/documentos/informe-gestion-2023.pdf'
                },
                { 
                    title: 'Informe Semestral 2023-II', 
                    size: '2.7 MB', 
                    updateDate: '15/01/2024',
                    pdfUrl: '/documentos/informe-semestral-2023-2.pdf'
                }
            ]
        },
        { 
            id: 4, 
            title: 'Estatutos Sociales',
            documents: [
                { 
                    title: 'Estatutos Sociales Actualizados', 
                    size: '1.5 MB', 
                    updateDate: '20/11/2023',
                    pdfUrl: '/documentos/estatutos-sociales.pdf'
                }
            ]
        },
        { 
            id: 5, 
            title: 'Acuerdos Junta Directiva',
            documents: [
                { 
                    title: 'Acuerdo 001 de 2024', 
                    size: '0.7 MB', 
                    updateDate: '22/01/2024',
                    pdfUrl: '/documentos/acuerdo-001-2024.pdf'
                },
                { 
                    title: 'Acuerdo 002 de 2024', 
                    size: '0.9 MB', 
                    updateDate: '18/02/2024',
                    pdfUrl: '/documentos/acuerdo-002-2024.pdf'
                }
            ]
        },
        { 
            id: 6, 
            title: 'Estatuto Presupuestal',
            documents: [
                { 
                    title: 'Estatuto Presupuestal Vigente', 
                    size: '2.3 MB', 
                    updateDate: '05/12/2023',
                    pdfUrl: '/documentos/estatuto-presupuestal.pdf'
                }
            ]
        },
        { 
            id: 7, 
            title: 'Reglamento Interno de Contratación',
            documents: [
                { 
                    title: 'Reglamento de Contratación 2024', 
                    size: '3.1 MB', 
                    updateDate: '10/01/2024',
                    pdfUrl: '/documentos/reglamento-contratacion.pdf'
                }
            ]
        },
        { 
            id: 8, 
            title: 'Convención Colectiva de Trabajo',
            documents: [
                { 
                    title: 'Convención Colectiva 2023-2025', 
                    size: '4.5 MB', 
                    updateDate: '30/11/2023',
                    pdfUrl: '/documentos/convencion-colectiva.pdf'
                }
            ]
        },
        { 
            id: 9, 
            title: 'Actas de Junta Directiva',
            documents: [
                { 
                    title: 'Acta No. 001 - Enero 2024', 
                    size: '1.1 MB', 
                    updateDate: '20/01/2024',
                    pdfUrl: '/documentos/acta-001-enero.pdf'
                },
                { 
                    title: 'Acta No. 002 - Febrero 2024', 
                    size: '1.3 MB', 
                    updateDate: '25/02/2024',
                    pdfUrl: '/documentos/acta-002-febrero.pdf'
                },
                { 
                    title: 'Acta No. 003 - Marzo 2024', 
                    size: '1.2 MB', 
                    updateDate: '22/03/2024',
                    pdfUrl: '/documentos/acta-003-marzo.pdf'
                }
            ]
        },
        { 
            id: 10, 
            title: 'Actas de Comité Conjunto de Junta Directiva',
            documents: []
        },
        { 
            id: 11, 
            title: 'Actas de Comité Financiero y de Negocios Misionales',
            documents: [
                { 
                    title: 'Acta Comité Financiero Enero 2024', 
                    size: '0.9 MB', 
                    updateDate: '18/01/2024',
                    pdfUrl: '/documentos/acta-financiero-enero.pdf'
                },
                { 
                    title: 'Acta Comité Financiero Febrero 2024', 
                    size: '1.0 MB', 
                    updateDate: '15/02/2024',
                    pdfUrl: '/documentos/acta-financiero-febrero.pdf'
                }
            ]
        },
        { 
            id: 12, 
            title: 'Actas de Comité de Gestión Administrativa y Auditoría',
            documents: [
                { 
                    title: 'Acta Comité Auditoría Enero 2024', 
                    size: '1.4 MB', 
                    updateDate: '25/01/2024',
                    pdfUrl: '/documentos/acta-auditoria-enero.pdf'
                }
            ]
        },
        { 
            id: 13, 
            title: 'Información Adicional',
            documents: []
        }
    ];
    
    // Función para manejar inicio de sesión
    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí normalmente verificarías las credenciales con un backend
        // Por ahora, vamos a simular una autenticación exitosa
        if (username && password) {
            setIsAuthenticated(true);
        }
    };
    
    // Función para cerrar sesión
    const handleLogout = () => {
        setIsAuthenticated(false);
        setUsername('');
        setPassword('');
    };
    
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/directivos/juntadirectiva.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "60px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "38px", marginBottom: "15px" }}>Junta Directiva</h1>
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
                        <span style={{ marginLeft: '5px' }}>Junta Directiva</span>
                    </div>
                    
                    {/* Mostrar botón de cerrar sesión solo si está autenticado */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            style={{
                                backgroundColor: '#f27b13',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                padding: '8px 15px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            Cerrar Sesión
                        </button>
                    )}
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
                        Junta <span style={{ color: '#f27b13', marginLeft: '10px' }}>Directiva</span>
                    </h1>
                </div>
                
                {/* Contenido condicional: Formulario de Login o Acordeón */}
                {!isAuthenticated ? (
                    // Formulario de Login
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '30px',
                            backgroundColor: '#fff',
                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                        }}>
                            <h2 style={{ 
                                fontSize: '22px', 
                                color: '#333', 
                                marginBottom: '25px',
                                textAlign: 'center'
                            }}>
                                Ingreso para usuarios registrados
                            </h2>
                            
                            <form onSubmit={handleLogin}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        color: '#555',
                                        fontSize: '14px'
                                    }}>
                                        Número de usuario
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ 
                                            position: 'absolute', 
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#aaa'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                <circle cx="12" cy="7" r="4"></circle>
                                            </svg>
                                        </span>
                                        <input 
                                            type="text" 
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px 10px 10px 35px',
                                                fontSize: '14px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box'
                                            }}
                                            placeholder="Ingrese su número de usuario"
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '5px', 
                                        color: '#555',
                                        fontSize: '14px'
                                    }}>
                                        Contraseña
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <span style={{ 
                                            position: 'absolute', 
                                            left: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#aaa'
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                            </svg>
                                        </span>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '10px 10px 10px 35px',
                                                fontSize: '14px',
                                                border: '1px solid #ddd',
                                                borderRadius: '4px',
                                                boxSizing: 'border-box'
                                            }}
                                            placeholder="Ingrese su contraseña"
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                                    <button 
                                        type="submit"
                                        style={{
                                            backgroundColor: '#f27b13',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                            padding: '12px 25px',
                                            fontSize: '15px',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s'
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e06a00'}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f27b13'}
                                    >
                                        Acceder
                                    </button>
                                </div>
                            </form>
                        </div>
                        
                        <div style={{ 
                            marginTop: '20px',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#666', fontSize: '14px' }}>
                                Para más información o soporte técnico, por favor contactar al área de sistemas:
                                <a href="mailto:sistemas@electrohuila.com.co" style={{ color: '#0099cc', marginLeft: '5px', textDecoration: 'none' }}>
                                    sistemas@electrohuila.com.co
                                </a>
                            </p>
                        </div>
                    </div>
                ) : (
                    // Sección de Acordeón (cuando el usuario está autenticado)
                    <div style={{ maxWidth: '900px' }}>
                        {accordionItems.map((item) => (
                            <AccordionItem 
                                key={item.id} 
                                title={item.title}
                                documents={item.documents}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}