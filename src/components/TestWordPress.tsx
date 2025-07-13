// components/TestWordPress.tsx
'use client';
import React, { useState } from 'react';

const TestWordPress: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test-wordpress');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        error: 'Error de conexión'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wp-test-widget">
      <h3 className="wp-test-widget-title">🔗 Test WordPress</h3>
      
      <button
        onClick={testConnection}
        disabled={loading}
        className="wp-test-button"
      >
        {loading ? '🔄 Probando...' : '🚀 Probar Conexión'}
      </button>

      {result && (
        <div className={`wp-test-result ${result.success ? 'wp-success' : 'wp-error'}`}>
          {result.success ? (
            <div>
              <div className="wp-test-success-title">✅ ¡Conexión exitosa!</div>
              <div>Posts encontrados: {result.postsCount}</div>
              {result.firstPost && (
                <div className="wp-test-post-preview">
                  <strong>{result.firstPost.title}</strong><br/>
                  <small>{result.firstPost.date}</small>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="wp-test-error-title">❌ Error</div>
              <div>{result.error}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TestWordPress;