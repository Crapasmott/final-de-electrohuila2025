// ARCHIVO: app/comunicados/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Comunicados() {
  const router = useRouter();
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener datos de WordPress
  const fetchComunicados = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://www.electrohuila.com.co/wp-json/wp/v2/posts?categories=53&per_page=20&status=publish'
      );
      
      if (!response.ok) {
        throw new Error('Error al cargar comunicados');
      }
      
      const posts = await response.json();
      
      // Procesar los datos manteniendo la estructura original
      const processedData = posts.map(post => ({
        id: post.id,
        titulo: post.title.rendered,
        fecha: new Date(post.date).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }),
        type: post.title.rendered.toUpperCase().includes('BOLETÍN') || 
              post.title.rendered.toUpperCase().includes('BOLETIN') ? 'boletin' : 'comunicado'
      }));
      
      setComunicados(processedData);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchComunicados();
  }, []);

  // Datos de respaldo en caso de error (manteniendo el formato original)
  const fallbackData = [
    { id: 1, titulo: "Comunicado de Prensa Noviembre 24 de 2024", fecha: "24/11/2024", type: 'comunicado' },
    { id: 2, titulo: "Circular No. 044 de 2024", fecha: "15/11/2024", type: 'comunicado' },
    { id: 3, titulo: "Comunicado de Prensa 03 de Mayo de 2024", fecha: "03/05/2024", type: 'comunicado' },
    { id: 4, titulo: "Comunicado de Prensa Abril 8 de 2024", fecha: "08/04/2024", type: 'comunicado' },
    { id: 5, titulo: "Comunicado de Prensa Mantenimiento", fecha: "15/03/2024", type: 'comunicado' },
    { id: 6, titulo: "Corte de Emergencia del Servicio", fecha: "27/02/2024", type: 'comunicado' },
  ];

  // Usar datos de WordPress o fallback
  const displayData = comunicados.length > 0 ? comunicados : fallbackData;

  // Función para navegar internamente
  const handleComunicadoClick = (id) => {
    router.push(`/comunicados/${id}`);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Comunicados</h1>
      
      {/* Estado de carga */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{
            display: 'inline-block',
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #0086d6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p style={{ marginTop: '20px', color: '#666' }}>Cargando comunicados...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#856404', margin: 0 }}>
            ⚠️ Error al cargar datos: {error}. Mostrando información de ejemplo.
          </p>
        </div>
      )}

      {/* Indicador discreto de datos reales */}
      {comunicados.length > 0 && !loading && (
        <div style={{
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '10px',
          marginBottom: '20px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          <p style={{ color: '#155724', margin: 0 }}>
            ✅ Mostrando {comunicados.length} comunicados desde WordPress
          </p>
        </div>
      )}
      
      {/* Grid de comunicados - DISEÑO ORIGINAL MANTENIDO */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {displayData.map(comunicado => (
          <div 
            key={comunicado.id} 
            style={{ 
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden',
              backgroundColor: 'white',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => handleComunicadoClick(comunicado.id)}
          >
            {/* Header azul - MANTENIDO IGUAL */}
            <div style={{ backgroundColor: '#0086d6', color: 'white', padding: '10px 15px' }}>
              {comunicado.type === 'boletin' ? 'Boletín' : 'Comunicado'}
            </div>
            
            {/* Área de imagen - MANTENIDA IGUAL */}
            <div style={{ 
              height: '150px', 
              backgroundColor: '#eee',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px'
            }}>
              {/* Icono basado en el tipo */}
              {comunicado.type === 'boletin' ? '📢' : '📋'}
            </div>
            
            {/* Contenido - MANTENIDO IGUAL */}
            <div style={{ padding: '15px' }}>
              <h3 style={{ 
                fontSize: '16px', 
                marginBottom: '8px',
                lineHeight: '1.4',
                height: '45px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {comunicado.titulo}
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
                {comunicado.fecha}
              </p>
              
              {/* Link - SOLO navegación interna */}
              <span 
                style={{ color: '#0086d6', fontSize: '14px' }}
                onClick={(e) => {
                  e.stopPropagation(); // Evitar doble click
                }}
              >
                Leer más →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CSS para animación de loading */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}