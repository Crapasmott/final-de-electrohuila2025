'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function TarifasDetailClient({ year }) {
  const [documentos, setDocumentos] = useState([]);
  
  // Simulación de carga de datos
  useEffect(() => {
    // En una implementación real, estos datos vendrían de una API
    const docs = [
      {
        id: 1,
        title: `Tarifas Marzo ${year}`,
        size: "322 KB",
        hits: 620,
        url: `/documentos/tarifas-marzo-${year}.pdf`
      },
      {
        id: 2,
        title: `Tarifas Febrero ${year}`,
        size: "322 KB",
        hits: 453,
        url: `/documentos/tarifas-febrero-${year}.pdf`
      },
      {
        id: 3,
        title: `Tarifas Enero ${year}`,
        size: "323 KB",
        hits: 695,
        url: `/documentos/tarifas-enero-${year}.pdf`
      },
      {
        id: 4,
        title: `Tarifas Abril ${year}`,
        size: "323 KB",
        hits: 79,
        url: `/documentos/tarifas-abril-${year}.pdf`
      },
      {
        id: 5,
        title: `04-Abril COT`,
        size: "758 KB",
        hits: 20,
        url: `/documentos/04-abril-cot-${year}.pdf`
      },
      {
        id: 6,
        title: `03-Marzo COT`,
        size: "202 KB",
        hits: 69,
        url: `/documentos/03-marzo-cot-${year}.pdf`
      },
      {
        id: 7,
        title: `02- Febrero COT`,
        size: "112 KB",
        hits: 117,
        url: `/documentos/02-febrero-cot-${year}.docx`,
        type: 'docx'
      },
      {
        id: 8,
        title: `01- Enero COT`,
        size: "204 KB",
        hits: 256,
        url: `/documentos/01-enero-cot-${year}.pdf`
      }
    ];
    
    setDocumentos(docs);
  }, [year]);
  
  const handleVistaPrevia = (doc) => {
    alert(`Vista previa de: ${doc.title}`);
  };
  
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 'bold', color: '#333' }}>Tarifas</h1>
        <div>
          <Link href="/" style={{ color: '#FF6600', textDecoration: 'none' }}>Inicio</Link>
          <span style={{ margin: '0 8px', color: '#666' }}>|</span>
          <span style={{ color: '#666' }}>Tarifas</span>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div style={{ marginBottom: '30px' }}>
        <Link href="/tarifas" style={{ color: '#426bae', textDecoration: 'none' }}>Tarifas clientes regulados</Link>
        <span style={{ margin: '0 8px', color: '#666' }}>&gt;</span>
        <span style={{ color: '#666' }}>{year}</span>
      </div>
      
      {/* Título del año */}
      <h2 style={{ fontSize: '22px', color: '#333', marginBottom: '30px' }}>{year}</h2>
      
      {/* Botón Atrás */}
      <div style={{ textAlign: 'right', marginBottom: '30px' }}>
        <Link href="/tarifas" style={{ color: '#426bae', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
          <span style={{ marginRight: '6px' }}>&#8592;</span>
          <span>Atrás</span>
        </Link>
      </div>
      
      {/* Grid de documentos */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '20px',
        marginBottom: '80px'
      }}>
        {documentos.map(doc => (
          <div key={doc.id} style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '20px', display: 'flex' }}>
              <div style={{ marginRight: '16px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: '#0095DB', 
                  borderRadius: '4px', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {doc.type === 'docx' ? 'DOCX' : 'PDF'}
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'normal', color: '#666', marginTop: '0', marginBottom: '8px' }}>{doc.title}</h3>
                <div style={{ fontSize: '14px', color: '#888' }}>
                  <div>Tamaño: {doc.size}</div>
                  <div>Hits: {doc.hits}</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <button 
                onClick={() => handleVistaPrevia(doc)}
                style={{ 
                  flex: '1', 
                  padding: '10px', 
                  background: 'white', 
                  border: 'none', 
                  borderTop: '1px solid #e0e0e0', 
                  cursor: 'pointer',
                  color: '#666',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ marginRight: '5px' }}>👁️</span>
                Vista previa
              </button>
              <a 
                href={doc.url}
                download
                style={{ 
                  flex: '1', 
                  padding: '10px', 
                  background: '#4CAF50', 
                  border: 'none', 
                  color: 'white',
                  textDecoration: 'none',
                  textAlign: 'center',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ marginRight: '5px' }}>⬇️</span>
                Descargar
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}