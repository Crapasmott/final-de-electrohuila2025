// pages/api/test-wordpress.ts - VERSIÓN CORREGIDA
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Agregar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
    
    console.log('🔍 Probando conexión con WordPress...');
    console.log('URL:', WORDPRESS_URL);

    // Configurar fetch con headers apropiados
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'NextJS-App/1.0',
        'Cache-Control': 'no-cache'
      },
      // Importante: no incluir credentials para requests cross-origin
    };

    // Prueba 1: API base
    console.log('📡 Paso 1: Verificando API base...');
    const baseUrl = `${WORDPRESS_URL}/wp-json/`;
    const baseResponse = await fetch(baseUrl, fetchOptions);
    
    if (!baseResponse.ok) {
      throw new Error(`API base falló: ${baseResponse.status} ${baseResponse.statusText}`);
    }

    const baseData = await baseResponse.json();
    console.log('✅ API base OK:', baseData.name);

    // Prueba 2: Posts
    console.log('📡 Paso 2: Obteniendo posts...');
    const postsUrl = `${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=3&_embed`;
    const postsResponse = await fetch(postsUrl, fetchOptions);
    
    if (!postsResponse.ok) {
      throw new Error(`Posts API falló: ${postsResponse.status} ${postsResponse.statusText}`);
    }

    const posts = await postsResponse.json();
    console.log('✅ Posts obtenidos:', posts.length);

    // Preparar respuesta exitosa
    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      wordpress: {
        name: baseData.name || 'WordPress',
        url: baseData.home || WORDPRESS_URL,
        version: baseData.wp_version || 'Desconocida',
        apiVersion: baseData.api_version || 'Desconocida'
      },
      posts: {
        count: posts.length,
        total: postsResponse.headers.get('X-WP-Total') || 'N/A',
        totalPages: postsResponse.headers.get('X-WP-TotalPages') || 'N/A'
      },
      firstPost: posts.length > 0 ? {
        id: posts[0].id,
        title: posts[0].title?.rendered || 'Sin título',
        date: posts[0].date,
        dateFormatted: new Date(posts[0].date).toLocaleDateString('es-ES'),
        excerpt: posts[0].excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
        featuredImage: posts[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        link: posts[0].link
      } : null,
      urls: {
        base: baseUrl,
        posts: postsUrl,
        wordpress: WORDPRESS_URL
      }
    };

    console.log('✅ Prueba exitosa completa');
    res.status(200).json(result);

  } catch (error) {
    console.error('❌ Error en test:', error);
    
    const errorResult = {
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: {
        type: error instanceof TypeError ? 'Network Error' : 'API Error',
        wordpress_url: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co'
      },
      suggestions: [
        'WordPress está funcionando (probado manualmente)',
        'El problema puede ser CORS desde el navegador',
        'Verificar configuración de red/firewall',
        'Probar desde server-side (API routes) funcionará mejor'
      ],
      urls: {
        test_manual_base: `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co'}/wp-json/`,
        test_manual_posts: `${process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co'}/wp-json/wp/v2/posts?per_page=1`
      }
    };
    
    res.status(500).json(errorResult);
  }
}