"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Header() {
  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const buttonRef = useRef(null);

  // Función para alternar el menú móvil
  const toggleMobileMenu = () => {
    console.log("Toggling menu"); // Para depuración
    setIsMenuOpen(prevState => !prevState);
  };

  // Efecto para controlar el scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  // Cerrar el menú cuando la pantalla se hace grande
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Asegurar que el menú y el botón se muestran/ocultan correctamente en móvil
  useEffect(() => {
    const updateMobileStyles = () => {
      const isMobile = window.innerWidth <= 768;
      const mobileButton = buttonRef.current;
      const desktopNav = document.querySelector('.desktop-nav');
      
      if (mobileButton && desktopNav) {
        mobileButton.style.display = isMobile ? 'block' : 'none';
        desktopNav.style.display = isMobile ? 'none' : 'flex';
      }
    };
    
    // Ejecutar inmediatamente y en cada cambio de tamaño
    updateMobileStyles();
    window.addEventListener('resize', updateMobileStyles);
    return () => window.removeEventListener('resize', updateMobileStyles);
  }, []);

  // Lista de elementos del menú
  const menuItems = [
    { title: 'Inicio', path: '/' },
    { title: 'Nuestra Empresa', path: '/institucional' },
    { title: 'Servicios', path: '/servicios' },
    { title: 'Proveedores', path: '/proveedores-contratistas' },
    { title: 'Transparencia', path: '/ley-de-transparencia' },
    { title: 'Contáctenos', path: '/contactenos' }
  ];

  return (
    <header>
      {/* Parte superior del header */}
      <div className="top-header">
        <div className="top-header-container">
          <div className="contact-info">
            <span className="contact-item">
              <Phone size={16} style={{ marginRight: '5px' }} />
              <span className="contact-label">Línea de Atención: </span>018000 911 247
            </span>
            <span className="contact-item">
              <Mail size={16} style={{ marginRight: '5px' }} />
              contacto@electrohuila.com.co
            </span>
          </div>
          <div className="social-icons">
            <a href="#" style={{ color: 'white' }}>
              <Facebook size={18} />
            </a>
            <a href="#" style={{ color: 'white' }}>
              <Twitter size={18} />
            </a>
            <a href="#" style={{ color: 'white' }}>
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Parte principal del header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div>
          <Link href="/">
            <img src="/images/logo-eh.png.webp" alt="Logo Electrohuila" style={{ height: '50px' }} />
          </Link>
        </div>

        {/* Botón para móvil */}
        <button 
          ref={buttonRef}
          className="mobile-menu-button"
          onClick={toggleMobileMenu} 
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            display: 'none',
            padding: '10px',
            touchAction: 'manipulation', // Mejora para dispositivos táctiles
            WebkitTapHighlightColor: 'transparent' // Elimina el resaltado en iOS
          }}
          aria-label="Menú"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú de navegación para escritorio */}
        <nav className="desktop-nav" style={{ display: 'flex' }}>
          <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '20px' }}>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link href={item.path} style={{ color: '#333', textDecoration: 'none', fontWeight: '500' }}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menú para móvil */}
        {isMenuOpen && (
          <div 
            className="mobile-menu"
            style={{ 
              position: 'fixed', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundColor: 'white',
              zIndex: 1000,
              paddingTop: '60px',
              overflowY: 'auto'
            }}
          >
            {/* Botón para cerrar en la parte superior del menú móvil */}
            <button 
              onClick={toggleMobileMenu}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '10px',
                touchAction: 'manipulation'
              }}
            >
              <X size={24} />
            </button>
            
            <ul style={{ listStyle: 'none', padding: '0 20px', margin: 0 }}>
              {menuItems.map((item, index) => (
                <li key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                  <Link 
                    href={item.path} 
                    onClick={toggleMobileMenu}
                    style={{ 
                      color: '#333', 
                      textDecoration: 'none', 
                      fontSize: '18px', 
                      display: 'block', 
                      padding: '10px 0',
                      touchAction: 'manipulation'
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}