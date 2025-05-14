"use client";
import React, { useState, useEffect } from 'react';

export default function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Configuraciones personalizables
  const whatsappNumber = "573209876543"; // Cambia esto por tu número real
  const message = "Hola, estoy interesado en los servicios de ElectroHuila...";
  const quickOptions = [
    "Quiero reportar una falla en el servicio",
    "Necesito información sobre mi factura",
    "¿Dónde puedo pagar mi cuenta?",
    "Tengo problemas con mi suministro eléctrico"
  ];

  // Iniciar animación de pulso y mostrar tooltip después de un tiempo
  useEffect(() => {
    const pulseTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 3000);
    
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(tooltipTimer);
    };
  }, []);

  // Ocultar tooltip después de un tiempo
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);

  // Manejar clic en el botón
  const handleButtonClick = () => {
    setIsAnimating(false);
    setShowTooltip(false);
    setIsOpen(!isOpen);
  };

  // Abrir chat de WhatsApp con mensaje
  const openWhatsApp = (customMessage = null) => {
    const text = encodeURIComponent(customMessage || message);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px', // Posicionado justo encima del botón de "Pagar en"
      right: '20px',
      zIndex: 9999,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          backgroundColor: 'white',
          color: '#333',
          padding: '12px 16px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '260px',
          animationName: 'fadeIn',
          animationDuration: '0.3s',
          animationTimingFunction: 'ease-out',
          border: '1px solid #e1e1e1',
          fontWeight: '500',
          fontSize: '14px'
        }}>
          ¿Necesitas ayuda? ¡Contáctanos por WhatsApp!
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            right: '24px',
            width: '10px',
            height: '10px',
            backgroundColor: 'white',
            transform: 'rotate(45deg)',
            borderRight: '1px solid #e1e1e1',
            borderBottom: '1px solid #e1e1e1'
          }}></div>
          <button
            onClick={() => setShowTooltip(false)}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#999',
              padding: '0',
              fontSize: '16px',
              lineHeight: '1'
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* Panel de opciones */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
          width: '280px',
          animationName: 'scaleIn',
          animationDuration: '0.3s',
          animationTimingFunction: 'ease-out'
        }}>
          {/* Encabezado */}
          <div style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '16px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '16px',
            position: 'relative'
          }}>
            <span style={{ marginRight: '10px' }}>💬</span>
            Escríbenos por WhatsApp
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '4px',
                lineHeight: '1'
              }}
            >
              ×
            </button>
          </div>
          
          {/* Opciones rápidas */}
          <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '12px', fontSize: '14px', color: '#555' }}>
              Selecciona una opción o escríbenos directamente:
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '8px'
            }}>
              {quickOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => openWhatsApp(option)}
                  style={{
                    backgroundColor: '#f5f5f5',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontWeight: '500',
                    fontSize: '13px',
                    color: '#333'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#eaeaea';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => openWhatsApp()}
              style={{
                backgroundColor: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 16px',
                width: '100%',
                marginTop: '16px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#1ea855';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#25D366';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(37, 211, 102, 0.3)';
              }}
            >
              <span style={{ fontSize: '18px' }}>📱</span>
              <span>Contactar ahora</span>
            </button>
          </div>
        </div>
      )}

      {/* Botón flotante de WhatsApp */}
      <button
        onClick={handleButtonClick}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#25D366',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
          border: 'none',
          position: 'relative',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          animationName: isAnimating ? 'pulse' : '',
          animationDuration: '2s',
          animationIterationCount: 'infinite'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.25)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
        }}
      >
        {isOpen ? (
          <span style={{ fontSize: '24px' }}>×</span>
        ) : (
          <svg width="70" height="70" viewBox="0 0 24 24" fill="white">
            <path d="M17.6 6.32A7.85 7.85 0 0 0 12.04 4c-4.32 0-7.84 3.53-7.84 7.86 0 1.38.36 2.73 1.05 3.93l-1.12 4.1 4.2-1.1a7.85 7.85 0 0 0 3.76.96h.01c4.32 0 7.84-3.53 7.84-7.86 0-2.1-.82-4.07-2.3-5.56zM12.04 19.31h-.01a6.54 6.54 0 0 1-3.33-.92l-.24-.14-2.47.65.66-2.41-.16-.25a6.52 6.52 0 0 1-1-3.47c0-3.6 2.92-6.52 6.52-6.52 1.74 0 3.38.68 4.61 1.91a6.53 6.53 0 0 1 1.91 4.62c0 3.6-2.92 6.53-6.5 6.53zm3.57-4.88c-.2-.1-1.17-.58-1.35-.64-.18-.06-.31-.1-.44.1-.13.2-.5.64-.62.77-.11.13-.22.15-.42.05a5.35 5.35 0 0 1-1.57-.97 5.87 5.87 0 0 1-1.09-1.36c-.11-.2-.01-.3.09-.4.09-.09.2-.23.3-.35.1-.12.13-.2.2-.33.07-.13.03-.25-.02-.35-.05-.1-.44-1.06-.6-1.45-.16-.38-.33-.33-.44-.33-.11 0-.25-.03-.38-.03s-.35.05-.53.25c-.18.2-.7.68-.7 1.66 0 .98.72 1.92.82 2.05.1.13 1.4 2.13 3.39 2.99.47.2.84.33 1.13.42.48.15.91.13 1.25.08.38-.06 1.17-.48 1.33-.94.16-.46.16-.86.11-.94-.04-.1-.18-.15-.38-.25z" fill="white"/>
          </svg>
        )}
      </button>

      {/* Estilos CSS para animaciones */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            transform: scale(1);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
            transform: scale(1.05);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            transform: scale(1);
          }
        }
        
        @keyframes scaleIn {
          0% {
            transform: translateY(20px) scale(0.9);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}