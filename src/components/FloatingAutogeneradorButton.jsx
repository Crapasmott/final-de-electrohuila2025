'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';

const FloatingAutogeneradorButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="floating-autogenerador-container"
            style={{
                position: 'fixed',
                top: '120px',
                right: '20px',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Tooltip que aparece al hacer hover */}
            <div
                className="tooltip"
                style={{
                    backgroundColor: '#2d3748',
                    color: 'white',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    whiteSpace: 'nowrap',
                    transform: isHovered ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.95)',
                    opacity: isHovered ? 1 : 0,
                    visibility: isHovered ? 'visible' : 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    position: 'relative',
                    border: '1px solid #4a5568'
                }}
            >
                Consulta de Autogeneradores
                
                {/* Flecha del tooltip */}
                <div
                    style={{
                        position: 'absolute',
                        right: '-7px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '0',
                        height: '0',
                        borderLeft: '7px solid #2d3748',
                        borderTop: '7px solid transparent',
                        borderBottom: '7px solid transparent'
                    }}
                />
            </div>

            {/* Botón flotante principal */}
            <Link href="http://200.21.4.66:8070/ehfact2/" style={{ textDecoration: 'none' }}>
                <button
                    className="floating-button"
                    style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        backgroundColor: '#0098d9',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(0, 152, 217, 0.4)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: isHovered ? 'scale(1.1) rotate(360deg)' : 'scale(1) rotate(0deg)',
                        animation: 'pulse 3s infinite, float 6s ease-in-out infinite',
                        outline: 'none',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#0087c7';
                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 152, 217, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#0098d9';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 152, 217, 0.4)';
                    }}
                    aria-label="Consulta de Autogeneradores"
                >
                    {/* Efecto de brillo */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '-50%',
                            left: '-50%',
                            width: '200%',
                            height: '200%',
                            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
                            transform: isHovered ? 'rotate(45deg) translate(50%, 50%)' : 'rotate(45deg) translate(-50%, -50%)',
                            transition: 'transform 0.6s ease',
                            pointerEvents: 'none'
                        }}
                    />
                    
                    {/* Icono */}
                    <Zap 
                        size={28} 
                        color="white" 
                        style={{
                            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                </button>
            </Link>

            {/* Estilos CSS embebidos */}
            <style jsx>{`
                /* Animación de pulsación */
                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 4px 20px rgba(0, 152, 217, 0.4);
                    }
                    50% {
                        box-shadow: 0 4px 20px rgba(0, 152, 217, 0.8), 0 0 0 10px rgba(0, 152, 217, 0.1);
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

                /* Animación de aparición */
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

                .floating-autogenerador-container {
                    animation: slideIn 1s ease-out;
                }

                /* Responsive para móviles */
                @media (max-width: 768px) {
                    .floating-autogenerador-container {
                        top: 90px !important;
                        right: 15px !important;
                        gap: 8px !important;
                    }
                    
                    .floating-button {
                        width: 56px !important;
                        height: 56px !important;
                    }
                    
                    .tooltip {
                        padding: 8px 12px !important;
                        font-size: 12px !important;
                        border-radius: 6px !important;
                    }
                }

                @media (max-width: 480px) {
                    .floating-autogenerador-container {
                        top: 80px !important;
                        right: 10px !important;
                    }
                    
                    .floating-button {
                        width: 50px !important;
                        height: 50px !important;
                    }
                }

                /* Para dispositivos táctiles */
                @media (hover: none) and (pointer: coarse) {
                    .tooltip {
                        display: none;
                    }
                    
                    .floating-button:active {
                        transform: scale(0.95) !important;
                    }
                }

                /* Accesibilidad - respeto por las preferencias de animación */
                @media (prefers-reduced-motion: reduce) {
                    .floating-autogenerador-container {
                        animation: none;
                    }
                    
                    .floating-button {
                        animation: none !important;
                    }
                    
                    * {
                        transition: none !important;
                    }
                }

                /* Tema oscuro */
                @media (prefers-color-scheme: dark) {
                    .tooltip {
                        background-color: #1a202c;
                        border-color: #2d3748;
                    }
                }

                /* Hover effects adicionales */
                .floating-button:focus {
                    outline: 3px solid rgba(0, 152, 217, 0.3);
                    outline-offset: 2px;
                }

                .floating-button:active {
                    transform: scale(0.98);
                }
            `}</style>
        </div>
    );
};

export default FloatingAutogeneradorButton;