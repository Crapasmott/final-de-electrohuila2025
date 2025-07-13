// pages/tarifas/index.tsx (o donde quieras usar el componente)
import React from 'react';
import TarifasSystem from '../../components/TarifasSystem';

const TarifasPage: React.FC = () => {
  return (
    <div className="tarifas-page">
      {/* Header de la página */}
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <a href="/">Inicio</a>
            <span>/</span>
            <span>Tarifas</span>
          </div>
          <h1>Tarifas Eléctricas</h1>
          <p>
            Consulta las tarifas de energía eléctrica vigentes para todos los tipos de usuarios.
            Encuentra información actualizada organizada por año y mes.
          </p>
        </div>
      </div>

      {/* Componente del sistema de tarifas */}
      <div className="page-content">
        <TarifasSystem />
      </div>

      {/* Información adicional */}
      <div className="additional-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>🏠 Tarifas Residenciales</h3>
              <p>
                Consulta las tarifas aplicables según tu estrato socioeconómico.
                Las tarifas varían mensualmente según las resoluciones de la CREG.
              </p>
            </div>
            <div className="info-card">
              <h3>🏢 Tarifas Comerciales</h3>
              <p>
                Tarifas especiales para establecimientos comerciales y de servicios.
                Incluye diferentes categorías según el tipo de actividad económica.
              </p>
            </div>
            <div className="info-card">
              <h3>🏭 Tarifas Industriales</h3>
              <p>
                Tarifas competitivas para el sector industrial con diferentes
                niveles de tensión y consumo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para la página */}
      <style jsx>{`
        .tarifas-page {
          min-height: 100vh;
          background: #f8fafc;
        }

        .page-header {
          background: linear-gradient(135deg, #1A6192 0%, #1797D5 100%);
          color: white;
          padding: 3rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .breadcrumb {
          font-size: 0.875rem;
          margin-bottom: 1rem;
          opacity: 0.9;
        }

        .breadcrumb a {
          color: white;
          text-decoration: none;
        }

        .breadcrumb a:hover {
          text-decoration: underline;
        }

        .breadcrumb span {
          margin: 0 0.5rem;
        }

        .page-header h1 {
          font-size: 3rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .page-header p {
          font-size: 1.25rem;
          opacity: 0.9;
          line-height: 1.6;
          max-width: 600px;
        }

        .page-content {
          padding: 2rem 0;
        }

        .additional-info {
          background: white;
          padding: 4rem 0;
          border-top: 1px solid #e5e7eb;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .info-card {
          background: #f8fafc;
          padding: 2rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        .info-card h3 {
          margin: 0 0 1rem;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .info-card p {
          margin: 0;
          color: #6b7280;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .page-header {
            padding: 2rem 0;
          }

          .page-header h1 {
            font-size: 2rem;
          }

          .page-header p {
            font-size: 1.1rem;
          }

          .container {
            padding: 0 1rem;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .info-card {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TarifasPage;