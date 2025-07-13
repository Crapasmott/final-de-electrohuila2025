// components/SimpleDiagnosis.tsx - MEJORADO
'use client';
import React, { useState } from 'react';

const SimpleDiagnosis: React.FC = () => {
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
        error: true,
        message: 'Error ejecutando diagnóstico',
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
      default: return '❓';
    }
  };

  const getOverallStatusIcon = (status: string) => {
    switch (status) {
      case 'WORKING': return '✅';
      case 'PARTIAL': return '⚠️';
      case 'CONNECTIVITY_ONLY': return '🔶';
      case 'FAILED': return '❌';
      default: return '❓';
    }
  };

  const getOverallStatusText = (status: string) => {
    switch (status) {
      case 'WORKING': return 'WordPress API FUNCIONANDO';
      case 'PARTIAL': return 'API Base OK, Posts con problemas';
      case 'CONNECTIVITY_ONLY': return 'Solo conectividad básica';
      case 'FAILED': return 'Sin conectividad';
      default: return 'Estado desconocido';
    }
  };

  return (
    <div className="wp-test-widget" style={{ maxWidth: '550px' }}>
      <h3 className="wp-test-widget-title">🔍 Diagnóstico WordPress</h3>
      
      <button
        onClick={runDiagnosis}
        disabled={loading}
        className="wp-test-button"
      >
        {loading ? '🔄 Diagnosticando...' : '🚀 Ejecutar Diagnóstico'}
      </button>

      {result && (
        <div style={{ marginTop: '15px' }}>
          {result.error ? (
            <div className="wp-test-result wp-error">
              <div className="wp-test-error-title">❌ Error</div>
              <div>{result.message}</div>
              <div style={{ fontSize: '11px', marginTop: '5px' }}>{result.details}</div>
            </div>
          ) : (
            <div>
              {/* Estado general */}
              <div className="wp-test-result wp-success" style={{ 
                backgroundColor: result.analysis.overall_status === 'WORKING' ? '#f0fdf4' : '#fef2f2',
                borderColor: result.analysis.overall_status === 'WORKING' ? '#bbf7d0' : '#fecaca'
              }}>
                <div style={{ 
                  color: result.analysis.overall_status === 'WORKING' ? '#15803d' : '#dc2626',
                  fontWeight: 'bold',
                  marginBottom: '8px'
                }}>
                  {getOverallStatusIcon(result.analysis.overall_status)} {getOverallStatusText(result.analysis.overall_status)}
                </div>
                
                <div style={{ fontSize: '12px' }}>
                  🌐 Conectividad: {result.analysis.connectivity ? '✅' : '❌'}<br/>
                  🔧 API WordPress: {result.analysis.wordpress_api ? '✅' : '❌'}<br/>
                  📄 Posts accesibles: {result.analysis.posts_accessible ? '✅' : '❌'}<br/>
                  {result.analysis.html_responses && <span style={{ color: '#dc2626' }}>⚠️ Devuelve HTML en lugar de JSON</span>}
                </div>
              </div>

              {/* Diagnóstico específico */}
              {result.specific_diagnosis && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  backgroundColor: '#e0f2fe', 
                  borderRadius: '6px',
                  border: '1px solid #0284c7'
                }}>
                  <strong style={{ color: '#0284c7' }}>🔍 Diagnóstico:</strong>
                  <div style={{ fontSize: '12px', color: '#0284c7', marginTop: '4px' }}>
                    {result.specific_diagnosis}
                  </div>
                </div>
              )}

              {/* Solución rápida */}
              {result.quick_fix && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  backgroundColor: '#fef3c7', 
                  borderRadius: '6px',
                  border: '1px solid #fcd34d'
                }}>
                  <strong style={{ color: '#92400e' }}>⚡ Solución rápida:</strong>
                  <div style={{ fontSize: '12px', color: '#92400e', marginTop: '4px' }}>
                    {result.quick_fix}
                  </div>
                </div>
              )}

              {/* Tests individuales */}
              <div style={{ marginTop: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>
                  📋 Tests realizados:
                </div>
                {result.detailed_results.map((test: any, index: number) => (
                  <div key={index} style={{ 
                    fontSize: '11px', 
                    marginBottom: '6px',
                    padding: '6px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '4px'
                  }}>
                    <span style={{ fontWeight: 'bold' }}>
                      {getStatusIcon(test.status)} {test.test}
                    </span>
                    <div style={{ color: '#6b7280', marginTop: '2px' }}>
                      {test.details}
                    </div>
                    {test.content_type && (
                      <div style={{ 
                        fontSize: '10px', 
                        color: test.content_type.includes('json') ? '#059669' : '#dc2626',
                        marginTop: '2px'
                      }}>
                        Tipo: {test.content_type}
                      </div>
                    )}
                    {test.sample_post && (
                      <div style={{ 
                        marginTop: '4px', 
                        fontSize: '10px', 
                        color: '#059669',
                        backgroundColor: '#ecfdf5',
                        padding: '4px',
                        borderRadius: '2px'
                      }}>
                        📰 Post: "{test.sample_post.title}" (ID: {test.sample_post.id})
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Recomendaciones */}
              {result.analysis.recommendations.length > 0 && (
                <div style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  backgroundColor: '#eff6ff', 
                  borderRadius: '6px',
                  border: '1px solid #bfdbfe'
                }}>
                  <strong style={{ color: '#1e40af', fontSize: '12px' }}>💡 Pasos para solucionar:</strong>
                  {result.analysis.recommendations.map((rec: string, index: number) => (
                    <div key={index} style={{ 
                      fontSize: '11px', 
                      color: '#1e40af', 
                      marginTop: '4px',
                      paddingLeft: '8px' 
                    }}>
                      {rec}
                    </div>
                  ))}
                </div>
              )}

              {/* Enlaces útiles */}
              <div style={{ marginTop: '10px', fontSize: '10px', color: '#6b7280' }}>
                <strong>🔗 Enlaces útiles:</strong><br/>
                <a href={result.test_urls.wordpress_admin} target="_blank" rel="noopener noreferrer">
                  WP Admin
                </a> | 
                <a href={result.test_urls.permalinks_settings} target="_blank" rel="noopener noreferrer">
                  Enlaces Permanentes
                </a> | 
                <a href={result.test_urls.manual_api} target="_blank" rel="noopener noreferrer">
                  Test API
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleDiagnosis;