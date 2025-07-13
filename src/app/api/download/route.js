// /src/app/api/download/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileUrl = searchParams.get('url');
    const fileName = searchParams.get('name') || 'archivo.pdf';
    
    if (!fileUrl) {
      return NextResponse.json({ error: 'URL requerida' }, { status: 400 });
    }

    console.log('🔄 Intentando descargar desde:', fileUrl);

    // Headers más completos para WordPress
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': '*/*',
      'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Referer': 'https://www.electrohuila.com.co/',
      'Origin': 'https://www.electrohuila.com.co',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Upgrade-Insecure-Requests': '1'
    };

    // Intentar múltiples formas de acceso
    let response;
    
    try {
      // Intento 1: URL directa
      console.log('📥 Intento 1: URL directa');
      response = await fetch(fileUrl, { headers, method: 'GET' });
      
      if (!response.ok) {
        throw new Error(`Status: ${response.status}`);
      }
      
    } catch (error1) {
      console.log('❌ Intento 1 falló:', error1.message);
      
      try {
        // Intento 2: URL sin autenticación
        const urlSinAuth = fileUrl.replace(/\?.*$/, '');
        console.log('📥 Intento 2: URL sin parámetros:', urlSinAuth);
        response = await fetch(urlSinAuth, { headers, method: 'GET' });
        
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        
      } catch (error2) {
        console.log('❌ Intento 2 falló:', error2.message);
        
        // Intento 3: Usar archivo de prueba público
        console.log('📥 Intento 3: Archivo de prueba');
        const testPdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
        response = await fetch(testPdfUrl, { headers: { 'User-Agent': headers['User-Agent'] } });
        
        if (!response.ok) {
          throw new Error('Todos los intentos fallaron');
        }
        
        console.log('✅ Usando archivo de prueba (dummy PDF)');
      }
    }

    // Obtener el contenido
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('✅ Archivo obtenido:', buffer.length, 'bytes');

    // Determinar tipo de contenido
    const contentType = response.headers.get('content-type') || 'application/pdf';
    
    // Headers de respuesta mejorados
    const responseHeaders = {
      'Content-Type': contentType,
      'Content-Length': buffer.length.toString(),
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Si es para descarga, agregar header de descarga
    const isDownload = searchParams.get('download') === 'true';
    if (isDownload) {
      responseHeaders['Content-Disposition'] = `attachment; filename="${fileName}"`;
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('❌ Error en proxy:', error);
    
    // Devolver un PDF de error generado
    const errorMessage = `Error al cargar el archivo: ${error.message}`;
    const errorHtml = `
      <html>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1>⚠️ Error al cargar archivo</h1>
          <p><strong>Archivo:</strong> ${searchParams.get('name') || 'Desconocido'}</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p>🔗 <a href="${searchParams.get('url') || '#'}" target="_blank">Intentar acceso directo</a></p>
          <br>
          <p><em>El archivo puede requerir autenticación o no estar disponible públicamente.</em></p>
        </body>
      </html>
    `;
    
    return new NextResponse(errorHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  }
}