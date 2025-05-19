'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const PoliticasAccordion = ({ policies }) => {
    // Estado para los acordeones expandidos (almacena los IDs de las secciones expandidas)
    const [expandedSections, setExpandedSections] = useState([]);
    
    // Función para expandir/contraer secciones
    const toggleSection = (sectionId) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };
    
    // Función para verificar si una sección está expandida
    const isSectionExpanded = (sectionId) => {
        return expandedSections.includes(sectionId);
    };
    
    return (
        <div className="accordion-container">
            {policies.map((policy) => (
                <div key={policy.id} className="accordion-item" style={{
                    borderBottom: '1px solid #e0e0e0',
                }}>
                    <div 
                        className="accordion-header"
                        onClick={() => toggleSection(policy.id)}
                        style={{
                            padding: '15px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: isSectionExpanded(policy.id) ? '#f8f9fa' : 'transparent',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            {isSectionExpanded(policy.id) 
                                ? <ChevronDown size={20} color="#0098d9" style={{ marginRight: '10px' }} /> 
                                : <ChevronRight size={20} color="#0098d9" style={{ marginRight: '10px' }} />
                            }
                            <span style={{ fontWeight: 'bold', color: '#333' }}>{policy.title}</span>
                        </div>
                    </div>
                    
                    {isSectionExpanded(policy.id) && (
                        <div 
                            className="accordion-content"
                            style={{
                                padding: '15px 15px 15px 45px',
                                backgroundColor: '#f8f9fa',
                            }}
                        >
                            {policy.description && (
                                <p style={{ marginBottom: '15px' }}>
                                    {policy.description}
                                </p>
                            )}
                            
                            {/* Documentos relacionados */}
                            <div className="policy-documents">
                                <h4 style={{ marginBottom: '10px', fontSize: '16px' }}>Documentos relacionados</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {policy.documents && policy.documents.map((doc, index) => (
                                        <li key={index} style={{ marginBottom: '8px' }}>
                                            <a 
                                                href={doc.url}
                                                style={{ 
                                                    color: '#0098d9', 
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center'
                                                }}
                                            >
                                                <span style={{ marginRight: '8px' }}>{doc.icon}</span>
                                                {doc.title}
                                            </a>
                                        </li>
                                    ))}
                                    
                                    {/* Si no hay documentos específicos, mostrar los documentos predeterminados */}
                                    {!policy.documents && (
                                        <>
                                            <li style={{ marginBottom: '8px' }}>
                                                <a 
                                                    href={`${policy.url}/manual.pdf`}
                                                    style={{ 
                                                        color: '#0098d9', 
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ marginRight: '8px' }}>📄</span>
                                                    Manual de {policy.title}
                                                </a>
                                            </li>
                                            <li style={{ marginBottom: '8px' }}>
                                                <a 
                                                    href={`${policy.url}/procedimiento.pdf`}
                                                    style={{ 
                                                        color: '#0098d9', 
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ marginRight: '8px' }}>📝</span>
                                                    Procedimiento de {policy.title}
                                                </a>
                                            </li>
                                            <li>
                                                <a 
                                                    href={`${policy.url}/formatos.zip`}
                                                    style={{ 
                                                        color: '#0098d9', 
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    <span style={{ marginRight: '8px' }}>📁</span>
                                                    Formatos y anexos
                                                </a>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                            
                            {/* Contenido personalizado si existe */}
                            {policy.content && (
                                <div className="policy-custom-content" style={{ marginTop: '20px' }}>
                                    {policy.content}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PoliticasAccordion;