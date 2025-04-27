'use client';

import { useState } from 'react';
import Link from 'next/link';
import './informes.css'; // Puedes reutilizar gran parte del CSS de políticas

export default function InformesPage() {
    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState('reporte');

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
        reporte: [
            {
                id: 'empalme',
                title: 'Informe de Empalme',
                description: 'Documentos relacionados con el proceso de empalme administrativo.',
                documents: [
                    { name: 'Informe de Empalme 2023-2024', url: '/documentos/informes/empalme/informe-empalme-2023-2024.pdf', size: '4.2 MB', updated: '15/01/2024' },
                    { name: 'Anexos Informe de Empalme', url: '/documentos/informes/empalme/anexos-empalme-2023.pdf', size: '2.8 MB', updated: '20/12/2023' }
                ]
            },
            {
                id: 'integrado-2024',
                title: 'Reporte Integrado 2024',
                description: 'Reporte de gestión integrado correspondiente al año 2024.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2024', url: '/documentos/informes/integrado/reporte-integrado-2024.pdf', size: '5.7 MB', updated: '15/03/2024' },
                    { name: 'Estados Financieros 2024', url: '/documentos/informes/integrado/estados-financieros-2024.pdf', size: '3.2 MB', updated: '10/03/2024' },
                    { name: 'Informe de Sostenibilidad 2024', url: '/documentos/informes/integrado/sostenibilidad-2024.pdf', size: '4.1 MB', updated: '20/03/2024' }
                ]
            },
            {
                id: 'integrado-2023',
                title: 'Reporte Integrado 2023',
                description: 'Reporte de gestión integrado correspondiente al año 2023.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2023', url: '/documentos/informes/integrado/reporte-integrado-2023.pdf', size: '5.5 MB', updated: '20/03/2023' },
                    { name: 'Estados Financieros 2023', url: '/documentos/informes/integrado/estados-financieros-2023.pdf', size: '3.0 MB', updated: '15/03/2023' },
                    { name: 'Informe de Sostenibilidad 2023', url: '/documentos/informes/integrado/sostenibilidad-2023.pdf', size: '4.0 MB', updated: '25/03/2023' }
                ]
            },
            {
                id: 'integrado-2022',
                title: 'Reporte Integrado 2022',
                description: 'Reporte de gestión integrado correspondiente al año 2022.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2022', url: '/documentos/informes/integrado/reporte-integrado-2022.pdf', size: '5.3 MB', updated: '18/03/2022' },
                    { name: 'Estados Financieros 2022', url: '/documentos/informes/integrado/estados-financieros-2022.pdf', size: '2.9 MB', updated: '12/03/2022' },
                    { name: 'Informe de Sostenibilidad 2022', url: '/documentos/informes/integrado/sostenibilidad-2022.pdf', size: '3.8 MB', updated: '22/03/2022' }
                ]
            },
            {
                id: 'integrado-2021',
                title: 'Reporte Integrado 2021',
                description: 'Reporte de gestión integrado correspondiente al año 2021.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2021', url: '/documentos/informes/integrado/reporte-integrado-2021.pdf', size: '5.0 MB', updated: '19/03/2021' },
                    { name: 'Estados Financieros 2021', url: '/documentos/informes/integrado/estados-financieros-2021.pdf', size: '2.8 MB', updated: '14/03/2021' },
                    { name: 'Informe de Sostenibilidad 2021', url: '/documentos/informes/integrado/sostenibilidad-2021.pdf', size: '3.7 MB', updated: '24/03/2021' }
                ]
            },
            {
                id: 'integrado-2020',
                title: 'Reporte Integrado 2020',
                description: 'Reporte de gestión integrado correspondiente al año 2020.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2020', url: '/documentos/informes/integrado/reporte-integrado-2020.pdf', size: '4.8 MB', updated: '17/03/2020' },
                    { name: 'Estados Financieros 2020', url: '/documentos/informes/integrado/estados-financieros-2020.pdf', size: '2.7 MB', updated: '12/03/2020' },
                    { name: 'Informe de Sostenibilidad 2020', url: '/documentos/informes/integrado/sostenibilidad-2020.pdf', size: '3.5 MB', updated: '22/03/2020' }
                ]
            },
            {
                id: 'integrado-2019',
                title: 'Reporte Integrado 2019',
                description: 'Reporte de gestión integrado correspondiente al año 2019.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2019', url: '/documentos/informes/integrado/reporte-integrado-2019.pdf', size: '4.6 MB', updated: '16/03/2019' },
                    { name: 'Estados Financieros 2019', url: '/documentos/informes/integrado/estados-financieros-2019.pdf', size: '2.6 MB', updated: '11/03/2019' },
                    { name: 'Informe de Sostenibilidad 2019', url: '/documentos/informes/integrado/sostenibilidad-2019.pdf', size: '3.4 MB', updated: '21/03/2019' }
                ]
            },
            {
                id: 'integrado-2018',
                title: 'Reporte Integrado 2018',
                description: 'Reporte de gestión integrado correspondiente al año 2018.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2018', url: '/documentos/informes/integrado/reporte-integrado-2018.pdf', size: '4.4 MB', updated: '15/03/2018' },
                    { name: 'Estados Financieros 2018', url: '/documentos/informes/integrado/estados-financieros-2018.pdf', size: '2.5 MB', updated: '10/03/2018' },
                    { name: 'Informe de Sostenibilidad 2018', url: '/documentos/informes/integrado/sostenibilidad-2018.pdf', size: '3.3 MB', updated: '20/03/2018' }
                ]
            },
            {
                id: 'integrado-2017',
                title: 'Reporte Integrado 2017',
                description: 'Reporte de gestión integrado correspondiente al año 2017.',
                documents: [
                    { name: 'Reporte Integrado de Gestión 2017', url: '/documentos/informes/integrado/reporte-integrado-2017.pdf', size: '4.2 MB', updated: '14/03/2017' },
                    { name: 'Estados Financieros 2017', url: '/documentos/informes/integrado/estados-financieros-2017.pdf', size: '2.4 MB', updated: '09/03/2017' },
                    { name: 'Informe de Sostenibilidad 2017', url: '/documentos/informes/integrado/sostenibilidad-2017.pdf', size: '3.2 MB', updated: '19/03/2017' }
                ]
            }
        ],
        plan: [
            {
                id: 'plan-inversion-2024',
                title: 'Plan de Inversión 2024',
                description: 'Documentos relacionados con el plan de inversiones para el año 2024.',
                documents: [
                    { name: 'Plan de Inversión 2024', url: '/documentos/informes/plan-inversion/plan-inversion-2024.pdf', size: '3.5 MB', updated: '10/01/2024' },
                    { name: 'Anexos Plan de Inversión 2024', url: '/documentos/informes/plan-inversion/anexos-plan-inversion-2024.pdf', size: '2.2 MB', updated: '12/01/2024' }
                ]
            },
            {
                id: 'plan-inversion-2023',
                title: 'Plan de Inversión 2023',
                description: 'Documentos relacionados con el plan de inversiones para el año 2023.',
                documents: [
                    { name: 'Plan de Inversión 2023', url: '/documentos/informes/plan-inversion/plan-inversion-2023.pdf', size: '3.4 MB', updated: '12/01/2023' },
                    { name: 'Anexos Plan de Inversión 2023', url: '/documentos/informes/plan-inversion/anexos-plan-inversion-2023.pdf', size: '2.1 MB', updated: '15/01/2023' },
                    { name: 'Seguimiento Plan de Inversión 2023', url: '/documentos/informes/plan-inversion/seguimiento-plan-inversion-2023.pdf', size: '1.8 MB', updated: '10/12/2023' }
                ]
            },
            {
                id: 'plan-inversion-2022',
                title: 'Plan de Inversión 2022',
                description: 'Documentos relacionados con el plan de inversiones para el año 2022.',
                documents: [
                    { name: 'Plan de Inversión 2022', url: '/documentos/informes/plan-inversion/plan-inversion-2022.pdf', size: '3.3 MB', updated: '14/01/2022' },
                    { name: 'Anexos Plan de Inversión 2022', url: '/documentos/informes/plan-inversion/anexos-plan-inversion-2022.pdf', size: '2.0 MB', updated: '16/01/2022' },
                    { name: 'Seguimiento Plan de Inversión 2022', url: '/documentos/informes/plan-inversion/seguimiento-plan-inversion-2022.pdf', size: '1.7 MB', updated: '12/12/2022' }
                ]
            }
        ],
        otros: [
            {
                id: 'informe-gestion',
                title: 'Informes de Gestión',
                description: 'Informes periódicos sobre la gestión de la empresa.',
                documents: [
                    { name: 'Informe de Gestión Primer Trimestre 2024', url: '/documentos/informes/gestion/informe-gestion-q1-2024.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Informe de Gestión Cuarto Trimestre 2023', url: '/documentos/informes/gestion/informe-gestion-q4-2023.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Informe de Gestión Tercer Trimestre 2023', url: '/documentos/informes/gestion/informe-gestion-q3-2023.pdf', size: '2.6 MB', updated: '15/10/2023' }
                ]
            },
            {
                id: 'informe-financiero',
                title: 'Informes Financieros',
                description: 'Informes detallados sobre el desempeño financiero de la empresa.',
                documents: [
                    { name: 'Estados Financieros Auditados 2023', url: '/documentos/informes/financieros/estados-financieros-auditados-2023.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Informe de Revisoría Fiscal 2023', url: '/documentos/informes/financieros/informe-revisoria-fiscal-2023.pdf', size: '2.1 MB', updated: '25/02/2024' },
                    { name: 'Notas a los Estados Financieros 2023', url: '/documentos/informes/financieros/notas-estados-financieros-2023.pdf', size: '2.9 MB', updated: '28/02/2024' }
                ]
            },
            {
                id: 'informe-auditoria',
                title: 'Informes de Auditoría',
                description: 'Resultados de auditorías internas y externas.',
                documents: [
                    { name: 'Informe Auditoría Interna 2023', url: '/documentos/informes/auditoria/informe-auditoria-interna-2023.pdf', size: '2.4 MB', updated: '10/02/2024' },
                    { name: 'Informe Auditoría Externa 2023', url: '/documentos/informes/auditoria/informe-auditoria-externa-2023.pdf', size: '3.1 MB', updated: '15/03/2024' },
                    { name: 'Plan de Mejoramiento Auditoría 2023', url: '/documentos/informes/auditoria/plan-mejoramiento-auditoria-2023.pdf', size: '1.7 MB', updated: '20/03/2024' }
                ]
            }
        ]
    };

    // Obtener los elementos del acordeón según la pestaña activa
    const activeAccordionItems = tabsData[activeTab] || [];

    return (
        <div className="informes-container">
            <div className="informes-header">
                <h1>Informes</h1>
                <div className="breadcrumb">
                    <Link href="/">Inicio</Link> | <Link href="/institucional/politicas">Políticas</Link>
                </div>
            </div>

            {/* Pestañas */}
            <div className="tabs-container">
                <button
                    className={`tab-button ${activeTab === 'reporte' ? 'active' : ''}`}
                    onClick={() => handleTabChange('reporte')}
                >
                    <span className="tab-icon">✓</span> Reporte Integrado
                </button>
                <button
                    className={`tab-button ${activeTab === 'plan' ? 'active' : ''}`}
                    onClick={() => handleTabChange('plan')}
                >
                    <span className="tab-icon">✓</span> Plan de Inversión
                </button>
                <button
                    className={`tab-button ${activeTab === 'otros' ? 'active' : ''}`}
                    onClick={() => handleTabChange('otros')}
                >
                    <span className="tab-icon">✓</span> Informes
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