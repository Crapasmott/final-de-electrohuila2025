'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    FileText,
    CreditCard,
    Monitor,
    ScrollText,
    MapPin,
    Home,
    DollarSign,
    AlertTriangle,
    User,
    ChevronRight,
    Search,
    Download,
    ArrowRight
} from 'lucide-react';

export default function UsuariosPage() {
    // Estados para el buscador de facturas
    const [numeroFactura, setNumeroFactura] = useState('');
    const [codigoUsuario, setCodigoUsuario] = useState('');
    const [activeTab, setActiveTab] = useState('factura');
    const [errorMessage, setErrorMessage] = useState('');

    // Funciones para el buscador
    const buscarPorFactura = (e) => {
        e.preventDefault();
        if (!numeroFactura.trim()) {
            setErrorMessage('Por favor ingrese el número de factura');
            return;
        }
        setErrorMessage('');
        alert(`Buscando factura: ${numeroFactura}`);
    };

    const buscarPorUsuario = (e) => {
        e.preventDefault();
        if (!codigoUsuario.trim()) {
            setErrorMessage('Por favor ingrese el código de usuario');
            return;
        }
        setErrorMessage('');
        alert(`Buscando facturas del usuario: ${codigoUsuario}`);
    };

    // Opciones del menú de usuarios
    const menuUsuarios = [
        {
            id: 'tramites',
            title: 'Trámites Usuarios',
            description: 'Gestione sus solicitudes, certificados y otros trámites relacionados con nuestros servicios.',
            icon: <User size={40} />,
            url: '/usuarios/tramites-usuarios'
        },
        {
            id: 'factura',
            title: 'Paga tu Factura',
            description: 'Realice el pago de su factura de energía en línea de manera rápida y segura.',
            icon: <CreditCard size={40} />,
            url: '/usuarios/pago-factura'
        },
        {
            id: 'online',
            title: 'ElectroHuila en Línea',
            description: 'Acceda a nuestros servicios digitales, consulte su factura y realice solicitudes en línea.',
            icon: <Monitor size={40} />,
            url: 'https://www.electrohuila.com.co/online'
        },
        {
            id: 'contrato',
            title: 'Contrato de Condiciones Uniformes',
            description: 'Conozca el contrato que regula la relación entre ElectroHuila y nuestros usuarios.',
            icon: <ScrollText size={40} />,
            url: '/usuarios/contrato-condiciones-uniformes'
        },
        {
            id: 'puntos-pago',
            title: 'Puntos de Pago',
            description: 'Conozca los diferentes puntos autorizados para el pago de su factura.',
            icon: <MapPin size={40} />,
            url: '/usuarios/puntos-pago'
        },
        {
            id: 'puntos-atencion',
            title: 'Puntos de Atención',
            description: 'Encuentre nuestras oficinas y puntos de atención al cliente más cercanos.',
            icon: <Home size={40} />,
            url: '/usuarios/puntos-atencion'
        },
        {
            id: 'tarifas',
            title: 'Tarifas',
            description: 'Consulte las tarifas vigentes del servicio de energía eléctrica.',
            icon: <DollarSign size={40} />,
            url: '/usuarios/tarifas'
        },
        {
            id: 'suspensiones',
            title: 'Suspensiones Programadas',
            description: 'Infórmese sobre las suspensiones programadas del servicio en su zona.',
            icon: <AlertTriangle size={40} />,
            url: '/usuarios/suspensiones-programadas'
        }
    ];

    return (
        <div>
            {/* Hero Section con banner personalizado */}
            <div className="hero" style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.23)), url('/images/usuarios.jpg') no-repeat center center",
                backgroundSize: "cover",
                padding: "80px 0",
                color: "white",
                textAlign: "center"
            }}>
                <div className="container">
                    <h1 style={{ fontSize: "42px", marginBottom: "20px" }}>Usuarios</h1>
                    <p style={{ fontSize: "18px", maxWidth: "800px", margin: "0 auto" }}>
                        Acceda a nuestros servicios y realice sus trámites de manera rápida y sencilla
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '60px 0' }}>
                {/* Breadcrumb */}
                <div className="breadcrumb" style={{ marginBottom: '30px' }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> /
                    <span style={{ marginLeft: '5px' }}>Usuarios</span>
                </div>

                {/* Introducción */}
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '32px', marginBottom: '20px', color: '#333' }}>
                        Servicios para Nuestros Usuarios
                    </h2>
                    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555', maxWidth: '800px', margin: '0 auto' }}>
                        En ElectroHuila nos preocupamos por brindarle la mejor experiencia. Encuentre aquí
                        todos los trámites y servicios disponibles para nuestros usuarios.
                    </p>
                </div>

                {/* Buscador de Facturas */}
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    marginBottom: '40px',
                    border: '1px solid #eaeaea'
                }}>
                    {/* Encabezado */}
                    <div style={{
                        backgroundColor: '#0098d9',
                        padding: '25px 30px',
                        color: 'white',
                        textAlign: 'center'
                    }}>
                        <h2 style={{ fontSize: '24px', margin: '0 0 10px 0' }}>Consulta y Descarga tu Factura</h2>
                        <p style={{ margin: '0', opacity: '0.9' }}>
                            Accede a tu factura ingresando tu número de factura o código de usuario
                        </p>
                    </div>

                    {/* Pestañas */}
                    <div style={{
                        display: 'flex',
                        borderBottom: '1px solid #eaeaea'
                    }}>
                        <button
                            onClick={() => setActiveTab('factura')}
                            style={{
                                flex: '1',
                                padding: '15px',
                                border: 'none',
                                background: activeTab === 'factura' ? '#f8f9fa' : 'transparent',
                                borderBottom: activeTab === 'factura' ? '3px solid #0098d9' : 'none',
                                fontWeight: activeTab === 'factura' ? 'bold' : 'normal',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Buscar por Número de Factura
                        </button>
                        <button
                            onClick={() => setActiveTab('usuario')}
                            style={{
                                flex: '1',
                                padding: '15px',
                                border: 'none',
                                background: activeTab === 'usuario' ? '#f8f9fa' : 'transparent',
                                borderBottom: activeTab === 'usuario' ? '3px solid #0098d9' : 'none',
                                fontWeight: activeTab === 'usuario' ? 'bold' : 'normal',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Buscar por Código de Usuario
                        </button>
                    </div>

                    {/* Contenido de las pestañas */}
                    <div style={{ padding: '30px' }}>
                        {activeTab === 'factura' ? (
                            <form onSubmit={buscarPorFactura}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label
                                        htmlFor="numeroFactura"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 'bold',
                                            color: '#333'
                                        }}
                                    >
                                        Número de Factura
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        width: '100%'
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            flex: '1'
                                        }}>
                                            <input
                                                type="text"
                                                id="numeroFactura"
                                                value={numeroFactura}
                                                onChange={(e) => setNumeroFactura(e.target.value)}
                                                placeholder="Ej: 12345678"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    fontSize: '16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#0098d9',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '12px 20px',
                                                marginLeft: '10px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <Search size={18} style={{ marginRight: '8px' }} />
                                            Buscar
                                        </button>
                                    </div>
                                    {errorMessage && (
                                        <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={buscarPorUsuario}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label
                                        htmlFor="codigoUsuario"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 'bold',
                                            color: '#333'
                                        }}
                                    >
                                        Código de Usuario
                                    </label>
                                    <div style={{
                                        display: 'flex',
                                        width: '100%'
                                    }}>
                                        <div style={{
                                            position: 'relative',
                                            flex: '1'
                                        }}>
                                            <input
                                                type="text"
                                                id="codigoUsuario"
                                                value={codigoUsuario}
                                                onChange={(e) => setCodigoUsuario(e.target.value)}
                                                placeholder="Ej: U12345"
                                                style={{
                                                    width: '100%',
                                                    padding: '12px 15px',
                                                    fontSize: '16px',
                                                    border: '1px solid #ddd',
                                                    borderRadius: '5px',
                                                    outline: 'none'
                                                }}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#0098d9',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '5px',
                                                padding: '12px 20px',
                                                marginLeft: '10px',
                                                cursor: 'pointer',
                                                fontSize: '16px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            <Search size={18} style={{ marginRight: '8px' }} />
                                            Buscar
                                        </button>
                                    </div>
                                    {errorMessage && (
                                        <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                                            {errorMessage}
                                        </p>
                                    )}
                                </div>
                            </form>
                        )}

                        <div style={{
                            backgroundColor: '#f8f9fa',
                            padding: '15px',
                            borderRadius: '5px',
                            marginTop: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <p style={{ margin: 0, color: '#555', fontSize: '14px' }}>
                                ¿Necesitas descargar tu factura directamente?
                            </p>
                            <a
                                href="/usuarios/descargar-factura"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: '#0098d9',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '14px'
                                }}
                            >
                                <Download size={16} style={{ marginRight: '5px' }} />
                                Descargar factura
                                <ArrowRight size={14} style={{ marginLeft: '5px' }} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Opciones del menú de usuarios */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    {menuUsuarios.map((opcion) => (
                        <div key={opcion.id} style={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            padding: '30px',
                            boxShadow: '0 2px 15px rgba(0,0,0,0.08)',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            border: '1px solid #eee'
                        }}>
                            <div style={{
                                backgroundColor: '#f7fbff',
                                borderRadius: '12px',
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '20px',
                                color: '#0098d9'
                            }}>
                                {opcion.icon}
                            </div>
                            <h3 style={{ fontSize: '22px', marginBottom: '15px', color: '#333' }}>
                                {opcion.title}
                            </h3>
                            <p style={{ color: '#555', marginBottom: '20px', flex: '1' }}>
                                {opcion.description}
                            </p>
                            <a
                                href={opcion.url}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    color: '#0098d9',
                                    textDecoration: 'none',
                                    fontWeight: 'bold',
                                    alignSelf: 'flex-start'
                                }}
                            >
                                Acceder
                                <ChevronRight size={20} style={{ marginLeft: '5px' }} />
                            </a>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div style={{
                    backgroundColor: '#0a3d62',
                    color: 'white',
                    padding: '40px',
                    textAlign: 'center',
                    borderRadius: '10px',
                    marginBottom: '40px'
                }}>
                    <h2 style={{ fontSize: '28px', marginBottom: '20px' }}>Al servicio de nuestros usuarios</h2>
                    <p style={{ fontSize: '16px', marginBottom: '30px', maxWidth: '700px', margin: '0 auto 30px' }}>
                        ElectroHuila está comprometida con brindar un servicio de calidad y facilitar
                        los trámites a todos nuestros usuarios.
                    </p>
                    <a
                        href="https://www.electrohuila.com.co/online"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            backgroundColor: '#f27b13',
                            color: 'white',
                            padding: '12px 25px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'inline-block',
                            fontSize: '16px'
                        }}
                    >
                        Acceder a ElectroHuila en Línea
                    </a>
                </div>
            </div>
        </div>
    );
}