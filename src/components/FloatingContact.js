"use client";
import React, { useState } from 'react';

export default function FloatingContact() {
    const [isOpen, setIsOpen] = useState(false);

    const contactOptions = [
        { id: 'atencion', text: 'Atención al Cliente', url: '/contactenos/atencion' },
        { id: 'reportes', text: 'Reportar Fallas', url: '/contactenos/reportes' },
        { id: 'factura', text: 'Consulta de Facturas', url: '/pagos/factura' },
        { id: 'puntos', text: 'Puntos de Atención', url: '/contactenos/puntos' },
        { id: 'pqrs', text: 'PQRS', url: '/contactenos/pqrs' }
    ];

    return (
        <div className="floating-contact-container" style={{
            position: 'fixed',
            right: '30px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 9999,
            fontFamily: 'Arial, sans-serif'
        }}>
            {isOpen && (
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.2)',
                    width: '250px',
                    marginBottom: '15px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        backgroundColor: '#0078d7',
                        color: 'white',
                        padding: '15px',
                        fontWeight: 'bold'
                    }}>
                        Nuestros Servicios
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                float: 'right',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '18px',
                                cursor: 'pointer'
                            }}
                        >
                            ×
                        </button>
                    </div>
                    <div style={{ padding: '10px' }}>
                        {contactOptions.map(option => (
                            <a
                                key={option.id}
                                href={option.url}
                                style={{
                                    display: 'block',
                                    padding: '12px 15px',
                                    color: '#333',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid #eee',
                                    transition: 'background-color 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#f5f5f5';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                {option.text}
                            </a>
                        ))}
                    </div>
                </div>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    backgroundColor: '#0078d7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    padding: '12px 20px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#006bc2';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#0078d7';
                }}
            >
                <span style={{ width: '20px', height: '20px', display: 'inline-block' }}>👤</span>
                <span>Contáctanos</span>
            </button>
        </div>
    );
}