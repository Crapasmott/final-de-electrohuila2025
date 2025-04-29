'use client';

import { useState } from 'react';

export default function PuntosPago() {
  // Datos de ejemplo
  const puntosData = [
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "ACEVEDO OFICINA PRINCIPAL", direccion: "CARRERA 5 No 7 - 35 CENTRO" },
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "GALERIA ACEVEDO", direccion: "CARRERA 5 No. 3-26 - CENTRO" },
    { municipio: "NEIVA", recaudador: "Banco Occidente", sitioVenta: "Electrohuila el Saire", direccion: "Carrera 18 calle 9 Esquina" },
    { municipio: "NEIVA", recaudador: "Credifuturo", sitioVenta: "Sede Principal", direccion: "Cra 5 # 10-23" },
    { municipio: "RIVERA", recaudador: "Suchance", sitioVenta: "RIVERA OFICINA PRINCIPAL", direccion: "CALLE 4 No 7-62 Y 7-72" }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [recaudador, setRecaudador] = useState('Todos');
  
  // Filtrar datos
  const filteredData = puntosData.filter(punto => {
    return (recaudador === 'Todos' || punto.recaudador === recaudador);
  });

  return (
    <div>
      {/* Encabezado azul */}
      <div style={{ backgroundColor: '#2563EB', color: 'white', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '12px' }}>Puntos de Pago</h1>
        <p style={{ fontSize: '18px', marginBottom: '24px' }}>
          Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía.
        </p>
        
        {/* Buscador */}
        <div style={{ display: 'flex', maxWidth: '400px' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
              type="text"
              placeholder="Buscar por municipio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 8px 8px 36px',
                border: 'none',
                borderRadius: '4px 0 0 4px',
                outline: 'none'
              }}
            />
            <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <button
            style={{
              backgroundColor: '#1D4ED8',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer'
            }}
          >
            Buscar
          </button>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Filtros */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <span style={{ color: '#374151' }}>Filtrar por recaudador:</span>
            {['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo'].map((item) => (
              <button
                key={item}
                onClick={() => setRecaudador(item)}
                style={{
                  backgroundColor: recaudador === item ? '#2563EB' : '#F3F4F6',
                  color: recaudador === item ? 'white' : '#374151',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '6px 16px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {item}
              </button>
            ))}
          </div>
          
          <p style={{ color: '#6B7280', fontSize: '14px' }}>
            Mostrando {filteredData.length} resultados
          </p>
        </div>
        
        {/* Tabla */}
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#F9FAFB' }}>
              <tr>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase' }}>MUNICIPIO</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase' }}>RECAUDADOR</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase' }}>SITIO DE VENTA</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: '600', color: '#4B5563', textTransform: 'uppercase' }}>DIRECCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((punto, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #E5E7EB' }}>
                  <td style={{ padding: '12px 16px', color: '#111827', fontSize: '14px' }}>{punto.municipio}</td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{punto.recaudador}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                    <span style={{ color: punto.sitioVenta.includes('OFICINA PRINCIPAL') ? '#2563EB' : '#374151' }}>
                      {punto.sitioVenta}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{punto.direccion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <div style={{ display: 'flex' }}>
            <button style={{ display: 'inline-flex', alignItems: 'center', padding: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', borderRadius: '4px 0 0 4px', color: '#6B7280' }}>&lt;</button>
            <button style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#2563EB', fontWeight: '500', borderLeft: 'none' }}>1</button>
            <button style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#4B5563', borderLeft: 'none' }}>2</button>
            <button style={{ display: 'inline-flex', alignItems: 'center', padding: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', borderRadius: '0 4px 4px 0', color: '#6B7280', borderLeft: 'none' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}