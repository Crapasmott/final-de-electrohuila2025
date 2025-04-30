// ARCHIVO 1: app/comunicados/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';

export default function Comunicados() {
  // Datos de ejemplo
  const comunicados = [
    { id: 1, titulo: "Comunicado de Prensa Noviembre 24 de 2024", fecha: "24/11/2024" },
    { id: 2, titulo: "Circular No. 044 de 2024", fecha: "15/11/2024" },
    { id: 3, titulo: "Comunicado de Prensa 03 de Mayo de 2024", fecha: "03/05/2024" },
    { id: 4, titulo: "Comunicado de Prensa Abril 8 de 2024", fecha: "08/04/2024" },
    { id: 5, titulo: "Comunicado de Prensa Mantenimiento", fecha: "15/03/2024" },
    { id: 6, titulo: "Corte de Emergencia del Servicio", fecha: "27/02/2024" },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Comunicados</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {comunicados.map(comunicado => (
          <div key={comunicado.id} style={{ 
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: 'white'
          }}>
            <div style={{ backgroundColor: '#0086d6', color: 'white', padding: '10px 15px' }}>
              Comunicado
            </div>
            
            <div style={{ 
              height: '150px', 
              backgroundColor: '#eee',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
            
            <div style={{ padding: '15px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{comunicado.titulo}</h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{comunicado.fecha}</p>
              <Link 
                href={`/comunicados/${comunicado.id}`}
                style={{ color: '#0086d6', textDecoration: 'none', fontSize: '14px' }}
              >
                Leer más →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}