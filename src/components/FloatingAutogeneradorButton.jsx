'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const FloatingAutogeneradorButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detectar si es móvil - múltiples métodos para asegurar detección
    useEffect(() => {
        const checkIsMobile = () => {
            const screenWidth = window.innerWidth <= 768;
            const userAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            const mobile = screenWidth || userAgent || touchSupport;
            setIsMobile(mobile);
            
            // Debug en consola - puedes quitar estas líneas
            console.log('🔍 Detección móvil:', {
                screenWidth: window.innerWidth,
                isMobile: mobile,
                userAgent: navigator.userAgent.substring(0, 50)
            });
        };
        
        // Ejecutar inmediatamente
        checkIsMobile();
        
        // Escuchar cambios de tamaño de ventana
        window.addEventListener('resize', checkIsMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    return (
        <>
            {/* Contenedor principal */}
            <div
                id="floating-autogenerador"
                className="floating-autogenerador-container"
                style={{
                    position: 'fixed',
                    top: isMobile ? '90px' : '120px',
                    right: isMobile ? '15px' : '20px',
                    zIndex: 9999,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: isMobile ? '10px' : '12px',
                    maxWidth: 'calc(100vw - 30px)',
                    pointerEvents: 'auto'
                }}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
                {/* Etiqueta con el nombre del botón */}
                <div
                    className="button-label"
                    style={{
                        // Estilo base
                        backgroundColor: '#2d3748',
                        color: '#ffffff',
                        padding: isMobile ? '8px 14px' : '10px 16px',
                        borderRadius: isMobile ? '20px' : '8px',
                        fontSize: isMobile ? '13px' : '14px',
                        fontWeight: '600',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        whiteSpace: 'nowrap',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        border: '1px solid #4a5568',
                        position: 'relative',
                        userSelect: 'none',
                        
                        // Lógica de visibilidad
                        // MÓVIL: Siempre visible
                        // DESKTOP: Solo con hover
                        opacity: isMobile ? 1 : (isHovered ? 1 : 0),
                        visibility: isMobile ? 'visible' : (isHovered ? 'visible' : 'hidden'),
                        transform: isMobile 
                            ? 'translateX(0) scale(1)' 
                            : (isHovered ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.95)'),
                        transition: isMobile ? 'none' : 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        
                        // Asegurar que no se salga de pantalla
                        minWidth: 'fit-content',
                        maxWidth: 'calc(100vw - 100px)',
                        textAlign: 'center'
                    }}
                >
                    {/* Texto diferente para móvil y desktop */}
                    {isMobile ? 'Autogeneradores' : 'Consulta de Autogeneradores'}
                    
                    {/* Flecha del tooltip - solo en desktop */}
                    {!isMobile && (
                        <div
                            style={{
                                position: 'absolute',
                                right: '-7px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: 0,
                                height: 0,
                                borderLeft: '7px solid #2d3748',
                                borderTop: '7px solid transparent',
                                borderBottom: '7px solid transparent'
                            }}
                        />
                    )}
                </div>

                {/* Botón principal */}
                <Link 
                    href="http://200.21.4.66:8070/ehfact2/" 
                    style={{ textDecoration: 'none' }}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <button
                        className="floating-main-button"
                        style={{
                            // Tamaño del botón
                            width: isMobile ? '56px' : '64px',
                            height: isMobile ? '56px' : '64px',
                            borderRadius: '50%',
                            
                            // Colores y bordes
                            backgroundColor: '#0098d9',
                            border: 'none',
                            cursor: 'pointer',
                            
                            // Layout
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            
                            // Efectos visuales
                            boxShadow: '0 4px 16px rgba(0, 152, 217, 0.4)',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            position: 'relative',
                            overflow: 'hidden',
                            flexShrink: 0,
                            
                            // Animaciones
                            animation: isMobile ? 'none' : 'pulse 3s infinite, float 6s ease-in-out infinite'
                        }}
                        onMouseEnter={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.backgroundColor = '#0087c7';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 152, 217, 0.6)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isMobile) {
                                e.currentTarget.style.backgroundColor = '#0098d9';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 152, 217, 0.4)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }
                        }}
                        onTouchStart={(e) => {
                            // Feedback táctil en móviles
                            e.currentTarget.style.transform = 'scale(0.95)';
                            e.currentTarget.style.backgroundColor = '#0087c7';
                        }}
                        onTouchEnd={(e) => {
                            // Restaurar estado en móviles
                            setTimeout(() => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.backgroundColor = '#0098d9';
                            }, 150);
                        }}
                        aria-label="Consulta de Autogeneradores"
                        title="Ir a consulta de autogeneradores"
                    >
                        {/* Efecto de brillo (solo desktop) */}
                        {!isMobile && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-50%',
                                    left: '-50%',
                                    width: '200%',
                                    height: '200%',
                                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                                    transform: isHovered 
                                        ? 'rotate(45deg) translate(50%, 50%)' 
                                        : 'rotate(45deg) translate(-50%, -50%)',
                                    transition: 'transform 0.6s ease',
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                        
                        {/* Icono del rayo */}
                        <Zap 
                            size={isMobile ? 26 : 28} 
                            color="white" 
                            style={{
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                                transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
                                transition: isMobile ? 'none' : 'transform 0.3s ease'
                            }}
                        />
                    </button>
                </Link>
            </div>

            {/* CSS embebido con todas las animaciones y estilos responsive */}
            <style jsx>{`
                /* Animación de pulsación */
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 4px 16px rgba(0, 152, 217, 0.4);
                    }
                    50% {
                        box-shadow: 0 4px 16px rgba(0, 152, 217, 0.8), 0 0 0 10px rgba(0, 152, 217, 0.1);
                    }
                }

                /* Animación de flotación */
                @keyframes float {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }

                /* Animación de entrada */
                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateX(100px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                /* Aplicar animación de entrada */
                .floating-autogenerador-container {
                    animation: slideIn 1s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                }

                /* CRÍTICO: Media queries para móviles */
                @media screen and (max-width: 768px) {
                    .button-label {
                        display: block !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: translateX(0) scale(1) !important;
                        transition: none !important;
                    }
                    
                    .floating-autogenerador-container {
                        top: 90px !important;
                        right: 15px !important;
                        gap: 10px !important;
                    }
                }

                /* Pantallas muy pequeñas */
                @media screen and (max-width: 480px) {
                    .floating-autogenerador-container {
                        top: 80px !important;
                        right: 10px !important;
                        gap: 8px !important;
                    }
                    
                    .button-label {
                        font-size: 12px !important;
                        padding: 6px 12px !important;
                        border-radius: 18px !important;
                    }
                    
                    .floating-main-button {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }

                /* Dispositivos táctiles */
                @media (hover: none) and (pointer: coarse) {
                    .button-label {
                        display: block !important;
                        opacity: 1 !important;
                        visibility: visible !important;
                        transform: translateX(0) scale(1) !important;
                        transition: none !important;
                    }
                    
                    .floating-main-button:active {
                        transform: scale(0.95) !important;
                    }
                }

                /* Respeto por las preferencias de animación */
                @media (prefers-reduced-motion: reduce) {
                    .floating-autogenerador-container {
                        animation: none !important;
                    }
                    
                    .floating-main-button {
                        animation: none !important;
                    }
                    
                    * {
                        transition: none !important;
                    }
                }

                /* Tema oscuro */
                @media (prefers-color-scheme: dark) {
                    .button-label {
                        background-color: #1a202c !important;
                        border-color: #2d3748 !important;
                        color: #f7fafc !important;
                    }
                }

                /* Efectos de foco para accesibilidad */
                .floating-main-button:focus {
                    outline: 3px solid rgba(0, 152, 217, 0.3);
                    outline-offset: 2px;
                }

                /* Estados activos */
                .floating-main-button:active {
                    transform: scale(0.98);
                }

                /* Asegurar que funcione en todos los navegadores */
                .button-label {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
            `}</style>
        </>
    );
};

export default FloatingAutogeneradorButton;