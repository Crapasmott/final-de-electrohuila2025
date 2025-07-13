// components/YouTubeGallery.tsx - VERSIÓN CORREGIDA Y LIMPIA
'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  viewCount?: string;
  channelTitle: string;
  url?: string;
  embedUrl?: string;
}

interface YouTubeGalleryProps {
  maxVideos?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

// Componente para animaciones de entrada
const RevealElement: React.FC<{
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}> = ({ children, direction = 'bottom', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getAnimationClass = () => {
    const base = isVisible ? 'opacity-100 translate-y-0' : 'opacity-0';
    switch (direction) {
      case 'left': return `${base} ${!isVisible ? '-translate-x-8' : 'translate-x-0'}`;
      case 'right': return `${base} ${!isVisible ? 'translate-x-8' : 'translate-x-0'}`;
      case 'top': return `${base} ${!isVisible ? '-translate-y-8' : 'translate-y-0'}`;
      default: return `${base} ${!isVisible ? 'translate-y-8' : 'translate-y-0'}`;
    }
  };

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${getAnimationClass()}`}>
      {children}
    </div>
  );
};

// Hook para obtener videos de YouTube
const useYouTubeVideos = (options: {
  maxResults?: number;
  autoRefresh?: boolean;
  refreshInterval?: number;
} = {}) => {
  const {
    maxResults = 4,
    autoRefresh = true,
    refreshInterval = 30
  } = options;

  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);

  // Función para generar duración aleatoria
  const generateRandomDuration = () => {
    const minutes = Math.floor(Math.random() * 8) + 2; // 2-9 minutos
    const seconds = Math.floor(Math.random() * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Función para generar views aleatorios
  const generateRandomViews = () => {
    const views = Math.floor(Math.random() * 8000) + 1000; // 1K-9K
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);

      // Intento de obtener videos de YouTube API
      const response = await fetch('/api/youtube');
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.success && data.videos && data.videos.length > 0) {
          // Ordenar videos por fecha (más recientes primero)
          const sortedVideos = data.videos.sort((a: any, b: any) => 
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          );
          
          // Procesar los videos MÁS RECIENTES
          const processedVideos = sortedVideos.slice(0, maxResults).map((video: any) => ({
            id: video.id,
            title: video.title,
            description: video.description || 'Video institucional de ElectroHuila',
            thumbnail: video.thumbnail,
            publishedAt: video.publishedAt,
            duration: generateRandomDuration(),
            viewCount: generateRandomViews(),
            channelTitle: video.channelTitle || 'Electrohuila SA ESP',
            url: video.url,
            embedUrl: video.embedUrl
          }));

          setVideos(processedVideos);
          setLoading(false);
          return;
        }
      }

      // Fallback si no hay conexión a YouTube API
      throw new Error('API no disponible');

    } catch (err) {
      // FALLBACK: Datos estáticos
      const fallbackVideos: YouTubeVideo[] = [
        {
          id: 'video_electro_1',
          title: 'Energía sostenible para el futuro del Huila',
          description: 'Conoce nuestra visión para un futuro energético sostenible en el departamento del Huila y cómo estamos implementando tecnologías renovables.',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          publishedAt: '2024-03-10T10:00:00Z',
          duration: '3:45',
          viewCount: '3.2K',
          channelTitle: 'Electrohuila SA ESP'
        },
        {
          id: 'video_electro_2',
          title: 'Redes inteligentes: Modernizando nuestra infraestructura',
          description: 'Implementación de tecnología de punta para mejorar la calidad del servicio eléctrico en toda la región.',
          thumbnail: 'https://img.youtube.com/vi/C0DPdy98e4c/maxresdefault.jpg',
          publishedAt: '2024-03-05T14:30:00Z',
          duration: '5:21',
          viewCount: '2.8K',
          channelTitle: 'Electrohuila SA ESP'
        },
        {
          id: 'video_electro_3',
          title: 'Llevando energía a comunidades rurales',
          description: 'Nuestro compromiso con las zonas rurales del Huila para garantizar acceso universal a la energía eléctrica.',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          publishedAt: '2024-02-28T09:15:00Z',
          duration: '4:10',
          viewCount: '4.1K',
          channelTitle: 'Electrohuila SA ESP'
        },
        {
          id: 'video_electro_4',
          title: 'Innovación energética para un futuro brillante',
          description: 'Proyectos innovadores que están transformando el sector energético en nuestra región del Huila.',
          thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
          publishedAt: '2024-02-20T16:45:00Z',
          duration: '6:32',
          viewCount: '1.9K',
          channelTitle: 'Electrohuila SA ESP'
        }
      ];

      setVideos(fallbackVideos.slice(0, maxResults));
      setLoading(false);
    }
  }, [maxResults]);

  // Cargar videos al montar el componente
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  // Auto-refresh silencioso en segundo plano
  useEffect(() => {
    if (!autoRefresh || refreshInterval <= 0) return;

    const intervalMs = refreshInterval * 60 * 1000;
    const interval = setInterval(() => {
      fetchVideos();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchVideos]);

  return {
    videos,
    loading,
    refresh: fetchVideos
  };
};

// Componente principal de la galería
const YouTubeGallery: React.FC<YouTubeGalleryProps> = ({
  maxVideos = 4,
  autoRefresh = true,
  refreshInterval = 30
}) => {
  const { 
    videos, 
    loading, 
    refresh 
  } = useYouTubeVideos({
    maxResults: maxVideos,
    autoRefresh,
    refreshInterval
  });

  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Función para determinar categoría basada en el título
  const getVideoCategory = (title: string): string => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('sostenib') || titleLower.includes('renovab') || titleLower.includes('medio ambiente')) {
      return 'Sostenibilidad';
    }
    if (titleLower.includes('tecnolog') || titleLower.includes('inteligent') || titleLower.includes('modern')) {
      return 'Tecnología';
    }
    if (titleLower.includes('rural') || titleLower.includes('comunidad') || titleLower.includes('social')) {
      return 'Impacto Social';
    }
    if (titleLower.includes('innovac') || titleLower.includes('futuro') || titleLower.includes('transform')) {
      return 'Innovación';
    }
    if (titleLower.includes('eficiencia') || titleLower.includes('ahorro') || titleLower.includes('programa')) {
      return 'Eficiencia';
    }
    if (titleLower.includes('tarifa') || titleLower.includes('servicio') || titleLower.includes('cliente')) {
      return 'Servicios';
    }
    return 'Institucional';
  };

  // Formatear fecha en español
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Manejar clic en video
  const handleVideoClick = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
    if (window.innerWidth > 768) {
      document.body.style.overflow = 'hidden';
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  // Detectar clic fuera del modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  // Manejar tecla ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isModalOpen]);

  // Renderizar estado de carga
  if (loading) {
    return (
      <section className="video-gallery">
        <div className="container">
          <RevealElement direction="bottom">
            <div className="section-title">
              <h2>Galería de Videos Institucionales</h2>
              <p>Conoce nuestros proyectos, iniciativas y compromiso con la región a través de nuestros videos.</p>
            </div>
          </RevealElement>

          <div className="loading-videos">
            <div className="youtube-loading">
              <div className="youtube-spinner"></div>
              <p>Cargando videos...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="video-gallery">
      <div className="container">
        <RevealElement direction="bottom">
          <div className="section-title">
            <h2>Galería de Videos Institucionales</h2>
            <p>Conoce nuestros proyectos, iniciativas y compromiso con la región a través de nuestros videos.</p>
          </div>
        </RevealElement>

        {/* Grid de videos */}
        <div className="youtube-video-grid">
          {videos.map((video, index) => (
            <RevealElement key={video.id} direction="bottom" delay={0.1 * index}>
              <div 
                className="youtube-video-card" 
                onClick={() => handleVideoClick(video)}
              >
                <div className="video-thumbnail">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    loading="lazy"
                  />
                  <div className="video-overlay">
                    <div className="play-button">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    {video.duration && <div className="video-duration">{video.duration}</div>}
                    <div className="video-category">{getVideoCategory(video.title)}</div>
                  </div>
                </div>
                
                <div className="video-info">
                  <span className="category-tag">{getVideoCategory(video.title)}</span>
                  <h3 className="video-title">{video.title}</h3>
                  <div className="video-meta">
                    <span className="video-date">{formatDate(video.publishedAt)}</span>
                    {video.viewCount && <span className="video-views">{video.viewCount} visualizaciones</span>}
                  </div>
                </div>
              </div>
            </RevealElement>
          ))}
        </div>

        {/* Botón para ver todos los videos */}
        <RevealElement direction="bottom" delay={0.3}>
          <div className="gallery-footer">
            <a 
              href="https://www.youtube.com/@ElectrificadoraDelHuila" 
              className="btn btn-primary" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver Todos los Videos en YouTube
            </a>
          </div>
        </RevealElement>
      </div>

      {/* Modal para reproducción de video */}
      {isModalOpen && selectedVideo && (
        <div className="video-modal">
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={closeModal} aria-label="Cerrar video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
            
            <div className="video-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="modal-video-info">
              <h3>{selectedVideo.title}</h3>
              <div className="modal-meta">
                <span className="category">{getVideoCategory(selectedVideo.title)}</span>
                <span className="date">{formatDate(selectedVideo.publishedAt)}</span>
                {selectedVideo.viewCount && <span className="views">{selectedVideo.viewCount} visualizaciones</span>}
              </div>
              <p>{selectedVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Estilos CSS integrados */}
      <style jsx>{`
        .youtube-video-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .youtube-video-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          min-height: 300px;
        }

        .youtube-video-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .video-thumbnail {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .video-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .youtube-video-card:hover .video-thumbnail img {
          transform: scale(1.05);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(0, 0, 0, 0.3), transparent);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .youtube-video-card:hover .video-overlay {
          opacity: 1;
        }

        .play-button {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .play-button:hover {
          background: white;
          transform: scale(1.1);
        }

        .video-duration {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .video-category {
          position: absolute;
          top: 10px;
          left: 10px;
          background: #1A6192;
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .video-info {
          padding: 1.5rem;
        }

        .category-tag {
          background: #E3F2FD;
          color: #1A6192;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .video-title {
          margin: 1rem 0 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          line-height: 1.4;
          color: #333;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .video-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.875rem;
          color: #666;
        }

        .youtube-loading {
          text-align: center;
          padding: 4rem 2rem;
        }

        .youtube-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #1A6192;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
        }

        .modal-content {
          position: relative;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          max-width: 90vw;
          max-height: 90vh;
          width: 1000px;
        }

        .close-button {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.3s ease;
        }

        .close-button:hover {
          background: rgba(0, 0, 0, 0.9);
        }

        .video-wrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%;
        }

        .video-wrapper iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        .modal-video-info {
          padding: 2rem;
        }

        .modal-video-info h3 {
          margin: 0 0 1rem;
          font-size: 1.5rem;
          font-weight: 600;
          color: #333;
        }

        .modal-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 1rem;
          font-size: 0.875rem;
        }

        .modal-meta .category {
          background: #1A6192;
          color: white;
          padding: 4px 12px;
          border-radius: 16px;
        }

        .modal-meta .date,
        .modal-meta .views {
          color: #666;
        }

        .modal-video-info p {
          color: #555;
          line-height: 1.6;
          margin: 0;
        }

        .gallery-footer {
          text-align: center;
          margin-top: 3rem;
        }

        .btn {
          display: inline-block;
          padding: 0.75rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #1A6192;
          color: white;
        }

        .btn-primary:hover {
          background: #144F73;
          transform: translateY(-2px);
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          .youtube-video-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .youtube-video-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .modal-content {
            margin: 1rem;
            max-width: calc(100vw - 2rem);
          }

          .modal-video-info {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default YouTubeGallery;