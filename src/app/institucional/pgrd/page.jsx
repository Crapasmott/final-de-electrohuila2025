'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function PGRDPage() {
  // Estado para controlar las secciones expandidas
  const [expandedSection, setExpandedSection] = useState('documentos');

  // Función para manejar la expansión de secciones
  const toggleSection = (sectionId) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
    }
  };

  // Verificar si una sección está expandida
  const isSectionExpanded = (sectionId) => expandedSection === sectionId;

  // Datos para los documentos de interés
  const documentos = [
    {
      id: 'plan-emergencia',
      title: 'Plan de emergencia por zonas',
      url: '/documentos/pgrd/plan-emergencia-zonas.pdf'
    },
    {
      id: 'politica-control',
      title: 'Política de control de emergencias',
      url: '/documentos/pgrd/politica-control-emergencias.pdf'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Plan de Gestión de <br />
          <span className={styles.highlight}>Riesgos y Desastres</span>
        </h1>
        <div className={styles.breadcrumb}>
          <Link href="/">Inicio</Link> | <Link href="/institucional">Institucional</Link> | PGRD
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.imageSection}>
          <img 
            src="/images/pgrd-team.jpg" 
            alt="Equipo de Gestión de Riesgos y Desastres" 
            className={styles.teamImage}
          />
        </div>
        
        <div className={styles.textSection}>
          <div className={styles.orangeUnderline}></div>
          <p className={styles.description}>
            Electrohuila S.A. E.S.P. implementa las acciones identificadas para evolucionar y crecer sosteniblemente de la mano de la prevención de los riesgos de desastres, protección a la comunidad y a nuestros colaboradores, así como el retorno seguro de los trabajadores a sus hogares.
          </p>
        </div>
      </div>

      <div className={styles.accordionSection}>
        {/* Sección: Informe de Gestión de Riesgo */}
        <div className={styles.accordionItem}>
          <button 
            className={`${styles.accordionHeader} ${isSectionExpanded('informe') ? styles.active : ''}`}
            onClick={() => toggleSection('informe')}
          >
            <span className={styles.accordionSign}>{isSectionExpanded('informe') ? '−' : '+'}</span>
            <span className={styles.accordionTitle}>Informe de Gestión de Riesgo</span>
            <span className={styles.accordionArrow}>›</span>
          </button>
          
          {isSectionExpanded('informe') && (
            <div className={styles.accordionContent}>
              <p>
                Electrohuila cuenta con un Sistema de Gestión de Riesgos que permite identificar, evaluar, prevenir y mitigar los riesgos asociados a nuestra operación. 
                Los informes de gestión de riesgo se publican periódicamente y contienen información sobre:
              </p>
              <ul className={styles.infoList}>
                <li>Identificación y análisis de riesgos</li>
                <li>Medidas preventivas implementadas</li>
                <li>Capacitaciones realizadas</li>
                <li>Simulacros y ejercicios de preparación</li>
                <li>Seguimiento a incidentes y emergencias</li>
              </ul>
              <p>
                Para consultar los informes detallados, por favor comuníquese con nuestra oficina de Gestión de Riesgos a través del correo: 
                <a href="mailto:gestionriesgos@electrohuila.co" className={styles.emailLink}> gestionriesgos@electrohuila.co</a>
              </p>
            </div>
          )}
        </div>

        {/* Sección: Documentos de Interés */}
        <div className={styles.accordionItem}>
          <button 
            className={`${styles.accordionHeader} ${isSectionExpanded('documentos') ? styles.active : ''}`}
            onClick={() => toggleSection('documentos')}
          >
            <span className={styles.accordionSign}>{isSectionExpanded('documentos') ? '−' : '+'}</span>
            <span className={styles.accordionTitle}>Documentos de Interés</span>
            <span className={styles.accordionArrow}>›</span>
          </button>
          
          {isSectionExpanded('documentos') && (
            <div className={styles.accordionContent}>
              <ul className={styles.documentsList}>
                {documentos.map((doc) => (
                  <li key={doc.id} className={styles.documentItem}>
                    <div className={styles.documentIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#E74C3C" />
                        <path d="M14 2V8H20L14 2Z" fill="#C0392B" />
                        <path d="M16 13H8V15H16V13Z" fill="white" />
                        <path d="M16 16H8V18H16V16Z" fill="white" />
                        <path d="M10 10H8V12H10V10Z" fill="white" />
                      </svg>
                    </div>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.documentLink}>
                      {doc.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.sectionTitle}>Gestión Integral de Riesgos</h2>
        <div className={styles.orangeUnderlineCenter}></div>
        
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIconContainer}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 6v6l4 2" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle}>Prevención</h3>
            <p className={styles.infoCardText}>
              Implementamos medidas preventivas para reducir la probabilidad de ocurrencia de eventos adversos, minimizando las vulnerabilidades en nuestras instalaciones y operaciones.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIconContainer}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 16l4-4m-4-4l4 4" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="10" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle}>Mitigación</h3>
            <p className={styles.infoCardText}>
              Ejecutamos acciones destinadas a reducir el impacto negativo de los eventos, a través de medidas estructurales y no estructurales para limitar los daños potenciales.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIconContainer}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16h14M5 8h14" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 4h4M10 20h4" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 4h2M17 20h2M5 4H3M5 20H3" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle}>Preparación</h3>
            <p className={styles.infoCardText}>
              Contamos con protocolos y recursos de respuesta ante emergencias, que incluyen capacitación constante, simulacros y coordinación con entidades de respuesta.
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIconContainer}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className={styles.infoCardTitle}>Recuperación</h3>
            <p className={styles.infoCardText}>
              Desarrollamos planes de continuidad del negocio para garantizar la recuperación rápida y eficaz tras un evento, minimizando el tiempo de interrupción del servicio.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.contactSection}>
        <h3 className={styles.contactTitle}>¿Necesitas más información?</h3>
        <p className={styles.contactText}>
          Para mayor información sobre nuestro Plan de Gestión de Riesgos y Desastres, comunícate con nosotros:
        </p>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>(608) 8664600 Ext. 1234</span>
          </div>
          <div className={styles.contactItem}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 6l-10 7L2 6" stroke="#0099da" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <a href="mailto:gestionriesgos@electrohuila.co">gestionriesgos@electrohuila.co</a>
          </div>
        </div>
      </div>
    </div>
  );
}