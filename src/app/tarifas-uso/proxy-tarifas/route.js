// /src/app/api/proxy-tarifas/route.js
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const type = searchParams.get('type');
    const month = searchParams.get('month');
    
    // Construir URL de WordPress
    let wordpressUrl = 'https://electrohuila.com.co/wp-json/electrohuila/v1/tarifas';
    const params = new URLSearchParams();
    
    if (year) params.append('year', year);
    if (type) params.append('type', type);
    if (month) params.append('month', month);
    
    if (params.toString()) {
      wordpressUrl += '?' + params.toString();
    }
    
    console.log('🔄 Proxy request to:', wordpressUrl);
    
    // Hacer petición a WordPress
    const response = await fetch(wordpressUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextJS-ElectroHuila/1.0'
      },
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ Proxy response successful');
    
    // Retornar datos con headers CORS
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Error al obtener datos de WordPress',
        details: error.message 
      },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      }
    );
  }
}

export async function OPTIONS(request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}