// pages/api/youtube/videos.ts
import { NextApiRequest, NextApiResponse } from 'next';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  channelTitle: string;
}

interface ApiResponse {
  success: boolean;
  videos: YouTubeVideo[];
  total: number;
  message: string;
  lastUpdated: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      videos: [],
      total: 0,
      message: 'Method not allowed',
      lastUpdated: new Date().toISOString()
    });
  }

  try {
    // Headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    const { maxResults = 8 } = req.query;
    const limit = parseInt(maxResults as string, 10);

    // Configuración de YouTube API
    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCYourChannelId';
    
    if (!YOUTUBE_API_KEY) {
      console.warn('YouTube API Key no configurada, usando videos de respaldo');
      return getFallbackVideos(res, limit);
    }

    // Llamada a YouTube API v3
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?` +
      `key=${YOUTUBE_API_KEY}&` +
      `channelId=${CHANNEL_ID}&` +
      `part=snippet&` +
      `type=video&` +
      `order=date&` +
      `maxResults=${limit}`;

    const response = await fetch(youtubeUrl);
    
    if (!response.ok) {
      console.error('Error en YouTube API:', response.status, response.statusText);
      return getFallbackVideos(res, limit);
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.warn('No se encontraron videos en YouTube');
      return getFallbackVideos(res, limit);
    }

    // Obtener detalles adicionales de los videos (duración, vistas)
    const videoIds = data.items.map((item: any) => item.id.videoId).join(',');
    const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
      `key=${YOUTUBE_API_KEY}&` +
      `id=${videoIds}&` +
      `part=contentDetails,statistics`;

    const detailsResponse = await fetch(detailsUrl);
    const detailsData = detailsResponse.ok ? await detailsResponse.json() : null;

    // Procesar y formatear videos
    const processedVideos: YouTubeVideo[] = data.items.map((item: any, index: number) => {
      const details = detailsData?.items?.[index];
      
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description || '',
        thumbnail: item.snippet.thumbnails.maxresdefault?.url || 
                  item.snippet.thumbnails.high?.url || 
                  item.snippet.thumbnails.medium?.url,
        publishedAt: item.snippet.publishedAt,
        duration: formatDuration(details?.contentDetails?.duration || 'PT0S'),
        viewCount: formatViews(details?.statistics?.viewCount || '0'),
        channelTitle: item.snippet.channelTitle
      };
    });

    return res.status(200).json({
      success: true,
      videos: processedVideos,
      total: processedVideos.length,
      message: 'Videos obtenidos exitosamente desde YouTube',
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error obteniendo videos de YouTube:', error);
    return getFallbackVideos(res, limit);
  }
}

// Función para convertir duración ISO 8601 a formato legible
function formatDuration(duration: string): string {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '0:00';

  const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
  const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
  const seconds = match[3] ? parseInt(match[3].replace('S', '')) : 0;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Función para formatear vistas
function formatViews(viewCount: string): string {
  const views = parseInt(viewCount);
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
}

// Videos de respaldo cuando YouTube API no funciona
function getFallbackVideos(res: NextApiResponse<ApiResponse>, limit: number) {
  const fallbackVideos: YouTubeVideo[] = [
    {
      id: 'video_electro_1',
      title: 'Energía sostenible para el futuro del Huila',
      description: 'Conoce nuestra visión para un futuro energético sostenible en el departamento del Huila y cómo estamos implementando tecnologías renovables.',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: '2024-03-10T10:00:00Z',
      duration: '3:45',
      viewCount: '3.2K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_2',
      title: 'Redes inteligentes: Modernizando nuestra infraestructura',
      description: 'Implementación de tecnología de punta para mejorar la calidad del servicio eléctrico en toda la región.',
      thumbnail: 'https://img.youtube.com/vi/C0DPdy98e4c/maxresdefault.jpg',
      publishedAt: '2024-03-05T14:30:00Z',
      duration: '5:21',
      viewCount: '2.8K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_3',
      title: 'Llevando energía a comunidades rurales',
      description: 'Nuestro compromiso con las zonas rurales del Huila para garantizar acceso universal a la energía eléctrica.',
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
      publishedAt: '2024-02-28T09:15:00Z',
      duration: '4:10',
      viewCount: '4.1K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_4',
      title: 'Innovación energética para un futuro brillante',
      description: 'Proyectos innovadores que están transformando el sector energético en nuestra región del Huila.',
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
      publishedAt: '2024-02-20T16:45:00Z',
      duration: '6:32',
      viewCount: '1.9K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_5',
      title: 'Programa de Eficiencia Energética ElectroHuila',
      description: 'Conoce nuestro programa integral de eficiencia energética para hogares y empresas del departamento.',
      thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
      publishedAt: '2024-02-15T11:20:00Z',
      duration: '7:18',
      viewCount: '2.5K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_6',
      title: 'Atención al Cliente Digital ElectroHuila',
      description: 'Descubre todos nuestros canales digitales para una atención al cliente más rápida y eficiente.',
      thumbnail: 'https://img.youtube.com/vi/Yb6dZ1IFlKc/maxresdefault.jpg',
      publishedAt: '2024-02-10T13:30:00Z',
      duration: '3:55',
      viewCount: '1.7K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_7',
      title: 'Inversión en Infraestructura Eléctrica 2024',
      description: 'Conoce las importantes inversiones que ElectroHuila está realizando para modernizar la infraestructura eléctrica.',
      thumbnail: 'https://img.youtube.com/vi/QH2-TGUlwu4/maxresdefault.jpg',
      publishedAt: '2024-02-05T10:45:00Z',
      duration: '5:40',
      viewCount: '3.8K',
      channelTitle: 'Electrificadora del Huila'
    },
    {
      id: 'video_electro_8',
      title: 'Tarifas Eléctricas 2024 - Información Importante',
      description: 'Todo lo que necesitas saber sobre las nuevas tarifas eléctricas y cómo te afectan.',
      thumbnail: 'https://img.youtube.com/vi/nfWlot6h_JM/maxresdefault.jpg',
      publishedAt: '2024-01-30T15:20:00Z',
      duration: '4:25',
      viewCount: '5.2K',
      channelTitle: 'Electrificadora del Huila'
    }
  ];

  const limitedVideos = fallbackVideos.slice(0, limit);

  return res.status(200).json({
    success: true,
    videos: limitedVideos,
    total: limitedVideos.length,
    message: 'Videos de respaldo cargados (YouTube API no disponible)',
    lastUpdated: new Date().toISOString()
  });
}