'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Esta función obtiene el año de la URL
export default function TarifaYearPage({ params }) {
  const year = params.year;
  const [tarifasData, setTarifasData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulación de carga de datos
    // En una implementación real, aquí cargarías los datos desde tu API
    const fetchTarifasData = async () => {
      setLoading(true);
      try {
        // Simulando una petición a API
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Datos de ejemplo - reemplazarlos con tus datos reales
        const data = {
          year: year,
          meses: [
            { 
              mes: 'Enero', 
              residencial: {
                estrato1: '589.25',
                estrato2: '736.56',
                estrato3: '883.87',
                estrato4: '1031.19',
                estrato5: '1237.43',
                estrato6: '1237.43'
              },
              comercial: '1031.19',
              industrial: '1031.19',
              oficial: '1031.19'
            },
            { 
              mes: 'Febrero', 
              residencial: {
                estrato1: '592.15',
                estrato2: '740.19',
                estrato3: '888.23',
                estrato4: '1036.27',
                estrato5: '1243.52',
                estrato6: '1243.52'
              },
              comercial: '1036.27',
              industrial: '1036.27',
              oficial: '1036.27'
            },
            // Puedes agregar más meses según sea necesario
          ],
          // Opcionalmente puedes incluir documentos descargables
          documentos: [
            {
              nombre: `Resolución tarifas ${year}`,
              url: `/documentos/tarifas_${year}_resolucion.pdf`
            },
            {
              nombre: `Costo unitario ${year}`,
              url: `/documentos/costo_unitario_${year}.pdf`
            }
          ]
        };
        
        setTarifasData(data);
      } catch (error) {
        console.error('Error al cargar los datos de tarifas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTarifasData();
  }, [year]);
  
  // Función para formatear valores monetarios
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2
    }).format(value);
  };
  
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
            Tarifas {year}
          </h1>
          <div>
            <Link href="/" style={{ color: '#F97316', marginRight: '12px', textDecoration: 'none' }}>Inicio</Link>
            <span style={{ color: '#6B7280', marginRight: '12px' }}>|</span>
            <Link href="/tarifas" style={{ color: '#F97316', marginRight: '12px', textDecoration: 'none' }}>Tarifas</Link>
            <span style={{ color: '#6B7280' }}>| {year}</span>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <h2 style={{ fontSize: '18px', color: '#666', marginBottom: '24px', fontWeight: 'normal' }}>
          Tarifas clientes regulados - {year}
        </h2>
        
        <hr style={{ border: 'none', height: '1px', backgroundColor: '#e5e7eb', margin: '16px 0 24px 0' }} />
        
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
        ) : tarifasData ? (
          // Datos de tarifas
          <div>
            {/* Documentos para descargar */}
            {tarifasData.documentos && tarifasData.documentos.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '16px' }}>Documentos</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {tarifasData.documentos.map((doc, index) => (
                    <a 
                      key={index}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        textDecoration: 'none',
                        padding: '10px 16px',
                        backgroundColor: '#f3f4f6',
                        color: '#4b5563',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      <svg 
                        style={{ marginRight: '8px' }} 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7363 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1572 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z" 
                          fill="#4b5563"
                        />
                        <path 
                          d="M16 11H13V8C13 7.73478 12.8946 7.48043 12.7071 7.29289C12.5196 7.10536 12.2652 7 12 7C11.7348 7 11.4804 7.10536 11.2929 7.29289C11.1054 7.48043 11 7.73478 11 8V11H8C7.73478 11 7.48043 11.1054 7.29289 11.2929C7.10536 11.4804 7 11.7348 7 12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H11V16C11 16.2652 11.1054 16.5196 11.2929 16.7071C11.4804 16.8946 11.7348 17 12 17C12.2652 17 12.5196 16.8946 12.7071 16.7071C12.8946 16.5196 13 16.2652 13 16V13H16C16.2652 13 16.5196 12.8946 16.7071 12.7071C16.8946 12.5196 17 12.2652 17 12C17 11.7348 16.8946 11.4804 16.7071 11.2929C16.5196 11.1054 16.2652 11 16 11Z" 
                          fill="#4b5563"
                        />
                      </svg>
                      {doc.nombre}
                    </a>
                  ))}
                </div>
              </div>
            )}
            
            {/* Tabla de tarifas por mes */}
            <h3 style={{ fontSize: '18px', color: '#333', marginBottom: '16px' }}>Tarifas por mes</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f3f4f6' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Mes</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }} colSpan={6}>Residencial ($/kWh)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Comercial ($/kWh)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Industrial ($/kWh)</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Oficial ($/kWh)</th>
                  </tr>
                  <tr style={{ backgroundColor: '#f9fafb' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}></th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 1</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 2</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 3</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 4</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 5</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}>Estrato 6</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}></th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}></th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', borderBottom: '1px solid #e5e7eb' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {tarifasData.meses.map((mes, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb' }}>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', fontWeight: '500' }}>{mes.mes}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato1)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato2)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato3)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato4)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato5)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.residencial.estrato6)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.comercial)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.industrial)}</td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>{formatCurrency(mes.oficial)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Información adicional */}
            <div style={{ 
              backgroundColor: '#f3f4f6', 
              padding: '16px', 
              borderRadius: '4px',
              marginBottom: '32px'
            }}>
              <h4 style={{ fontSize: '16px', color: '#333', marginBottom: '8px' }}>Nota importante:</h4>
              <p style={{ color: '#4b5563', lineHeight: '1.5' }}>
                Las tarifas pueden estar sujetas a cambios según las resoluciones de la Comisión de Regulación de Energía y Gas (CREG).
                Para mayor información puede comunicarse con nuestras líneas de atención al cliente o visitar nuestras oficinas.
              </p>
            </div>
            
            {/* Botón de volver a listado de tarifas */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
              <Link 
                href="/tarifas"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '10px 20px',
                  backgroundColor: '#F97316',
                  color: 'white',
                  borderRadius: '4px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ea580c';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#F97316';
                }}
              >
                <svg 
                  style={{ marginRight: '8px' }} 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M15 19L8 12L15 5" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                Volver a Tarifas
              </Link>
            </div>
          </div>
        ) : (
          // Estado de error o sin datos
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
              No se encontraron datos para el año {year}
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              La información para este período no está disponible en este momento.
            </p>
            <Link 
              href="/tarifas"
              style={{ 
                color: '#F97316', 
                textDecoration: 'none',
                fontWeight: '500' 
              }}
            >
              Volver a Tarifas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}