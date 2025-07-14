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
                description: '',
                documents: [
                    { name: 'Informe de Empalme 2022', url: '/documentos/informes/INFORME-DE-GESTION-2021-2022.pdf', size: '4.2 MB', updated: '15/01/2024' }
                ]
            },
            {
                id: 'integrado-2024',
                title: 'Reporte Integrado 2024',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2023', url: '/documentos/informes/Reporte-integrado-EH-2023.pdf', size: '5.7 MB', updated: '15/03/2024' }
                ]
            },
            {
                id: 'integrado-2023',
                title: 'Reporte Integrado 2023',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2023', url: '/documentos/informes/Reporte-integrado-EH-2023.pdf', size: '5.5 MB', updated: '20/03/2023' }
                ]
            },
            {
                id: 'integrado-2022',
                title: 'Reporte Integrado 2022',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2022', url: '/documentos/informes/Reporte-Integrado-EH-2022.pdf', size: '5.3 MB', updated: '18/03/2022' }
                ]
            },
            {
                id: 'integrado-2021',
                title: 'Reporte Integrado 2021',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2021', url: '/documentos/informes/REPORTE-INTEGRADO-2021-EH.pdf', size: '5.0 MB', updated: '19/03/2021' }
                ]
            },
            {
                id: 'integrado-2020',
                title: 'Reporte Integrado 2020',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2020', url: '/documentos/informes/ElectroHuila-Reporte-Integrado-2020.pdf', size: '4.8 MB', updated: '17/03/2020' }
               ]
            },
            {
                id: 'integrado-2019',
                title: 'Reporte Integrado 2019',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2019', url: '/documentos/informes/Electrohuila-Reporte-integrado-2019_compressed.pdf', size: '4.6 MB', updated: '16/03/2019' }
                  ]
            },
            {
                id: 'integrado-2018',
                title: 'Reporte Integrado 2018',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2018', url: '/documentos/informes/D-REPORTE-INTEGRADO-2018.pdf', size: '4.4 MB', updated: '15/03/2018' }
                ]
            },
            {
                id: 'integrado-2017',
                title: 'Reporte Integrado 2017',
                description: '',
                documents: [
                    { name: 'Reporte Integrado 2017', url: '/documentos/informes/E-INFORME-DE-GESTION-2017.pdf', size: '4.2 MB', updated: '14/03/2017' }
                ]
            }
        ],
        plan: [
            {
                id: 'plan-inversion-2024',
                title: 'Informe de Ejecución Plan de Inversiones 2024',
                description: '',
                documents: [
                    { name: 'Documento Soporte Plan de Inversiones 2024', url: '/documentos/informes/BOLETIN-PLAN-DE-INVERSIONES-2024.pdf', size: '3.5 MB', updated: '10/01/2024' },
                    { name: 'Informe de Ejecución Plan de Inversiones 2024', url: '/documentos/informes/INFORME-EJECUCION-PLAN-DE-INVERSIONES-2024.pdf', size: '2.2 MB', updated: '12/01/2024' }
                ]
            },
            {
                id: 'plan-inversion-2023',
                title: 'Informe de Ejecución Plan de Inversiones 2023',
                description: '',
                documents: [
                    { name: 'Informe de ejecución plan de inversiones 2023', url: '/documentos/informes/Informe-de-Ejecucion-Plan-de-Inversiones-2023.pdf', size: '3.4 MB', updated: '12/01/2023' },
                    { name: 'Documento soporte plan de inversiones 2023', url: '/documentos/informes/Documento-Soporte-Ejecucion-Plan-de-Inversiones-2023.pdf', size: '2.1 MB', updated: '15/01/2023' }
                 ]
            },
            {
                id: 'plan-inversion-2022',
                title: 'Informe de Ejecución Plan de Inversiones 2022',
                description: '',
                documents: [
                    { name: 'Informe de ejecución plan de inversiones 2022', url: '/documentos/informes/PLAN-DE-INVERSIONES-2022.pdf', size: '3.3 MB', updated: '14/01/2022' },
                    { name: 'Documento soporte plan de inversiones 2022', url: '/documentos/informes/INFORME-EJECUCION-PLAN-DE-INVERSIONES-2021-DE-ELECTROHUILA.pdf', size: '2.0 MB', updated: '16/01/2022' }
                ]
            },
             {
                id: 'plan-inversion-2021',
                title: 'Informe Ejecución Plan de Inversiones 2021',
                description: '',
                documents: [
                    { name: 'Informe de ejecución plan de inversiones 2021', url: '/documentos/informes/Informe-de-ejecucion-PI-2021-Electrohuila-S.A.-E.S.P.pdf', size: '3.5 MB', updated: '10/01/2024' },
                    { name: 'Documento soporte plan de inversiones 2021', url: '/documentos/informes/INFORME-EJECUCION-PLAN-DE-INVERSIONES-2021-DE-ELECTROHUILA.pdf', size: '2.2 MB', updated: '12/01/2024' }
                ]
            },
            {
                id: 'plan-inversion-2020',
                title: 'Informe de Ejecución Plan de Inversiones 2019 - 2020',
                description: '',
                documents: [
                    { name: 'Informe de ejecución plan de inversiones 2019 – 2020', url: '/documentos/informes/PUBLICACION-WEB-INFORME-EJECUCION-PLAN-DE-INVERSIONES-2019-2020.pdf', size: '3.4 MB', updated: '12/01/2023' },
                    { name: 'Documento soporte plan de inversiones 2019 – 2020', url: '/documentos/informes/DOCUMENTO-SOPORTE-PLAN-DE-INVERSIONES-2019-2020-EH.pdf', size: '2.1 MB', updated: '15/01/2023' }
                 ]
            },
            {
                id: 'plan-inversion-2019',
                title: 'Resumen Plan de Inversiones Electrohuila 2019 - 2023',
                description: '',
                documents: [
                    { name: 'Resumen plan de inversiones 2019 – 2023', url: '/documentos/informes/Resumen-del-plan-de-inversiones-Electrohuila-1.pdf', size: '3.3 MB', updated: '14/01/2022' }
                ]
            }
        ],
        otros: [
            {
                id: 'informe-gestion',
                title: 'Informe Anual de Operación 2024',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2024', url: '/documentos/informes/Reporte-CGM-2024-HLAC.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Reporte CGM HLAG 2024', url: '/documentos/informes/Reporte-CGM-2024-HLAG.pdf', size: '2.7 MB', updated: '15/01/2024' }
               ]
            },
            {
                id: 'informe-financiero',
                title: 'Informe Anual de Operación 2023',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2023', url: '/documentos/informes/reporte-cgm-hlac-2023.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG 2023', url: '/documentos/informes/reporte-cgm-hlag-2023.pdf', size: '2.1 MB', updated: '25/02/2024' }
                ]
            },
            {
                id: 'informe-auditoria',
                title: 'Informe Anual de Operación 2022',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2022', url: '/documentos/informes/Reporte-CGM-2022-HLAC.pdf', size: '2.4 MB', updated: '10/02/2024' },
                    { name: 'Reporte CGM HLAG 2022', url: '/documentos/informes/Reporte-CGM-2022-HLAG.pdf', size: '3.1 MB', updated: '15/03/2024' }
                ]
            },
            {
                id: 'informe-gestion1',
                title: 'Informe Anual de Operación 2021',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2021', url: '/documentos/informes/Reporte-Anual-CGM-HLAC-2021.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Reporte CGM HLAG 2021', url: 'public/documentos/informes/Reporte-Anual-CGM-HLAG-2021.pdf', size: '2.7 MB', updated: '15/01/2024' }
                 ]
            },
            {
                id: 'informe-financiero1',
                title: 'Informe Anual de Operación 2019',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2019', url: '/documentos/informes/Reporte-CGM-HLAC-2019.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 3 2019', url: '/documentos/informes/Reporte-CGM-HLAC-2019-ANEXO-3.pdf', size: '2.1 MB', updated: '25/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 2 2019', url: '/documentos/informes/Reporte-CGM-HLAC-2019-ANEXO-2.pdf', size: '2.9 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 1 2019', url: '/documentos/informes/Reporte-CGM-HLAC-2019-ANEXO-1.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG 2019', url: '/documentos/informes/Reporte-CGM-HLAG-2019.pdf', size: '2.1 MB', updated: '25/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 3 2019', url: '/documentos/informes/Reporte-CGM-HLAG-2019-ANEXO-3.pdf', size: '2.9 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 2 2019', url: '/documentos/informes/Reporte-CGM-HLAG-2019-ANEXO-2.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 1 2019', url: 'public/documentos/informes/Reporte-CGM-HLAG-2019-ANEXO-1.pdf', size: '2.1 MB', updated: '25/02/2024' }
                                   ]
            },
            {
                id: 'informe-auditoria1',
                title: 'Informe Anual de Operación 2018',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2018', url: '/documentos/informes/Reporte-CGM-HLAC-2018.pdf', size: '2.4 MB', updated: '10/02/2024' },
                    { name: 'Reporte CGM HLAG 2018', url: '/documentos/informes/Reporte-CGM-HLAG-2018.pdf', size: '3.1 MB', updated: '15/03/2024' }
                ]
            },
            {
                id: 'informe-gestion2',
                title: 'Informe Anual de Operación 2017',
                description: 'Informes periódicos sobre la gestión de la empresa.',
                documents: [
                    { name: 'Reporte CGM HLAG 2017', url: '/documentos/informes/cgm2017.pdf', size: '2.8 MB', updated: '15/04/2024' }
                ]
            },
            {
                id: 'informe-financiero2',
                title: 'Informe Anual de Operación 2016',
                description: '',
                documents: [
                    { name: 'Reporte CGM HLAC 2016', url: '/documentos/informes/HLAC_Informe_2016.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 3 2016', url: '/documentos/informes/HLAC_anexo2C.pdf', size: '2.1 MB', updated: '25/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 2 2016', url: '/documentos/informes/HLAG_Anexo1G.pdf', size: '2.9 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAC Anexo 1 2016', url: '/documentos/informes/HLAC_anexo1C.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG 2016', url: '/documentos/informes/HLAG_Informe_2016.pdf', size: '2.1 MB', updated: '25/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 3 2016', url: '/documentos/informes/HLAC_anexo3C.pdf', size: '2.9 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 2 2016', url: '/documentos/informes/HLAG_Anexo3.pdf', size: '3.6 MB', updated: '28/02/2024' },
                    { name: 'Reporte CGM HLAG Anexo 1 2016', url: '/documentos/informes/HLAG_Anexo2.pdf', size: '2.1 MB', updated: '25/02/2024' }
                ]
            },
            {
                id: 'informe-auditoria2',
                title: 'Informes Línea de Transparencia',
                description: '',
                documents: [
                    { name: 'Informe Final Línea de Transparencia 2023', url: '/documentos/informes/informe-linea-transparencia-2023.pdf', size: '2.4 MB', updated: '10/02/2024' }
                 ]
            },
            {
                id: 'informe-gestion2',
                title: 'Peticiones, quejas y reclamos',
                description: '',
                documents: [
                    { name: 'Informe primer trimestre 2025', url: '', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Informe primer trimestre 2024', url: '/documentos/informes/INFORME-PQR_1TRIMESTRE-2024.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Informe segundo trimestre 2024', url: '', size: '2.6 MB', updated: '15/10/2023' },
                    { name: 'Informe tercer  trimestre 2024', url: '/documentos/informes/INFORME-TRIMESTRAL-SOBRE-ACCESO-A-INFORMACION-QUEJAS-Y-RECLAMO-julio-agosto-y-septiembre-2024.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Informe cuarto trimestre 2024', url: '/documentos/informes/INFORME-TRIMESTRAL-SOBRE-ACCESO-A-INFORMACION-QUEJAS-Y-RECLAMO-octubre-noviembre-y-diciembre-2024.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Informe cuarto trimestre 2023', url: '/documentos/informes/informe-pqr-4-trimestre-2023.pdf', size: '2.6 MB', updated: '15/10/2023' },
                    { name: 'Informe tercer trimestre 2023', url: '/documentos/informes/informe-pqr-3-trimestre-2023.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Informe segundo trimestre 2023', url: '/documentos/informes/informe-pqr-2-semestre-2023.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Informe primer trimestre 2023', url: '/documentos/informes/informe-pqr-1-semestre-2023.pdf', size: '2.6 MB', updated: '15/10/2023' }
                ]
            },
            {
                id: 'informe-financiero3',
                title: 'Estudio MUNTS 2017',
                description: '',
                documents: [
                    { name: 'Estudio MUNTS 2017', url: '/documentos/informes/ESTUDIO_MUNTS_ELECTROHUILA.pdf', size: '3.6 MB', updated: '28/02/2024' }
                 ]
            },
            {
                id: 'informe-auditoria3',
                title: 'Costos garantías financieras en el MEM',
                description: '',
                documents: [
                    { name: 'Costos garantías financieras en el MEM', url: '/documentos/informes/costogarantiasMEM.pdf', size: '2.4 MB', updated: '10/02/2024' }
                 ]
            },
            {
                id: 'informe-gestion3',
                title: 'Cargos Regulados',
                description: '',
                documents: [
                    { name: 'Cargos regulados 2025', url: '/documentos/informes/DG-135-DE-2025.pdf', size: '2.8 MB', updated: '15/04/2024' },
                    { name: 'Cargos regulados 2024', url: '/documentos/informes/DG-014-DE-2024-firmado.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Cargos regulados 2023', url: '/documentos/informes/DG-030-DE-2023-1.pdf', size: '2.6 MB', updated: '15/10/2023' },
                    { name: 'Cargos regulados 2022', url: '/documentos/informes/Cargos_Regulado_20220315_025337477.pdf', size: '2.7 MB', updated: '15/01/2024' },
                    { name: 'Cargos regulados 2021', url: '/documentos/informes/DG022Cargos-Regulados-2021.pdf', size: '2.6 MB', updated: '15/10/2023' }
                ]
            },
            {
                id: 'informe-financiero4',
                title: 'Sistema de Medición',
                description: '',
                documents: [
                    { name: 'Sistema de medición', url: '/documentos/informes/PROCEDIMIENTO-PARA-MANTENIMIENTO-SISTEMA-DE-MEDICON.pdf', size: '3.6 MB', updated: '28/02/2024' }
                 ]
            },
            {
                id: 'informe-auditoria4',
                title: 'Manual de Opercaión EH',
                description: '',
                documents: [
                    { name: 'Manual de Operación EH', url: '/documentos/informes/Manual-de-operacion-SEH.pdf', size: '2.4 MB', updated: '10/02/2024' }
                  ]
            },{
                id: 'informe-gestion4',
                title: 'Carta de trato digno al usuario',
                description: '',
                documents: [
                    { name: 'Carta de trato digno al usuario', url: '/documentos/informes/CARTA-DE-TRATO-DIGNO-AL-USUARIO-DE-ELECTROHUILA.pdf', size: '2.8 MB', updated: '15/04/2024' }
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
             <div style={{ height: '80px' }}></div>
        </div>
    );
}