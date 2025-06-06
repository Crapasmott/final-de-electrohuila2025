'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import AutogeneradoresCard from '../components/AutogeneradoresCard';
import ChatOption from '../components/ChatOption';
import styles from '../styles/Home.module.css';
import { getYouTubeVideosSimple } from '../lib/youtubeService';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import ElectroHuilaKidsButton from '../components/ElectroHuilaKidsButton';
import NewsNotification from '../components/NewsNotification';

// Definición de interfaces para TypeScript
interface VideoData {
  id: string;
  youtubeId: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  date: string;
  views: string;
  previewVideo?: string | null;
}

interface VideoThumbnailProps {
  thumbnailSrc: string;
  title?: string;
  duration: string;
  previewVideoSrc?: string | null;
  category?: string;
  onClick?: () => void;
}

interface RevealElementProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  threshold?: number;
}

// Componente VideoThumbnail
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  thumbnailSrc, 
  title, 
  duration, 
  previewVideoSrc = null,
  category,
  onClick = () => {} // Haciendo onClick opcional con función vacía por defecto
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Manejar hover para iniciar/detener preview
  useEffect(() => {
    if (!previewVideoSrc || !previewRef.current) return;
    
    const videoElement = previewRef.current;
    
    if (isHovering && hasInteracted) {
      videoElement.currentTime = 0;
      videoElement.play().catch(e => console.log('Auto-play prevented:', e));
    } else {
      videoElement.pause();
    }
  }, [isHovering, hasInteracted, previewVideoSrc]);
  
  // Manejar carga de la imagen
  useEffect(() => {
    if (thumbnailRef.current && thumbnailRef.current.complete) {
      setIsLoaded(true);
    }
  }, []);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    setHasInteracted(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  const handleThumbnailLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      className={`thumbnail-container ${isLoaded ? 'loaded' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Efecto de carga con pulso */}
      {!isLoaded && (
        <div className="loading-pulse"></div>
      )}
      
      {/* Imagen principal de miniatura */}
      <img 
        ref={thumbnailRef}
        src={thumbnailSrc} 
        alt={title || 'Video thumbnail'} // Añadir fallback para accesibilidad
        className="thumbnail"
        onLoad={handleThumbnailLoad}
      />
      
      {/* Video de vista previa si está disponible */}
      {previewVideoSrc && (
        <video 
          ref={previewRef}
          className={`preview-video ${isHovering ? 'active' : ''}`}
          muted
          loop
          playsInline
        >
          <source src={previewVideoSrc} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay con degradado */}
      <div className="overlay">
        {/* Categoría */}
        <div className="video-category">{category}</div>
        
        {/* Título del video */}
        <h3 className="title">{title}</h3>
        
        {/* Duración del video */}
        <div className="duration">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-0.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span>{duration}</span>
        </div>
      </div>
      
      {/* Botón de reproducción con animación */}
      <div className="play-button-wrapper">
        <div className={`play-button ${isHovering ? 'active' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
      {/* Animación de ondas al hacer hover */}
      <div className={`ripple-effect ${isHovering ? 'active' : ''}`}>
        <div className="ripple"></div>
        <div className="ripple"></div>
        <div className="ripple"></div>
      </div>
    </div>
  );
};

// Componente de Revelado para elementos que aparecen con animación
const RevealElement: React.FC<RevealElementProps> = ({ 
  children, 
  direction = 'bottom', 
  delay = 0, 
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
const [showNewsNotification, setShowNewsNotification] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  // Estilos para diferentes direcciones de animación
  const getAnimationStyle = () => {
    let baseStyle = {
      opacity: isVisible ? 1 : 0,
      transition: `opacity 0.8s ease, transform 0.8s ease ${delay}s`,
    };

    switch (direction) {
      case 'left':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
        };
      case 'right':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateX(0)' : 'translateX(50px)',
        };
      case 'bottom':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        };
      case 'top':
        return {
          ...baseStyle,
          transform: isVisible ? 'translateY(0)' : 'translateY(-50px)',
        };
      default:
        return baseStyle;
    }
  };

  return (
    <div ref={ref} style={getAnimationStyle()}>
      {children}
    </div>
  );
};

// Videos de fallback en caso de error
const getFallbackVideos = (): VideoData[] => {
  return [
    {
      id: 'video1',
      youtubeId: 'dQw4w9WgXcQ', // Un ID real de YouTube (reemplazar con tus videos)
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg', // Thumbnail generado desde YouTube
      title: 'Energía sostenible para el futuro del Huila',
      description: 'Conoce nuestra visión para un futuro energético sostenible en el departamento del Huila y cómo estamos implementando tecnologías renovables.',
      duration: '3:45',
      category: 'Sostenibilidad',
      date: '10 de Marzo, 2025',
      views: '3.2K'
    },
    {
      id: 'video2',
      youtubeId: 'C0DPdy98e4c', // Otro ID real de YouTube (reemplazar con tus videos)
      thumbnail: 'https://img.youtube.com/vi/C0DPdy98e4c/maxresdefault.jpg', // Thumbnail generado desde YouTube
      title: 'Redes inteligentes: Modernizando nuestra infraestructura',
      description: 'Implementación de tecnología de punta para mejorar la calidad del servicio.',
      duration: '5:21',
      category: 'Tecnología',
      date: '5 de Marzo, 2025',
      views: '2.8K'
    },
    {
      id: 'video3',
      youtubeId: '9bZkp7q19f0', // Otro ID real de YouTube (reemplazar con tus videos)
      thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg', // Thumbnail generado desde YouTube
      title: 'Llevando energía a comunidades rurales',
      description: 'Nuestro compromiso con las zonas rurales del Huila para garantizar acceso a la energía.',
      duration: '4:10',
      category: 'Impacto Social',
      date: '28 de Febrero, 2025',
      views: '4.1K'
    },
    {
      id: 'video4',
      youtubeId: 'kJQP7kiw5Fk', // Otro ID real de YouTube (reemplazar con tus videos)
      thumbnail: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg', // Thumbnail generado desde YouTube
      title: 'Innovación energética para un futuro brillante',
      description: 'Proyectos innovadores que están transformando el sector energético en nuestra región.',
      duration: '6:32',
      category: 'Innovación',
      date: '20 de Febrero, 2025',
      views: '1.9K'
    }
  ];
};

// Tipo para las cards de acceso rápido
interface QuickCard {
  icon: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

// Tipo para noticias
interface NewsItem {
  img: string;
  alt: string;
  date: string;
  title: string;
  description: string;
}

const Home: React.FC = () => {
 // Estados para el modal de video
const [selectedVideo, setSelectedVideo] = useState<VideoData | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const modalRef = useRef<HTMLDivElement>(null);

// Estados para controlar la visibilidad del botón de pago
const [showPaymentButton, setShowPaymentButton] = useState(true);
const [isScrolling, setIsScrolling] = useState(false);
const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

// Estado para videos de YouTube
const [videos, setVideos] = useState<VideoData[]>([]);
const [isLoadingVideos, setIsLoadingVideos] = useState(true);
const [videoError, setVideoError] = useState<string | null>(null);

// AGREGAR ESTA LÍNEA:
const [showNewsNotification, setShowNewsNotification] = useState(true);
  // Cargar videos al inicio
  useEffect(() => {
    const loadVideos = async () => {
      try {
        setIsLoadingVideos(true);
        
        // Usar la función simplificada para obtener videos desde YouTube
        const youtubeVideos = getYouTubeVideosSimple();
        
        // También podrías usar la versión con API si la has configurado:
        // const youtubeVideos = await getYouTubeVideos(4);
        
        setVideos(youtubeVideos);
      } catch (error) {
        console.error('Error cargando videos:', error);
        setVideoError('No se pudieron cargar los videos. Por favor, intente nuevamente.');
        
        // Usar videos de fallback si hay un error
        setVideos(getFallbackVideos());
      } finally {
        setIsLoadingVideos(false);
      }
    };
    
    loadVideos();
  }, []);

  // Función para manejar el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      // Si hay scroll, ocultar el botón
      setIsScrolling(true);
      
      // Limpiar el timeout previo
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Configurar un nuevo timeout para mostrar el botón cuando el scroll se detiene
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800); // Espera 800ms después de que se detiene el scroll
    };
    
    // Añadir event listener para el scroll
    window.addEventListener('scroll', handleScroll);
    
    // Limpiar event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  // Manejar clic en video para abrir modal
  const handleVideoClick = (video: VideoData) => {
    if (!video) return;
    
    setSelectedVideo(video);
    setIsModalOpen(true);
    
    // Solo cambiar el overflow del body si no es móvil (para evitar salto en móviles)
    if (window.innerWidth > 768) {
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }
  };

  // Cerrar modal
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Restaurar scroll
  };

  // Detectar clic fuera del modal para cerrar
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

  // Manejador para tecla ESC para cerrar modal
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

  // Datos para las cards de acceso rápido
  const quickCards: QuickCard[] = [
    {
      icon: "/images/iconos/factura.png",
      alt: "Pago de facturas",
      title: "Pago de Facturas",
      description: "Paga tu factura de energía de forma rápida y segura por diferentes medios.",
      link: "https://pagos.electrohuila.com.co/",
      buttonText: "Pagar Ahora"
    },
    {
      icon: "/images/iconos/electro.png",
      alt: "Electrohuila en línea",
      title: "Electrohuila en Línea",
      description: "Accede a todos nuestros servicios digitales desde cualquier lugar.",
      link: "https://enlinea.electrohuila.com.co/",
      buttonText: "Ingresar"
    },
    {
      icon: "/images/iconos/tarifas-de-cajeros-automaticos.png",
      alt: "Tarifas",
      title: "Tarifas",
      description: "Consulta las tarifas vigentes para el servicio de energía eléctrica según tu tipo de usuario.",
      link: "/tarifas/",
      buttonText: "Consultar"
    },
    {
      icon: "/images/iconos/conversacion.png",
      alt: "Línea de transparencia",
      title: "Línea de Transparencia",
      description: "Canal confidencial para reportar casos de corrupción o conductas indebidas.",
      link: "/ley-de-transparencia",
      buttonText: "Reporte AQUÍ"
    },
    {
      icon: "/images/iconos/justicia.png",
      alt: "Notificaciones Judiciales",
      title: "Notificaciones Judiciales",
      description: "Recepción de comunicaciones y notificaciones judiciales oficiales.",
      link: "https://enlinea.electrohuila.com.co/notificacion-web/#",
      buttonText: "Consultar"
    }
  ];

  // Datos para las noticias
  const newsItems: NewsItem[] = [
    {
      img: "/images/mantenimiento.jpg",
      alt: "Noticia 1",
      date: "15 de Mayo, 2025",
      title: "Rendición de Cuentas de la vigencia 2024",
      description: "La Gerente de ElectroHuila Dra. Nika D. Cuellar invita a la Rendición de Cuentas 2024 de ElectroHuila. ¡Acompáñanos!."
    },
    {
      img: "/images/factura.jpg",
      alt: "Noticia 2",
      date: "19 de Mayo, 2025",
      title: "Entrenamiento de brigadas",
      description: "Entrenamiento de brigadas para reforzar respuesta ante emergencias con bomberos expertos."
    },
    {
      img: "/images/energia-reno.jpg",
      alt: "Noticia 3",
      date: "21 de Mayo, 2025",
      title: "Jornada de vacunación",
      description: "Participa en la jornada de vacunación y protege tu salud y la de tu familia. ¡Vacunarse es un acto de amor y prevención!."
    }
  ];
const FloatingKidsButtonInline = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '120px',
      left: '20px',
      zIndex: 1000,
      background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4, #f9ca24)',
      border: 'none',
      borderRadius: '50px',
      padding: '15px 20px',
      cursor: 'pointer',
      color: 'white',
      fontSize: '16px',
      fontWeight: 'bold',
      boxShadow: '0 10px 30px rgba(255, 107, 157, 0.4)',
      minWidth: '180px'
    }}
    onClick={() => window.location.href = '/electrohuila-kids'}
    >
      ⚡ ElectroHuila KIDS 🚀
    </div>
  );
};

  return (
    <>
      {/* Sección Hero con mensaje principal */}
      <section className="hero">
        <div className="container">
          <RevealElement direction="top">
            <h1>Electrificadora del Huila</h1>
          </RevealElement>
          <RevealElement direction="bottom" delay={0.2}>
            <p>Brindamos energía para el desarrollo de nuestra región con calidad, sostenibilidad y compromiso social.</p>
          </RevealElement>
          <RevealElement direction="bottom" delay={0.4}>
            <div className="hero-buttons">
              <Link href="https://enlinea.electrohuila.com.co/generate-invoice/" className="btn btn-primary">
                Consultar Factura
              </Link>
              <Link href="http://200.21.4.66:8070/ehfact2/" className="btn btn-secondary">
                Autogeneradores
              </Link>
            </div>
          </RevealElement>
        </div>
      </section>

      {/* Sección de acceso rápido */}
      <section className="quick-access">
        <div className="container">
          <div className="quick-access-cards">
            {/* Primeros 5 cards */}
            {quickCards.map((card, index) => (
              <RevealElement key={`card-${index}`} direction={index % 2 === 0 ? "left" : "right"} delay={0.1 * index}>
                <div className="quick-card">
                  <div className="icon-container">
                    <Image 
                      src={card.icon} 
                      alt={card.alt} 
                      width={60} 
                      height={60} 
                      className="card-icon animated-icon"
                    />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link href={card.link} className="btn-green">{card.buttonText}</Link>
                </div>
              </RevealElement>
            ))}
            
            {/* Card de Autogeneradores con el componente personalizado */}
            <RevealElement direction="right" delay={0.5}>
              <AutogeneradoresCard />
            </RevealElement>
          </div>
        </div>
      </section>

      {/* REEMPLAZO: Galería de Videos Institucionales en lugar de "Nuestros Servicios" */}
      <section className="video-gallery">
        <div className="container">
          <RevealElement direction="bottom">
            <div className="section-title">
              <h2>Galería de Videos Institucionales</h2>
              <p>Conoce nuestros proyectos, iniciativas y compromiso con la región a través de nuestros videos.</p>
            </div>
          </RevealElement>

          {/* Una sola fila con 4 columnas */}
          {isLoadingVideos ? (
            <div className="loading-videos">
              <div className="spinner"></div>
              <p>Cargando videos...</p>
            </div>
          ) : videoError ? (
            <div className="video-error">
              <p>{videoError}</p>
              <button 
                onClick={() => {
                  setVideoError(null);
                  setVideos(getFallbackVideos());
                }}
                className="retry-button"
              >
                Cargar videos de ejemplo
              </button>
            </div>
          ) : (
            <div className="single-row-gallery">
              {videos.map((video, index) => (
                <RevealElement key={`video-${video.id}-${index}`} direction="bottom" delay={0.1 * index}>
                  <div className="video-card" onClick={() => handleVideoClick(video)}>
                    <VideoThumbnail
                      thumbnailSrc={video.thumbnail}
                      title={video.title}
                      duration={video.duration}
                      previewVideoSrc={video.previewVideo}
                      category={video.category}
                    />
                    <div className="video-info">
                      <span className="video-category">{video.category}</span>
                      <h3>{video.title}</h3>
                      <div className="video-meta">
                        <span className="date">{video.date}</span>
                      </div>
                    </div>
                  </div>
                </RevealElement>
              ))}
            </div>
          )}

          <RevealElement direction="bottom" delay={0.3}>
            <div className="gallery-footer">
              <Link href="https://www.youtube.com/@ElectrificadoraDelHuila" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Ver Todos los Videos
              </Link>
            </div>
          </RevealElement>
        </div>

        {/* Modal para reproducción de video */}
        {isModalOpen && selectedVideo && (
          <div className="video-modal">
            <div className="modal-overlay" onClick={closeModal}></div>
            <div className="modal-content" ref={modalRef}>
              <button className="close-button" onClick={closeModal} aria-label="Cerrar video">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              <div className="video-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                  title={selectedVideo.title || "Video de Electrohuila"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="modal-video-info">
                <h3>{selectedVideo.title}</h3>
                <div className="modal-meta">
                  <span className="category">{selectedVideo.category}</span>
                  <span className="date">{selectedVideo.date}</span>
                  <span className="views">{selectedVideo.views} visualizaciones</span>
                </div>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Sección de noticias y actualizaciones */}
      <section className="updates">
        <div className="container">
          <RevealElement direction="bottom">
            <div className="section-title">
              <h2>Noticias y Actualizaciones</h2>
              <p>Mantente informado sobre nuestras actividades, proyectos y novedades.</p>
            </div>
          </RevealElement>
          <div className="news-grid">
            {newsItems.map((news, index) => (
              <RevealElement key={`news-${index}`} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 * index}>
                <div className="news-card">
                  <img src={news.img} alt={news.alt} />
                  <div className="news-content">
                    <div className="news-date">{news.date}</div>
                    <h3>{news.title}</h3>
                    <p>{news.description}</p>
                    <Link href="#" className="btn btn-primary">Leer Más</Link>
                  </div>
                </div>
              </RevealElement>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de llamado a la acción */}
      <section className="cta">
        <div className="container">
          <RevealElement direction="bottom">
            <h2>¿Necesitas ayuda con tu servicio?</h2>
            <p>Nuestro equipo de atención al cliente está disponible para atender tus inquietudes y solicitudes.</p>
            <Link href="#" className="btn btn-secondary">Contáctanos Ahora</Link>
          </RevealElement>
        </div>
      </section>

      {/* Botón flotante para pago de facturas */}
      {showPaymentButton && !isScrolling && (
        <div className="floating-payment-button">
          <a href="https://pagos.electrohuila.com.co/" className="payment-button">
            <div className="button-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
              </svg>
            </div>
            <span className="button-text">Paga tu Factura</span>
          </a>
          <button 
            className="close-payment-button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowPaymentButton(false);
            }}
            aria-label="Cerrar botón de pago"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      )}

      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsAppButton />
        <ElectroHuilaKidsButton />
      {/* NUEVA: Notificación de noticias */}
{/* NUEVA: Notificación de noticias profesional */}
      {/* NUEVA: Notificación de noticias profesional */}
      <NewsNotification
        image="/images/mantenimiento.jpg" // Cambia por tu imagen
        title="Rendición de Cuentas 2024 - ElectroHuila"
        description="La Gerente de ElectroHuila Dra. Nika D. Cuellar invita a la Rendición de Cuentas 2024. Conoce nuestros logros y proyecciones."
        link="https://electrohuila.com.co/rendicion-cuentas-2024"
        buttonText="Ver detalles"
        category="Evento Importante"
        autoHide={true}
        duration={10000} // 10 segundos
        isVisible={showNewsNotification}
        onClose={() => setShowNewsNotification(false)}
      />
    </>
  );
};

export default Home;