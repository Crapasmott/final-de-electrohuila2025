'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ContenidoJuntaDirectiva from './contenido'; // Importamos el componente de contenido

export default function JuntaDirectivaPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const handleLogin = (e) => {
        e.preventDefault();
        // Aquí normalmente verificarías las credenciales con un backend
        // Por ahora, vamos a simular una autenticación exitosa
        if (username && password) {
            setIsAuthenticated(true);
        }
    }
    
    // Si el usuario está autenticado, mostrar el contenido
    if (isAuthenticated) {
        return <ContenidoJuntaDirectiva />;
    }
    
    // Si no está autenticado, mostrar el formulario de login
    return (
        <div>
            {/* Hero Section */}
            <div style={{
                background: "linear-gradient(rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.08)), url('/images/directivos/juntadirectiva.jpg') no-repeat center center",
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
                padding: '40px 20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                {/* Breadcrumb */}
                <div style={{ 
                    width: '100%',
                    marginBottom: '30px',
                    fontSize: '14px'
                }}>
                    <Link href="/" style={{ color: '#f27b13', textDecoration: 'none' }}>Inicio</Link> / 
                    <Link href="/institucional" style={{ color: '#f27b13', textDecoration: 'none', margin: '0 5px' }}>Institucional</Link> / 
                    <span>Junta Directiva</span>
                </div>

                {/* Título de Sección */}
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ 
                        fontSize: '32px', 
                        color: '#333',
                        marginBottom: '10px',
                        position: 'relative',
                        display: 'inline-block'
                    }}>
                        Junta <span style={{ color: '#f27b13' }}>Directiva</span>
                    </h1>
                </div>
                
                {/* Formulario de Ingreso */}
                <div style={{
                    width: '100%',
                    maxWidth: '700px',
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
                
                {/* Información adicional */}
                <div style={{ 
                    marginTop: '30px',
                    width: '100%',
                    maxWidth: '700px',
                    textAlign: 'center'
                }}>
                    <p style={{ color: '#666', fontSize: '14px' }}>
                        Para más información o soporte técnico, por favor contactar al área de sistemas:
                        <a href="mailto:sistemas@electrohuila.com.co" style={{ color: '#0098d9', marginLeft: '5px', textDecoration: 'none' }}>
                            sistemas@electrohuila.com.co
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}