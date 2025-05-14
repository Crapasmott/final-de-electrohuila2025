import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../css/nueva-seccion.css';

const NuevaSeccion = () => {
  const [activeTab, setActiveTab] = useState('categoria1');
  
  // Datos de ejemplo para mostrar la estructura
  const datosCategoria1 = [
    {
      id: 1,
      titulo: 'Documento 1',
      descripcion: 'Descripción breve del documento 1',
      fecha: '15-04-2025',
      enlace: '/documentos/doc1.pdf'
    },
    {
      id: 2,
      titulo: 'Documento 2',
      descripcion: 'Descripción breve del documento 2',
      fecha: '12-03-2025',
      enlace: '/documentos/doc2.pdf'
    },
    {
      id: 3,
      titulo: 'Documento 3',
      descripcion: 'Descripción breve del documento 3',
      fecha: '28-02-2025',
      enlace: '/documentos/doc3.pdf'
    }
  ];
  
  const datosCategoria2 = [
    {
      id: 1,
      titulo: 'Reporte 1',
      descripcion: 'Descripción breve del reporte 1',
      fecha: '20-04-2025',
      enlace: '/reportes/rep1.pdf'
    },
    {
      id: 2,
      titulo: 'Reporte 2',
      descripcion: 'Descripción breve del reporte 2',
      fecha: '10-03-2025',
      enlace: '/reportes/rep2.pdf'
    }
  ];
  
  const datosCategoria3 = [
    {
      id: 1,
      titulo: 'Circular 1',
      descripcion: 'Descripción breve de la circular 1',
      fecha: '22-04-2025',
      enlace: '/circulares/circ1.pdf'
    },
    {
      id: 2,
      titulo: 'Circular 2',
      descripcion: 'Descripción breve de la circular 2',
      fecha: '18-03-2025',
      enlace: '/circulares/circ2.pdf'
    },
    {
      id: 3,
      titulo: 'Circular 3',
      descripcion: 'Descripción breve de la circular 3',
      fecha: '05-02-2025',
      enlace: '/circulares/circ3.pdf'
    }
  ];

  const getActiveData = () => {
    switch(activeTab) {
      case 'categoria1':
        return datosCategoria1;
      case 'categoria2':
        return datosCategoria2;
      case 'categoria3':
        return datosCategoria3;
      default:
        return [];
    }
  };

  return (
    <div className="nueva-seccion-container">
      <div className="nueva-seccion-header">
        <h1>Nueva Sección</h1>
        <div className="breadcrumb">
          <Link href="/">Inicio</Link> | <span>Nueva Sección</span>
        </div>
      </div>
      
      <div className="nueva-seccion-content">
        <h2 className="seccion-title">Documentos y Recursos</h2>
        <div className="separator-line"></div>
        
        <div className="tabs-container">
          <div className="tab-header">
            <div 
              className={`tab-item ${activeTab === 'categoria1' ? 'active' : ''}`}
              onClick={() => setActiveTab('categoria1')}
            >
              <span className="tab-icon">✓</span> Categoría 1
            </div>
            <div 
              className={`tab-item ${activeTab === 'categoria2' ? 'active' : ''}`}
              onClick={() => setActiveTab('categoria2')}
            >
              <span className="tab-icon">✓</span> Categoría 2
            </div>
            <div 
              className={`tab-item ${activeTab === 'categoria3' ? 'active' : ''}`}
              onClick={() => setActiveTab('categoria3')}
            >
              <span className="tab-icon">✓</span> Categoría 3
            </div>
          </div>
          
          <div className="tab-content">
            <div className="documents-list">
              {getActiveData().map(item => (
                <div key={item.id} className="document-item">
                  <div className="document-info">
                    <h3>{item.titulo}</h3>
                    <p className="document-description">{item.descripcion}</p>
                    <p className="document-date">Fecha: {item.fecha}</p>
                  </div>
                  <Link href={item.enlace} className="download-button">
                    <span className="download-icon">↓</span> Descargar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="years-accordion">
          <div className="year-item">
            <div className="year-header">
              <span className="plus-icon">+</span> 2025
              <span className="arrow-icon">›</span>
            </div>
          </div>
          <div className="year-item">
            <div className="year-header">
              <span className="plus-icon">+</span> 2024
              <span className="arrow-icon">›</span>
            </div>
          </div>
          <div className="year-item">
            <div className="year-header">
              <span className="plus-icon">+</span> 2023
              <span className="arrow-icon">›</span>
            </div>
          </div>
          <div className="year-item">
            <div className="year-header">
              <span className="plus-icon">+</span> 2022
              <span className="arrow-icon">›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaSeccion;