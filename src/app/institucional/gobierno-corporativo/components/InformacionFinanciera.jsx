'use client';

import { useState } from 'react';
import styles from './InformacionFinanciera.module.css';

const InformacionFinanciera = () => {
    // Estado para controlar la pestaña activa
    const [activeTab, setActiveTab] = useState('presupuesto');

    // Estado para controlar el año expandido
    const [expandedItem, setExpandedItem] = useState(null);

    // Función para cambiar de pestaña
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setExpandedItem(null); // Cerrar todos los items al cambiar de pestaña
    };

    // Función para manejar la expansión de un año
    const toggleExpand = (itemId) => {
        if (expandedItem === itemId) {
            setExpandedItem(null);
        } else {
            setExpandedItem(itemId);
        }
    };

    // Datos de documentos por año y tipo
    const documentsData = {
        // Presupuesto
        'presupuesto-2025': [
            { name: 'Presupuesto 2025', url: '/documentos/financiera/presupuesto-2025.pdf', size: '1.8 MB', updated: '15/12/2024' },
            { name: 'Presupuesto Detallado 2025', url: '/documentos/financiera/presupuesto-detallado-2025.pdf', size: '3.2 MB', updated: '18/12/2024' }
        ],
        'presupuesto-2024': [
            { name: 'Presupuesto 2024', url: '/documentos/financiera/presupuesto-2024.pdf', size: '1.7 MB', updated: '10/12/2023' },
            { name: 'Presupuesto Detallado 2024', url: '/documentos/financiera/presupuesto-detallado-2024.pdf', size: '3.0 MB', updated: '15/12/2023' },
            { name: 'Ejecución Presupuestal Q1-2024', url: '/documentos/financiera/ejecucion-q1-2024.pdf', size: '1.4 MB', updated: '10/04/2024' }
        ],
        'presupuesto-2023': [
            { name: 'Presupuesto 2023', url: '/documentos/financiera/presupuesto-2023.pdf', size: '1.6 MB', updated: '12/12/2022' },
            { name: 'Ejecución Presupuestal Anual 2023', url: '/documentos/financiera/ejecucion-anual-2023.pdf', size: '2.3 MB', updated: '20/01/2024' }
        ],
        
        // Estados Financieros
        'estados-2025': [
            { name: 'Estados Financieros Q1-2025', url: '/documentos/financiera/estados-q1-2025.pdf', size: '2.8 MB', updated: '25/04/2025' }
        ],
        'estados-2024': [
            { name: 'Estados Financieros Q1-2024', url: '/documentos/financiera/estados-q1-2024.pdf', size: '2.7 MB', updated: '20/04/2024' },
            { name: 'Estados Financieros Q2-2024', url: '/documentos/financiera/estados-q2-2024.pdf', size: '2.7 MB', updated: '25/07/2024' }
        ],
        
        // Informes
        'informe-2024': [
            { name: 'Informe Control Interno Contable Q1-2024', url: '/documentos/financiera/control-interno-q1-2024.pdf', size: '1.8 MB', updated: '28/04/2024' }
        ],
        'informe-2023': [
            { name: 'Informe Control Interno Contable Anual 2023', url: '/documentos/financiera/control-interno-anual-2023.pdf', size: '3.2 MB', updated: '28/02/2024' }
        ]
    };

    // Datos para las pestañas y sus respectivos contenidos
    const tabsData = {
        presupuesto: [
            { id: 'presupuesto-2025', title: '2025' },
            { id: 'presupuesto-2024', title: '2024' },
            { id: 'presupuesto-2023', title: '2023' },
            { id: 'presupuesto-2022', title: '2022' },
            { id: 'presupuesto-2021', title: '2021' }
        ],
        estados: [
            { id: 'estados-2025', title: '2025' },
            { id: 'estados-2024', title: '2024' },
            { id: 'estados-2023', title: '2023' },
            { id: 'estados-2022', title: '2022' },
            { id: 'estados-2021', title: '2021' }
        ],
        informe: [
            { id: 'informe-2025', title: '2025' },
            { id: 'informe-2024', title: '2024' },
            { id: 'informe-2023', title: '2023' },
            { id: 'informe-2022', title: '2022' },
            { id: 'informe-2021', title: '2021' }
        ]
    };

    // Obtener los elementos según la pestaña activa
    const activeItems = tabsData[activeTab] || [];

    return (
        <div className={styles.container}>
            {/* Pestañas */}
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tabButton} ${activeTab === 'presupuesto' ? styles.active : ''}`}
                    onClick={() => handleTabChange('presupuesto')}
                >
                    <span className={styles.tabIcon}>✓</span> Presupuesto
                    {activeTab === 'presupuesto' && <div className={styles.tabTriangle}></div>}
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'estados' ? styles.active : ''}`}
                    onClick={() => handleTabChange('estados')}
                >
                    <span className={styles.tabIcon}>✓</span> Estados Financieros
                    {activeTab === 'estados' && <div className={styles.tabTriangle}></div>}
                </button>
                <button
                    className={`${styles.tabButton} ${activeTab === 'informe' ? styles.active : ''}`}
                    onClick={() => handleTabChange('informe')}
                >
                    <span className={styles.tabIcon}>✓</span> Informe Control Interno Contable
                    {activeTab === 'informe' && <div className={styles.tabTriangle}></div>}
                </button>
            </div>

            {/* Lista de años */}
            <div className={styles.itemsList}>
                {activeItems.map((item) => (
                    <div key={item.id} className={styles.itemRow}>
                        <div 
                            className={styles.itemHeader}
                            onClick={() => toggleExpand(item.id)}
                        >
                            <span className={styles.expandIcon}>{expandedItem === item.id ? '−' : '+'}</span>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.arrowIcon}>›</span>
                        </div>

                        {/* Contenido expandido con documentos */}
                        {expandedItem === item.id && documentsData[item.id] && (
                            <div className={styles.itemContent}>
                                {documentsData[item.id].map((doc, index) => (
                                    <div key={index} className={styles.documentCard}>
                                        <div className={styles.documentInfo}>
                                            <div className={styles.documentIcon}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#E74C3C" />
                                                    <path d="M14 2V8H20L14 2Z" fill="#C0392B" />
                                                </svg>
                                            </div>
                                            <div className={styles.documentDetails}>
                                                <h3 className={styles.documentTitle}>{doc.name}</h3>
                                                <div className={styles.documentMeta}>
                                                    <span className={styles.documentSize}>Tamaño: {doc.size}</span>
                                                    <span className={styles.documentUpdated}>Actualizado: {doc.updated}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.documentActions}>
                                            <a href={doc.url} target="_blank" rel="noopener noreferrer" className={styles.viewButton}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#0099da" />
                                                </svg>
                                                Ver
                                            </a>
                                            <a href={doc.url} download className={styles.downloadButton}>
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="#0099da" />
                                                </svg>
                                                Descargar
                                            </a>
                                        </div>
                                    </div>
                                ))}
                                {!documentsData[item.id] && (
                                    <p className={styles.noDocuments}>No hay documentos disponibles para este año.</p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InformacionFinanciera;