"use client";
import React, { useState, useEffect } from 'react';

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Opciones del menú de servicios
  const contactOptions = [
    {
      id: 'atcliente',
      title: 'Atención al Cliente',
      icon: '👤',
      description: 'Consulta sobre tu servicio y atención personalizada',
      link: '/contactenos/atencion-cliente'
    },
    {
      id: 'reportes',
      title: 'Reportar Fallas',
      icon: '⚡',
      description: 'Informa problemas en el servicio eléctrico',
      link: '/contactenos/reportar-fallas'
    },
    {
      id: 'factura',
      title: 'Consulta de Facturas',
      icon: '📄',
      description: 'Consulta y paga tus facturas en línea',
      link: '/pagos/factura'
    },
    {
      id: 'puntos',
      title: 'Puntos de Atención',
      icon: '📍',
      description: 'Encuentra nuestras oficinas y puntos de servicio',
      link: '/contactenos/puntos-atencion'
    },
    {
      id: 'pqrs',
      title: 'PQRS',
      icon: '📝',
      description: 'Peticiones, quejas, reclamos y sugerencias',
      link: '/contactenos/pqrs'
    }
  ];

  // Cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const container = document.getElementById('floating-contact-container');
      if (container && !container.contains(event.target)) {
        setIsOpen(false);
        setActiveOption(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Redirigir a la página del servicio seleccionado
  const handleOptionClick = (option) => {
    window.location.href = option.link;
  };

  // Mostrar descripción y animación al pasar sobre una opción
  const handleOptionHover = (optionId) => {
    setActiveOption(optionId);
  };

  return (
    <div 
      id="floating-contact-container"
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Menú desplegable */}
      {isOpen && (
        <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            width: '300px',
            marginBottom: '16px',
            overflow: 'hidden',
            transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
            animation: 'slideIn 0.3s forwards',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Encabezado del menú */}
          <div 
            style={{
              backgroundColor: '#0078d7',
              color: 'white',
              padding: '16px 20px',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', fontSize: '18px' }}>👋</span>
              <span>¿Cómo podemos ayudarte?</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setActiveOption(null);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ×
            </button>
          </div>

          {/* Opciones del menú */}
          <div 
            style={{
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflowY: 'auto'
            }}
          >
            {contactOptions.map(option => (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => handleOptionHover(option.id)}
                onMouseLeave={() => setActiveOption(null)}
                style={{
                  backgroundColor: activeOption === option.id ? '#f0f9ff' : '#f8f8f8',
                  border: `1px solid ${activeOption === option.id ? '#bce0fd' : '#e5e5e5'}`,
                  borderRadius: '10px',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  transform: activeOption === option.id ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: activeOption === option.id ? '0 6px 12px rgba(0, 120, 215, 0.1)' : 'none'
                }}
              >
                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div 
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      backgroundColor: activeOption === option.id ? '#0078d7' : '#e1e1e1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '20px',
                      transition: 'background-color 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    {option.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div 
                      style={{
                        fontWeight: 'bold',
                        fontSize: '15px',
                        color: activeOption === option.id ? '#0078d7' : '#333',
                        marginBottom: '4px',
                        transition: 'color 0.2s ease'
                      }}
                    >
                      {option.title}
                    </div>
                    <div 
                      style={{
                        fontSize: '13px',
                        color: '#666',
                        lineHeight: '1.3',
                        height: activeOption === option.id ? '20px' : '0',
                        overflow: 'hidden',
                        opacity: activeOption === option.id ? 1 : 0,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                  <div 
                    style={{
                      color: activeOption === option.id ? '#0078d7' : '#999',
                      transition: 'transform 0.2s ease, color 0.2s ease',
                      transform: activeOption === option.id ? 'translateX(5px)' : 'translateX(0)',
                      fontSize: '18px'
                    }}
                  >
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón flotante de contacto */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          backgroundColor: isHovering || isOpen ? '#006bc2' : '#0078d7',
          color: 'white',
          border: 'none',
          borderRadius: '30px',
          padding: isOpen ? '12px 18px' : isHovering ? '12px 24px' : '12px 20px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '15px',
          fontWeight: 'bold',
          boxShadow: isHovering || isOpen 
            ? '0 8px 15px rgba(0, 120, 215, 0.3)' 
            : '0 4px 10px rgba(0, 120, 215, 0.2)',
          transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
          transform: isHovering && !isOpen ? 'scale(1.05)' : 'scale(1)',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div 
          style={{
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '15px'
          }}
        >
          👤
        </div>
        <span style={{ 
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease',
          opacity: 1
        }}>
          {isOpen ? 'Cerrar' : 'Contáctanos'}
        </span>
        {!isOpen && isHovering && (
          <span 
            style={{
              position: 'absolute',
              right: '15px',
              animation: 'bounce 1s infinite alternate',
              fontSize: '18px'
            }}
          >
            →
          </span>
        )}
      </button>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes bounce {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}