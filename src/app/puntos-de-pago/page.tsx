'use client';

import { useState, useEffect } from 'react';

export default function PuntosPago() {
  // Estados
  const [puntosData, setPuntosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [recaudador, setRecaudador] = useState('Todos');
  const [filteredData, setFilteredData] = useState([]);
  const [recaudadoresDisponibles, setRecaudadoresDisponibles] = useState(['Todos']);
  
  // Cargar datos desde WordPress al iniciar
  useEffect(() => {
    cargarPuntosDeWordPress();
  }, []);
  
  const cargarPuntosDeWordPress = async () => {
    setLoading(true);
    try {
      console.log('🚀 Cargando puntos de pago desde WordPress...');
      const response = await fetch('https://www.electrohuila.com.co/wp-json/electrohuila/v2/puntos-pago');
      const data = await response.json();
      
      console.log('📄 Respuesta API:', data);
      
      if (data.success && data.data && data.data.length > 0) {
        console.log(`✅ ${data.data.length} puntos de pago cargados desde WordPress`);
        setPuntosData(data.data);
        
        // Extraer recaudadores únicos de los datos
        const recaudadoresUnicos = [...new Set(data.data.map(punto => punto.recaudador))];
        setRecaudadoresDisponibles(['Todos', ...recaudadoresUnicos.sort()]);
        
      } else {
        console.log('⚠️ No se encontraron datos válidos, usando fallback');
        const fallbackData = getDataFallback();
        setPuntosData(fallbackData);
        setRecaudadoresDisponibles(['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo']);
      }
    } catch (error) {
      console.error('❌ Error al cargar desde WordPress:', error);
      const fallbackData = getDataFallback();
      setPuntosData(fallbackData);
      setRecaudadoresDisponibles(['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo']);
    }
    setLoading(false);
  };
  
  // Datos de fallback (solo como respaldo)
  const getDataFallback = () => [
    { municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "ACEVEDO OFICINA PRINCIPAL", direccion: "CARRERA 5 No 7 - 35 CENTRO" },
    { municipio: "NEIVA", recaudador: "Banco Occidente", sitioVenta: "NEIVA OFICINA PRINCIPAL", direccion: "CALLE 8 No. 5-45" },
    { municipio: "PITALITO", recaudador: "Suchance", sitioVenta: "PITALITO CENTRO", direccion: "CARRERA 4 No. 6-15" }
  ];
  
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
  }, [searchTerm, recaudador, puntosData]);
  
  // Manejar envío del formulario de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(inputValue);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '400px',
        flexDirection: 'column'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #f3f3f3', 
          borderTop: '4px solid #2563EB', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          marginBottom: '16px'
        }} />
        <p style={{ color: '#6B7280', fontSize: '16px' }}>Cargando puntos de pago...</p>
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>Conectando con WordPress</p>
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

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
          
          {/* Formulario de búsqueda */}
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
                color: '#000000',
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
            {recaudadoresDisponibles.map((item) => (
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
                  cursor: 'pointer',
                  transition: 'all 0.2s'
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
            Mostrando {filteredData.length} de {puntosData.length} resultados
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
                  <tr key={punto.id || index} style={{ 
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
                    <td style={{ padding: '12px 16px', color: '#374151', fontSize: '14px' }}>
                      <span style={{ 
                        backgroundColor: punto.recaudador === 'Suchance' ? '#EFF6FF' : 
                                        punto.recaudador === 'Banco Occidente' ? '#F0FDF4' :
                                        punto.recaudador === 'Credifuturo' ? '#FEF3C7' :
                                        punto.recaudador === 'Banco Agrario' ? '#F3E8FF' : '#FEE2E2',
                        color: punto.recaudador === 'Suchance' ? '#1D4ED8' : 
                               punto.recaudador === 'Banco Occidente' ? '#059669' :
                               punto.recaudador === 'Credifuturo' ? '#D97706' :
                               punto.recaudador === 'Banco Agrario' ? '#7C3AED' : '#DC2626',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}>
                        {punto.recaudador}
                      </span>
                    </td>
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
        
        {/* Información de conexión */}
        <div style={{ 
          marginTop: '16px', 
          padding: '12px', 
          backgroundColor: '#F0F9FF', 
          borderRadius: '8px',
          fontSize: '14px',
          color: '#1E40AF',
          border: '1px solid #E0F2FE'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '16px' }}>📡</span>
            <span>
              <strong>Datos cargados desde WordPress API</strong> • 
              {puntosData.length} puntos disponibles en {[...new Set(puntosData.map(p => p.municipio))].length} municipios • 
              {recaudadoresDisponibles.length - 1} recaudadores activos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}