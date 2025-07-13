// lib/dataManager.ts
// Gestor central para todos los datos reales de ElectroHuila

export interface DataManagerConfig {
  wordpress: {
    baseUrl: string;
    apiUrl: string;
    username?: string;
    password?: string;
  };
  youtube: {
    apiKey: string;
    channelId: string;
  };
  fileStorage: {
    baseUrl: string;
    uploadPath: string;
  };
}

export class ElectroHuilaDataManager {
  private config: DataManagerConfig;

  constructor(config: DataManagerConfig) {
    this.config = config;
  }

  // ========== GESTIÓN DE ARCHIVOS REALES ==========
  
  /**
   * Subir archivo real al sistema
   */
  async uploadFile(file: File, category: 'tarifas' | 'informes' | 'politicas' | 'financieros'): Promise<{
    success: boolean;
    fileUrl: string;
    fileName: string;
    fileSize: string;
  }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', category);
      formData.append('uploadDate', new Date().toISOString());

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        fileUrl: '',
        fileName: '',
        fileSize: ''
      };
    }
  }

  /**
   * Obtener lista de archivos reales por categoría
   */
  async getFilesByCategory(category: string, year?: number): Promise<any[]> {
    try {
      let url = `/api/files/${category}`;
      if (year) {
        url += `?year=${year}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return data.files || [];
    } catch (error) {
      console.error('Error fetching files:', error);
      return [];
    }
  }

  // ========== INTEGRACIÓN WORDPRESS REAL ==========
  
  /**
   * Obtener noticias reales desde WordPress
   */
  async getRealNews(limit = 10): Promise<any[]> {
    try {
      // Intentar con autenticación si está disponible
      const headers: any = {
        'Content-Type': 'application/json'
      };

      if (this.config.wordpress.username && this.config.wordpress.password) {
        const auth = btoa(`${this.config.wordpress.username}:${this.config.wordpress.password}`);
        headers['Authorization'] = `Basic ${auth}`;
      }

      const response = await fetch(
        `${this.config.wordpress.apiUrl}/posts?per_page=${limit}&_embed`,
        { headers }
      );

      if (!response.ok) {
        throw new Error(`WordPress API error: ${response.status}`);
      }

      const posts = await response.json();
      return posts;
    } catch (error) {
      console.error('Error fetching real WordPress news:', error);
      return [];
    }
  }

  /**
   * Obtener páginas específicas de WordPress (como informes, políticas)
   */
  async getWordPressPages(categorySlug: string): Promise<any[]> {
    try {
      const response = await fetch(
        `${this.config.wordpress.apiUrl}/pages?categories=${categorySlug}&_embed`
      );

      if (!response.ok) {
        throw new Error(`WordPress pages error: ${response.status}`);
      }

      const pages = await response.json();
      return pages;
    } catch (error) {
      console.error('Error fetching WordPress pages:', error);
      return [];
    }
  }

  // ========== INTEGRACIÓN YOUTUBE REAL ==========
  
  /**
   * Obtener videos reales del canal de ElectroHuila
   */
  async getRealYouTubeVideos(maxResults = 8): Promise<any[]> {
    try {
      // Buscar videos del canal
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?` +
        `key=${this.config.youtube.apiKey}&` +
        `channelId=${this.config.youtube.channelId}&` +
        `part=snippet&` +
        `type=video&` +
        `order=date&` +
        `maxResults=${maxResults}`;

      const searchResponse = await fetch(searchUrl);
      
      if (!searchResponse.ok) {
        throw new Error(`YouTube API error: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();

      if (!searchData.items || searchData.items.length === 0) {
        return [];
      }

      // Obtener detalles adicionales
      const videoIds = searchData.items.map((item: any) => item.id.videoId).join(',');
      const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?` +
        `key=${this.config.youtube.apiKey}&` +
        `id=${videoIds}&` +
        `part=contentDetails,statistics`;

      const detailsResponse = await fetch(detailsUrl);
      const detailsData = detailsResponse.ok ? await detailsResponse.json() : null;

      // Procesar videos
      const videos = searchData.items.map((item: any, index: number) => {
        const details = detailsData?.items?.[index];
        
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description || '',
          thumbnail: item.snippet.thumbnails.maxresdefault?.url || 
                    item.snippet.thumbnails.high?.url || 
                    item.snippet.thumbnails.medium?.url,
          publishedAt: item.snippet.publishedAt,
          duration: this.formatDuration(details?.contentDetails?.duration || 'PT0S'),
          viewCount: this.formatViews(details?.statistics?.viewCount || '0'),
          channelTitle: item.snippet.channelTitle
        };
      });

      return videos;
    } catch (error) {
      console.error('Error fetching real YouTube videos:', error);
      return [];
    }
  }

  // ========== GESTIÓN DE TARIFAS REALES ==========
  
  /**
   * Obtener tarifas reales por año
   */
  async getRealTarifas(year?: number): Promise<any[]> {
    try {
      let url = '/api/tarifas/real';
      if (year) {
        url += `?year=${year}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return data.tarifas || [];
    } catch (error) {
      console.error('Error fetching real tarifas:', error);
      return [];
    }
  }

  /**
   * Subir nueva tarifa
   */
  async uploadTarifa(file: File, month: string, year: number): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('tarifa', file);
      formData.append('month', month);
      formData.append('year', year.toString());

      const response = await fetch('/api/tarifas/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error uploading tarifa:', error);
      return false;
    }
  }

  // ========== GESTIÓN DE INFORMES FINANCIEROS ==========
  
  /**
   * Obtener informes financieros reales
   */
  async getFinancialReports(year?: number): Promise<any[]> {
    try {
      let url = '/api/financial/reports';
      if (year) {
        url += `?year=${year}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      return data.reports || [];
    } catch (error) {
      console.error('Error fetching financial reports:', error);
      return [];
    }
  }

  // ========== GESTIÓN DE CONTRATACIONES ==========
  
  /**
   * Obtener contrataciones reales
   */
  async getContratos(filters?: {
    estado?: string;
    fechaInicio?: string;
    fechaFin?: string;
    busqueda?: string;
  }): Promise<any[]> {
    try {
      const params = new URLSearchParams();
      if (filters?.estado) params.append('estado', filters.estado);
      if (filters?.fechaInicio) params.append('fechaInicio', filters.fechaInicio);
      if (filters?.fechaFin) params.append('fechaFin', filters.fechaFin);
      if (filters?.busqueda) params.append('busqueda', filters.busqueda);

      const response = await fetch(`/api/contrataciones?${params}`);
      const data = await response.json();
      return data.contratos || [];
    } catch (error) {
      console.error('Error fetching contratos:', error);
      return [];
    }
  }

  // ========== UTILIDADES ==========
  
  private formatDuration(duration: string): string {
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

  private formatViews(viewCount: string): string {
    const views = parseInt(viewCount);
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  /**
   * Verificar conexión con todas las fuentes
   */
  async checkConnections(): Promise<{
    wordpress: boolean;
    youtube: boolean;
    fileSystem: boolean;
  }> {
    const results = {
      wordpress: false,
      youtube: false,
      fileSystem: false
    };

    // Test WordPress
    try {
      const wpResponse = await fetch(`${this.config.wordpress.apiUrl}/posts?per_page=1`);
      results.wordpress = wpResponse.ok;
    } catch (error) {
      console.log('WordPress connection failed:', error);
    }

    // Test YouTube
    try {
      const ytResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?key=${this.config.youtube.apiKey}&id=${this.config.youtube.channelId}&part=snippet`
      );
      results.youtube = ytResponse.ok;
    } catch (error) {
      console.log('YouTube connection failed:', error);
    }

    // Test File System
    try {
      const fsResponse = await fetch('/api/files/test');
      results.fileSystem = fsResponse.ok;
    } catch (error) {
      console.log('File system connection failed:', error);
    }

    return results;
  }
}

// Factory para crear la instancia del gestor
export function createDataManager(): ElectroHuilaDataManager {
  const config: DataManagerConfig = {
    wordpress: {
      baseUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://electrohuila.com.co',
      apiUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'https://electrohuila.com.co/wp-json/wp/v2',
      username: process.env.WORDPRESS_AUTH_USER,
      password: process.env.WORDPRESS_AUTH_PASSWORD
    },
    youtube: {
      apiKey: process.env.YOUTUBE_API_KEY || '',
      channelId: process.env.YOUTUBE_CHANNEL_ID || ''
    },
    fileStorage: {
      baseUrl: process.env.NEXT_PUBLIC_FILE_STORAGE_URL || '/files',
      uploadPath: process.env.FILE_UPLOAD_PATH || '/uploads'
    }
  };

  return new ElectroHuilaDataManager(config);
}