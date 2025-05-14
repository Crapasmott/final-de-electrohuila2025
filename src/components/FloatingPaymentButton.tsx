"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, X } from 'lucide-react';

const FloatingPaymentButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Controlar la visibilidad basada en el scroll
  useEffect(() => {
    // Si el usuario ha cerrado el botón, respetamos esa elección
    if (isDismissed) return;
    
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
  }, [lastScrollY, isDismissed]);

  // Si el usuario cierra el botón, lo guardamos en localStorage
  const handleDismiss = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    
    // Guardar en localStorage para que permanezca cerrado incluso después de recargar
    if (typeof window !== 'undefined') {
      localStorage.setItem('paymentButtonDismissed', 'true');
    }
  };

  // Comprobar si el usuario ya había cerrado el botón anteriormente
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('paymentButtonDismissed') === 'true';
      setIsDismissed(dismissed);
    }
  }, []);

  // Si el usuario ha cerrado el botón, no lo mostramos
  if (isDismissed) {
    return null;
  }

  return (
    <div 
      className={`floating-payment-button ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99,
        transition: 'all 0.3s ease-in-out',
      }}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="relative inline-block">
        {/* Botón para cerrar */}
        <button 
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center cursor-pointer z-10 shadow-md"
          aria-label="Cerrar botón de pago"
        >
          <X size={14} />
        </button>
        
        {/* Botón de pago */}
        <Link 
          href="/pagos/pago-en-linea"
          className={`flex items-center bg-blue-600 text-white font-bold rounded-full transition-all duration-200 shadow-lg ${
            isExpanded ? 'py-3.5 px-6 scale-105 shadow-xl' : 'py-3 px-5'
          }`}
        >
          <CreditCard className="mr-2" size={20} />
          Pagar en línea
        </Link>
      </div>
    </div>
  );
};

export default FloatingPaymentButton;