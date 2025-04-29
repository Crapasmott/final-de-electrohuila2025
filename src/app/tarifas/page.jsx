'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TarifasPage() {
  // Lista de años disponibles (desde el más reciente)
  const years = [
    '2025', '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015', '2014',
    '2013', '2012', '2011', '2010', '2009', '2008'
  ];
  
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {/* Encabezado */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        padding: '16px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
            Tarifas
          </h1>
          <div>
            <Link href="/" style={{ color: '#F97316', marginRight: '12px', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#6B7280' }}>| Tarifas</span>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', color: '#666', marginBottom: '24px', fontWeight: 'normal' }}>
          Tarifas clientes regulados
        </h2>
        
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#e5e7eb', margin: '16px 0 24px 0' }} />
        
        <h3 style={{ 
          fontSize: '16px', 
          color: '#333', 
          marginBottom: '24px', 
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          TARIFAS CLIENTES REGULADOS
        </h3>
        
        {/* Grid de años */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '16px',
          marginBottom: '40px'
        }}>
          {years.map(year => (
            <Link 
              key={year} 
              href={`/tarifas/${year}`}
              style={{ 
                textDecoration: 'none',
                display: 'block', 
                border: '1px solid #e5e7eb', 
                padding: '12px 16px',
                borderRadius: '4px',
                color: '#666',
                textAlign: 'center',
                transition: 'all 0.2s',
                fontSize: '16px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg 
                  style={{ marginRight: '8px' }} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5Z" 
                    stroke="#666" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M16 3V7" 
                    stroke="#666" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M8 3V7" 
                    stroke="#666" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M3 11H21" 
                    stroke="#666" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                {year}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}