"use client";
import React, { useState, useRef } from 'react';

interface ContactOption {
  id: string;
  text: string;
  url: string;
}

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Manejar hover del mouse
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const contactOptions: ContactOption[] = [
    { id: 'atencion', text: 'Atención al Cliente', url: '/contactenos/atencion' },
    { id: 'reportes', text: 'Reportar Fallas', url: '/contactenos/reportes' },
    { id: 'factura', text: 'Consulta de Facturas', url: '/pagos/factura' },
    { id: 'puntos', text: 'Puntos de Atención', url: '/contactenos/puntos' },
    { id: 'pqrs', text: 'PQRS', url: '/contactenos/pqrs' }
  ];

  return (
    <div 
      className="floating-contact-container" 
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'fixed',
        right: 0,
        top: '40%',
        transform: 'translateY(-50%)',
        zIndex: 998,
        fontFamily: 'inherit'
      }}>
      {/* Menú desplegado */}
      {isOpen && (
        <div 
          style={{
            position: 'absolute',
            right: isOpen ? '60px' : '10px', // Posición absoluta para un mejor control
            top: '0',
            backgroundColor: 'white',
            borderRadius: '10px 0 0 10px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
            overflow: 'hidden',
            width: '250px',
            transition: 'right 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease', // Curva de aceleración suave
            opacity: isOpen ? 1 : 0,
            pointerEvents: isOpen ? 'auto' : 'none', // Evita clics cuando está oculto
            visibility: isOpen ? 'visible' : 'hidden' // Mejora la accesibilidad
          }}
        >
          <div 
            style={{
              backgroundColor: '#0A3A89',
              color: 'white',
              padding: '15px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>Contáctenos</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px'
              }}
            >
              ×
            </button>
          </div>
          <div style={{ padding: '10px' }}>
            {contactOptions.map(option => (
              <a 
                key={option.id}
                href={option.url}
                style={{
                  display: 'block',
                  padding: '12px 15px',
                  color: '#333',
                  textDecoration: 'none',
                  borderBottom: '1px solid #eee',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#f5f5f5';
                  e.currentTarget.style.paddingLeft = '20px';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.paddingLeft = '15px';
                }}
              >
                {option.text}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Botones estilo accesibilidad - Solo un botón redondeado */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Botón único con icono de persona */}
        <button
          onClick={() => {}}
          style={{
            backgroundColor: '#0A3A89',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            borderRadius: '10px 0 0 10px' // Bordes redondeados solo en la parte interior (izquierda)
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#0C4AA3';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#0A3A89';
          }}
        >
          {/* Icono usuario o persona en SVG */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </button>
      </div>

      <style jsx>{`
        /* Eliminado el keyframe de animación ya que no lo estamos usando */
      `}</style>
    </div>
  );
}