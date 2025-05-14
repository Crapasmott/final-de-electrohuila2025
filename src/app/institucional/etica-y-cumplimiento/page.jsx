'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function EticaCumplimientoPage() {
    const [expandedItem, setExpandedItem] = useState('soborno');

    const toggleItem = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    };

    const isExpanded = (itemId) => expandedItem === itemId;

    const accordionItems = [
        {
            id: 'soborno',
            title: '¿Qué es el soborno?',
            content: 'En ElectroHuila S.A. E.S.P se entenderá cómo soborno ofrecer, prometer, dar, aceptar o solicitar ventajas como incentivo para cometer una acción ilegal, poco ética o que implica un abuso de confianza, lo que conlleva a obtener provecho a título personal o beneficios a favor de terceros mediante la omisión, alteración de información o la toma de decisiones.'
        },
        {
            id: 'hospitalidades',
            title: '¿Qué son Hospitalidades, Obsequios y Beneficios?',
            content: 'Son atenciones corporativas que se otorgan o reciben en desarrollo de relaciones comerciales o institucionales, que pueden ser en dinero o en especie, tales como: alimentación, transporte, alojamiento, actividades recreativas, artículos promocionales, entradas a eventos deportivos o culturales, entre otros.'
        },
        {
            id: 'regalos',
            title: '¿Qué hacer con los regalos hospitalidad, donaciones y demás beneficios que nos lleguen ya sea a la oficina al hogar?',
            content: 'Cuando un colaborador de ElectroHuila S.A. E.S.P. reciba hospitalidades, obsequios o beneficios, deberá informar a su jefe inmediato y a la Gerencia General para determinar el manejo adecuado según las políticas corporativas.'
        },
        {
            id: 'corrupcion',
            title: '¿Qué es corrupción?',
            content: 'Es el abuso de posiciones de poder o de confianza, para el beneficio particular en detrimento del interés colectivo, realizado a través de ofrecer o solicitar, entregar o recibir bienes o dinero en especie, en servicios o beneficios, a cambio de acciones, decisiones u omisiones.'
        },
        {
            id: 'lineamientos',
            title: 'Lineamientos de prevención del soborno y corrupción',
            content: 'ElectroHuila S.A. E.S.P. ha establecido lineamientos para prevenir actos de soborno y corrupción, incluyendo mecanismos de monitoreo, canales de denuncia y formación a colaboradores.'
        },
        {
            id: 'reportar',
            title: '¿Quién puede reportar un caso de soborno y/o corrupción?',
            content: 'Cualquier persona interna o externa que tenga conocimiento o sospechas razonables de actos de soborno o corrupción puede realizar un reporte a través de los canales oficiales establecidos.'
        },
        {
            id: 'acciones',
            title: 'ElectroHuila S.A E.S.P. ha realizado acciones contundentes contra el Soborno y Corrupción',
            content: 'La empresa ha implementado políticas, procedimientos y controles para prevenir y combatir el soborno y la corrupción, en línea con estándares nacionales e internacionales.'
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Ética <span className={styles.highlight}>y Cumplimiento</span></h1>
                <div className={styles.breadcrumb}>
                    <Link href="/">Inicio</Link> | <Link href="/institucional">Institucional</Link> | Ética y Cumplimiento
                </div>
            </div>

            <div className={styles.contentSection}>
                <div className={styles.imageTextSection}>
                    <div className={styles.image}>
                        <img src="/images/etica-768x512.jpg.webp" alt="Ejecutivo de ElectroHuila" />
                    </div>
                    <div className={styles.text}>
                        <p>
                            Para la Electrificadora del Huila S.A E.S.P., el Código de Ética refleja el 
                            compromiso institucional para el adecuado funcionamiento de nuestro Gobierno 
                            Corporativo basado en la transparencia e integridad; por lo tanto, en este 
                            documento se integran los pilares éticos del comportamiento y define la cultura 
                            de cero tolerancia a tipologías relacionadas con soborno, corrupción, fraude, 
                            lavado de activos, financiación del terrorismo, y otras conductas conexas, que 
                            obstaculizan el cumplimiento de la estrategia corporativa.
                        </p>
                        <p>
                            Todos los colaboradores, proveedores/contratistas, órganos de administración, 
                            clientes, competencia y aliados de Electrohuila, deberán regirse por los más altos 
                            estándares de conducta y desempeñar sus funciones o actividades conforme a 
                            las disposiciones aquí señaladas, aspecto fundamental para generar confianza, 
                            credibilidad y reconocimiento en la sociedad; así, como al interior de la empresa, 
                            obtener un clima organizacional positivo, productivo y con espíritu de 
                            cooperación.
                        </p>
                    </div>
                </div>

                <div className={styles.buttonSection}>
                    <a href="/documentos/etica/08.-CODIGO-DE-ETICA.pdf" className={styles.downloadButton} target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Código de Ética
                    </a>
                    <a href="/documentos/etica/codigo-etica-electrohuila.pdf" className={styles.downloadButton} target="_blank" rel="noopener noreferrer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="7 10 12 15 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Guía Código de Ética
                    </a>
                </div>
            </div>

            <div className={styles.valoresSection}>
                <h2 className={styles.subtitle2}>Valores y Principios</h2>
                <div className={styles.valoresGrid}>
                    <div className={styles.valorItem}>
                        <div className={styles.valorIcon}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4>Transparencia</h4>
                        <p>Principio de legalidad y cumplimiento</p>
                    </div>
                    <div className={styles.valorItem}>
                        <div className={styles.valorIcon}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 4v6m-5-6v12m-5-6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4>Respeto</h4>
                        <p>Protección de los derechos humanos y el medio ambiente</p>
                    </div>
                    <div className={styles.valorItem}>
                        <div className={styles.valorIcon}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4>Integridad</h4>
                        <p>Uso eficiente de los activos</p>
                    </div>
                    <div className={styles.valorItem}>
                        <div className={styles.valorIcon}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h4>Responsabilidad</h4>
                        <p>Sentido de pertenencia institucional</p>
                    </div>
                </div>
                <div className={styles.aliadoSection}>
                    <div className={styles.aliadoImage}>
                        <img src="/images/operariio.png (1).webp" alt="Aliado ENERG-ÉTICO" />
                    </div>
                    <div className={styles.aliadoContent}>
                        <h3>Soy Aliado ENERG-ÉTICO</h3>
                        <p>porque tengo la capacidad de ejercer mi rol en la empresa transmitiendo comportamientos éticos y genero efectos que impactan de forma positiva la imagen Reputacional de Electrohuila.</p>
                    </div>
                </div>
            </div>

            <div className={styles.antiSobornoSection}>
                <div className={styles.antiSobornoContent}>
                    <h2 className={styles.subtitle}>Electrohuila S.A. E S.P. contra el soborno y la corrupción</h2>
                    <div className={styles.orangeUnderline}></div>
                    <p>
                        ElectroHuila S.A. E.S.P., de conformidad con las políticas públicas nacionales y 
                        convenios internacionales han desarrollado esfuerzos relevantes encaminados
                        a luchar contra la Corrupción, prevenir actos de Soborno y otras conductas
                        asociadas a delitos LA/FT/FPADM, por significar un riesgo para la estabilidad
                        económica, social y política de los mercados.
                    </p>
                </div>
                <div className={styles.antiSobornoImage}>
                    <img src="/images/anti-soborno-768x512.jpg.webp" alt="Contra el soborno y la corrupción" />
                </div>
            </div>

            <div className={styles.abeceSection}>
                <h2 className={styles.subtitle}>Abecé contra el soborno y la corrupción</h2>
                
                <div className={styles.accordion}>
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
            </div>

            <div className={styles.programaSection}>
                <h2 className={styles.subtitle}>Programa de Transparencia y Ética Empresarial</h2>
                <div className={styles.orangeUnderline}></div>
                
                <p>
                    La Electrificadora del Huila S.A E.S.P., fundamenta el desarrollo de sus negocios transmitiendo una cultura de transparencia e integridad en todas las
                    actuaciones de sus grupos de interés. En virtud de lo anterior, ha proporcionado normas y procedimientos claros tales como el Código de Buen
                    Gobierno, Código de Ética, Política de la Línea de Transparencia y Programa de Transparencia y Ética Empresarial, como base del compromiso
                    institucional en la lucha contra la Corrupción, Soborno, Fraude, Lavado de Activos, Financiación del Terrorismo, Financiación de la Proliferación de
                    Armas de Destrucción Masiva y conductas que contraríen los valores y principios éticos.
                </p>
                <p>
                    De conformidad con las políticas públicas nacionales y convenios internacionales se han desarrollado esfuerzos relevantes encaminados a evitar la
                    Corrupción, prevenir actos de Soborno y otras conductas asociadas a delitos LA/FT/FPADM, por significar un riesgo para la estabilidad económica,
                    social y política de los mercados.
                </p>
                <p>
                    En ese orden, consciente de la importancia del cumplimiento normativo Electrohuila, ha dispuesto mecanismos para identificar, medir, evaluar,
                    controlar y monitorear dichos riesgos con base en las instrucciones y recomendaciones emitidas por los entes de vigilancia y control, Secretaría de
                    Transparencia y Organismos Internacionales.
                </p>
                <p>
                    El presente documento, constituye un compromiso con el principio 10 del Pacto Mundial de la ONU, fijando procedimientos claros y proporcionados
                    que garanticen un sistema de control encaminado a gestionar adecuadamente los riesgos relacionados con el fraude y prácticas corruptas. De igual
                    forma, establece el régimen de sanciones aplicables por omisión o extralimitación de su cumplimiento.
                </p>
                <p>
                    Todos los colaboradores, proveedores/contratistas, órganos de administración, clientes, competencia y aliados de Electrohuila, deberán desempeñar
                    sus funciones o actividades conforme a las disposiciones aquí señaladas, aspecto fundamental para generar confianza, credibilidad y
                    reconocimiento en la sociedad; así, como al interior de la empresa, obtener un clima organizacional positivo, productivo y con espíritu de
                    cooperación.
                </p>
            </div>
        </div>
    );
}