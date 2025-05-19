"use client";
import React, { useState, useEffect } from 'react';

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeOptions, setActiveOptions] = useState({
    contrast: false,
    links: false,
    fontSize: 0, // 0: normal, 1: grande, 2: muy grande
    spacing: false,
    animations: false,
    hideImages: false,
    dyslexia: false,
    cursor: false,
    lineHeight: 0, // 0: normal, 1: medio, 2: grande
    textAlign: false, // false: izquierda, true: centrado
    saturation: false,
  });

  // Detectar tamaño de pantalla
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Aplicar cambios de accesibilidad
  useEffect(() => {
    // Estas funciones aplicarían los cambios de accesibilidad al DOM
    // Contraste
    if (activeOptions.contrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    // Enlaces destacados
    if (activeOptions.links) {
      document.body.classList.add('highlight-links');
    } else {
      document.body.classList.remove('highlight-links');
    }

    // Tamaño de texto
    document.body.classList.remove('font-size-large', 'font-size-x-large');
    if (activeOptions.fontSize === 1) {
      document.body.classList.add('font-size-large');
    } else if (activeOptions.fontSize === 2) {
      document.body.classList.add('font-size-x-large');
    }

    // Espaciado
    if (activeOptions.spacing) {
      document.body.classList.add('increased-spacing');
    } else {
      document.body.classList.remove('increased-spacing');
    }

    // Animaciones
    if (activeOptions.animations) {
      document.body.classList.add('stop-animations');
    } else {
      document.body.classList.remove('stop-animations');
    }

    // Ocultar imágenes
    if (activeOptions.hideImages) {
      document.body.classList.add('hide-images');
    } else {
      document.body.classList.remove('hide-images');
    }

    // Fuente para dislexia
    if (activeOptions.dyslexia) {
      document.body.classList.add('dyslexia-friendly');
    } else {
      document.body.classList.remove('dyslexia-friendly');
    }

    // Cursor grande
    if (activeOptions.cursor) {
      document.body.classList.add('large-cursor');
    } else {
      document.body.classList.remove('large-cursor');
    }

    // Altura de línea
    document.body.classList.remove('line-height-medium', 'line-height-large');
    if (activeOptions.lineHeight === 1) {
      document.body.classList.add('line-height-medium');
    } else if (activeOptions.lineHeight === 2) {
      document.body.classList.add('line-height-large');
    }

    // Alineación de texto
    if (activeOptions.textAlign) {
      document.body.classList.add('text-center');
    } else {
      document.body.classList.remove('text-center');
    }

    // Saturación
    if (activeOptions.saturation) {
      document.body.classList.add('saturated');
    } else {
      document.body.classList.remove('saturated');
    }
  }, [activeOptions]);

  // Manejar clic en una opción
  const handleOptionClick = (option) => {
    switch (option) {
      case 'contrast':
      case 'links':
      case 'spacing':
      case 'animations':
      case 'hideImages':
      case 'dyslexia':
      case 'cursor':
      case 'textAlign':
      case 'saturation':
        setActiveOptions({
          ...activeOptions,
          [option]: !activeOptions[option]
        });
        break;
      case 'fontSize':
        setActiveOptions({
          ...activeOptions,
          fontSize: (activeOptions.fontSize + 1) % 3
        });
        break;
      case 'lineHeight':
        setActiveOptions({
          ...activeOptions,
          lineHeight: (activeOptions.lineHeight + 1) % 3
        });
        break;
      default:
        break;
    }
  };

  // Lista de opciones de accesibilidad
  const accessibilityOptions = [
    {
      id: 'contrast',
      title: 'Contraste +',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path fill="currentColor" d="M12 2a10 10 0 0 0 0 20V2z"/>
        </svg>
      )
    },
    {
      id: 'links',
      title: 'Resaltar enlaces',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="10" width="7" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="10" width="7" height="4" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="10" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
        </svg>
      )
    },
    {
      id: 'fontSize',
      title: 'Agrandar texto',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <text x="5" y="16" fontSize="16" fontWeight="bold" fill="currentColor">T</text>
          <text x="14" y="20" fontSize="22" fontWeight="bold" fill="currentColor">T</text>
        </svg>
      )
    },
    {
      id: 'spacing',
      title: 'Espaciado de texto',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M9 8L5 12L9 16" stroke="currentColor" strokeWidth="2"/>
          <path d="M15 8L19 12L15 16" stroke="currentColor" strokeWidth="2"/>
          <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2"/>
        </svg>
      )
    },
    {
      id: 'animations',
      title: 'Detener animaciones',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
          <line x1="12" y1="20" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
          <line x1="22" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="4" y1="12" x2="2" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="19.07" y1="4.93" x2="17.66" y2="6.34" stroke="currentColor" strokeWidth="2"/>
          <line x1="6.34" y1="17.66" x2="4.93" y2="19.07" stroke="currentColor" strokeWidth="2"/>
          <line x1="19.07" y1="19.07" x2="17.66" y2="17.66" stroke="currentColor" strokeWidth="2"/>
          <line x1="6.34" y1="6.34" x2="4.93" y2="4.93" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'hideImages',
      title: 'Ocultar imágenes',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
          <line x1="3" y1="21" x2="21" y2="3" stroke="currentColor" strokeWidth="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15L16 10L8 18H21V15Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'dyslexia',
      title: 'Apto para dislexia',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <text x="5" y="18" fontSize="22" fontWeight="bold" fill="currentColor">Df</text>
        </svg>
      )
    },
    {
      id: 'cursor',
      title: 'Cursor',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M7 4L17 12L10 14L8 20L7 4Z" stroke="currentColor" fill="none" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'lineHeight',
      title: 'Altura de la línea',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 4L12 20" stroke="currentColor" strokeWidth="2" strokeDasharray="1 3"/>
        </svg>
      )
    },
    {
      id: 'textAlign',
      title: 'Texto alineado',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2"/>
          <line x1="4" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
          <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      id: 'saturation',
      title: 'Saturación',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3Z" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 3C10 8 10 16 12 21" fill="currentColor"/>
        </svg>
      )
    },
    {
      id: 'info',
      title: 'Información',
      icon: (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 12V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      action: () => alert('Panel de accesibilidad de ElectroHuila. Estas opciones te permiten ajustar la página web para mejorar tu experiencia de usuario.')
    }
  ];

  return (
    <>
      {/* Estilos CSS para efectos de accesibilidad */}
      <style jsx global>{`
        /* Clases para control de accesibilidad */
        .high-contrast {
          filter: contrast(150%);
          background-color: #000 !important;
          color: #fff !important;
        }
        .high-contrast * {
          background-color: #000 !important;
          color: #fff !important;
          border-color: #fff !important;
        }
        
        .highlight-links a {
          text-decoration: underline !important;
          color: #0078d7 !important;
          font-weight: bold !important;
          border: 1px dashed #0078d7 !important;
          padding: 0 2px !important;
        }
        
        .font-size-large * {
          font-size: 120% !important;
        }
        
        .font-size-x-large * {
          font-size: 150% !important;
        }
        
        .increased-spacing * {
          letter-spacing: 1.5px !important;
          word-spacing: 3px !important;
        }
        
        .stop-animations * {
          animation: none !important;
          transition: none !important;
        }
        
        .hide-images img {
          opacity: 0.1 !important;
          filter: grayscale(100%) !important;
        }
        
        .dyslexia-friendly * {
          font-family: 'OpenDyslexic', 'Comic Sans MS', 'Arial', sans-serif !important;
          line-height: 1.7 !important;
        }
        
        .large-cursor {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M7 4L17 12L10 14L8 20L7 4Z' stroke='black' fill='white' stroke-width='2'/%3E%3C/svg%3E"), auto !important;
        }
        
        .line-height-medium * {
          line-height: 1.8 !important;
        }
        
        .line-height-large * {
          line-height: 2.2 !important;
        }
        
        .text-center * {
          text-align: center !important;
        }
        
        .saturated {
          filter: saturate(150%) !important;
        }
      `}</style>

      {/* Panel de accesibilidad */}
      <div className="accessibility-panel-container" style={{
        position: 'fixed',
        left: '20px',
        bottom: '20px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
        {/* Panel expandido con opciones */}
        {isOpen && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
            padding: '16px',
            marginBottom: '16px',
            width: isMobile ? '300px' : '350px',
            maxWidth: '90vw',
            animationName: 'fadeIn',
            animationDuration: '0.3s',
            animationTimingFunction: 'ease-out'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Opciones de Accesibilidad</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0 5px'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              {accessibilityOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => option.action ? option.action() : handleOptionClick(option.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '14px 10px',
                    backgroundColor: 
                      (option.id === 'fontSize' && activeOptions.fontSize > 0) ||
                      (option.id === 'lineHeight' && activeOptions.lineHeight > 0) ||
                      (option.id !== 'fontSize' && option.id !== 'lineHeight' && activeOptions[option.id])
                        ? '#e6f2ff'
                        : '#f9f9f9',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f0f0f0';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 
                      (option.id === 'fontSize' && activeOptions.fontSize > 0) ||
                      (option.id === 'lineHeight' && activeOptions.lineHeight > 0) ||
                      (option.id !== 'fontSize' && option.id !== 'lineHeight' && activeOptions[option.id])
                        ? '#e6f2ff'
                        : '#f9f9f9';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ marginBottom: '10px', color: '#333' }}>
                    {option.icon}
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: '#333' }}>
                    {option.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Botón para abrir/cerrar el panel */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            backgroundColor: '#0078d7',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#006bc2';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0078d7';
            e.currentTarget.style.transform = 'scale(1)';
          }}
          aria-label="Opciones de accesibilidad"
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
            <path d="M12 6V8M12 16V18M12 12V12.01M7.05 9C7.35 6.82 9.28 5 12 5C13.8565 5 15.637 5.7375 16.9497 7.05025C18.2625 8.36301 19 10.1435 19 12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Animaciones CSS */}
      <style jsx>{`
        @keyframes fadeIn {
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
    </>
  );
}