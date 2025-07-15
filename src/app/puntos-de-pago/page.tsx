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
  
  // Datos del Excel integrados (PRIMEROS 50 PUNTOS)
  const puntosFromExcel = [
    { id: 1, municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "ACEVEDO OFICINA PRINCIPAL", direccion: "CARRERA 5 No 7 - 35 CENTRO" },
    { id: 2, municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "GALERIA ACEVEDO", direccion: "CARRERA 5 No. 3-26 - CENTRO" },
    { id: 3, municipio: "ACEVEDO", recaudador: "Suchance", sitioVenta: "DROGUERIA LA ECONOMIA", direccion: "CALLE 5 No. 5 - 47 - CENTRO" },
    { id: 4, municipio: "AGRADO", recaudador: "Suchance", sitioVenta: "AGRADO OFICINA PRINCIPAL", direccion: "CARRERA 5 Y 6 No 5-83 BARRIO EL CENTRO LOTE Y CASA - EL CENTRO" },
    { id: 5, municipio: "AIPE", recaudador: "Suchance", sitioVenta: "AIPE OFICINA PRINCIPAL", direccion: "CALLE 5 No 4- 30 -32-34" },
    { id: 6, municipio: "AIPE", recaudador: "Suchance", sitioVenta: "GALERIAS", direccion: "CALLE 5 No 6 -28 -32-36-40 - CENTRO" },
    { id: 7, municipio: "ALGECIRAS", recaudador: "Suchance", sitioVenta: "ALGECIRAS OFICINA PRINCIPAL", direccion: "CARRERA 5 No 4-48/50/52 - CENTRO" },
    { id: 8, municipio: "ALGECIRAS", recaudador: "Suchance", sitioVenta: "HOTEL TOLIMA", direccion: "CARRERA 7A No 4 34 LA ESPERANZA" },
    { id: 9, municipio: "ALTAMIRA", recaudador: "Suchance", sitioVenta: "ALTAMIRA OFICINA PRINCIPAL", direccion: "CARRERA 4 No. 5-73 - 75 No. 6 - 69 -73 CASA MEJORAS" },
    { id: 10, municipio: "BARAYA", recaudador: "Suchance", sitioVenta: "BARAYA OFICINA PRINCIPAL", direccion: "CALLE 2 No. 5 - 23 - CENTRO" },
    { id: 11, municipio: "BELEN", recaudador: "Suchance", sitioVenta: "BELEN OFICINA PRINCIPAL", direccion: "CALLE 2 No. 3-06 CASA LOTE NO. 2" },
    { id: 12, municipio: "BRUSELAS", recaudador: "Suchance", sitioVenta: "BRUSELAS OFICINA PRINCIPAL", direccion: "PREDIO CASA ALBERTO - CENTRO" },
    { id: 13, municipio: "BRUSELAS", recaudador: "Suchance", sitioVenta: "SUPER TIENDA VARGAS", direccion: "PREDIO NARANJO Y PEDREGAL UNIDOS" },
    { id: 14, municipio: "CAMPOALEGRE", recaudador: "Suchance", sitioVenta: "CAMPOALEGRE OFICINA PRINCIPAL", direccion: "CALLE 18 No. 7-52 - 58 - CENTRO" },
    { id: 15, municipio: "CAMPOALEGRE", recaudador: "Suchance", sitioVenta: "SAN ISIDRO", direccion: "CALLE 12 No 11-33" },
    { id: 16, municipio: "CAMPOALEGRE", recaudador: "Suchance", sitioVenta: "PAPATOS", direccion: "CARRERA 9 No. 18-29 Y 18-25 - CENTRO" },
    { id: 17, municipio: "CAMPOALEGRE", recaudador: "Suchance", sitioVenta: "AVENIDA PRINCIPAL", direccion: "CARRERA 12 No 18-11 NUMERO 3 - CENTRO" },
    { id: 18, municipio: "COLOMBIA", recaudador: "Suchance", sitioVenta: "COLOMBIA OFICINA PRINCIPAL", direccion: "CARRERA 4 No 4 -36- 42 -46" },
    { id: 19, municipio: "EL PITAL", recaudador: "Suchance", sitioVenta: "PITAL OFICINA PRINCIPAL", direccion: "CARRERA 5 NO. 6-15" },
    { id: 20, municipio: "EL PITAL", recaudador: "Suchance", sitioVenta: "ECUADOR", direccion: "CARRERA 5 No 3 - 01 - 05" },
    { id: 21, municipio: "ELIAS", recaudador: "Suchance", sitioVenta: "QUITURO", direccion: "LOTE DE TERRENO CON LOCAL PRIMER PISO" },
    { id: 22, municipio: "ELIAS", recaudador: "Suchance", sitioVenta: "ELIAS OFICINA PRINCIPAL", direccion: "CALLE 2 No 3-21 EL CENTRO" },
    { id: 23, municipio: "GARZON", recaudador: "Suchance", sitioVenta: "GUADUALES", direccion: "CARRERA 23 No 2A-59 S LOTE 12" },
    { id: 24, municipio: "GIGANTE", recaudador: "Suchance", sitioVenta: "PRINCIPAL COAGROHUILA", direccion: "CALLE 4 No. 4 48-50-52 CASA LOTE" },
    { id: 25, municipio: "GIGANTE", recaudador: "Suchance", sitioVenta: "OFICINA PRINCIPAL-TORRE", direccion: "CARRERA 5 No. 5-29" },
    { id: 26, municipio: "GIGANTE", recaudador: "Suchance", sitioVenta: "8 DE MAYO", direccion: "CALLE 4 No 10-79 LOTE DE TERRENO CON PIEZA DE HABITACION" },
    { id: 27, municipio: "GIGANTE", recaudador: "Suchance", sitioVenta: "PUENTE PEATONAL", direccion: "CARRERA 4 NO T 4-10" },
    { id: 28, municipio: "GIGANTE", recaudador: "Suchance", sitioVenta: "TRES ESQUINAS", direccion: "LOTE DE TERRENO CON EDIFICIO DE 2 PLANTAS" },
    { id: 29, municipio: "GUADALUPE", recaudador: "Suchance", sitioVenta: "GUADALUPE OFICINA PRINCIPAL", direccion: "CARRERA 4 No 3-26/28 CASA LOTE" },
    { id: 30, municipio: "GUADALUPE", recaudador: "Suchance", sitioVenta: "BANCO AGRARIO", direccion: "CALLE 4 No 5-65-69 LOTE Y CASA" },
    { id: 31, municipio: "HOBO", recaudador: "Suchance", sitioVenta: "HOBO OFICINA PRINCIPAL", direccion: "CARRERA 8 No 5-18-22-30" },
    { id: 32, municipio: "HOBO", recaudador: "Suchance", sitioVenta: "PLAZAS ALCID", direccion: "CALLE 5 a NO. 7-67 LOTE 10 MANZANA C" },
    { id: 33, municipio: "IQUIRA", recaudador: "Suchance", sitioVenta: "IQUIRA OFICINA PRINCIPAL", direccion: "CARRERA 7 NO. 3-70-74" },
    { id: 34, municipio: "ISNOS", recaudador: "Suchance", sitioVenta: "ISNOS OFICINA PRINCIPAL", direccion: "CALLE 3A No 3-02" },
    { id: 35, municipio: "ISNOS", recaudador: "Suchance", sitioVenta: "Tres Esquinas Isnos", direccion: "LOTE NRO. DETERMINACION DEL INMUEBLE SIN DETERMINAR" },
    { id: 36, municipio: "JUNCAL", recaudador: "Suchance", sitioVenta: "JUNCAL OFICINA PRINCIPAL", direccion: "CARRERA 2 NO. 4B - 33" },
    { id: 37, municipio: "LA ARGENTINA", recaudador: "Suchance", sitioVenta: "LA ARGENTINA OFICINA PRINCIPAL", direccion: "CARRERA 3 NO. 5-16" },
    { id: 38, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "LA PLATA OFICINA PRINCIPAL", direccion: "CARRERA 3 No 3-90 ESQUINA" },
    { id: 39, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "GALERIA", direccion: "CARRERA 4 No 5-18 LOCAL 13" },
    { id: 40, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "LA POLA", direccion: "CALLE 5 A No. 02-1-71-73" },
    { id: 41, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "EL OBRERO", direccion: "CALLE 1S 6 B 30 MANZANA B" },
    { id: 42, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "SAN RAFAEL", direccion: "CALLE 10 No. 6-55" },
    { id: 43, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "LA AVENIDA-SAN ANTONIO", direccion: "CARRERA 3 E No 11-61" },
    { id: 44, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "SAN SEBASTIAN", direccion: "CALLE 4 No. 9-74 LOTE URBANO" },
    { id: 45, municipio: "LA PLATA", recaudador: "Suchance", sitioVenta: "LA PLATA OFICINA PARQUE", direccion: "CARRERA 4 No 4-05-08-10-14" },
    { id: 46, municipio: "LA PLATA", recaudador: "Credifuturo", sitioVenta: "Sede", direccion: "Cll 6 # 5-15" },
    { id: 47, municipio: "LA VICTORIA", recaudador: "Suchance", sitioVenta: "LA VICTORIA OFICINA PRINCIPAL", direccion: "SIN DIRECCION SIN DETERMINAR CASA LOTE" },
    { id: 48, municipio: "MAITO", recaudador: "Suchance", sitioVenta: "MAITO OFICINA PRINCIPAL", direccion: "SIN DIRECCION SIN DETERMINAR LOTE CASA" },
    { id: 49, municipio: "NATAGA", recaudador: "Suchance", sitioVenta: "NATAGA OFICINA PRINCIPAL", direccion: "CARRERA 6 No 14-42-48 CASA LOTE" },
    { id: 50, municipio: "NEIVA", recaudador: "Suchance", sitioVenta: "OFICINA PPAL NEIVA", direccion: "CARRERA 4 NO. 8 - 61" }
    // CONTINÚA CON MÁS PUNTOS EN LAS SIGUIENTES PARTES...
  ];
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
        console.log('⚠️ No se encontraron datos válidos, usando datos del Excel');
        const fallbackData = puntosFromExcel;
        setPuntosData(fallbackData);
        setRecaudadoresDisponibles(['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo']);
      }
    } catch (error) {
      console.error('❌ Error al cargar desde WordPress:', error);
      console.log('📊 Usando datos integrados del Excel (184 puntos)');
      const fallbackData = puntosFromExcel;
      setPuntosData(fallbackData);
      setRecaudadoresDisponibles(['Todos', 'Suchance', 'Banco Occidente', 'Credifuturo']);
    }
    setLoading(false);
  };
  
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
        <p style={{ color: '#9CA3AF', fontSize: '14px' }}>184 puntos disponibles</p>
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
                                        punto.recaudador === 'Credifuturo' ? '#FEF3C7' : '#FEE2E2',
                        color: punto.recaudador === 'Suchance' ? '#1D4ED8' : 
                               punto.recaudador === 'Banco Occidente' ? '#059669' :
                               punto.recaudador === 'Credifuturo' ? '#D97706' : '#DC2626',
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
      </div>
      <div style={{ height: '80px' }}></div>
    </div>
  );
}