'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import AutogeneradoresCard from '../components/AutogeneradoresCard';
import ChatOption from '../components/ChatOption';
import styles from '../styles/Home.module.css';
// *** COMENTADO: Ya no necesitamos el servicio estático ***
// import { getYouTubeVideosSimple } from '../lib/youtubeService';
import FloatingWhatsAppButton from '../components/FloatingWhatsAppButton';
import ElectroHuilaKidsButton from '../components/ElectroHuilaKidsButton';
import NewsNotification from '../components/NewsNotification';
// *** NUEVO: Componente de YouTube automático ***
import YouTubeGallery from '../components/YouTubeGallery';
// *** NUEVO: Componente de Boletines y Comunicados ***
import BoletinesComunicadosSection from '../components/BoletinesComunicadosSection';

// Definición de interfaces para TypeScript (mantenidas para compatibilidad)
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

// Componente VideoThumbnail (mantenido para compatibilidad, pero ya no se usa)
const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ 
  thumbnailSrc, 
  title, 
  duration, 
  previewVideoSrc = null,
  category,
  onClick = () => {}
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const previewRef = useRef<HTMLVideoElement>(null);
  const thumbnailRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
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
      {!isLoaded && (
        <div className="loading-pulse"></div>
      )}
      
      <img 
        ref={thumbnailRef}
        src={thumbnailSrc} 
        alt={title || 'Video thumbnail'}
        className="thumbnail"
        onLoad={handleThumbnailLoad}
      />
      
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
      
      <div className="overlay">
        <div className="video-category">{category}</div>
        <h3 className="title">{title}</h3>
        <div className="duration">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-0.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span>{duration}</span>
        </div>
      </div>
      
      <div className="play-button-wrapper">
        <div className={`play-button ${isHovering ? 'active' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
      
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

// Tipo para las cards de acceso rápido
interface QuickCard {
  icon: string;
  alt: string;
  title: string;
  description: string;
  link: string;
  buttonText: string;
}

const Home: React.FC = () => {
  // Estados para controlar la visibilidad del botón de pago
  const [showPaymentButton, setShowPaymentButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Estado para notificaciones
  const [showNewsNotification, setShowNewsNotification] = useState(true);

  // Función para manejar el evento de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

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
            
            <RevealElement direction="right" delay={0.5}>
              <AutogeneradoresCard />
            </RevealElement>
          </div>
        </div>
      </section>

      {/* *** NUEVO: Galería de Videos Institucionales con YouTube AUTOMÁTICO *** */}
      <YouTubeGallery 
        maxVideos={4}
        autoRefresh={true}
        refreshInterval={30}
        showRefreshButton={true}
      />

      {/* *** NUEVO: Boletines y Comunicados *** */}
      <BoletinesComunicadosSection />

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
      
      {/* Notificación de noticias */}
      <NewsNotification
        image="/images/mantenimiento.jpg"
        title="Rendición de Cuentas 2024 - ElectroHuila"
        description="La Gerente de ElectroHuila Dra. Nika D. Cuellar invita a la Rendición de Cuentas 2024. Conoce nuestros logros y proyecciones."
        link="https://electrohuila.com.co/rendicion-cuentas-2024"
        buttonText="Ver detalles"
        category="Evento Importante"
        autoHide={true}
        duration={10000}
        isVisible={showNewsNotification}
        onClose={() => setShowNewsNotification(false)}
      />
    </>
  );
};

export default Home;