'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SuspensionProgramadaPage() {
  const [activeTab, setActiveTab] = useState('cartera');
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('ABRIL');
  const [municipality, setMunicipality] = useState('ACEVEDO');
  const [suspensionData, setSuspensionData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Lista de años disponibles
  const years = ['2025', '2024', '2023', '2022', '2021'];
  
  // Lista de meses
  const months = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'
  ];
  
  // Lista de municipios
  const municipalities = [
    'ACEVEDO', 'AGRADO', 'AIPE', 'ALGECIRAS', 'ALTAMIRA', 'BARAYA',
    'CAMPOALEGRE', 'COLOMBIA', 'ELÍAS', 'GARZÓN', 'GIGANTE', 'GUADALUPE',
    'HOBO', 'ÍQUIRA', 'ISNOS', 'LA ARGENTINA', 'LA PLATA', 'NÁTAGA',
    'NEIVA', 'OPORAPA', 'PAICOL', 'PALERMO', 'PALESTINA', 'PITAL',
    'PITALITO', 'RIVERA', 'SALADOBLANCO', 'SAN AGUSTÍN', 'SANTA MARÍA',
    'SUAZA', 'TARQUI', 'TELLO', 'TERUEL', 'TESALIA', 'TIMANÁ', 'VILLAVIEJA',
    'YAGUARÁ'
  ];
  
  // Función para consultar suspensiones
  const consultarSuspensiones = () => {
    setLoading(true);
    
    // Simular llamada a API
    setTimeout(() => {
      // Datos de ejemplo - reemplazar con tu llamada a API real
      const datosFicticios = activeTab === 'cartera' 
        ? [
            {
              fecha: '2025-04-15',
              municipio: 'ACEVEDO',
              sector: 'Zona Centro',
              direcciones: 'Calle 5 entre Carreras 3 y 7',
              horario: '8:00 AM - 5:00 PM',
              razon: 'Corte por cartera vencida'
            },
            {
              fecha: '2025-04-20',
              municipio: 'ACEVEDO',
              sector: 'Barrio El Progreso',
              direcciones: 'Carrera 8 entre Calles 10 y 15',
              horario: '9:00 AM - 4:00 PM',
              razon: 'Corte por cartera vencida'
            }
          ]
        : [
            {
              fecha: '2025-04-10',
              municipio: 'ACEVEDO',
              sector: 'Zona Industrial',
              direcciones: 'Avenida Principal y alrededores',
              horario: '7:00 AM - 6:00 PM',
              razon: 'Mantenimiento preventivo de transformadores'
            },
            {
              fecha: '2025-04-25',
              municipio: 'ACEVEDO',
              sector: 'Sector Rural',
              direcciones: 'Vereda El Carmen',
              horario: '8:00 AM - 3:00 PM',
              razon: 'Instalación de nuevos postes de energía'
            }
          ];
      
      setSuspensionData(datosFicticios);
      setLoading(false);
    }, 800);
  };
  
  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Encabezado */}
      <div style={{ 
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: 'white',
        padding: '16px 0'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
            Suspensiones <span style={{ color: '#F97316' }}>Programadas</span>
          </h1>
          <div>
            <Link href="/" style={{ color: '#F97316', marginRight: '12px', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#6B7280' }}>| Suspensiones Programadas</span>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        {/* Pestañas */}
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <div 
            style={{ 
              flex: 1,
              backgroundColor: activeTab === 'cartera' ? '#424242' : '#f1f5f9',
              color: activeTab === 'cartera' ? 'white' : '#64748b',
              padding: '16px',
              textAlign: 'center',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setActiveTab('cartera')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke={activeTab === 'cartera' ? 'white' : '#64748b'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01"
                stroke={activeTab === 'cartera' ? 'white' : '#64748b'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cortes programados por cartera
          </div>
          <div 
            style={{ 
              flex: 1,
              backgroundColor: activeTab === 'mantenimiento' ? '#424242' : '#f1f5f9',
              color: activeTab === 'mantenimiento' ? 'white' : '#64748b',
              padding: '16px',
              textAlign: 'center',
              fontWeight: 'bold',
              cursor: 'pointer',
              borderTopLeftRadius: '6px',
              borderTopRightRadius: '6px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => setActiveTab('mantenimiento')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2"
                stroke={activeTab === 'mantenimiento' ? 'white' : '#64748b'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 2V6M8 2V6M3 10H21M8 14H8.01M12 14H12.01M16 14H16.01M8 18H8.01M12 18H12.01M16 18H16.01"
                stroke={activeTab === 'mantenimiento' ? 'white' : '#64748b'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Suspensiones programadas por mantenimiento
          </div>
        </div>
        
        {/* Filtros */}
        <div style={{ 
          backgroundColor: '#f1f5f9', 
          padding: '24px', 
          borderRadius: '6px', 
          marginBottom: '24px',
          position: 'relative'
        }}>
          {/* Indicador de pestaña activa (flecha hacia abajo) */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: activeTab === 'cartera' ? '25%' : '75%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderBottom: '10px solid #f1f5f9'
          }}></div>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Selector de año */}
            <div style={{ minWidth: '200px', flex: 1 }}>
              <select 
                value={year}
                onChange={(e) => setYear(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            
            {/* Selector de mes */}
            <div style={{ minWidth: '200px', flex: 1 }}>
              <select 
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                {months.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            
            {/* Selector de municipio */}
            <div style={{ minWidth: '200px', flex: 1 }}>
              <select 
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '10px', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}
              >
                {municipalities.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            
            {/* Botón consultar */}
            <div>
              <button
                onClick={consultarSuspensiones}
                style={{ 
                  backgroundColor: '#F97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  minWidth: '150px'
                }}
              >
                Consultar
              </button>
            </div>
          </div>
        </div>
        
        {/* Resultados */}
        <div style={{ backgroundColor: 'white', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          {loading ? (
            // Estado de carga
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '48px 0' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                border: '3px solid #e5e7eb',
                borderTopColor: '#F97316',
                animation: 'spin 1s linear infinite'
              }}></div>
              <style jsx>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : suspensionData.length > 0 ? (
            // Tabla de resultados
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Fecha</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Municipio</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Sector</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Direcciones</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Horario</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Razón</th>
                  </tr>
                </thead>
                <tbody>
                  {suspensionData.map((suspension, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatDate(suspension.fecha)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{suspension.municipio}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{suspension.sector}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{suspension.direcciones}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{suspension.horario}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{suspension.razon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Sin resultados
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '48px 0', 
              textAlign: 'center'
            }}>
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginBottom: '16px', color: '#9ca3af' }}
              >
                <path 
                  d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
              <h3 style={{ fontSize: '18px', color: '#4b5563', marginBottom: '8px' }}>
                No hay suspensiones programadas
              </h3>
              <p style={{ color: '#6b7280', maxWidth: '500px', margin: '0 auto' }}>
                No se encontraron suspensiones programadas para {municipality} en {month} de {year}.
                Por favor, intenta con otro mes o municipio.
              </p>
            </div>
          )}
        </div>
        
        {/* Nota informativa */}
        <div style={{ 
          backgroundColor: '#fff7ed', 
          border: '1px solid #ffedd5',
          borderLeft: '4px solid #F97316',
          padding: '16px', 
          borderRadius: '4px',
          marginTop: '24px'
        }}>
          <h3 style={{ color: '#c2410c', fontSize: '16px', marginBottom: '8px' }}>Información importante</h3>
          <p style={{ color: '#9a3412', marginBottom: '0' }}>
            Esta programación está sujeta a cambios sin previo aviso por situaciones climáticas, operativas o de fuerza mayor.
            Para más información comuníquese a nuestra línea de atención al cliente: 018000 952 115.
          </p>
        </div>
      </div>
    </div>
  );
}

// Función para formatear fechas
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('es-ES', options);
}