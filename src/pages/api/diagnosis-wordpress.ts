// pages/api/diagnosis-wordpress.ts - VERSIÓN CORREGIDA
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
  const results = [];

  // Test 1: Conectividad básica
  try {
    const response = await fetch(WORDPRESS_URL);
    const isHtml = response.headers.get('content-type')?.includes('text/html');
    
    results.push({
      test: 'Conectividad básica',
      status: response.ok ? 'OK' : 'FALLO',
      details: `${response.status} ${response.statusText} - Tipo: ${isHtml ? 'HTML' : 'Otro'}`,
      url: WORDPRESS_URL,
      content_type: response.headers.get('content-type')
    });
  } catch (error) {
    results.push({
      test: 'Conectividad básica',
      status: 'FALLO',
      details: error instanceof Error ? error.message : 'Error de conexión',
      url: WORDPRESS_URL
    });
  }

  // Test 2: WordPress API base - con mejor manejo de errores
  try {
    const url = `${WORDPRESS_URL}/wp-json/`;
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';
    
    if (response.ok && contentType.includes('application/json')) {
      try {
        const data = await response.json();
        results.push({
          test: 'WordPress API base',
          status: 'OK',
          details: `WordPress: ${data.name || 'Detectado'} - Versión: ${data.wp_version || 'N/A'}`,
          url: url,
          wordpress_info: {
            name: data.name,
            version: data.wp_version,
            routes: Object.keys(data.routes || {}).length
          }
        });
      } catch (jsonError) {
        results.push({
          test: 'WordPress API base',
          status: 'FALLO',
          details: 'Respuesta no es JSON válido (posiblemente HTML)',
          url: url,
          content_type: contentType
        });
      }
    } else {
      // Intentar leer un poco del contenido para ver qué devuelve
      const text = await response.text();
      const preview = text.substring(0, 200) + (text.length > 200 ? '...' : '');
      
      results.push({
        test: 'WordPress API base',
        status: 'FALLO',
        details: `${response.status} ${response.statusText} - Devuelve HTML en lugar de JSON`,
        url: url,
        content_type: contentType,
        response_preview: preview
      });
    }
  } catch (error) {
    results.push({
      test: 'WordPress API base',
      status: 'ERROR',
      details: error instanceof Error ? error.message : 'Error de conexión',
      url: `${WORDPRESS_URL}/wp-json/`
    });
  }

  // Test 3: Posts endpoint - con mejor manejo
  try {
    const url = `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`;
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';
    
    if (response.ok && contentType.includes('application/json')) {
      try {
        const posts = await response.json();
        results.push({
          test: 'Posts endpoint',
          status: 'OK',
          details: `${Array.isArray(posts) ? posts.length : 0} posts encontrados`,
          url: url,
          total_posts: response.headers.get('X-WP-Total'),
          sample_post: Array.isArray(posts) && posts.length > 0 ? {
            id: posts[0].id,
            title: posts[0].title?.rendered || 'Sin título',
            date: posts[0].date
          } : null
        });
      } catch (jsonError) {
        results.push({
          test: 'Posts endpoint',
          status: 'FALLO',
          details: 'Endpoint existe pero devuelve HTML en lugar de JSON',
          url: url,
          content_type: contentType
        });
      }
    } else {
      results.push({
        test: 'Posts endpoint',
        status: 'FALLO',
        details: `${response.status} ${response.statusText} - No devuelve JSON`,
        url: url,
        content_type: contentType
      });
    }
  } catch (error) {
    results.push({
      test: 'Posts endpoint',
      status: 'ERROR',
      details: error instanceof Error ? error.message : 'Error de conexión',
      url: `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`
    });
  }

  // Test 4: Alternative posts endpoint (para permalinks diferentes)
  try {
    const url = `${WORDPRESS_URL}/?rest_route=/wp/v2/posts&per_page=1`;
    const response = await fetch(url);
    const contentType = response.headers.get('content-type') || '';
    
    if (response.ok && contentType.includes('application/json')) {
      try {
        const posts = await response.json();
        results.push({
          test: 'Posts endpoint (alternativo)',
          status: 'OK',
          details: `${Array.isArray(posts) ? posts.length : 0} posts encontrados (ruta alternativa)`,
          url: url
        });
      } catch (jsonError) {
        results.push({
          test: 'Posts endpoint (alternativo)',
          status: 'FALLO',
          details: 'Ruta alternativa devuelve HTML',
          url: url
        });
      }
    } else {
      results.push({
        test: 'Posts endpoint (alternativo)',
        status: 'FALLO',
        details: `${response.status} ${response.statusText}`,
        url: url
      });
    }
  } catch (error) {
    results.push({
      test: 'Posts endpoint (alternativo)',
      status: 'ERROR',
      details: error instanceof Error ? error.message : 'Error de conexión',
      url: `${WORDPRESS_URL}/?rest_route=/wp/v2/posts&per_page=1`
    });
  }

  // Análisis de resultados
  const hasWorkingAPI = results.some(r => r.status === 'OK' && r.test.includes('WordPress API'));
  const hasWorkingPosts = results.some(r => r.status === 'OK' && r.test.includes('Posts endpoint'));
  const hasBasicConnectivity = results.some(r => r.status === 'OK' && r.test === 'Conectividad básica');
  const hasHtmlResponses = results.some(r => r.details?.includes('HTML'));

  const analysis = {
    overall_status: hasWorkingPosts ? 'WORKING' : hasWorkingAPI ? 'PARTIAL' : hasBasicConnectivity ? 'CONNECTIVITY_ONLY' : 'FAILED',
    connectivity: hasBasicConnectivity,
    wordpress_api: hasWorkingAPI,
    posts_accessible: hasWorkingPosts,
    html_responses: hasHtmlResponses,
    recommendations: []
  };

  // Generar recomendaciones específicas
  if (!hasBasicConnectivity) {
    analysis.recommendations.push('No se puede conectar al sitio WordPress - verificar URL y conectividad');
  } else if (hasHtmlResponses || !hasWorkingAPI) {
    analysis.recommendations.push('⚠️ PROBLEMA: WordPress devuelve HTML en lugar de JSON');
    analysis.recommendations.push('🔧 SOLUCIÓN 1: Ir a WordPress Admin → Ajustes → Enlaces permanentes');
    analysis.recommendations.push('🔧 SOLUCIÓN 2: Seleccionar "Nombre de entrada" y GUARDAR');
    analysis.recommendations.push('🔧 SOLUCIÓN 3: Si no funciona, seleccionar "Estructura personalizada: /%postname%/"');
    analysis.recommendations.push('⚡ IMPORTANTE: Después de cambiar, hacer clic en "Guardar cambios"');
  } else if (!hasWorkingPosts) {
    analysis.recommendations.push('API REST funciona pero los posts no son accesibles');
    analysis.recommendations.push('Verificar que hay posts publicados');
    analysis.recommendations.push('Verificar permisos de lectura pública');
  }

  // Diagnóstico específico para el error JSON
  let specific_diagnosis = '';
  if (hasHtmlResponses) {
    specific_diagnosis = 'DIAGNÓSTICO: WordPress está funcionando pero la API REST no está configurada correctamente. Esto se soluciona configurando los enlaces permanentes.';
  } else if (hasWorkingPosts) {
    specific_diagnosis = 'DIAGNÓSTICO: Todo funciona correctamente. WordPress API está operativa.';
  } else {
    specific_diagnosis = 'DIAGNÓSTICO: Hay problemas de conectividad o configuración que requieren revisión.';
  }

  res.status(200).json({
    timestamp: new Date().toISOString(),
    wordpress_url: WORDPRESS_URL,
    analysis,
    detailed_results: results,
    specific_diagnosis,
    quick_fix: hasHtmlResponses ? 
      'URGENTE: Ir a WordPress Admin → Ajustes → Enlaces permanentes → Cambiar a "Nombre de entrada" → GUARDAR' : 
      hasBasicConnectivity && !hasWorkingAPI ? 
      'Verificar configuración de WordPress' :
      'Verificar conectividad con el servidor',
    test_urls: {
      manual_api: `${WORDPRESS_URL}/wp-json/`,
      manual_posts: `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`,
      wordpress_admin: `${WORDPRESS_URL}/wp-admin/`,
      permalinks_settings: `${WORDPRESS_URL}/wp-admin/options-permalink.php`
    }
  });
}