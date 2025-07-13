'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const BoletinesComunicadosSection = () => {
  const router = useRouter();
  
  // Estados del componente
  const [boletines, setBoletines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para el slider
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Función para obtener datos de WordPress
  const fetchBoletines = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        'https://www.electrohuila.com.co/wp-json/wp/v2/posts?categories=53&per_page=12&status=publish'
      );
      
      if (!response.ok) {
        throw new Error('Error al cargar datos');
      }
      
      const posts = await response.json();
      
      // Procesar los datos y filtrar inteligentemente
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      
      // DEBUG: Ver todos los posts antes de filtrar
      console.log('🔍 ANÁLISIS COMPLETO:', {
        totalPosts: posts.length,
        fechaCorte: twoWeeksAgo.toLocaleDateString('es-ES'),
        todosLosPosts: posts.map(post => ({
          id: post.id,
          titulo: post.title.rendered,
          fecha: new Date(post.date).toLocaleDateString('es-ES'),
          tipo: post.title.rendered.toUpperCase().includes('BOLETÍN') || 
                post.title.rendered.toUpperCase().includes('BOLETIN') ? 'BOLETÍN' : 'COMUNICADO',
          esReciente: new Date(post.date) >= twoWeeksAgo
        }))
      });
      
      const processedData = posts
        .map(post => ({
          id: post.id,
          title: post.title.rendered,
          date: new Date(post.date).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          originalDate: new Date(post.date),
          type: post.title.rendered.toUpperCase().includes('BOLETÍN') || 
                post.title.rendered.toUpperCase().includes('BOLETIN') ? 'boletin' : 'comunicado',
          link: post.link,
          content: post.content.rendered
        }))
        .filter(post => {
          // LÓGICA TEMPORAL: Mostrar TODOS (boletines y comunicados) por ahora
          console.log(`📋 Evaluando: ${post.title} - Tipo: ${post.type} - Fecha: ${post.date}`);
          return true; // Temporalmente mostrar todos para debug
        })
        .slice(0, 8); // Máximo 8 items total
      
      setBoletines(processedData);
      
      // DEBUG: Verificar qué tipos hay en el slider
      console.log('📊 Contenido del slider:', {
        total: processedData.length,
        boletines: processedData.filter(p => p.type === 'boletin').length,
        comunicados: processedData.filter(p => p.type === 'comunicado').length,
        items: processedData.map(p => ({ titulo: p.title, tipo: p.type, fecha: p.date }))
      });
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchBoletines();
  }, []);

  // Actualización automática cada 2 minutos
  useEffect(() => {
    const interval = setInterval(fetchBoletines, 120000);
    return () => clearInterval(interval);
  }, []);

  // Datos de respaldo con MÁS comunicados recientes
  const fallbackData = [
    {
      id: 1,
      title: "Boletín de Prensa Semana 27",
      date: "27 de junio, 2025",
      type: 'boletin',
      link: "#"
    },
    {
      id: 2,
      title: "Comunicado Emergencia Neiva",
      date: "25 de junio, 2025", 
      type: 'comunicado',
      link: "#"
    },
    {
      id: 3,
      title: "Comunicado Emergencia Garzón",
      date: "24 de junio, 2025",
      type: 'comunicado',
      link: "#"
    },
    {
      id: 4,
      title: "Comunicado Suspensión Programada",
      date: "23 de junio, 2025",
      type: 'comunicado',
      link: "#"
    },
    {
      id: 5,
      title: "Boletín de Prensa Semana 26",
      date: "20 de junio, 2025",
      type: 'boletin',
      link: "#"
    },
    {
      id: 6,
      title: "Comunicado Mantenimiento Red Eléctrica",
      date: "18 de junio, 2025",
      type: 'comunicado',
      link: "#"
    },
    {
      id: 7,
      title: "Boletín de Prensa Semana 25",
      date: "15 de junio, 2025",
      type: 'boletin',
      link: "#"
    },
    {
      id: 8,
      title: "Comunicado Emergencia Rivera",
      date: "12 de junio, 2025",
      type: 'comunicado',
      link: "#"
    }
  ];

  // Usar datos reales o fallback
  const displayData = boletines.length > 0 ? boletines : fallbackData;

  // ⚡ SLIDER AUTOMÁTICO
  useEffect(() => {
    if (!isSliderHovered && displayData.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % Math.ceil(displayData.length / getItemsPerSlide()));
      }, 4000); // Cambiar cada 4 segundos
      
      return () => clearInterval(interval);
    }
  }, [isSliderHovered, displayData.length]);

  // Función para obtener items por slide según el tamaño de pantalla
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1200) return 3; // Desktop: 3 items
      if (window.innerWidth >= 768) return 2;  // Tablet: 2 items
      return 1; // Mobile: 1 item
    }
    return 3; // Default
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Actualizar items por slide en resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };
    
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para navegar el slider
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % Math.ceil(displayData.length / itemsPerSlide));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev === 0 ? Math.ceil(displayData.length / itemsPerSlide) - 1 : prev - 1);
  };

  // Función para obtener el icono según el tipo
  const getIcon = (type) => {
    return type === 'boletin' ? '📢' : '📋';
  };

  // Función para truncar títulos largos
  const truncateTitle = (title, maxLength = 50) => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  // Función para manejar click en comunicados/boletines
  const handleItemClick = (itemId) => {
    router.push(`/comunicados/${itemId}`);
  };

  const totalSlides = Math.ceil(displayData.length / itemsPerSlide);

  return (
    <section 
      style={{
        padding: '80px 0',
        backgroundColor: '#f8f9fa',
        overflow: 'hidden'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Título de la sección */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '1rem'
          }}>
            Boletines y Comunicados
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#6c757d',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Mantente informado con nuestros boletines semanales y comunicados importantes de las últimas 2 semanas.
          </p>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{
              display: 'inline-block',
              width: '40px',
              height: '40px',
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #3574a0',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}></div>
            <p style={{ marginTop: '20px', color: '#6c757d' }}>Cargando boletines y comunicados...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#856404', margin: 0 }}>
              ⚠️ Error al cargar datos: {error}. Mostrando información de ejemplo.
            </p>
          </div>
        )}

        {/* 🎠 SLIDER CONTAINER */}
        <div 
          style={{
            position: 'relative',
            marginBottom: '50px'
          }}
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
        >
          
          {/* Slider wrapper */}
          <div style={{
            overflow: 'hidden',
            borderRadius: '12px'
          }}>
            <div
              style={{
                display: 'flex',
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.5s ease-in-out',
                gap: '25px'
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div
                  key={slideIndex}
                  style={{
                    minWidth: '100%',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${itemsPerSlide}, 1fr)`,
                    gap: '25px'
                  }}
                >
                  {displayData
                    .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                    .map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        padding: '25px',
                        border: '1px solid #e9ecef',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: '280px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-5px)';
                        e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                      }}
                      onClick={() => handleItemClick(item.id)}
                    >
                      {/* Icono y tipo */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '15px'
                      }}>
                        <span style={{
                          fontSize: '24px',
                          marginRight: '10px'
                        }}>
                          {getIcon(item.type)}
                        </span>
                        <span style={{
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          color: item.type === 'boletin' ? '#3574a0' : '#28a745',
                          backgroundColor: item.type === 'boletin' ? '#e3f2fd' : '#e8f5e8',
                          padding: '4px 8px',
                          borderRadius: '4px'
                        }}>
                          {item.type === 'boletin' ? 'Boletín' : 'Comunicado'}
                        </span>
                      </div>

                      {/* Título */}
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#2c3e50',
                        marginBottom: '12px',
                        lineHeight: '1.4',
                        flex: 1
                      }}>
                        {truncateTitle(item.title)}
                      </h3>

                      {/* Fecha */}
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#6c757d',
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: 'auto'
                      }}>
                        <span style={{ marginRight: '8px' }}>📅</span>
                        {item.date}
                      </p>

                      {/* Indicador de enlace interno */}
                      <div style={{
                        marginTop: '15px',
                        fontSize: '0.85rem',
                        color: '#3574a0',
                        fontWeight: '500'
                      }}>
                        Ver más →
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Controles del slider - Solo mostrar si hay más de un slide */}
          {totalSlides > 1 && (
            <>
              {/* Botón anterior */}
              <button
                onClick={prevSlide}
                style={{
                  position: 'absolute',
                  left: '-15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  border: '2px solid #3574a0',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#3574a0',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3574a0';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#3574a0';
                }}
              >
                ‹
              </button>

              {/* Botón siguiente */}
              <button
                onClick={nextSlide}
                style={{
                  position: 'absolute',
                  right: '-15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'white',
                  border: '2px solid #3574a0',
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  color: '#3574a0',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#3574a0';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = '#3574a0';
                }}
              >
                ›
              </button>

              {/* Indicadores (puntos) */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '30px'
              }}>
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: currentSlide === index ? '#3574a0' : '#d1d5db',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      transform: currentSlide === index ? 'scale(1.2)' : 'scale(1)'
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Botón Ver Todos los Boletines */}
        <div style={{ textAlign: 'center' }}>
          <button
            style={{
              backgroundColor: isHovering ? '#2c5f85' : '#3574a0',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 8px rgba(53, 116, 160, 0.3)',
              transform: isHovering ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => {
              // Navegar a la página de comunicados
              router.push('/comunicados');
            }}
          >
            Ver Todos los Boletines
          </button>
        </div>
      </div>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .slider-controls {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BoletinesComunicadosSection;