// utils/testWordPress.ts
// Archivo para probar la conexión con WordPress

export const testWordPressConnection = async () => {
  const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
  
  try {
    console.log('🔍 Probando conexión con WordPress...');
    console.log('URL:', WORDPRESS_URL);
    
    // Probar endpoint básico
    const response = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/posts?per_page=1`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log('✅ Conexión exitosa!');
    console.log('📊 Datos de prueba:', {
      postsFound: Array.isArray(data) ? data.length : 0,
      firstPost: data[0] ? {
        id: data[0].id,
        title: data[0].title?.rendered,
        date: data[0].date
      } : 'No hay posts'
    });
    
    return {
      success: true,
      data: data,
      message: 'Conexión exitosa con WordPress'
    };
    
  } catch (error) {
    console.error('❌ Error de conexión:', error);
    
    return {
      success: false,
      error: error,
      message: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Función para probar diferentes endpoints
export const testWordPressEndpoints = async () => {
  const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co';
  const endpoints = [
    '/wp-json/wp/v2/posts',
    '/wp-json/wp/v2/categories',
    '/wp-json/wp/v2/media',
    '/wp-json/wp/v2/pages'
  ];
  
  console.log('🔍 Probando múltiples endpoints...');
  
  const results = await Promise.allSettled(
    endpoints.map(async (endpoint) => {
      const response = await fetch(`${WORDPRESS_URL}${endpoint}?per_page=1`);
      if (!response.ok) {
        throw new Error(`${endpoint}: HTTP ${response.status}`);
      }
      const data = await response.json();
      return {
        endpoint,
        status: 'success',
        count: Array.isArray(data) ? data.length : 1
      };
    })
  );
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`✅ ${endpoints[index]}: OK`);
    } else {
      console.log(`❌ ${endpoints[index]}: ${result.reason}`);
    }
  });
  
  return results;
};

// Hook para usar en componentes
import { useState, useEffect } from 'react';

export const useWordPressTest = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const runTest = async () => {
    setIsLoading(true);
    const result = await testWordPressConnection();
    setTestResult(result);
    setIsLoading(false);
  };
  
  return {
    testResult,
    isLoading,
    runTest
  };
};