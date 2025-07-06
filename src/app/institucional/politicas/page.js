'use client';

import { useState } from 'react';
import Link from 'next/link';
import './politicas.css';

export default function PoliticasPage() {
    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState('institucionales');

    // Estado para controlar el acordeón expandido
    const [expandedItem, setExpandedItem] = useState(null);

    // Función para cambiar de pestaña
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedItem(null); // Cerrar acordeón al cambiar de pestaña
    };

    // Función para manejar la expansión del acordeón
    const toggleAccordion = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    };

    // Datos para las pestañas y sus respectivos contenidos de acordeón con PDFs
    const tabsData = {
        institucionales: [
            {
                id: 'talento',
                title: 'Talento Humano',
                description: 'Políticas relacionadas con la gestión del talento humano en nuestra empresa.',
                documents: [
                    { name: 'Politica de Prevención del Acoso Laboral y Acoso Sexual; y de Promoción de la Desconexión Laboral', url: '/documentos/politicas/Politica-de-Prevencion-del-Acoso-Laboral-y-Acoso-Sexual-y-de-Promocion-de-la-Desconexion-Laboral-1.pdf' },
                   
                ]
            },
            {
                id: 'planeacion',
                title: 'Planeación Estratégica',
                description: 'Documentos relacionados con la planeación estratégica y direccionamiento de la organización.',
                documents: [
                    { name: 'Política de Calidad', url: '/documentos/politicas/POLITICA-DE-CALIDAD.pdf', size: '4.2 MB', updated: '05/01/2024' },
                    { name: 'Política de prevención del consumo de alcohol, tabaco y sustancias psicoactivas.', url: '/documentos/politicas/Politica-de-prevencion-de-consumo-de-alcohol-tabaco-y-sustancias-psicoactivas.pdf', size: '1.8 MB', updated: '12/03/2024' },
                     { name:'Política de seguridad vial', url: '/documentos/politicas/Política Seguridad Vial.pdf', size: '4.2 MB', updated: '05/01/2024' },
                    { name: 'Política de seguridad y salud en el trabajo.', url: '/documentos/politicas/Pilitica-de-seguridad-y-salud-en-el-trabajo.pdf', size: '1.8 MB', updated: '12/03/2024' }
                ]
            },
            {
                id: 'etica',
                title: 'Ética y Cumplimiento',
                description: 'Políticas relacionadas con la ética empresarial y el cumplimiento normativo.',
                documents: [
                    { name: 'Política de prohibición a las represalias y protección al denunciante', url: '/documentos/politicas/Documento-No.075.pdf', size: '2.7 MB', updated: '18/09/2023' },
                    { name: 'Política, lineamientos y documentos vinculantes a la oficina de Ética y Cumplimiento', url: '/documentos/politicas/CIRCULAR-004-2023.pdf', size: '1.5 MB', updated: '20/07/2023' },
                    { name: 'Política de código de Ética', url: '/documentos/politicas/Acuerdo-08-del-28-de-febrero-de-2025-Codigo-de-Etica.pdf', size: '3.2 MB', updated: '10/01/2024' },
                    { name: 'Política de Control y Gestión del Riesgo LA_FT_FPADM_S_C', url: '/documentos/politicas/5.-Politica-de-Control-y-Gestion-del-Riesgo-LA_FT_FPADM_S_C.pdf', size: '2.7 MB', updated: '18/09/2023' },
                    { name: 'Política de Hospitalidades, Obsequios y Beneficios', url: '/documentos/politicas/4.-Politica-de-HospitalidadesObsequios-y-Beneficios.pdf', size: '1.5 MB', updated: '20/07/2023' },
                    { name: 'Política de la línea de Transparencia y Comité de Ética', url: '/documentos/politicas/3.-Politica-de-la-Linea-de-Transparencia-y-Comite-de-Etica.pdf', size: '3.2 MB', updated: '10/01/2024' },
                    { name: 'Política de programa de Transparencia y Ética Pública – PTEP', url: '/documentos/politicas/Acuerdo-09-del-28-de-febrero-de-2025-Programa-de-Transparencia-y-Etica-Publica-PTEP.pdf', size: '2.7 MB', updated: '18/09/2023' },
                    { name: 'Política de Privacidad Tratamiento y Protección de Datos Personales de ElectroHuila S.A. E.S.P.', url: '/documentos/politicas/POLITICA_DE_PRI_20230515_114541167.pdf', size: '1.5 MB', updated: '20/07/2023' },
                    { name: 'Código de Buen Gobierno Corporativo', url: '/documentos/politicas/Acuerdo-07-del-28-de-febrero-de-2025-Codigo-de-Buen-Gobierno-Corporativo.pdf', size: '3.2 MB', updated: '10/01/2024' }
                ]
            },
            {
                id: 'organizacion',
                title: 'Organización y Sistemas',
                description: 'Documentos sobre la estructura organizacional y sistemas de la empresa.',
                documents: [
                    { name: 'Políticas de seguridad de la información', url: '/documentos/politicas/Politica-de-Seguridad-de-la-Informacion.pdf', size: '1.1 MB', updated: '15/02/2024' }
                    
                ]
            },
            {
                id: 'responsabilidad',
                title: 'Responsabilidad Social y Ambiental',
                description: 'Políticas de responsabilidad social corporativa y gestión ambiental.',
                documents: [
                    { name: 'Política de Derechos Humanos', url: '/documentos/politicas/Politica-de-Derechos-Humanos.pdf', size: '2.3 MB', updated: '05/02/2024' },
                    { name: 'Política de Gestión Ambiental', url: '/documentos/politicas/Politica-de-Gestion-ambiental.pdf', size: '4.5 MB', updated: '20/01/2024' },
                    { name: 'Política de Responsabilidad Social', url: '/documentos/politicas/Politica-de-Responsabilidad-Social.pdf', size: '6.8 MB', updated: '15/03/2024' }
                ]
            },
            {
                id: 'sigac',
                title: 'SIGAC',
                description: 'Sistema Integrado de Gestión y Autocontrol.',
                documents: [
                    { name: 'Política SIGAC', url: '/documentos/politicas/POLITICA-SIGAC.pdf', size: '3.7 MB', updated: '10/01/2024' }
                    
                ]
            },
            {
                id: 'bioseguridad',
                title: 'Protocolo de Bioseguridad',
                description: 'Protocolos y medidas de bioseguridad adoptados por la empresa.',
                documents: [
                    { name: 'Protocolo de Bioseguridad', url: '/documentos/politicas/protocolo-bioseguridad-electrohuila.pdf', size: '2.4 MB', updated: '15/01/2024' }
                   
                ]
            }
        ],
        comerciales: [
            {
                id: 'servicio',
                title: 'Control de Cartera',
                description: '',
                documents: [
                    { name: 'Política de financiación', url: '/documentos/politicas/POLITICA-DE-FINANCIACION.pdf', size: '2.3 MB', updated: '20/02/2024' }
                    
                ]
            },
            {
                id: 'tarifas',
                title: 'Servicio al Cliente',
                description: 'Información sobre tarifas, facturación y procesos comerciales.',
                documents: [
                    { name: 'Política de Transparencia y acceso a información pública', url: '/documentos/politicas/Politica-de-Transparencia-y-acceso-a-informacion-publica-1.pdf', size: '1.7 MB', updated: '01/01/2024' }
                   
                ]
            },
            
        ],
        administrativas: [
            {
                id: 'financiera',
                title: 'Política Financiera',
                description: 'Políticas y lineamientos financieros de la organización.',
                documents: [
                    { name: 'Política Financiera 2024', url: '/documentos/politicas/financiera/politica-financiera-2024.pdf', size: '2.6 MB', updated: '10/01/2024' },
                    { name: 'Manual de Inversiones', url: '/documentos/politicas/financiera/manual-inversiones-2023.pdf', size: '1.9 MB', updated: '15/11/2023' },
                    { name: 'Política de Gastos', url: '/documentos/politicas/financiera/politica-gastos-2024.pdf', size: '1.7 MB', updated: '05/01/2024' }
                ]
            },
            {
                id: 'contratacion',
                title: 'Contratación y Adquisiciones',
                description: 'Políticas y procedimientos para contratación y adquisición de bienes y servicios.',
                documents: [
                    { name: 'Manual de Contratación 2024', url: '/documentos/politicas/contratacion/manual-contratacion-2024.pdf', size: '3.8 MB', updated: '20/01/2024' },
                    { name: 'Procedimiento de Compras', url: '/documentos/politicas/contratacion/procedimiento-compras-2023.pdf', size: '2.1 MB', updated: '10/12/2023' },
                    { name: 'Formatos de Contratación', url: '/documentos/politicas/contratacion/formatos-contratacion-2024.pdf', size: '1.5 MB', updated: '15/01/2024' }
                ]
            },
            {
                id: 'transparencia',
                title: 'Transparencia y Anticorrupción',
                description: 'Políticas de transparencia y medidas anticorrupción.',
                documents: [
                    { name: 'Política de Transparencia', url: '/documentos/politicas/transparencia/politica-transparencia-2024.pdf', size: '2.2 MB', updated: '15/01/2024' },
                    { name: 'Plan Anticorrupción 2024', url: '/documentos/politicas/transparencia/plan-anticorrupcion-2024.pdf', size: '3.5 MB', updated: '10/01/2024' },
                    { name: 'Código de Buen Gobierno', url: '/documentos/politicas/transparencia/codigo-buen-gobierno-2023.pdf', size: '2.7 MB', updated: '20/09/2023' }
                ]
            }
        ]
    };

    // Obtener los elementos del acordeón según la pestaña activa
    const activeAccordionItems = tabsData[activeTab] || [];

    return (
        <div className="politicas-container">
            <div className="politicas-header">
                <h1>Políticas</h1>
                <div className="breadcrumb">
                    <Link href="/">Inicio</Link> | <Link href="/institucional/informes">Informes</Link>
                </div>
            </div>

            {/* Pestañas */}
            <div className="tabs-container">
                <button
                    className={`tab-button ${activeTab === 'institucionales' ? 'active' : ''}`}
                    onClick={() => handleTabChange('institucionales')}
                >
                    <span className="tab-icon">✓</span> Institucionales
                </button>
                <button
                    className={`tab-button ${activeTab === 'comerciales' ? 'active' : ''}`}
                    onClick={() => handleTabChange('comerciales')}
                >
                    <span className="tab-icon">✓</span> Comerciales
                </button>
                <button
                    className={`tab-button ${activeTab === 'administrativas' ? 'active' : ''}`}
                    onClick={() => handleTabChange('administrativas')}
                >
                    <span className="tab-icon">✓</span> Administrativas y Financieras
                </button>
            </div>

            {/* Acordeón */}
            <div className="accordion-container">
                {activeAccordionItems.map((item) => (
                    <div key={item.id} className="accordion-item">
                        <button
                            className="accordion-header"
                            onClick={() => toggleAccordion(item.id)}
                            aria-expanded={expandedItem === item.id}
                        >
                            <span className="accordion-icon">{expandedItem === item.id ? '−' : '+'}</span>
                            <span className="accordion-title">{item.title}</span>
                            <span className="accordion-arrow">›</span>
                        </button>

                        {expandedItem === item.id && (
                            <div className="accordion-content">
                                <p className="item-description">{item.description}</p>

                                {/* Lista de documentos */}
                                <div className="documents-list">
                                    {item.documents.map((doc, index) => (
                                        <div key={index} className="document-item">
                                            <div className="document-icon">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#E74C3C" />
                                                    <path d="M14 2V8H20L14 2Z" fill="#C0392B" />
                                                    <path d="M16 13H8V15H16V13Z" fill="white" />
                                                    <path d="M16 16H8V18H16V16Z" fill="white" />
                                                    <path d="M10 10H8V12H10V10Z" fill="white" />
                                                    <path d="M12 10H10V12H12V10Z" fill="white" />
                                                    <path d="M16 10H14V12H16V10Z" fill="white" />
                                                    <path d="M14 10H12V12H14V10Z" fill="white" />
                                                </svg>
                                            </div>
                                            <div className="document-info">
                                                <span className="document-name">{doc.name}</span>
                                                <div className="document-meta">
                                                    <span className="document-size">Tamaño: {doc.size}</span>
                                                    <span className="document-updated">Actualizado: {doc.updated}</span>
                                                </div>
                                            </div>
                                            <div className="document-actions">
                                                <a href={doc.url} target="_blank" rel="noopener noreferrer" className="document-view">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#0099da" />
                                                    </svg>
                                                    Ver
                                                </a>
                                                <a href={doc.url} download className="document-download">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="#0099da" />
                                                    </svg>
                                                    Descargar
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}