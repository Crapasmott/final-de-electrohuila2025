// app/api/contratos/route.js

export async function GET() {
    try {
        console.log('🔄 Conectando con WordPress dinámico de ElectroHuila...');
        
        // 🎯 URLs para conectar con el backend real de WordPress
        const urlsToTry = [
            // URL principal que probablemente contiene los contratos
            'https://electrohuila.net/contratacion//wp-json/wp/v2/posts?per_page=100&status=publish',
            'https://electrohuila.net/contratacion//wp-json/wp/v2/pages?per_page=100&status=publish',
            
            // Custom post types más probables
            'https://electrohuila.net/contratacion//wp-json/wp/v2/contratos?per_page=100&status=publish',
            'https://electrohuila.net/contratacion/n/wp-json/wp/v2/contrato?per_page=100&status=publish',
            'https://electrohuila.net/contratacion//wp-json/wp/v2/licitaciones?per_page=100&status=publish',
            'https://electrohuila.net/contratacion//wp-json/wp/v2/proceso_contratacion?per_page=100&status=publish',
            'https://electrohuila.net/contratacion//wp-json/wp/v2/procesos_contratacion?per_page=100&status=publish',
            
            // Otras posibilidades
            'https://electrohuila.net/contratacion//wp-json/wp/v2/licitacion?per_page=100&status=publish',
            'https://electrohuila.net/contratacion//wp-json/wp/v2/convocatoria?per_page=100&status=publish',
            'https://electrohuila.net/contratacion/o/contratacion/wp-json/wp/v2/convocatorias?per_page=100&status=publish'
        ];

        let realData = null;
        let workingUrl = null;
        let debugResults = [];

        // Buscar datos reales en WordPress
        for (const url of urlsToTry) {
            try {
                console.log(`🔍 Buscando datos reales en: ${url}`);
                
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (ElectroHuila-NextJS/1.0)',
                        'Cache-Control': 'no-cache, no-store, must-revalidate'
                    },
                    cache: 'no-store',
                    signal: AbortSignal.timeout(15000)
                });

                console.log(`📡 ${url} → ${response.status}`);

                if (response.ok) {
                    const data = await response.json();
                    const count = Array.isArray(data) ? data.length : 0;
                    
                    console.log(`📊 Encontrados ${count} elementos en: ${url}`);
                    
                    // Analizar contenido para ver si contiene contratos
                    if (Array.isArray(data) && data.length > 0) {
                        const firstItem = data[0];
                        const title = firstItem.title?.rendered || firstItem.title || '';
                        const content = firstItem.content?.rendered || firstItem.excerpt?.rendered || '';
                        
                        console.log(`📋 Muestra del contenido:`, {
                            id: firstItem.id,
                            title: title.substring(0, 100),
                            type: firstItem.type,
                            status: firstItem.status,
                            has_ehui_code: title.includes('EHUI') || content.includes('EHUI')
                        });
                        
                        debugResults.push({
                            url,
                            count,
                            status: response.status,
                            sample_title: title.substring(0, 100),
                            has_contracts: title.includes('EHUI') || content.includes('EHUI') || 
                                          title.toLowerCase().includes('contrat') || 
                                          content.toLowerCase().includes('contrat'),
                            post_type: firstItem.type
                        });
                        
                        // Si encontramos contenido que parece de contratos
                        if ((title.includes('EHUI') || content.includes('EHUI') || 
                             title.toLowerCase().includes('prestar') ||
                             title.toLowerCase().includes('servicio') ||
                             content.toLowerCase().includes('electrificadora')) && !realData) {
                            console.log(`✅ DATOS REALES ENCONTRADOS en: ${url}`);
                            realData = data;
                            workingUrl = url;
                        }
                    } else {
                        debugResults.push({
                            url,
                            count: 0,
                            status: response.status,
                            empty: true
                        });
                    }
                }
            } catch (error) {
                console.log(`❌ Error con ${url}: ${error.message}`);
                debugResults.push({
                    url,
                    error: error.message
                });
            }
        }

        // Si encontramos datos reales de WordPress
        if (realData && realData.length > 0) {
            console.log(`🎉 PROCESANDO ${realData.length} elementos REALES de WordPress`);
            
            // Transformar datos reales dinámicamente
            const contratosReales = realData
                .map(item => {
                    const title = item.title?.rendered || item.title || '';
                    const content = item.content?.rendered || item.excerpt?.rendered || '';
                    const combinedText = title + ' ' + content;
                    
                    // Solo procesar si parece un contrato
                    if (!combinedText.toLowerCase().includes('ehui') && 
                        !combinedText.toLowerCase().includes('contrat') &&
                        !combinedText.toLowerCase().includes('servicio') &&
                        !combinedText.toLowerCase().includes('prestar')) {
                        return null;
                    }
                    
                    // Extraer código EHUI
                    const codigoMatch = combinedText.match(/EHUI-[A-Z]+-\d+-\d+/);
                    const codigo = codigoMatch ? codigoMatch[0] : `ITEM-${item.id}`;
                    
                    // Detectar estado del contenido
                    let estado = 'ABIERTA';
                    const estadoMatch = combinedText.match(/(ABIERTA|CERRADA|DESIERTA|ANULADA)/i);
                    if (estadoMatch) {
                        estado = estadoMatch[0].toUpperCase();
                    }
                    
                    // Extraer fechas de meta fields o contenido
                    const meta = item.meta || item.acf || {};
                    
                    return {
                        id: codigo,
                        title: title.replace(/<[^>]*>/g, '').trim(),
                        descripcion: content.replace(/<[^>]*>/g, '').substring(0, 300).trim() || 'Sin descripción disponible',
                        fecha_publicacion: formatearFecha(meta.fecha_publicacion || item.date),
                        fecha_cierre: formatearFecha(meta.fecha_cierre) || 'No definida',
                        fecha_apertura: formatearFechaHora(meta.fecha_apertura || item.date),
                        estado: meta.estado || estado,
                        modalidad: meta.modalidad || meta.tipo_contratacion || 'Proceso de Contratación',
                        empresa: 'ELECTRIFICADORA DEL HUILA S.A.',
                        etapa: meta.etapa || 'PUBLICADO',
                        responsable: meta.responsable || 'DIVISION SERVICIOS ADMINISTRATIVOS',
                        cuantia: meta.cuantia || '0',
                        url: `/contratos/${codigo}`,
                        _debug: {
                            wordpress_id: item.id,
                            post_type: item.type,
                            status: item.status,
                            source_url: workingUrl,
                            last_modified: item.modified || item.date,
                            meta_fields: Object.keys(meta)
                        }
                    };
                })
                .filter(contrato => contrato !== null) // Remover elementos no válidos
                .filter(contrato => contrato.title && contrato.title.length > 5); // Solo contratos válidos

            console.log(`✅ CONTRATOS VÁLIDOS ENCONTRADOS: ${contratosReales.length}`);
            
            // Mostrar información de cada contrato encontrado
            contratosReales.forEach(contrato => {
                console.log(`📄 ${contrato.id}: ${contrato.title.substring(0, 50)}... [${contrato.estado}]`);
            });

            return new Response(JSON.stringify({
                success: true,
                data: contratosReales,
                source: workingUrl,
                count: contratosReales.length,
                message: `✅ ${contratosReales.length} contratos DINÁMICOS obtenidos de WordPress`,
                debug: {
                    wordpress_connection: 'SUCCESS',
                    working_url: workingUrl,
                    total_wp_items: realData.length,
                    valid_contracts: contratosReales.length,
                    all_urls_tested: debugResults,
                    last_update: new Date().toISOString()
                },
                timestamp: new Date().toISOString()
            }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            
        } else {
            // No se encontraron datos - información de debugging
            console.log('❌ NO se encontraron datos reales en WordPress');
            
            return new Response(JSON.stringify({
                success: false,
                data: [],
                source: 'no_wordpress_data',
                count: 0,
                message: '❌ NO se pudieron obtener datos dinámicos de WordPress',
                debug: {
                    wordpress_connection: 'FAILED',
                    urls_tested: debugResults.length,
                    results: debugResults,
                    suggestion: 'Los contratos pueden estar en un endpoint diferente o requerir autenticación',
                    next_steps: [
                        'Verificar que los contratos estén publicados (status: publish)',
                        'Verificar que el custom post type esté expuesto en REST API',
                        'Verificar permisos de acceso a la REST API'
                    ]
                },
                timestamp: new Date().toISOString()
            }), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

    } catch (error) {
        console.error('💥 Error general:', error);
        
        return new Response(JSON.stringify({
            success: false,
            data: [],
            error: error.message,
            message: 'Error al conectar con WordPress',
            timestamp: new Date().toISOString()
        }), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Función para formatear fechas
function formatearFecha(fecha) {
    if (!fecha) return 'No definida';
    try {
        const date = new Date(fecha);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    } catch (e) {
        return fecha;
    }
}

// Función para formatear fecha y hora
function formatearFechaHora(fecha) {
    if (!fecha) return 'No definida';
    try {
        const date = new Date(fecha);
        return date.toLocaleString('es-ES', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (e) {
        return fecha;
    }
}