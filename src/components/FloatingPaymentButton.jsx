"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';

export default function FloatingPaymentButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Controlar la visibilidad basada en el scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Ocultar cuando se desplaza hacia abajo, mostrar cuando se desplaza hacia arriba
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // Siempre mostrar en la parte superior e inferior de la página
      if (currentScrollY < 100 || currentScrollY + window.innerHeight > document.body.scrollHeight - 100) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`floating-payment-button ${isVisible ? 'visible' : 'hidden'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99,
        transition: 'all 0.3s ease-in-out',
        transform: isVisible ? 'translateY(0)' : 'translateY(100px)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Link 
        href="/pagos/pago-en-linea"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#0066cc',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '50px',
          boxShadow: '0 4px 10px rgba(0, 102, 204, 0.3)',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0052a3'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0066cc'}
      >
        <CreditCard size={20} style={{ marginRight: '8px' }} />
        Pagar en línea
      </Link>
    </div>
  );
}