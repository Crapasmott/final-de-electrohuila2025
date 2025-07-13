// src/hooks/useYouTubeVideos.ts
import { useState, useEffect, useCallback } from 'react';

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

interface UseYouTubeVideosOptions {
  maxResults?: number;
  autoRefresh?: boolean;
  refreshInterval?: number; // en minutos
}

interface UseYouTubeVideosReturn {
  videos: YouTubeVideo[];
  loading: boolean;
  error: string | null;
  lastUpdated: string | null;
  refresh: () => Promise<void>;
  isFromYouTube: boolean;
}

export const useYouTubeVideos = (options: UseYouTubeVideosOptions = {}): UseYouTubeVideosReturn => {
  const {
    maxResults = 8,
    autoRefresh = true,
    refreshInterval = 30 // 30 minutos por defecto
  } = options;

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isFromYouTube, setIsFromYouTube] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/youtube/videos?maxResults=${maxResults}`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setVideos(data.videos);
        setLastUpdated(data.lastUpdated);
        setIsFromYouTube(data.message.includes('YouTube'));
      } else {
        throw new Error(data.message || 'Error al cargar videos');
      }

    } catch (err) {
      console.error('Error fetching YouTube videos:', err);
      setError(err instanceof Error ? err.message : 'Error al cargar videos');
    } finally {
      setLoading(false);
    }
  }, [maxResults]);

  // Cargar videos al montar el componente
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Auto-refresh opcional
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const intervalMs = refreshInterval * 60 * 1000; // convertir minutos a ms
    const interval = setInterval(() => {
      console.log('Auto-refrescando videos de YouTube...');
      fetchVideos();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchVideos]);

  return {
    videos,
    loading,
    error,
    lastUpdated,
    refresh: fetchVideos,
    isFromYouTube
  };
};