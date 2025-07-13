// /src/app/api/wpfd-proxy/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get('fileId');
    const categoryId = searchParams.get('categoryId');
    const fileName = searchParams.get('fileName');
    const year = searchParams.get('year');
    
    if (!fileId || !categoryId || !fileName) {
      return NextResponse.json({ error: 'Parámetros requeridos: fileId, categoryId, fileName' }, { status: 400 });
    }

    console.log('🔄 INTENTANDO MÚLTIPLES ESTRATEGIAS PARA:', fileName);
    
    // ESTRATEGIA 1: URL directa del plugin WP File Download
    const estrategias = [
      {
        nombre: 'URL de descarga directa con token',
        url: `https://www.electrohuila.com.co/descargar/${categoryId}/${year}/${fileId}/${fileName}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.electrohuila.com.co/tarifas/',
          'Accept': 'application/pdf,application/octet-stream,*/*',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
          'Accept-Encoding': 'identity', // No compresión para archivos
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin'
        }
      },
      {
        nombre: 'Plugin admin-ajax con token completo',
        url: `https://www.electrohuila.com.co/wp-admin/admin-ajax.php?juwpfisadmin=false&action=wpfd&task=file.download&wpfd_category_id=${categoryId}&wpfd_file_id=${fileId}&token=566277d11c0098461fecd1f9bfb4e7ba&preview=0`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Referer': 'https://www.electrohuila.com.co/tarifas/',
          'Accept': 'application/pdf,application/octet-stream,*/*',
          'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
          'X-Requested-With': 'XMLHttpRequest',
          'Origin': 'https://www.electrohuila.com.co',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin'
        }
      },
      {
        nombre: 'Acceso directo a carpeta uploads',
        url: `https://www.electrohuila.com.co/wp-content/uploads/${year}/09/${fileName}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.electrohuila.com.co/',
          'Accept': 'application/pdf,*/*',
          'Accept-Encoding': 'identity'
        }
      },
      {
        nombre: 'Plugin con parámetros simplificados',
        url: `https://www.electrohuila.com.co/wp-admin/admin-ajax.php?action=wpfd&task=file.download&wpfd_file_id=${fileId}`,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Referer': 'https://www.electrohuila.com.co/tarifas/',
          'Accept': 'application/pdf,application/octet-stream,*/*',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
    ];

    let exitoEncontrado = false;
    let response = null;

    // Probar cada estrategia
    for (let i = 0; i < estrategias.length; i++) {
      const estrategia = estrategias[i];
      console.log(`📥 Probando estrategia ${i + 1}: ${estrategia.nombre}`);
      console.log(`🔗 URL: ${estrategia.url}`);

      try {
        response = await fetch(estrategia.url, {
          method: 'GET',
          headers: estrategia.headers,
          redirect: 'follow'
        });

        console.log(`📊 Respuesta ${i + 1}: Status ${response.status}, Type: ${response.headers.get('content-type')}, Size: ${response.headers.get('content-length')}`);

        // Verificar si es realmente un PDF válido
        const contentType = response.headers.get('content-type') || '';
        const contentLength = parseInt(response.headers.get('content-length') || '0');
        
        // Leer los primeros bytes para verificar si es PDF
        const clone = response.clone();
        const buffer = await clone.arrayBuffer();
        const firstBytes = new Uint8Array(buffer.slice(0, 10));
        const isValidPDF = firstBytes[0] === 0x25 && firstBytes[1] === 0x50 && firstBytes[2] === 0x44 && firstBytes[3] === 0x46; // %PDF
        
        console.log(`🔍 Análisis ${i + 1}: PDF válido: ${isValidPDF}, Tamaño: ${buffer.byteLength} bytes`);
        
        if (response.ok && isValidPDF && buffer.byteLength > 1000) {
          console.log(`✅ ÉXITO REAL con estrategia ${i + 1}: ${estrategia.nombre}`);
          exitoEncontrado = true;
          break;
        }

        if (response.ok && contentType.includes('application/pdf') && contentLength > 1000) {
          console.log(`✅ ÉXITO por content-type con estrategia ${i + 1}: ${estrategia.nombre}`);
          exitoEncontrado = true;
          break;
        }

        // Si el archivo es grande aunque no detectemos PDF, intentarlo
        if (response.ok && buffer.byteLength > 10000) {
          console.log(`✅ ÉXITO por tamaño con estrategia ${i + 1}: ${estrategia.nombre}`);
          exitoEncontrado = true;
          break;
        }

        console.log(`❌ Estrategia ${i + 1} no válida: PDF=${isValidPDF}, Tamaño=${buffer.byteLength}`);

      } catch (error) {
        console.log(`❌ Error en estrategia ${i + 1}:`, error.message);
        continue;
      }
    }

    if (!exitoEncontrado || !response || !response.ok) {
      console.log('❌ TODAS LAS ESTRATEGIAS FALLARON');
      
      // Devolver página informativa
      const errorHtml = `
        <html>
          <head>
            <title>Información del Archivo</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 40px; background: #f5f5f5; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
              .header { text-align: center; margin-bottom: 30px; }
              .info { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
              .button { display: inline-block; background: #2196F3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 5px; }
              .button:hover { background: #1976D2; }
              .attempts { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📄 ${fileName}</h1>
                <p>Información del archivo solicitado</p>
              </div>
              
              <div class="info">
                <h3>📊 Detalles del archivo:</h3>
                <p><strong>Nombre:</strong> ${fileName}</p>
                <p><strong>ID:</strong> ${fileId}</p>
                <p><strong>Categoría:</strong> ${categoryId}</p>
                <p><strong>Año:</strong> ${year}</p>
              </div>

              <div style="text-align: center; margin: 30px 0;">
                <h3>🔗 Opciones de acceso:</h3>
                <a href="https://www.electrohuila.com.co/tarifas/" class="button" target="_blank">
                  📂 Ir a Tarifas Oficiales
                </a>
                <a href="https://www.electrohuila.com.co/descargar/${categoryId}/${year}/${fileId}/${fileName}" class="button" target="_blank">
                  📥 Intentar Descarga Directa
                </a>
              </div>

              <div class="attempts">
                <h4>🔍 Intentos realizados:</h4>
                ${estrategias.map((e, i) => `<p><strong>${i + 1}.</strong> ${e.nombre}</p>`).join('')}
              </div>
            </div>
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

    // Si llegamos aquí, tenemos éxito
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log('✅ ARCHIVO OBTENIDO EXITOSAMENTE:', buffer.length, 'bytes');

    const contentType = response.headers.get('content-type') || 'application/pdf';
    const isDownload = searchParams.get('download') === 'true';

    const responseHeaders = {
      'Content-Type': contentType,
      'Content-Length': buffer.length.toString(),
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*',
    };

    if (isDownload) {
      responseHeaders['Content-Disposition'] = `attachment; filename="${fileName}"`;
    }

    return new NextResponse(buffer, {
      status: 200,
      headers: responseHeaders,
    });

  } catch (error) {
    console.error('❌ ERROR GENERAL:', error);
    return NextResponse.json({ 
      error: 'Error interno del servidor',
      details: error.message 
    }, { status: 500 });
  }
}