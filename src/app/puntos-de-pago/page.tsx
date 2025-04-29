'use client';

import { useState, useEffect } from 'react';
import { BarraBusqueda } from '@/components/BarraBusqueda';

export default function PuntosPago() {
  // Datos de ejemplo
  const puntosData = [
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "ACEVEDO OFICINA PRINCIPAL", direccion: "CARRERA 5 No 7 - 35 CENTRO" },
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "GALERIA ACEVEDO", direccion: "CARRERA 5 No. 3-26 - CENTRO" },
    { municipio: "RIVERA", recaudador: "Suchance", sitioVenta: "RIVERA OFICINA PRINCIPAL", direccion: "CALLE 4 No 7-62 Y 7-72" }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [recaudador, setRecaudador] = useState('Todos');
  const [filteredData, setFilteredData] = useState(puntosData);
  
  // Aplicar filtros cuando cambian los criterios
  useEffect(() => {
    let filtered = [...puntosData];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(punto => 
        punto.municipio.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por recaudador
    if (recaudador !== 'Todos') {
      filtered = filtered.filter(punto => 
        punto.recaudador === recaudador
      );
    }
    
    setFilteredData(filtered);
  }, [searchTerm, recaudador]);
  
  // Manejar búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  
  // Manejar cambio de recaudador
  const handleRecaudadorChange = (newRecaudador) => {
    setRecaudador(newRecaudador);
  };

  return (
    <div>
      {/* Encabezado azul - Centrado */}
      <div style={{ 
        backgroundColor: '#2563EB', 
        color: 'white', 
        padding: '32px 0', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '12px' }}>Puntos de Pago</h1>
          <p style={{ fontSize: '18px', marginBottom: '24px' }}>
            Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía.
          </p>
          
          {/* Componente de búsqueda */}
          <BarraBusqueda onSearch={handleSearch} />
        </div>
      </div>
      
      {/* Contenido principal - Centrado */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '24px', 
        backgroundColor: '#F9FAFB' 
      }}>
        {/* Filtros */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            gap: '8px', 
            marginBottom: '8px' 
          }}>
            <span style={{ color: '#374151' }}>Filtrar por recaudador:</span>
            {['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo'].map((item) => (
              <button
                key={item}
                onClick={() => handleRecaudadorChange(item)}
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
        <div style={{ 
          border: '1px solid #E5E7EB', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          backgroundColor: 'white'
        }}>
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
              {filteredData.length > 0 ? (
                filteredData.map((punto, index) => (
                  <tr key={index} style={{ borderBottom: index === filteredData.length - 1 ? 'none' : '1px solid #E5E7EB' }}>
                    <td style={{ padding: '12px 16px', color: '#111827', fontSize: '14px' }}>{punto.municipio}</td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{punto.recaudador}</td>
                    <td style={{ padding: '12px 16px', fontSize: '14px' }}>
                      <span style={{ color: punto.sitioVenta.includes('OFICINA PRINCIPAL') ? '#2563EB' : '#374151' }}>
                        {punto.sitioVenta}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>{punto.direccion}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6B7280' }}>
                    No se encontraron resultados con los criterios de búsqueda.
                  </td>
                </tr>
              )}
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