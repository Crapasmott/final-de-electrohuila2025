// api/tarifas/buscar-años/route.js
// BUSCAR TODOS LOS AÑOS DE TARIFAS REALES (2008-2025)

import { NextResponse } from 'next/server';

const WP_BASE_URL = 'https://electrohuila.com.co';
const WP_API_URL = 'https://electrohuila.com.co/wp-json/wp/v2';

export async function GET() {
  try {
    console.log('🔍 Buscando TODOS los años de tarifas en WordPress (2008-2025)...');
    
    const añosEncontrados = new Set();
    const tarifasPorAño = {};
    const archivosEncontrados = [];

    // BÚSQUEDA EXHAUSTIVA: Obtener TODOS los archivos PDF
    let page = 1;
    let hayMasArchivos = true;
    
    while (hayMasArchivos && page <= 10) { // Máximo 10 páginas para evitar bucle infinito
      console.log(`📡 Buscando página ${page} de archivos...`);
      
      try {
        const response = await fetch(
          `${WP_API_URL}/media?per_page=100&page=${page}&mime_type=application/pdf`,
          {
            headers: {
              'User-Agent': 'ElectroHuila-NextJS/1.0'
            }
          }
        );

        if (!response.ok) {
          if (response.status === 400) {
            console.log('📄 No hay más páginas de archivos');
            hayMasArchivos = false;
            break;
          }
          throw new Error(`HTTP ${response.status}`);
        }

        const archivos = await response.json();
        console.log(`📄 Encontrados ${archivos.length} archivos en página ${page}`);

        if (archivos.length === 0) {
          hayMasArchivos = false;
          break;
        }

        // Analizar cada archivo
        archivos.forEach(archivo => {
          const info = analizarArchivo(archivo);
          if (info && info.año >= 2008 && info.año <= 2025) {
            añosEncontrados.add(info.año);
            archivosEncontrados.push(info);
            
            if (!tarifasPorAño[info.año]) {
              tarifasPorAño[info.año] = {};
            }
            if (!tarifasPorAño[info.año][info.mes]) {
              tarifasPorAño[info.año][info.mes] = [];
            }
            tarifasPorAño[info.año][info.mes].push(info);
          }
        });

        page++;
        
      } catch (error) {
        console.error(`❌ Error en página ${page}:`, error.message);
        hayMasArchivos = false;
      }
    }

    // BÚSQUEDA ADICIONAL: Posts con tarifas
    console.log('📡 Buscando en posts...');
    try {
      const postsResponse = await fetch(
        `${WP_API_URL}/posts?per_page=100&search=tarifa OR esf OR estados OR financiero`,
        {
          headers: {
            'User-Agent': 'ElectroHuila-NextJS/1.0'
          }
        }
      );

      if (postsResponse.ok) {
        const posts = await postsResponse.json();
        console.log(`📝 Analizando ${posts.length} posts...`);
        
        posts.forEach(post => {
          const tarifasDelPost = extraerTarifasDePost(post);
          tarifasDelPost.forEach(tarifa => {
            if (tarifa.año >= 2008 && tarifa.año <= 2025) {
              añosEncontrados.add(tarifa.año);
              archivosEncontrados.push(tarifa);
              
              if (!tarifasPorAño[tarifa.año]) {
                tarifasPorAño[tarifa.año] = {};
              }
              if (!tarifasPorAño[tarifa.año][tarifa.mes]) {
                tarifasPorAño[tarifa.año][tarifa.mes] = [];
              }
              tarifasPorAño[tarifa.año][tarifa.mes].push(tarifa);
            }
          });
        });
      }
    } catch (error) {
      console.error('❌ Error buscando posts:', error);
    }

    // ORGANIZAR RESULTADOS
    const añosOrdenados = Array.from(añosEncontrados).sort((a, b) => b - a);
    
    console.log('✅ Búsqueda completada:', {
      añosEncontrados: añosOrdenados.length,
      archivosTotal: archivosEncontrados.length,
      años: añosOrdenados
    });

    // ESTADÍSTICAS DETALLADAS
    const estadisticasDetalladas = {
      rangoCompleto: {
        desde: Math.min(...añosEncontrados),
        hasta: Math.max(...añosEncontrados),
        total: añosEncontrados.size
      },
      porAño: {},
      resumenMeses: {}
    };

    añosOrdenados.forEach(año => {
      const mesesDelAño = Object.keys(tarifasPorAño[año] || {});
      estadisticasDetalladas.porAño[año] = {
        meses: mesesDelAño.length,
        archivos: Object.values(tarifasPorAño[año] || {}).flat().length,
        mesesDisponibles: mesesDelAño
      };
    });

    // Analizar completitud por mes
    const todosMeses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                       'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    todosMeses.forEach(mes => {
      const añosConEsteMes = añosOrdenados.filter(año => 
        tarifasPorAño[año] && tarifasPorAño[año][mes]
      );
      estadisticasDetalladas.resumenMeses[mes] = {
        años: añosConEsteMes.length,
        porcentaje: Math.round((añosConEsteMes.length / añosOrdenados.length) * 100)
      };
    });

    return NextResponse.json({
      success: true,
      message: `Encontrados ${añosOrdenados.length} años de tarifas (${Math.min(...añosEncontrados)}-${Math.max(...añosEncontrados)})`,
      años: {
        encontrados: añosOrdenados,
        total: añosOrdenados.length,
        rango: `${Math.min(...añosEncontrados)}-${Math.max(...añosEncontrados)}`
      },
      tarifasPorAño: tarifasPorAño,
      archivosEncontrados: archivosEncontrados,
      estadisticas: estadisticasDetalladas,
      busqueda: {
        paginasBuscadas: page - 1,
        archivosTotales: archivosEncontrados.length,
        fuentesConsultadas: ['media_library', 'posts'],
        timestamp: new Date().toISOString()
      },
      recomendaciones: generarRecomendaciones(añosEncontrados, tarifasPorAño)
    });

  } catch (error) {
    console.error('❌ Error general buscando años:', error);
    return NextResponse.json({
      success: false,
      message: 'Error buscando años de tarifas',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Analizar archivo para extraer año y información
function analizarArchivo(archivo) {
  try {
    const title = archivo.title?.rendered || '';
    const filename = archivo.source_url || '';
    const date = archivo.date || '';
    const size = archivo.media_details?.filesize;
    
    // Buscar patrones más amplios de año (2008-2025)
    const textoCompleto = `${title} ${filename} ${date}`.toLowerCase();
    
    // Patrones de año más flexibles
    const añoPatterns = [
      /20(0[8-9]|1[0-9]|2[0-5])/g, // 2008-2025
      /\b(0[8-9]|1[0-9]|2[0-5])\b/g // Solo últimos dos dígitos
    ];
    
    let año = null;
    for (const pattern of añoPatterns) {
      const matches = textoCompleto.match(pattern);
      if (matches) {
        let añoEncontrado = matches[0];
        if (añoEncontrado.length === 2) {
          añoEncontrado = '20' + añoEncontrado;
        }
        año = parseInt(añoEncontrado);
        if (año >= 2008 && año <= 2025) {
          break;
        }
      }
    }
    
    // Si no encuentra año en el texto, intentar extraer de la fecha del archivo
    if (!año) {
      const fechaArchivo = new Date(date);
      if (!isNaN(fechaArchivo.getTime())) {
        año = fechaArchivo.getFullYear();
      }
    }
    
    // Si aún no hay año, usar año actual como fallback
    if (!año || año < 2008 || año > 2025) {
      año = new Date().getFullYear();
    }

    // Detectar mes
    const mes = detectarMes(textoCompleto);
    
    // Verificar si es relevante para tarifas
    const esRelevante = verificarRelevancia(textoCompleto);
    
    if (!esRelevante) {
      return null;
    }

    return {
      id: `wp-${archivo.id}`,
      nombre: title || `Archivo ${archivo.id}.pdf`,
      tamaño: size ? formatearTamaño(size) : 'N/A',
      fecha: date.split('T')[0],
      url: archivo.source_url,
      año: año,
      mes: mes,
      fuente: 'wordpress_media',
      wpId: archivo.id,
      tipo: detectarTipoDocumento(textoCompleto)
    };
    
  } catch (error) {
    console.error('❌ Error analizando archivo:', error);
    return null;
  }
}

// Detectar mes del archivo
function detectarMes(texto) {
  const meses = {
    'enero': 'enero', 'ene': 'enero', 'jan': 'enero', '01': 'enero', ' 1 ': 'enero',
    'febrero': 'febrero', 'feb': 'febrero', 'feb': 'febrero', '02': 'febrero', ' 2 ': 'febrero',
    'marzo': 'marzo', 'mar': 'marzo', '03': 'marzo', ' 3 ': 'marzo',
    'abril': 'abril', 'abr': 'abril', 'apr': 'abril', '04': 'abril', ' 4 ': 'abril',
    'mayo': 'mayo', 'may': 'mayo', '05': 'mayo', ' 5 ': 'mayo',
    'junio': 'junio', 'jun': 'junio', '06': 'junio', ' 6 ': 'junio',
    'julio': 'julio', 'jul': 'julio', '07': 'julio', ' 7 ': 'julio',
    'agosto': 'agosto', 'ago': 'agosto', 'aug': 'agosto', '08': 'agosto', ' 8 ': 'agosto',
    'septiembre': 'septiembre', 'sep': 'septiembre', 'sept': 'septiembre', '09': 'septiembre', ' 9 ': 'septiembre',
    'octubre': 'octubre', 'oct': 'octubre', '10': 'octubre',
    'noviembre': 'noviembre', 'nov': 'noviembre', '11': 'noviembre',
    'diciembre': 'diciembre', 'dic': 'diciembre', 'dec': 'diciembre', '12': 'diciembre'
  };
  
  for (const [patron, mesCompleto] of Object.entries(meses)) {
    if (texto.includes(patron)) {
      return mesCompleto;
    }
  }
  
  // Si no encuentra mes específico, usar mes actual
  const mesesArray = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return mesesArray[new Date().getMonth()];
}

// Verificar si el archivo es relevante para tarifas
function verificarRelevancia(texto) {
  const palabrasRelevantes = [
    'tarifa', 'esf', 'estado', 'financiero', 'resultado', 'balance',
    'energia', 'electrica', 'creg', 'regulacion', 'precio', 'costo',
    'facturacion', 'usuario', 'comercial', 'residencial'
  ];
  
  return palabrasRelevantes.some(palabra => texto.includes(palabra));
}

// Detectar tipo de documento
function detectarTipoDocumento(texto) {
  if (texto.includes('tarifa')) return 'tarifa';
  if (texto.includes('esf') || texto.includes('estado financiero')) return 'estado_financiero';
  if (texto.includes('balance')) return 'balance';
  if (texto.includes('resultado')) return 'estado_resultado';
  return 'documento_financiero';
}

// Extraer tarifas de posts
function extraerTarifasDePost(post) {
  const tarifas = [];
  
  try {
    const content = post.content?.rendered || '';
    const title = post.title?.rendered || '';
    const date = post.date || '';
    
    // Buscar enlaces a PDFs
    const pdfMatches = content.match(/href="([^"]*\.pdf[^"]*)"/gi);
    
    if (pdfMatches) {
      pdfMatches.forEach((match, index) => {
        const urlMatch = match.match(/href="([^"]*)"/);
        if (urlMatch) {
          const url = urlMatch[1];
          const info = analizarArchivo({
            id: `post-${post.id}-${index}`,
            title: { rendered: title },
            source_url: url,
            date: date
          });
          
          if (info) {
            tarifas.push({
              ...info,
              fuente: 'wordpress_post',
              postId: post.id
            });
          }
        }
      });
    }
  } catch (error) {
    console.error('❌ Error extrayendo tarifas de post:', error);
  }
  
  return tarifas;
}

// Formatear tamaño
function formatearTamaño(bytes) {
  if (!bytes) return 'N/A';
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

// Generar recomendaciones
function generarRecomendaciones(años, tarifasPorAño) {
  const recomendaciones = [];
  const añosArray = Array.from(años).sort((a, b) => a - b);
  
  if (añosArray.length > 0) {
    recomendaciones.push({
      tipo: 'SUCCESS',
      mensaje: `Encontrado historial completo desde ${Math.min(...añosArray)} hasta ${Math.max(...añosArray)}`,
      accion: 'Los datos están listos para usar en el frontend'
    });
  }
  
  // Verificar años faltantes en el rango
  const primerAño = Math.min(...añosArray);
  const ultimoAño = Math.max(...añosArray);
  const añosFaltantes = [];
  
  for (let año = primerAño; año <= ultimoAño; año++) {
    if (!años.has(año)) {
      añosFaltantes.push(año);
    }
  }
  
  if (añosFaltantes.length > 0) {
    recomendaciones.push({
      tipo: 'INFO',
      mensaje: `Años con datos incompletos: ${añosFaltantes.join(', ')}`,
      accion: 'Considerar subir archivos faltantes a WordPress'
    });
  }
  
  return recomendaciones;
}