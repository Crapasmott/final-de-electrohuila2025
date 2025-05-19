// lib/youtubeService.js

// Esta clave deberías guardarla como variable de entorno
const API_KEY = 'AIzaSyDdYaMk-yjO3fVS3prhaNltSEoj9UiUcQE';
// El ID del canal de Electrohuila
const CHANNEL_ID = 'UCf9CyNxFm559ZBXFHkzDTWw';

/**
 * Obtiene los videos más recientes del canal de YouTube
 */
export async function getYouTubeVideos(maxResults = 4) {
    try {
        // Primera llamada para obtener los IDs de los videos
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
        );

        if (!response.ok) {
            throw new Error('Error al obtener videos de YouTube');
        }

        const data = await response.json();

        // Extrae los IDs para obtener más detalles
        const videoIds = data.items.map(item => item.id.videoId).join(',');

        // Segunda llamada para obtener detalles como duración y estadísticas
        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds}&part=snippet,contentDetails,statistics`
        );

        if (!detailsResponse.ok) {
            throw new Error('Error al obtener detalles de videos');
        }

        const detailsData = await detailsResponse.json();

        // Combina los datos para formar el formato que necesitamos
        return detailsData.items.map(item => {
            // Convertir duración ISO 8601 (PT1H2M3S) a formato legible (1:02:03)
            const duration = formatDuration(item.contentDetails.duration);

            // Formatear vistas
            const views = formatNumber(item.statistics.viewCount);

            // Formatear fecha
            const publishedDate = new Date(item.snippet.publishedAt);
            const date = publishedDate.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            // Determinar categoría (podrías implementar lógica basada en tags o descripción)
            const category = getCategoryFromTags(item.snippet.tags || []);

            return {
                id: item.id,
                youtubeId: item.id,
                thumbnail: item.snippet.thumbnails.high.url, // Usa la miniatura de alta calidad
                title: item.snippet.title,
                description: item.snippet.description,
                duration: duration,
                category: category,
                date: date,
                views: views
            };
        });
    } catch (error) {
        console.error('Error obteniendo videos de YouTube:', error);
        // En caso de error, devuelve una lista vacía
        return [];
    }
}

// Función auxiliar para formatear la duración
function formatDuration(isoDuration) {
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

    if (!match) return '0:00';

    const hours = parseInt(match[1] || 0, 10);
    const minutes = parseInt(match[2] || 0, 10);
    const seconds = parseInt(match[3] || 0, 10);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Función auxiliar para formatear números grandes
function formatNumber(number) {
    const num = parseInt(number, 10);

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }

    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }

    return num.toString();
}

// Función para determinar categorías basadas en etiquetas
function getCategoryFromTags(tags) {
    const tagString = tags.join(' ').toLowerCase();

    if (tagString.includes('sosteni') || tagString.includes('renovable') || tagString.includes('ambiente')) {
        return 'Electrohula';
    }

    if (tagString.includes('tecnolog') || tagString.includes('inteligente') || tagString.includes('digital')) {
        return 'Tecnología';
    }

    if (tagString.includes('social') || tagString.includes('comunidad') || tagString.includes('rural')) {
        return 'Impacto Social';
    }

    if (tagString.includes('innova') || tagString.includes('future') || tagString.includes('futuro')) {
        return 'Innovación';
    }

    // Categoría por defecto
    return 'Institucional';
}

// Alternativa simplificada sin API
// Esta función puedes usarla si no quieres configurar una API key
export function getYouTubeVideosSimple() {
    // IDs de tus videos de YouTube
    const videoIds = [
        'vXX6qyD1wEQ', // Reemplaza con IDs reales de tus videos
        'jfr9ZQeQmfM',
        'msbymMQCipg',
        'b-IQeVdS1SU'
    ];

    // Títulos (reemplazar con tus títulos reales)
    const titles = [
        '1 FORO DE TRANSICIÓN ENERGÉTICA EN EL SUR DE COLOMBIA',
        'Redes inteligentes: Modernizando nuestra infraestructura',
        'Llevando energía a comunidades rurales',
        'Innovación energética para un futuro brillante'
    ];

    // Descripciones (reemplazar con tus descripciones)
    const descriptions = [
        'Conoce nuestra visión para un futuro energético sostenible en el departamento del Huila.',
        'Implementación de tecnología de punta para mejorar la calidad del servicio.',
        'Nuestro compromiso con las zonas rurales del Huila para garantizar acceso a la energía.',
        'Proyectos innovadores que están transformando el sector energético en nuestra región.'
    ];

    // Categorías
    const categories = ['Sostenibilidad', 'Tecnología', 'Impacto Social', 'Innovación'];

    // Fechas
    const dates = [
        '10 de Marzo, 2025',
        '5 de Marzo, 2025',
        '28 de Febrero, 2025',
        '20 de Febrero, 2025'
    ];

    // Vistas
    const views = ['3.2K', '2.8K', '4.1K', '1.9K'];

    // Duraciones
    const durations = ['3:45', '5:21', '4:10', '6:32'];

    // Construir el array de videos
    return videoIds.map((id, index) => ({
        id: `video${index + 1}`,
        youtubeId: id,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        title: titles[index],
        description: descriptions[index],
        duration: durations[index],
        category: categories[index],
        date: dates[index],
        views: views[index]
    }));
}