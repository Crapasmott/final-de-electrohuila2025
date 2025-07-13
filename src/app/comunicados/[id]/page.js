"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function ComunicadoDetalle({ params }) {
    const { id } = params;
    const [comunicado, setComunicado] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener el comunicado específico desde WordPress
    const fetchComunicado = async (id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await fetch(
                `https://www.electrohuila.com.co/wp-json/wp/v2/posts/${id}`
            );
            
            if (!response.ok) {
                throw new Error('Comunicado no encontrado');
            }
            
            const post = await response.json();
            
            // Procesar el contenido manteniendo el formato esperado
            const processedData = {
                id: post.id,
                fecha: new Date(post.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                titulo: post.title.rendered,
                contenido: post.content.rendered,
                type: post.title.rendered.toUpperCase().includes('BOLETÍN') || 
                      post.title.rendered.toUpperCase().includes('BOLETIN') ? 'boletin' : 'comunicado',
                pdfUrl: extractPdfUrl(post.content.rendered)
            };
            
            setComunicado(processedData);
        } catch (err) {
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Función para extraer URL del PDF del contenido
    const extractPdfUrl = (content) => {
        const match = content?.match(/href="([^"]*\.pdf[^"]*)"/i);
        return match ? match[1] : null;
    };

    // Función para limpiar el contenido HTML o mostrar información del PDF
    const getDisplayContent = (content, titulo, pdfUrl) => {
        if (pdfUrl) {
            return `
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h4 style="color: #495057; margin-top: 0;">📄 Documento PDF Disponible</h4>
                    <p style="color: #6c757d; margin-bottom: 0;">
                        Este comunicado está disponible como documento PDF. 
                        Puedes verlo embebido a continuación o descargarlo directamente.
                    </p>
                </div>
                <div style="margin: 20px 0;">
                    <iframe 
                        src="${pdfUrl}" 
                        width="100%" 
                        height="600px" 
                        style="border: 1px solid #ddd; border-radius: 8px;"
                        title="Documento PDF">
                    </iframe>
                </div>
            `;
        }
        
        // Si no hay PDF, mostrar contenido HTML si existe
        if (content && content.trim().length > 50) {
            let cleaned = content.replace(/<a[^>]*class="pdfemb-viewer"[^>]*>.*?<\/a>/gi, '');
            return cleaned;
        }
        
        // Contenido por defecto
        return `
            <p>ELECTROHUILA S.A. E.S.P. informa sobre: <strong>${titulo || 'Comunicado oficial'}</strong></p>
            <p>El contenido de este comunicado está disponible en formato PDF.</p>
            <p>Para más información, puede contactar con nuestro servicio de atención al cliente.</p>
        `;
    };

    // Cargar datos al montar el componente
    useEffect(() => {
        if (id) {
            fetchComunicado(id);
        }
    }, [id]);

    // Datos de respaldo en caso de error
    const fallbackData = {
        id,
        fecha: new Date().toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit', 
            year: 'numeric'
        }),
        titulo: `Comunicado ${id}`,
        contenido: `
            <p>ELECTROHUILA S.A. E.S.P. informa que...</p>
            <p>Este es un comunicado de ejemplo para el ID ${id}.</p>
            <p>No se pudo cargar el contenido desde WordPress. Por favor, intente más tarde.</p>
        `,
        type: 'comunicado',
        pdfUrl: null
    };

    // Usar datos de WordPress o fallback
    const displayData = comunicado || fallbackData;

    // Estado de carga
    if (loading) {
        return (
            <div style={{ backgroundColor: '#f9f9f9', borderRadius: '6px', padding: '20px', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <div style={{
                        display: 'inline-block',
                        width: '40px',
                        height: '40px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #ff7e00',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}></div>
                    <p style={{ marginTop: '20px', color: '#666' }}>Cargando comunicado...</p>
                </div>
                
                <style jsx>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto', 
            padding: '20px',
            minHeight: '100vh'
        }}>
            
            {/* Error discreto si hay problemas */}
            {error && (
                <div style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffeaa7',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    ⚠️ {error}. Mostrando información de respaldo.
                </div>
            )}

            {/* Indicador discreto de datos reales - REMOVIDO */}
            {/* La barra verde era solo para debugging/desarrollo */}

            {/* CONTENEDOR PRINCIPAL CENTRADO */}
            <div style={{ 
                backgroundColor: '#f9f9f9', 
                borderRadius: '12px', 
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e9ecef'
            }}>

                {/* Header - MEJORADO Y CENTRADO */}
                <div style={{
                    background: 'linear-gradient(to right, #ff7e00, #ffb366)',
                    padding: '20px 30px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px', letterSpacing: '0.5px' }}>
                        {displayData.type === 'boletin' ? 'BOLETÍN DE PRENSA' : 'COMUNICADO DE PRENSA'}
                    </h2>
                    <div style={{ 
                        width: '40px', 
                        height: '40px', 
                        backgroundColor: '#4CAF50', 
                        borderRadius: '50%',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>
                        <div style={{ 
                            width: '100%', 
                            height: '100%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            fontSize: '20px'
                        }}>
                            {displayData.type === 'boletin' ? '📢' : '📋'}
                        </div>
                    </div>
                </div>

                {/* INFORMACIÓN PRINCIPAL CENTRADA */}
                <div style={{ 
                    textAlign: 'center',
                    marginBottom: '30px',
                    padding: '0 20px'
                }}>
                    <div style={{ 
                        marginBottom: '20px', 
                        color: '#666', 
                        fontSize: '16px',
                        fontWeight: '500'
                    }}>
                        📅 Publicado el {displayData.fecha}
                    </div>

                    <h1 style={{ 
                        marginBottom: '25px', 
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#2c3e50',
                        lineHeight: '1.4',
                        maxWidth: '700px',
                        margin: '0 auto 25px auto'
                    }}>
                        {displayData.titulo || 'Comunicado a la Opinión Pública'}
                    </h1>

                    {/* LÍNEA DECORATIVA */}
                    <div style={{
                        width: '100px',
                        height: '3px',
                        background: 'linear-gradient(to right, #ff7e00, #ffb366)',
                        margin: '0 auto 30px auto',
                        borderRadius: '2px'
                    }}></div>
                </div>

                {/* CONTENIDO PRINCIPAL */}
                <div style={{ 
                    backgroundColor: 'white',
                    padding: '30px',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef',
                    marginBottom: '25px'
                }}>
                    <div 
                        style={{ 
                            lineHeight: '1.6',
                            fontSize: '16px',
                            color: '#2c3e50'
                        }} 
                        dangerouslySetInnerHTML={{ __html: getDisplayContent(displayData.contenido, displayData.titulo, displayData.pdfUrl) }}
                    />
                </div>

                {/* FIRMA CENTRADA */}
                <div style={{ 
                    textAlign: 'center', 
                    marginTop: '30px',
                    marginBottom: '30px',
                    color: '#555', 
                    fontStyle: 'italic',
                    fontSize: '16px',
                    fontWeight: '500'
                }}>
                    La Gerencia<br/>
                    <span style={{ fontSize: '14px', color: '#777' }}>ELECTROHUILA S.A. E.S.P.</span>
                </div>

                {/* BOTONES MEJORADOS Y CENTRADOS */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginTop: '30px',
                    padding: '20px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <button 
                        style={{ 
                            background: 'linear-gradient(135deg, #007bff, #0056b3)',
                            border: 'none', 
                            color: 'white', 
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 4px rgba(0, 123, 255, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 123, 255, 0.3)';
                        }}
                        onClick={() => {
                            // Funcionalidad de compartir
                            if (navigator.share) {
                                navigator.share({
                                    title: displayData.titulo,
                                    text: `Comunicado de ElectroHuila: ${displayData.titulo}`,
                                    url: window.location.href
                                });
                            } else {
                                // Fallback: copiar al portapapeles
                                navigator.clipboard.writeText(window.location.href);
                                alert('Enlace copiado al portapapeles');
                            }
                        }}
                    >
                        🔗 Compartir
                    </button>

                    <button 
                        style={{ 
                            background: displayData.pdfUrl ? 'linear-gradient(135deg, #28a745, #1e7e34)' : '#6c757d',
                            border: 'none', 
                            color: 'white', 
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            cursor: displayData.pdfUrl ? 'pointer' : 'not-allowed',
                            transition: 'all 0.3s ease',
                            boxShadow: displayData.pdfUrl ? '0 2px 4px rgba(40, 167, 69, 0.3)' : 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            opacity: displayData.pdfUrl ? 1 : 0.6
                        }}
                        onMouseEnter={(e) => {
                            if (displayData.pdfUrl) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.4)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (displayData.pdfUrl) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 2px 4px rgba(40, 167, 69, 0.3)';
                            }
                        }}
                        onClick={() => {
                            if (displayData.pdfUrl) {
                                // Crear enlace de descarga
                                const link = document.createElement('a');
                                link.href = displayData.pdfUrl;
                                link.download = `${displayData.titulo}.pdf`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } else {
                                alert('No hay documento PDF disponible para este comunicado');
                            }
                        }}
                        disabled={!displayData.pdfUrl}
                    >
                        💾 {displayData.pdfUrl ? 'Descargar PDF' : 'PDF no disponible'}
                    </button>

                    <Link
                        href="/comunicados"
                        style={{ 
                            background: 'linear-gradient(135deg, #6c757d, #495057)',
                            color: 'white', 
                            textDecoration: 'none', 
                            fontSize: '14px',
                            fontWeight: '600',
                            padding: '12px 24px',
                            borderRadius: '6px',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 4px rgba(108, 117, 125, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(108, 117, 125, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(108, 117, 125, 0.3)';
                        }}
                    >
                        ← Volver a la lista
                    </Link>
                </div>
            </div>
        </div>
    );
}