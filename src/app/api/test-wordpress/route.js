// api/test-wordpress/route.js
// CREAR ESTA API PARA PROBAR LA CONEXIÓN CON WORDPRESS

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Iniciando test de conexión con WordPress...');
    
    // URLs de tu WordPress
    const wpBaseUrl = 'https://electrohuila.com.co';
    const wpApiUrl = 'https://electrohuila.com.co/wp-json/wp/v2';
    
    const tests = [];
    
    // TEST 1: Conexión básica al sitio
    try {
      console.log('📡 Test 1: Conexión básica al sitio...');
      const siteResponse = await fetch(wpBaseUrl, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'ElectroHuila-NextJS/1.0'
        }
      });
      
      tests.push({
        test: 'Conexión al sitio',
        status: siteResponse.ok ? 'SUCCESS' : 'FAILED',
        statusCode: siteResponse.status,
        url: wpBaseUrl,
        details: siteResponse.ok ? 'Sitio accesible' : `Error ${siteResponse.status}`
      });
      
      console.log(`✅ Sitio: ${siteResponse.status} ${siteResponse.ok ? 'OK' : 'FAILED'}`);
    } catch (error) {
      tests.push({
        test: 'Conexión al sitio',
        status: 'ERROR',
        error: error.message,
        url: wpBaseUrl
      });
      console.log(`❌ Error sitio: ${error.message}`);
    }

    // TEST 2: API REST disponible
    try {
      console.log('📡 Test 2: API REST disponible...');
      const apiResponse = await fetch(`${wpApiUrl}/posts?per_page=1`, {
        headers: {
          'User-Agent': 'ElectroHuila-NextJS/1.0'
        }
      });
      
      const apiData = apiResponse.ok ? await apiResponse.json() : null;
      
      tests.push({
        test: 'API REST Posts',
        status: apiResponse.ok ? 'SUCCESS' : 'FAILED',
        statusCode: apiResponse.status,
        url: `${wpApiUrl}/posts`,
        details: apiResponse.ok ? `${apiData?.length || 0} posts encontrados` : `Error ${apiResponse.status}`,
        data: apiData ? apiData.slice(0, 1) : null
      });
      
      console.log(`✅ API Posts: ${apiResponse.status} ${apiResponse.ok ? 'OK' : 'FAILED'}`);
    } catch (error) {
      tests.push({
        test: 'API REST Posts',
        status: 'ERROR',
        error: error.message,
        url: `${wpApiUrl}/posts`
      });
      console.log(`❌ Error API Posts: ${error.message}`);
    }

    // TEST 3: Buscar Custom Post Types (tarifas)
    try {
      console.log('📡 Test 3: Custom Post Types...');
      const customResponse = await fetch(`${wpApiUrl}/tarifas?per_page=1`, {
        headers: {
          'User-Agent': 'ElectroHuila-NextJS/1.0'
        }
      });
      
      const customData = customResponse.ok ? await customResponse.json() : null;
      
      tests.push({
        test: 'Custom Post Type: tarifas',
        status: customResponse.ok ? 'SUCCESS' : 'NOT_FOUND',
        statusCode: customResponse.status,
        url: `${wpApiUrl}/tarifas`,
        details: customResponse.ok ? 
          `Custom post type encontrado: ${customData?.length || 0} tarifas` : 
          'Custom post type no encontrado o no público',
        data: customData ? customData.slice(0, 1) : null
      });
      
      console.log(`${customResponse.ok ? '✅' : '⚠️'} Custom Post tarifas: ${customResponse.status}`);
    } catch (error) {
      tests.push({
        test: 'Custom Post Type: tarifas',
        status: 'ERROR',
        error: error.message,
        url: `${wpApiUrl}/tarifas`
      });
      console.log(`❌ Error Custom Post: ${error.message}`);
    }

    // TEST 4: Páginas disponibles
    try {
      console.log('📡 Test 4: Páginas...');
      const pagesResponse = await fetch(`${wpApiUrl}/pages?per_page=5`, {
        headers: {
          'User-Agent': 'ElectroHuila-NextJS/1.0'
        }
      });
      
      const pagesData = pagesResponse.ok ? await pagesResponse.json() : null;
      
      tests.push({
        test: 'Páginas WordPress',
        status: pagesResponse.ok ? 'SUCCESS' : 'FAILED',
        statusCode: pagesResponse.status,
        url: `${wpApiUrl}/pages`,
        details: pagesResponse.ok ? `${pagesData?.length || 0} páginas encontradas` : `Error ${pagesResponse.status}`,
        data: pagesData ? pagesData.map(p => ({ title: p.title?.rendered, slug: p.slug })) : null
      });
      
      console.log(`✅ Páginas: ${pagesResponse.status} ${pagesResponse.ok ? 'OK' : 'FAILED'}`);
    } catch (error) {
      tests.push({
        test: 'Páginas WordPress',
        status: 'ERROR',
        error: error.message,
        url: `${wpApiUrl}/pages`
      });
      console.log(`❌ Error páginas: ${error.message}`);
    }

    // TEST 5: Medios/archivos
    try {
      console.log('📡 Test 5: Medios...');
      const mediaResponse = await fetch(`${wpApiUrl}/media?per_page=3`, {
        headers: {
          'User-Agent': 'ElectroHuila-NextJS/1.0'
        }
      });
      
      const mediaData = mediaResponse.ok ? await mediaResponse.json() : null;
      
      tests.push({
        test: 'Biblioteca de medios',
        status: mediaResponse.ok ? 'SUCCESS' : 'FAILED',
        statusCode: mediaResponse.status,
        url: `${wpApiUrl}/media`,
        details: mediaResponse.ok ? `${mediaData?.length || 0} archivos encontrados` : `Error ${mediaResponse.status}`,
        data: mediaData ? mediaData.map(m => ({ 
          title: m.title?.rendered, 
          type: m.mime_type,
          url: m.source_url 
        })) : null
      });
      
      console.log(`✅ Medios: ${mediaResponse.status} ${mediaResponse.ok ? 'OK' : 'FAILED'}`);
    } catch (error) {
      tests.push({
        test: 'Biblioteca de medios',
        status: 'ERROR',
        error: error.message,
        url: `${wpApiUrl}/media`
      });
      console.log(`❌ Error medios: ${error.message}`);
    }

    // Resumen del test
    const successful = tests.filter(t => t.status === 'SUCCESS').length;
    const failed = tests.filter(t => t.status === 'FAILED').length;
    const errors = tests.filter(t => t.status === 'ERROR').length;
    const notFound = tests.filter(t => t.status === 'NOT_FOUND').length;

    const summary = {
      total: tests.length,
      successful: successful,
      failed: failed,
      errors: errors,
      notFound: notFound,
      overallStatus: successful >= 3 ? 'GOOD' : successful >= 2 ? 'PARTIAL' : 'POOR'
    };

    console.log('📊 Resumen:', summary);

    return NextResponse.json({
      success: true,
      message: 'Test de conexión WordPress completado',
      wordpress: {
        baseUrl: wpBaseUrl,
        apiUrl: wpApiUrl,
        version: 'WordPress REST API v2'
      },
      summary: summary,
      tests: tests,
      timestamp: new Date().toISOString(),
      recommendations: getRecommendations(tests)
    });

  } catch (error) {
    console.error('❌ Error general en test:', error);
    return NextResponse.json({
      success: false,
      message: 'Error en test de conexión',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Función para generar recomendaciones
function getRecommendations(tests) {
  const recommendations = [];
  
  const siteTest = tests.find(t => t.test === 'Conexión al sitio');
  if (siteTest?.status !== 'SUCCESS') {
    recommendations.push({
      type: 'CRITICAL',
      message: 'El sitio WordPress no es accesible',
      action: 'Verificar que https://electrohuila.com.co esté funcionando'
    });
  }

  const apiTest = tests.find(t => t.test === 'API REST Posts');
  if (apiTest?.status !== 'SUCCESS') {
    recommendations.push({
      type: 'CRITICAL', 
      message: 'La API REST no está disponible',
      action: 'Verificar que la API REST esté habilitada en WordPress'
    });
  }

  const customTest = tests.find(t => t.test === 'Custom Post Type: tarifas');
  if (customTest?.status === 'NOT_FOUND') {
    recommendations.push({
      type: 'SUGGESTION',
      message: 'Custom Post Type "tarifas" no encontrado',
      action: 'Crear custom post type "tarifas" o usar posts normales con categorías'
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      type: 'SUCCESS',
      message: 'Conexión WordPress exitosa',
      action: 'Puedes proceder a integrar las APIs con datos reales'
    });
  }

  return recommendations;
}