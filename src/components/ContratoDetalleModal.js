'use client';

import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const ContratoDetalleModal = ({ isOpen, onClose, contratoId }) => {
    const [contratoDetalle, setContratoDetalle] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para obtener detalles completos del contrato
    const fetchContratoDetalle = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('🔍 Obteniendo detalles del contrato:', id);
            
            // Llamar a API para obtener detalles específicos
            const response = await fetch(`/api/contratos/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                setContratoDetalle(result.data);
            } else {
                throw new Error('No se pudieron obtener los detalles del contrato');
            }
            
        } catch (err) {
            console.error('💥 Error al obtener detalles:', err);
            setError(err.message);
            
            // Datos de ejemplo para desarrollo
            setContratoDetalle({
                codigo: id,
                empresa: '1 - ELECTRIFICADORA DEL HUILA S.A.',
                cuantia: '0',
                etapa: '01 - PRECONTRACTUAL',
                estado: 'ABIERTA',
                responsable: '01 - DIVISION SERVICIOS ADMINISTRATIVOS',
                fecha_creacion: '2025-07-02 14:32:00',
                tipo_invitacion: '01 - INVITACION PUBLICA',
                fecha_cierre: '2025-07-21 09:00:00',
                fecha_apertura: '2025-07-02 14:32:00',
                objeto: 'Prestar el servicio de telecomunicaciones de datos requeridos para comunicar los reconectadores eléctricos con el centro de control de la Electrificadora del Huila S.A. E.S.P.',
                documentos: [
                    {
                        nombre: 'TERMINOS DE REFERENCIA',
                        codigo: `${id}-TR`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/terminos-referencia.pdf'
                    },
                    {
                        nombre: 'ANEXO 9 Manual de Usuario de Inscripción de Proveedores',
                        codigo: `${id}-A9`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-inscripcion.pdf'
                    },
                    {
                        nombre: 'ANEXO 10 MANUAL DE SUPERVISIÓN O INTERVENTORIA',
                        codigo: `${id}-A10`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-supervision.pdf'
                    },
                    {
                        nombre: 'ANEXO 11 MANUAL SST PARA CONTRATISTAS Y PROVEEDORES',
                        codigo: `${id}-A11`,
                        fecha_carga: '2025-07-02 14:51:33',
                        url: '/documentos/manual-sst.pdf'
                    }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    // Cargar detalles cuando se abre el modal
    useEffect(() => {
        if (isOpen && contratoId) {
            fetchContratoDetalle(contratoId);
        }
    }, [isOpen, contratoId]);

    // Cerrar modal
    const handleClose = () => {
        setContratoDetalle(null);
        setError(null);
        onClose();
    };

    // No renderizar si no está abierto
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '100%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
            }}>
                {/* Header del Modal */}
                <div style={{
                    backgroundColor: '#0098d9',
                    color: 'white',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px' }}>
                        Detalle del contrato código: {contratoId}
                    </h2>
                    <button
                        onClick={handleClose}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            padding: '5px'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Contenido del Modal */}
                <div style={{ padding: '20px' }}>
                    {loading && (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#0098d9' }}>
                            <p>Cargando detalles del contrato...</p>
                        </div>
                    )}

                    {error && (
                        <div style={{ 
                            backgroundColor: '#fff3cd', 
                            padding: '15px', 
                            borderRadius: '5px',
                            color: '#856404',
                            marginBottom: '20px'
                        }}>
                            <p style={{ margin: 0 }}>⚠️ {error}</p>
                            <p style={{ margin: '10px 0 0 0', fontSize: '14px' }}>Mostrando datos de ejemplo para desarrollo</p>
                        </div>
                    )}

                    {contratoDetalle && (
                        <div>
                            {/* Información General */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '20px',
                                marginBottom: '30px'
                            }}>
                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Empresa:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.empresa}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Etapa:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.etapa}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Responsable:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.responsable}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Tipo Invitación:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.tipo_invitacion}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Apertura:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_apertura}</p>
                                    </div>
                                </div>

                                <div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Cuantía:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.cuantia}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Código:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.codigo}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Estado:</strong>
                                        <span style={{
                                            display: 'inline-block',
                                            backgroundColor: '#e1f5e8',
                                            color: '#28a745',
                                            padding: '5px 10px',
                                            borderRadius: '15px',
                                            fontSize: '14px',
                                            fontWeight: 'bold'
                                        }}>
                                            {contratoDetalle.estado}
                                        </span>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Creación:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_creacion}</p>
                                    </div>
                                    <div style={{ marginBottom: '15px' }}>
                                        <strong>Fecha Cierre:</strong>
                                        <p style={{ margin: '5px 0 0 0', color: '#555' }}>{contratoDetalle.fecha_cierre}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Objeto */}
                            <div style={{ marginBottom: '30px' }}>
                                <strong>Objeto:</strong>
                                <p style={{ 
                                    margin: '10px 0 0 0', 
                                    color: '#555', 
                                    lineHeight: '1.6',
                                    backgroundColor: '#f8f9fa',
                                    padding: '15px',
                                    borderRadius: '5px'
                                }}>
                                    {contratoDetalle.objeto}
                                </p>
                            </div>

                            {/* Documentos */}
                            {contratoDetalle.documentos && contratoDetalle.documentos.length > 0 && (
                                <div>
                                    <h3 style={{ 
                                        fontSize: '18px', 
                                        marginBottom: '15px', 
                                        color: '#0098d9',
                                        borderBottom: '2px solid #0098d9',
                                        paddingBottom: '5px'
                                    }}>
                                        Documentos
                                    </h3>
                                    
                                    <div style={{ overflowX: 'auto' }}>
                                        <table style={{ 
                                            width: '100%', 
                                            borderCollapse: 'collapse',
                                            border: '1px solid #e0e0e0'
                                        }}>
                                            <thead>
                                                <tr style={{ backgroundColor: '#f8f9fa' }}>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Documento
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'left', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Código Doc.
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'center', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Fecha de carga
                                                    </th>
                                                    <th style={{ 
                                                        padding: '12px', 
                                                        textAlign: 'center', 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        fontSize: '14px',
                                                        fontWeight: '600'
                                                    }}>
                                                        Link de Descarga
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {contratoDetalle.documentos.map((doc, index) => (
                                                    <tr key={index} style={{ 
                                                        borderBottom: '1px solid #e0e0e0',
                                                        backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
                                                    }}>
                                                        <td style={{ padding: '12px', fontSize: '14px' }}>
                                                            {doc.nombre}
                                                        </td>
                                                        <td style={{ padding: '12px', fontSize: '14px', color: '#0098d9' }}>
                                                            {doc.codigo}
                                                        </td>
                                                        <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>
                                                            {doc.fecha_carga}
                                                        </td>
                                                        <td style={{ padding: '12px', textAlign: 'center' }}>
                                                            <a
                                                                href={doc.url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    color: '#0098d9',
                                                                    textDecoration: 'none',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '14px',
                                                                    padding: '5px 10px',
                                                                    border: '1px solid #0098d9',
                                                                    borderRadius: '4px'
                                                                }}
                                                            >
                                                                <Download size={14} style={{ marginRight: '5px' }} />
                                                                Descargar
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer del Modal */}
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '15px 20px',
                    borderTop: '1px solid #e0e0e0',
                    textAlign: 'right',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                }}>
                    <button
                        onClick={handleClose}
                        style={{
                            backgroundColor: '#f27b13',
                            color: 'white',
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Aceptar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContratoDetalleModal;