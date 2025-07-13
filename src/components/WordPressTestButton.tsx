// components/WordPressTestButton.tsx
// Componente temporal para probar la conexión

import React, { useState } from 'react';

const WordPressTestButton: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult(null);

    try {
      console.log('🔍 Iniciando prueba de conexión...');
      
      const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
      const testUrl = `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=3`;
      
      console.log('📡 URL de prueba:', testUrl);
      
      const response = await fetch(testUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setTestResult({
        success: true,
        url: testUrl,
        status: response.status,
        postsFound: Array.isArray(data) ? data.length : 0,
        firstPost: data[0] ? {
          id: data[0].id,
          title: data[0].title?.rendered || 'Sin título',
          date: new Date(data[0].date).toLocaleDateString('es-ES'),
          excerpt: data[0].excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
        } : null,
        headers: {
          total: response.headers.get('X-WP-Total'),
          totalPages: response.headers.get('X-WP-TotalPages')
        }
      });
      
      console.log('✅ Conexión exitosa!', data);
      
    } catch (error) {
      console.error('❌ Error de conexión:', error);
      
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
        url: `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co'}/wp-json/wp/v2/posts?per_page=3`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      left: '20px', 
      zIndex: 9999,
      background: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      border: '1px solid #e5e7eb',
      maxWidth: '400px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#1f2937', fontSize: '16px' }}>
        🔗 Test WordPress API
      </h3>
      
      <button
        onClick={testConnection}
        disabled={isLoading}
        style={{
          background: isLoading ? '#9ca3af' : '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          width: '100%',
          marginBottom: '15px'
        }}
      >
        {isLoading ? '🔄 Probando...' : '🚀 Probar Conexión'}
      </button>

      {testResult && (
        <div style={{
          background: testResult.success ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${testResult.success ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px'
        }}>
          {testResult.success ? (
            <div>
              <div style={{ color: '#15803d', fontWeight: 'bold', marginBottom: '8px' }}>
                ✅ Conexión Exitosa
              </div>
              <div style={{ color: '#374151', lineHeight: '1.4' }}>
                <strong>URL:</strong> {testResult.url}<br/>
                <strong>Status:</strong> {testResult.status}<br/>
                <strong>Posts encontrados:</strong> {testResult.postsFound}<br/>
                <strong>Total en WP:</strong> {testResult.headers.total || 'N/A'}<br/>
                
                {testResult.firstPost && (
                  <div style={{ marginTop: '8px', padding: '8px', background: 'white', borderRadius: '4px' }}>
                    <strong>Primer post:</strong><br/>
                    <strong>Título:</strong> {testResult.firstPost.title}<br/>
                    <strong>Fecha:</strong> {testResult.firstPost.date}<br/>
                    <strong>Extracto:</strong> {testResult.firstPost.excerpt}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div style={{ color: '#dc2626', fontWeight: 'bold', marginBottom: '8px' }}>
                ❌ Error de Conexión
              </div>
              <div style={{ color: '#374151', lineHeight: '1.4' }}>
                <strong>URL intentada:</strong> {testResult.url}<br/>
                <strong>Error:</strong> {testResult.error}
                
                <div style={{ marginTop: '8px', padding: '8px', background: '#fef3c7', borderRadius: '4px', fontSize: '12px' }}>
                  <strong>💡 Posibles soluciones:</strong><br/>
                  • Verificar que WordPress esté activo<br/>
                  • Comprobar que la API REST esté habilitada<br/>
                  • Revisar CORS si es necesario<br/>
                  • Verificar la URL en .env.local
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {!testResult && (
        <div style={{ color: '#6b7280', fontSize: '12px', lineHeight: '1.4' }}>
          Haz clic en "Probar Conexión" para verificar si podemos obtener datos de WordPress.
          <br/><br/>
          <strong>URL configurada:</strong><br/>
          {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co'}
        </div>
      )}
    </div>
  );
};

export default WordPressTestButton;