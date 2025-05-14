'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function UsoConfiableEnergiaPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#555', fontSize: '20px', marginBottom: '5px' }}>
        Uso Confiable de Energía Eléctrica
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        borderBottom: '1px solid #ddd',
        paddingBottom: '10px'
      }}>
        <div>
          Página {currentPage} / {totalPages}
        </div>
        <div>
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: currentPage === 1 ? 'default' : 'pointer',
              padding: '5px 10px',
              textDecoration: 'none',
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Anterior
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{
              background: 'none',
              border: 'none',
              color: '#0066cc',
              cursor: currentPage === totalPages ? 'default' : 'pointer',
              padding: '5px 10px',
              textDecoration: 'none',
              opacity: currentPage === totalPages ? 0.5 : 1
            }}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div style={{
        height: '500px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
        border: '1px solid #ddd'
      }}>
        <p style={{ color: '#666' }}>Contenido de la página {currentPage}</p>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link
          href="/"
          style={{
            color: '#0066cc',
            textDecoration: 'none'
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}