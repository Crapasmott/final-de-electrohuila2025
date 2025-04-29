'use client';

import { useState, useEffect } from 'react';

export default function PuntosPago() {
  // Datos de ejemplo
  const puntosData = [
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "ACEVEDO OFICINA PRINCIPAL", direccion: "CARRERA 5 No 7 - 35 CENTRO" },
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "GALERIA ACEVEDO", direccion: "CARRERA 5 No. 3-26 - CENTRO" },
    { municipio: "RIVERA", recaudador: "Suchance", sitioVenta: "RIVERA OFICINA PRINCIPAL", direccion: "CALLE 4 No 7-62 Y 7-72" },
    { municipio: "NEIVA", recaudador: "Banco Occidente", sitioVenta: "NEIVA OFICINA PRINCIPAL", direccion: "CALLE 8 No. 5-45" },
    { municipio: "NEIVA", recaudador: "Credifuturo", sitioVenta: "GALERIA NEIVA", direccion: "CARRERA 3 No. 10-28" },
    { municipio: "PITALITO", recaudador: "Suchance", sitioVenta: "PITALITO CENTRO", direccion: "CARRERA 4 No. 6-15" }
  ];

  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [recaudador, setRecaudador] = useState('Todos');
  const [filteredData, setFilteredData] = useState(puntosData);
  
  // Aplicar filtros cuando cambian los criterios
  useEffect(() => {
    let filtered = [...puntosData];
    
    // Filtrar por término de búsqueda
    if (searchTerm && searchTerm.trim() !== '') {
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
  
  // Manejar envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
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
          
          {/* Formulario de búsqueda con texto en negro */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', maxWidth: '400px', margin: '0 auto' }}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Buscar por municipio..."
              style={{
                width: '100%',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '4px 0 0 4px',
                fontSize: '16px',
                color: '#000000', /* Texto en negro */
                backgroundColor: 'white'
              }}
            />
            <button 
              type="submit"
              style={{
                backgroundColor: '#1E40AF',
                color: 'white',
                padding: '10px 16px',
                border: 'none',
                borderRadius: '0 4px 4px 0',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
      
      {/* Contenido principal */}
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
            marginBottom: '16px' 
          }}>
            <span style={{ color: '#374151' }}>Filtrar por recaudador:</span>
            {['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo'].map((item) => (
              <button
                key={item}
                type="button"
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
          
          {/* Filtros activos */}
          {(searchTerm || recaudador !== 'Todos') && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <span style={{ color: '#374151', fontSize: '14px' }}>Filtros activos:</span>
              
              {searchTerm && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '14px'
                }}>
                  <span>Municipio: {searchTerm}</span>
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchTerm('');
                      setInputValue('');
                    }}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '4px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
              
              {recaudador !== 'Todos' && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#E5E7EB',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '14px'
                }}>
                  <span>Recaudador: {recaudador}</span>
                  <button 
                    type="button"
                    onClick={() => setRecaudador('Todos')}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      marginLeft: '4px'
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
              
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setInputValue('');
                  setRecaudador('Todos');
                }}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#2563EB',
                  fontSize: '14px'
                }}
              >
                Limpiar todos
              </button>
            </div>
          )}
          
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
                  <tr key={index} style={{ 
                    borderBottom: index === filteredData.length - 1 ? 'none' : '1px solid #E5E7EB',
                    backgroundColor: index % 2 === 0 ? 'white' : '#F9FAFB'
                  }}>
                    <td style={{ padding: '12px 16px', color: '#111827', fontSize: '14px' }}>
                      {searchTerm && punto.municipio.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                        <span style={{ backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>
                          {punto.municipio}
                        </span>
                      ) : (
                        punto.municipio
                      )}
                    </td>
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
            <button type="button" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', borderRadius: '4px 0 0 4px', color: '#6B7280' }}>&lt;</button>
            <button type="button" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 16px', border: '1px solid #D1D5DB', backgroundColor: 'white', color: '#2563EB', fontWeight: '500', borderLeft: 'none' }}>1</button>
            <button type="button" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px', border: '1px solid #D1D5DB', backgroundColor: 'white', borderRadius: '0 4px 4px 0', color: '#6B7280', borderLeft: 'none' }}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}