'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function ProteccionDatosPage() {
    // Estado para controlar el acordeón
    const [expandedItem, setExpandedItem] = useState('datosPersonales');

    // Función para manejar la expansión de secciones
    const toggleItem = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    };

    // Verificar si una sección está expandida
    const isExpanded = (itemId) => expandedItem === itemId;

    // Datos para el acordeón
    const accordionItems = [
        {
            id: 'datosPersonales',
            title: '¿Qué son los datos personales?',
            content: 'Los datos personales son aquellos que contienen información asociada a una persona y que permite su identificación, por ejemplo; número de documento de identificación, el lugar de nacimiento, estado civil, edad, lugar de residencia, trayectoria académica, laboral, o profesional; esta información también puede estar relacionada a datos sensibles entre ellos; historia clínica, características físicas, ideología política o religiosa, orientación sexual, entre otros aspectos.'
        },
        {
            id: 'tiposDatos',
            title: '¿Qué tipos de datos hay?',
            content: 'Los datos se clasifican en varias categorías: Datos públicos (accesibles por cualquier persona), datos semiprivados (interesan al titular y a cierto sector), datos privados (solo relevantes para el titular) y datos sensibles (información íntima como salud, orientación sexual, creencias religiosas, etc.).'
        },
        {
            id: 'datosElectrohuila',
            title: '¿Qué datos almacena ElectroHuila S.A. E.S.P.?',
            content: 'ElectroHuila S.A E.S.P. almacena datos como información de contacto (nombre, documento, dirección, teléfono, correo electrónico), datos de facturación, información comercial, registros necesarios para la prestación del servicio y cumplimiento de obligaciones contractuales.'
        },
        {
            id: 'finalidades',
            title: 'Finalidades del tratamiento de datos personales recolectados por ElectroHuila S.A. E.S.P.',
            content: 'Los datos recolectados se utilizan para: gestión de la relación contractual, prestación del servicio, comunicación con usuarios, cumplimiento de obligaciones legales, mejoramiento de servicios, seguridad, análisis estadísticos, y otras finalidades relacionadas con la actividad de la empresa.'
        },
        {
            id: 'derechos',
            title: '¿Qué derechos tiene el titular del dato?',
            content: 'El titular tiene derecho a: conocer, actualizar y rectificar sus datos personales; solicitar prueba de autorización para el tratamiento; ser informado sobre el uso de sus datos; presentar reclamos ante la Superintendencia de Industria y Comercio; revocar la autorización y solicitar la supresión de datos cuando proceda legalmente.'
        },
        {
            id: 'reclamos',
            title: '¿Quiénes pueden presentar reclamos y/o solicitudes en virtud del tratamiento de datos personales?',
            content: 'Pueden presentar reclamos: el titular de los datos, sus causahabientes (herederos), el representante legal o apoderado del titular, y entidades públicas o administrativas en ejercicio de sus funciones legales.'
        },
        {
            id: 'canales',
            title: '¿Cuáles son los canales de atención a peticiones, consultas y reclamos?',
            content: 'ElectroHuila S.A. E.S.P. ha dispuesto varios canales de atención: oficinas de atención al cliente, línea telefónica, página web, correo electrónico y correspondencia física.'
        },
        {
            id: 'consulta',
            title: '¿Qué información debe contener la consulta / reclamo?',
            content: 'La solicitud debe incluir: identificación del titular (nombres, apellidos, documento), descripción de los hechos que dan lugar al reclamo, dirección de notificación, documentos de soporte, y firma del solicitante.'
        },
        {
            id: 'proteger',
            title: '¿Cómo proteger mis datos personales?',
            content: 'Para proteger sus datos personales se recomienda: no compartir contraseñas, verificar la seguridad de sitios web, revisar políticas de privacidad, actualizar sus datos, y reportar cualquier sospecha de uso indebido de su información.'
        },
        {
            id: 'registro',
            title: 'Registro Nacional de bases de datos',
            content: 'El Registro Nacional de Bases de Datos es el directorio público administrado por la Superintendencia de Industria y Comercio, que contiene información de las bases de datos personales sujetas a tratamiento en el país.'
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Protección de Datos <span className={styles.highlight}>Personales</span></h1>
                <div className={styles.breadcrumb}>
                    <Link href="/">Inicio</Link> | Protección de Datos Personales
                </div>
            </div>

            <div className={styles.infoSection}>
                <h2 className={styles.subtitleCenter}>Lineamientos de tratamiento y protección de datos personales</h2>
                <div className={styles.orangeUnderline}></div>
                
                <p className={styles.introText}>
                    ELECTROHUILA S.A. E.S.P., NIT: 891.180.001-1, con sede principal: Complejo Ecológico el Bote, Km 1 Vía Palermo, conmutador <a href="tel:6088664600" className={styles.inlineLink}>(608)8664600</a> Ext. 1000, correo electrónico <a href="mailto:servicioalclienteeh@electrohuila.co" className={styles.inlineLink}>servicioalclienteeh@electrohuila.co</a>, se permite informar a todos sus clientes y a la comunidad en general, que en virtud de lo previsto por la normatividad aplicable en la materia, todas las personas naturales, titulares de datos personales tienen el derecho de conocer, actualizar y rectificar los datos personales que se encuentren almacenados en las bases de datos de nuestra Empresa y solicitar la supresión de los mismos cuando consideren que en su tratamiento no se respetan los principios, los derechos y las garantías constitucionales y legales.
                </p>
            </div>

            <div className={styles.accordionSection}>
                {accordionItems.map(item => (
                    <div key={item.id} className={styles.accordionItem}>
                        <button 
                            className={`${styles.accordionHeader} ${isExpanded(item.id) ? styles.active : ''}`} 
                            onClick={() => toggleItem(item.id)}
                        >
                            <span className={styles.accordionSign}>{isExpanded(item.id) ? '−' : '+'}</span>
                            <span className={styles.accordionTitle}>{item.title}</span>
                            <span className={styles.accordionArrow}>›</span>
                        </button>
                        
                        {isExpanded(item.id) && (
                            <div className={styles.accordionContent}>
                                <p>{item.content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className={styles.documentsSection}>
                <a href="/documentos/marco-normativo.pdf" className={styles.documentButton} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Marco normativo
                </a>
                
                <a href="/documentos/politica-privacidad.pdf" className={styles.documentButton} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Política de privacidad, tratamiento y protección de datos personales
                </a>
                
                <a href="/documentos/formato-autorizacion.pdf" className={styles.documentButton} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Formato autorización tratamiento de datos personales
                </a>
                
                <a href="/documentos/politica-seguridad.pdf" className={styles.documentButton} target="_blank" rel="noopener noreferrer">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Política de seguridad de la información
                </a>
            </div>
        </div>
    );
}