'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function SostenibilidadPage() {
  // Estado para controlar la pestaña activa (Social o Ambiental)
  const [activeTab, setActiveTab] = useState('social');
  
  // Contenido para la pestaña Social
  const socialPrograms = [
    {
      id: 'capacitaciones',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12L21 8V18L12 22L3 18V8L12 4L21 8L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 7.5V12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Capacitaciones Grupos de Interés',
      description: 'Programas formativos dirigidos a diferentes grupos de interés para fortalecer capacidades y conocimientos.',
      link: '/sostenibilidad/capacitaciones-grupos-interes'
    },
    {
      id: 'alianzas',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.5 6L12 8L7.5 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 14C8 14 10.5 12 12 12C13.5 12 16 14 16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 10C16.1046 10 17 9.10457 17 8C17 6.89543 16.1046 6 15 6C13.8954 6 13 6.89543 13 8C13 9.10457 13.8954 10 15 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Alianzas / Convenios Empresariales',
      description: 'Alianzas estratégicas con entidades públicas y privadas para generar impacto positivo en la comunidad.',
      link: '/sostenibilidad/alianzas-convenios-empresariales'
    },
    {
      id: 'deporte',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Apoyo Social al Deporte',
      description: 'Iniciativas para promover la actividad física y el deporte como herramienta de desarrollo social.',
      link: '/sostenibilidad/apoyo-social-deporte'
    },
    {
      id: 'actividades',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Actividades Sociales',
      description: 'Actividades dedicadas a mejorar la calidad de vida y promover el bienestar en comunidades vulnerables.',
      link: '/institucional/sostenibilidad/actividades-sociales'
    },
    {
      id: 'esquema',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l-4 4M17 6h4M17 6v4M21 10h-4M11 21l-4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Esquema Diferencial del Servicio de Energía – Medida Comunitaria',
      description: 'Estrategias de acceso a la energía para comunidades en condiciones especiales.',
      link: '/institucional/sostenibilidad/esquema-diferencial'
    }
  ];

  // Contenido para la pestaña Ambiental
  const ambientalPrograms = [
    {
      id: 'compensaciones',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13C8 15 10 16 12 16C14 16 16 15 17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H9.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9H15.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Compensaciones Ambientales',
      description: 'Acciones para mitigar el impacto ambiental de nuestras operaciones mediante programas de compensación.',
      link: '/institucional/sostenibilidad/compensaciones'
    },
    {
      id: 'cambio-climatico',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 2V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 20V22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.93 4.93L6.34 6.34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17.66 17.66L19.07 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 12H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.34 17.66L4.93 19.07" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.07 4.93L17.66 6.34" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Nuestra Contribución al Cambio Climático',
      description: 'Estrategias y acciones para reducir la huella de carbono y contribuir a la lucha contra el cambio climático.',
      link: '/institucional/sostenibilidad/cambio-climatico'
    },
    {
      id: 'residuos',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="10" y1="11" x2="10" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="14" y1="11" x2="14" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Manejo y Disposición de Residuos',
      description: 'Gestión integral de residuos con enfoque en reducción, reutilización y reciclaje.',
      link: '/institucional/sostenibilidad/residuos'
    },
    {
      id: 'gestion-proyectos',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27 6.96L12 12.01L20.73 6.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Gestión Social y Ambiental en Proyectos',
      description: 'Integración de criterios sociales y ambientales en el desarrollo de proyectos de infraestructura.',
      link: '/institucional/sostenibilidad/gestion-proyectos'
    },
    {
      id: 'compromiso',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 22V12h6v10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Compromiso Ambiental con la Comunidad y Nuestros Recursos Naturales',
      description: 'Iniciativas de protección y conservación del medio ambiente en colaboración con las comunidades.',
      link: '/institucional/sostenibilidad/compromiso-ambiental'
    },
    {
      id: 'practicas',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3v19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 8l-5-5-5 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 15H3v4h18v-4h-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Prácticas Sostenibles',
      description: 'Implementación de prácticas innovadoras para promover la sostenibilidad en nuestras operaciones diarias.',
      link: '/institucional/sostenibilidad/practicas-sostenibles'
    },
    {
      id: 'movilidad',
      icon: (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 11H19L15 5H9L5 11H1M6 14H18M18 19L22 18C22 16.5 20.5 15 19 15H5C3.5 15 2 16.5 2 18L6 19M10 7V9M14 7V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: 'Movilidad Eléctrica',
      description: 'Promoción del uso de vehículos eléctricos y desarrollo de infraestructura de recarga.',
      link: '/institucional/sostenibilidad/movilidad-electrica'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Programas de <span className={styles.highlight}>Sostenibilidad</span></h1>
        <div className={styles.breadcrumb}>
          <Link href="/">Inicio</Link> | <Link href="/institucional">Institucional</Link> | Sostenibilidad
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <button 
          className={`${styles.tabButton} ${activeTab === 'social' ? styles.active : ''}`}
          onClick={() => setActiveTab('social')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tabIcon}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Social
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'ambiental' ? styles.active : ''}`}
          onClick={() => setActiveTab('ambiental')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.tabIcon}>
            <path d="M18.7 3.8c-.4 1.3-.7 2.6-1.2 3.8-.4 1.2-1 2.3-1.7 3.3s-1.5 1.9-2.4 2.7c-3.2 2.6-6.5 3.2-9.4 3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 20.5c4-.5 8.2-2.4 11.5-6.5 1.3-1.6 2.3-3.4 3-5.3.7-1.9 1.1-3.9 1.5-5.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Ambiental
        </button>
      </div>

      <div className={styles.programsContainer}>
        {activeTab === 'social' ? (
          <div className={styles.programsGrid}>
            {socialPrograms.map(program => (
              <Link href={program.link} key={program.id} className={styles.programCard}>
                <div className={styles.iconContainer}>
                  {program.icon}
                </div>
                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.programDescription}>{program.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.programsGrid}>
            {ambientalPrograms.map(program => (
              <Link href={program.link} key={program.id} className={styles.programCard}>
                <div className={styles.iconContainer}>
                  {program.icon}
                </div>
                <h3 className={styles.programTitle}>{program.title}</h3>
                <p className={styles.programDescription}>{program.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className={styles.infoSection}>
        <h2 className={styles.infoTitle}>Nuestro Compromiso con la Sostenibilidad</h2>
        <div className={styles.orangeUnderline}></div>
        <p className={styles.infoText}>
          En ElectroHuila trabajamos para garantizar que nuestras operaciones generen valor económico, social y ambiental de manera responsable. 
          Nuestros programas de sostenibilidad están orientados a contribuir al desarrollo sostenible de la región, promoviendo prácticas que 
          beneficien a nuestros grupos de interés y minimicen el impacto ambiental de nuestras actividades.
        </p>
        <p className={styles.infoText}>
          Nos hemos comprometido con los Objetivos de Desarrollo Sostenible (ODS) y trabajamos para integrarlos en nuestra estrategia corporativa, 
          especialmente en aquellos relacionados con energía asequible y no contaminante, acción por el clima, trabajo decente y crecimiento económico, 
          y reducción de las desigualdades.
        </p>
      </div>
    </div>
  );
}