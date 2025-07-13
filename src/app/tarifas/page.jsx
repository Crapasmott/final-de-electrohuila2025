// tarifas/page.jsx
'use client';

import { useState, useEffect } from 'react';

export default function TarifasPage() {
  // Estados para datos dinámicos
  const [años, setAños] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estadisticas, setEstadisticas] = useState({
    totalAños: 0,
    totalTarifas: 0,
    ultimaActualizacion: 'Cargando...'
  });

  // Obtener datos reales desde WordPress API
  useEffect(() => {
    async function fetchAños() {
      try {
        console.log('🔍 Obteniendo años desde WordPress API...');
        
        // Obtener años disponibles desde la API de WordPress
        const response = await fetch('https://electrohuila.com.co/wp-json/electrohuila/v1/tarifas?type=years');
        const data = await response.json();
        
        if (data.success && data.years) {
          console.log('✅ Años obtenidos desde WordPress:', data.years.length);
          
          // Convertir datos de la API al formato del diseño
          const añosFormateados = data.years.map(year => ({
            año: year.year.toString(),
            total: 12, // Meses por año
            actualizado: `Diciembre ${year.year}`,
            estado: year.year === 2024 ? 'Activo' : 
                   year.year > 2024 ? 'Futuro' : 'Completo',
            disponible: year.available,
            categoryId: year.categoryId,
            downloadType: year.downloadType
          }));
          
          setAños(añosFormateados);
          
          // Calcular estadísticas reales
          setEstadisticas({
            totalAños: añosFormateados.length,
            totalTarifas: añosFormateados.length * 12, // 12 meses por año
            ultimaActualizacion: `Dic ${Math.max(...añosFormateados.map(a => parseInt(a.año)))}`
          });
          
        } else {
          console.warn('⚠️ No se pudieron obtener años desde WordPress, usando datos de respaldo');
          usarDatosDeRespaldo();
        }
        
      } catch (error) {
        console.error('❌ Error al conectar con WordPress API:', error);
        usarDatosDeRespaldo();
      } finally {
        setLoading(false);
      }
    }

    fetchAños();
  }, []);

  // Función de respaldo con datos hardcodeados
  function usarDatosDeRespaldo() {
    const añosRespaldo = [];
    for (let año = 2025; año >= 2008; año--) {
      añosRespaldo.push({
        año: año.toString(),
        total: 12,
        actualizado: `Diciembre ${año}`,
        estado: año === 2024 ? 'Activo' : año > 2024 ? 'Futuro' : 'Completo',
        disponible: true
      });
    }
    setAños(añosRespaldo);
    setEstadisticas({
      totalAños: 18,
      totalTarifas: 216,
      ultimaActualizacion: 'Dic 2024'
    });
  }

  // Mostrar loading mientras se cargan los datos
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#3498db'
      }}>
        🔄 Cargando tarifas desde WordPress...
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          margin: '0 0 20px 0',
          fontWeight: 'bold'
        }}>
          📄 Tarifas ElectroHuila
        </h1>
        <p style={{
          fontSize: '1.3rem',
          margin: '0 0 30px 0',
          opacity: 0.9
        }}>
          Archivo histórico completo: 2008 - 2025
        </p>
        
        {/* Estadísticas DINÁMICAS desde WordPress */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '2.5rem' }}>📅</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {estadisticas.totalAños}
            </div>
            <div>Años Disponibles</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '2.5rem' }}>📄</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {estadisticas.totalTarifas}
            </div>
            <div>Tarifas Totales</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '2.5rem' }}>⚡</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100%</div>
            <div>Cobertura</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <div style={{ fontSize: '2.5rem' }}>🔄</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              {estadisticas.ultimaActualizacion}
            </div>
            <div>Última Actualización</div>
          </div>
        </div>
      </div>

      {/* Años Recientes Destacados */}
      <div style={{
        background: '#f8f9fa',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '2rem',
          margin: '0 0 30px 0',
          color: '#2c3e50'
        }}>
          🔥 Años Más Consultados
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          {/* Mostrar los 4 años más recientes dinámicamente */}
          {años.slice(0, 4).map(año => (
            <a
              key={año.año}
              href={`/tarifas/${año.año}`}
              style={{
                background: año.estado === 'Activo' ? '#27ae60' : '#3498db',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
              }}
            >
              📄 Tarifas {año.año}
            </a>
          ))}
        </div>
      </div>

      {/* Todos los Años */}
      <div style={{
        maxWidth: '1200px',
        margin: '50px auto',
        padding: '0 20px'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          textAlign: 'center',
          margin: '0 0 50px 0',
          color: '#2c3e50'
        }}>
          📚 Archivo Histórico Completo
        </h2>

        {/* Décadas */}
        <div style={{ marginBottom: '50px' }}>
          <h3 style={{
            background: 'linear-gradient(45deg, #3498db, #2ecc71)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            margin: '0 0 30px 0'
          }}>
            🚀 Década Actual (2020-2025)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '25px'
          }}>
            {años.filter(año => parseInt(año.año) >= 2020).map(año => (
              <TarifaCard key={año.año} año={año} destacado={true} />
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '50px' }}>
          <h3 style={{
            background: 'linear-gradient(45deg, #9b59b6, #e74c3c)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            margin: '0 0 30px 0'
          }}>
            📊 Década 2010-2019
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {años.filter(año => parseInt(año.año) >= 2010 && parseInt(año.año) < 2020).map(año => (
              <TarifaCard key={año.año} año={año} destacado={false} />
            ))}
          </div>
        </div>

        <div>
          <h3 style={{
            background: 'linear-gradient(45deg, #f39c12, #d35400)',
            color: 'white',
            padding: '15px',
            borderRadius: '10px',
            textAlign: 'center',
            margin: '0 0 30px 0'
          }}>
            📜 Archivo Histórico (2008-2009)
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {años.filter(año => parseInt(año.año) < 2010).map(año => (
              <TarifaCard key={año.año} año={año} destacado={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#2c3e50',
        color: 'white',
        padding: '50px 20px',
        textAlign: 'center',
        marginTop: '60px'
      }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          🏆 {estadisticas.totalAños} Años de Transparencia
        </h3>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Desde 2008, ElectroHuila mantiene disponible el archivo histórico completo 
          de tarifas eléctricas para consulta pública y transparencia total.
        </p>
        <div style={{ 
          marginTop: '20px', 
          fontSize: '0.9rem', 
          opacity: 0.7 
        }}>
          🔗 Conectado a WordPress API ElectroHuila v1.0
        </div>
      </div>
    </div>
  );
}

// Componente para cada año (igual que antes)
function TarifaCard({ año, destacado }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: destacado ? '20px' : '15px',
        padding: destacado ? '35px' : '30px',
        boxShadow: destacado ? '0 15px 35px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.1)',
        border: año.estado === 'Activo' ? '3px solid #27ae60' : 
               destacado ? '3px solid #3498db' : '3px solid transparent',
        transition: 'all 0.3s',
        cursor: 'pointer',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = destacado ? '0 15px 35px rgba(0,0,0,0.15)' : '0 10px 30px rgba(0,0,0,0.1)';
      }}
    >
      {/* Badge */}
      {año.estado === 'Activo' && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          background: '#27ae60',
          color: 'white',
          padding: '5px 12px',
          borderRadius: '15px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          🔴 ACTIVO
        </div>
      )}

      {/* Año */}
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div style={{
          fontSize: destacado ? '4.5rem' : '4rem',
          fontWeight: 'bold',
          color: '#3498db',
          marginBottom: '10px'
        }}>
          {año.año}
        </div>
        <div style={{
          background: año.estado === 'Activo' ? '#27ae60' : '#3498db',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          display: 'inline-block'
        }}>
          {año.estado}
        </div>
      </div>

      {/* Info */}
      <div style={{ marginBottom: '25px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          background: '#f8f9fa',
          borderRadius: '8px',
          marginBottom: '10px'
        }}>
          <span style={{ color: '#7f8c8d' }}>Tarifas mensuales:</span>
          <span style={{ fontWeight: 'bold' }}>{año.total}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px',
          background: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <span style={{ color: '#7f8c8d' }}>Actualizado:</span>
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{año.actualizado}</span>
        </div>
      </div>

      {/* Botones */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <a
          href={`/tarifas/${año.año}`}
          style={{
            flex: 1,
            background: destacado ? '#27ae60' : '#3498db',
            color: 'white',
            padding: '12px',
            borderRadius: '8px',
            textDecoration: 'none',
            textAlign: 'center',
            fontWeight: 'bold',
            transition: 'background 0.3s'
          }}
        >
          📄 Ver Tarifas
        </a>
        <button
          style={{
            background: '#f39c12',
            color: 'white',
            border: 'none',
            padding: '12px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
          onClick={() => {
            // Abrir la API de WordPress directamente para el año
            window.open(`https://electrohuila.com.co/wp-json/electrohuila/v1/tarifas?year=${año.año}`, '_blank');
          }}
        >
          📦
        </button>
      </div>
    </div>
  );
}