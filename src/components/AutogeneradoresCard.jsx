'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AutogeneradoresCard() {
  const [showOptions, setShowOptions] = useState(false);
  
  // URLs para los autogeneradores
  const opciones = [
    { 
      nombre: "SOLICITUDES AGPE-AGGE-GD", 
      descripcion: "Sistema de facturación eléctrica", 
      url: "http://200.21.4.66:8070/ehfact2/" 
    },
    { 
      nombre: "Conexiones", 
      descripcion: "conexiones", 
      url: "https://enlinea.electrohuila.com.co/home/" 
    }
  ];

  return (
    <div
      className="quick-card"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
      style={{ position: 'relative', overflow: 'visible' }}
    >
      <div className="icon-container">
        <Image 
          src="/images/iconos/solar.png" 
          alt="Autogeneradores" 
          width={60} 
          height={60} 
          className="card-icon animated-icon"
        />
      </div>
      <h3>Nuevas Conexiones</h3>
      <p>Permiten al usuario gestionar de una manera eficiente los objetivos.</p>
      
      <button 
        onClick={() => setShowOptions(!showOptions)}
        className="btn-green"
      >
       Nuevas Conexiones
      </button>
      
      {/* Panel de opciones */}
      {showOptions && (
        <div 
          style={{
            position: 'absolute',
            top: '100%',
            left: '0',
            right: '0',
            backgroundColor: 'white',
            borderRadius: '0 0 8px 8px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            padding: '15px',
            zIndex: 10,
            marginTop: '5px'
          }}
        >
          <h4 style={{ 
            margin: '0 0 10px 0', 
            fontSize: '16px', 
            textAlign: 'center',
            color: '#0A3A89'
          }}>
            Seleccione un sistema:
          </h4>
          
          {opciones.map((opcion, index) => (
            <a
              key={index}
              href={opcion.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                padding: '10px 15px',
                marginBottom: index === 0 ? '10px' : '0',
                backgroundColor: '#f5f9ff',
                borderRadius: '6px',
                textDecoration: 'none',
                color: '#333',
                border: '1px solid #dae7f8',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#dae7f8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f9ff';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '3px', 
                color: '#0A3A89'
              }}>
                {opcion.nombre}
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#666'
              }}>
                {opcion.descripcion}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}