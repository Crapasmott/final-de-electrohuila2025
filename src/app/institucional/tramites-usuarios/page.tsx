// src/app/institucional/tramites-usuarios/page.jsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TramitesUsuarios() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Cabecera */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <span style={{ color: '#333' }}>Trámites </span>
          <span style={{ color: '#f97316' }}>Usuarios</span>
        </h1>
        <div style={{ fontSize: '14px' }}>
          <Link href="/" style={{ color: '#f97316', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 5px', color: '#6b7280' }}>|</span>
          <span style={{ color: '#6b7280' }}>Trámites Usuarios</span>
        </div>
      </div>

      {/* Lista de trámites */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '5px', overflow: 'hidden' }}>
        {/* Trámite 1 */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 0 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(0)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reclamación de fallas en la prestación del servicio</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 0 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ marginBottom: '15px' }}>Información detallada sobre este trámite.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Trámite 2 */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer',
              backgroundColor: openIndex === 1 ? '#f9fafb' : 'white'
            }}
            onClick={() => toggleItem(1)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite legalización proyectos y cuentas nuevas</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          
          {openIndex === 1 && (
            <div style={{ padding: '15px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ marginBottom: '15px' }}>Información detallada sobre este trámite.</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: 'white', 
                    color: '#3b82f6', 
                    border: '1px solid #3b82f6', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Ver detalles</a>
                <a 
                  href="#"
                  style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    borderRadius: '4px', 
                    textDecoration: 'none' 
                  }}
                >Realizar trámite</a>
              </div>
            </div>
          )}
        </div>

        {/* Resto de trámites siguiendo el mismo patrón */}
        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(2)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite de recurso de reposición - apelación</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(3)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la denuncia de arrendamiento</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(4)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reclamación de facturación</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(5)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para solicitud de cambio de información del cliente</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(6)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite de pago no ingresado</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(7)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Trámite para la reposición del medidor de energía</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div style={{ borderBottom: '1px solid #e5e7eb' }}>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(8)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Terminación del contrato por orden del suscriptor</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>

        <div>
          <div 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '15px', 
              cursor: 'pointer'
            }}
            onClick={() => toggleItem(9)}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#3b82f6', marginRight: '10px' }}>+</span>
              <span style={{ color: '#3b82f6' }}>Plan de mantenimiento de pérdidas</span>
            </div>
            <span style={{ color: '#3b82f6' }}>›</span>
          </div>
          {/* Contenido oculto similar al anterior */}
        </div>
      </div>

      {/* Botones inferiores */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '20px',
        marginTop: '20px'
      }}>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#0099cc', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '5px', 
            textDecoration: 'none',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px' }}>↓</span>
          Medidores soportados para Telegestión
        </a>
        <a 
          href="#" 
          style={{ 
            backgroundColor: '#0099cc', 
            color: 'white', 
            padding: '15px', 
            borderRadius: '5px', 
            textDecoration: 'none',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span style={{ marginRight: '10px' }}>↓</span>
          Formatos solicitud de parametrización
        </a>
      </div>
    </div>
  );
}