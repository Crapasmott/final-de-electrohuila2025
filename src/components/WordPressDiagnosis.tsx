// components/WordPressDiagnosis.tsx
'use client';
import React, { useState } from 'react';

const WordPressDiagnosis: React.FC = () => {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const runDiagnosis = async () => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/diagnosis-wordpress');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        error: 'Error ejecutando diagnóstico',
        details: error instanceof Error ? error.message : 'Error desconocido'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'OK': return '✅';
      case 'FALLO': return '❌';
      case 'ERROR': return '🚫';
      case 'ADVERTENCIA': return '⚠️';
      default: return '❓';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK': return '#10b981';
      case 'FALLO': return '#ef4444';
      case 'ERROR': return '#dc2626';
      case 'ADVERTENCIA': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="wp-test-widget" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
      <h3 className="wp-test-widget-title">🔍 Diagnóstico WordPress + Elementor</h3>
      
      <button
        onClick={runDiagnosis}
        disabled={loading}
        className="wp-test-button"
      >
        {loading ? '🔄 Ejecutando diagnóstico...' : '🚀 Ejecutar Diagnóstico Completo'}
      </button>

      {result && (
        <div style={{ marginTop: '15px' }}>
          {result.error ? (
            <div className="wp-test-result wp-error">
              <div className="wp-test-error-title">❌ Error en diagnóstico</div>
              <div>{result.details}</div>
            </div>
          ) : (
            <div>
              {/* Resumen general */}
              <div className="wp-test-result wp-success" style={{ 
                backgroundColor: result.analysis.overall_status === 'WORKING' ? '#f0fdf4' : '#fef2f2',
                borderColor: result.analysis.overall_status === 'WORKING' ? '#bbf7d0' : '#fecaca'
              }}>
                <div style={{ 
                  color: result.analysis.overall_status === 'WORKING' ? '#15803d' : '#dc2626',
                  fontWeight: 'bold',
                  marginBottom: '10px'
                }}>
                  {result.analysis.overall_status === 'WORKING' ? '✅ Estado: FUNCIONANDO' : '❌ Estado: PROBLEMAS DETECTADOS'}
                </div>
                
                <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  <strong>WordPress:</strong> {result.analysis.wordpress_detected ? '✅ Detectado' : '❌ No detectado'}<br/>
                  <strong>Elementor:</strong> {result.analysis.elementor_detected ? '✅ Detectado' : '❌ No detectado'}<br/>
                  <strong>API REST:</strong> {result.analysis.api_accessible ? '✅ Accesible' : '❌ No accesible'}<br/>
                  <strong>Posts:</strong> {result.analysis.posts_accessible ? '✅ Accesibles' : '❌ No accesibles'}
                </div>
              </div>

              {/* Resultados detallados */}
              <div style={{ marginTop: '15px', maxHeight: '300px', overflowY: 'auto' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>
                  📋 Resultados Detallados:
                </div>
                
                {result.detailed_results.map((test: any, index: number) => (
                  <div key={index} style={{ 
                    marginBottom: '8px', 
                    padding: '8px', 
                    backgroundColor: '#f9fafb', 
                    borderRadius: '4px',
                    fontSize: '11px',
                    borderLeft: `3px solid ${getStatusColor(test.status)}`
                  }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      {getStatusIcon(test.status)} {test.test}
                    </div>
                    <div style={{ color: '#6b7280' }}>
                      {test.details}
                    </div>
                    {test.url && (
                      <div style={{ marginTop: '4px' }}>
                        <a href={test.url} target="_blank" rel="noopener noreferrer" style={{ 
                          color: '#3b82f6', 
                          textDecoration: 'none',
                          fontSize: '10px'
                        }}>
                          🔗 {test.url}
                        </a>
                      </div>
                    )}
                    {test.sample && (
                      <div style={{ marginTop: '4px', padding: '4px', backgroundColor: '#e0f2fe', borderRadius: '2px' }}>
                        <strong>Muestra:</strong> {test.sample.title} (ID: {test.sample.id})
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recomendaciones */}
              {result.analysis.recommendations.length > 0 && (
                <div className="wp-test-solutions" style={{ marginTop: '15px' }}>
                  <strong>💡 Recomendaciones:</strong><br/>
                  {result.analysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} style={{ margin: '4px 0', fontSize: '11px' }}>
                      • {rec}
                    </div>
                  ))}
                </div>
              )}

              {/* Próximos pasos */}
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#eff6ff', borderRadius: '4px' }}>
                <strong style={{ color: '#1e40af', fontSize: '12px' }}>🚀 Próximos pasos:</strong>
                {result.next_steps.map((step: string, index: number) => (
                  <div key={index} style={{ margin: '4px 0', fontSize: '11px', color: '#1e40af' }}>
                    {index + 1}. {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WordPressDiagnosis;