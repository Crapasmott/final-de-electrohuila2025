
'use client';

import Link from 'next/link';
import Image from 'next/image';
import ChatOption from '../components/ChatOption';
import { useState, useEffect, useRef } from 'react';

// Componente de Revelado para elementos que aparecen con animación
const RevealElement = ({ children, direction = 'bottom', delay = 0, threshold = 0.1 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

export default function Home() {
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
            <Link href="https://enlinea.electrohuila.com.co/generate-invoice/" className="btn btn-primary">Consultar Factura</Link>
          </RevealElement>
        </div>
      </section>

      {/* Sección de acceso rápido */}
      <section className="quick-access">
        <div className="container">
          <div className="quick-access-cards">
            {[
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
                icon: "/images/iconos/solicitud-de-cotizacion.png",
                alt: "Solicitudes AGPE",
                title: "Solicitudes de Generación",
                description: "La resolución CREG 174 publica en el diario oficio el 23 de noviembre del 2021.",
                link: "http://35.184.36.98/solicitante/",
                buttonText: "Solicitudes AGPE"
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
              },
              {
                icon: "/images/iconos/identificacion.png",
                alt: "Autogeneradores",
                title: "Autogeneradores",
                description: "Permiten al usuario gestionar de una manera eficiente los objetivos.",
                link: "http://200.21.4.66:8070/ehfact2/",
                buttonText: "Autogeneradores"
              },
            ].map((card, index) => (
              <RevealElement key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.1 * index}>
                <div className="quick-card">
                  <div className="icon-container">
                    <Image 
                      src={card.icon} 
                      alt={card.alt} 
                      width={48} 
                      height={48} 
                      className="card-icon animated-icon"
                    />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <Link href={card.link} className="btn-green">{card.buttonText}</Link>
                </div>
              </RevealElement>
            ))}
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="main-content">
        <div className="container">
          <RevealElement direction="bottom">
            <div className="section-title">
              <h2>Nuestros Servicios</h2>
              <p>Conoce todos los servicios que ofrecemos para nuestros usuarios y clientes.</p>
            </div>
          </RevealElement>
          <div className="services">
            {[
              {
                img: "/images/imgelectrica.jpg",
                alt: "Servicios Residenciales",
                title: "Servicios Residenciales",
                description: "Ofrecemos servicios confiables de energía eléctrica para todos los hogares del Huila."
              },
              {
                img: "/images/imgelectrica.jpg",
                alt: "Servicios Comerciales",
                title: "Servicios Comerciales",
                description: "Soluciones energéticas para negocios, oficinas y establecimientos comerciales."
              },
              {
                img: "/images/imgelectrica.jpg",
                alt: "Servicios Industriales",
                title: "Servicios Industriales",
                description: "Energía de alta calidad para el sector industrial con planes especializados."
              }
            ].map((service, index) => (
              <RevealElement key={index} direction="bottom" delay={0.2 * index}>
                <div className="service-card">
                  <img src={service.img} alt={service.alt} />
                  <div className="service-content">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <Link href="#" className="btn btn-primary">Ver Más</Link>
                  </div>
                </div>
              </RevealElement>
            ))}
          </div>
        </div>
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
            {[
              {
                img: "/images/mantenimiento.jpg",
                alt: "Noticia 1",
                date: "20 de Febrero, 2025",
                title: "Mantenimiento programado en sector norte",
                description: "Se realizará mantenimiento preventivo en redes del sector norte. Conozca los horarios y zonas afectadas."
              },
              {
                img: "/images/factura.jpg",
                alt: "Noticia 2",
                date: "15 de Febrero, 2025",
                title: "Nuevo sistema de facturación digital",
                description: "Implementamos un nuevo sistema de facturación digital para mejorar la experiencia de nuestros usuarios."
              },
              {
                img: "/images/energia-reno.jpg",
                alt: "Noticia 3",
                date: "10 de Febrero, 2025",
                title: "Programa de energías renovables",
                description: "Conoce nuestro nuevo programa de implementación de energías renovables para el departamento."
              }
            ].map((news, index) => (
              <RevealElement key={index} direction={index % 2 === 0 ? "left" : "right"} delay={0.2 * index}>
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

      {/* Botón flotante de servicios con opciones desplegables */}
      <div className="floating-services">
        <div className="service-button">
          <div className="service-icon">
            <Image 
              src="/images/iconos/atencion-al-cliente.png" 
              alt="Servicios" 
              width={24} 
              height={24} 
            />
            <span>Contactanos</span>
          </div>
          
          <div className="service-options">
            <a href="mailto:contacto@electrohuila.com.co" className="service-option">
              <Image 
                src="/images/iconos/enviar-correo.png" 
                alt="Correo" 
                width={20} 
                height={20}
              />
              <span>Correo</span>
            </a>
            
            
            {/* Aquí reemplazamos el enlace con onClick por el componente cliente */}
            <ChatOption />
            
            <a href="https://wa.me/573134354436" className="service-option">
              <Image 
                src="/images/iconos/whatsapp.png" 
                alt="WhatsApp" 
                width={20} 
                height={20}
              />
              <span>WhatsApp</span>
            </a>
            
            <a href="https://enlinea.electrohuila.com.co/home/" className="service-option">
              <Image 
                src="/images/iconos/quejarse.png" 
                alt="PQR" 
                width={20} 
                height={20}
              />
              <span>PQR</span>
            </a>
          </div>
        </div>
      </div>

      <Link href="https://pagos.electrohuila.com.co/" className="fixed-pay-btn">
        <Image 
          src="/images/iconos/factura.png" 
          alt="Pagar factura" 
          width={24} 
          height={24} 
          className="mr-2"
        />
        <span className="hidden sm:inline">Pagar Factura</span>
      </Link>

      {/* Estilos globales para animaciones */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}