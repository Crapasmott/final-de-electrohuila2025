'use client';

import Link from 'next/link';

export default function TarifasPage() {
  // Lista de años disponibles
  const years = [
    '2025', '2024', '2023', '2022', '2021', '2020',
    '2019', '2018', '2017', '2016', '2015', '2014',
    '2013', '2012', '2011', '2010', '2009', '2008'
  ];
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#333' }}>Tarifas</h1>
        <div>
          <Link href="/" style={{ color: '#FF6600', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 8px', color: '#666' }}>|</span>
          <span style={{ color: '#666' }}>Tarifas</span>
        </div>
      </div>
      
      {/* Subtitle */}
      <div style={{ marginBottom: '20px' }}>
        <span style={{ color: '#426bae', fontSize: '18px' }}>Tarifas clientes regulados</span>
      </div>
      
      <hr style={{ border: 'none', borderTop: '1px solid #e0e0e0', margin: '20px 0' }} />
      
      {/* Header del contenido */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase' }}>
          TARIFAS CLIENTES REGULADOS
        </h2>
      </div>
      
      {/* Grid de años */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(6, 1fr)', 
        gap: '16px',
        marginBottom: '80px' // Añadido espacio en la parte inferior
      }}>
        {years.map(year => (
          <Link 
            key={year} 
            href={`/tarifas/${year}`} 
            style={{ 
              padding: '12px 20px', 
              border: '1px solid #e0e0e0', 
              borderRadius: '4px', 
              textDecoration: 'none', 
              color: '#666', 
              display: 'flex', 
              alignItems: 'center' 
            }}
          >
            <span style={{ display: 'inline-block', marginRight: '10px' }}>📁</span>
            <span>{year}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}