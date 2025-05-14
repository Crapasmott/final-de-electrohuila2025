'use client';

import { useState, useRef, useEffect } from 'react';

interface EnhancedContactButtonProps {
  position?: 'static' | 'fixed' | 'absolute' | 'relative';
  whatsappNumber?: string;
  email?: string;
  phone?: string;
  chatUrl?: string;
}

const EnhancedContactButton: React.FC<EnhancedContactButtonProps> = ({ 
  position = "static", 
  whatsappNumber = "573123456789", // Reemplaza con tu número real
  email = "contacto@electrohuila.com", // Reemplaza con tu correo
  phone = "018000912438", // Reemplaza con tu teléfono
  chatUrl = "/chat" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Cerrar el panel cuando se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Formatear número de teléfono para mostrar
  const formatPhone = (phoneNumber: string) => {
    if (phoneNumber.startsWith("57")) {
      return phoneNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "($1) $2 $3 $4");
    }
    return phoneNumber;
  };
  
  // Formatear número para WhatsApp
  const whatsappText = encodeURIComponent("Hola, me comunico desde la página web para...");
  
  return (
    <div 
      className={`contact-button-container ${isOpen ? 'active' : ''}`} 
      ref={containerRef}
      style={{ position: position !== "static" ? position : "static" }}
    >
      {/* Botón principal */}
      <button 
        className="contact-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Opciones de contacto"
      >
        <span className="contact-button-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c0-.001 0-.002 0-.004 0-.28-.22-.54-.48-.73A12.5 12.5 0 0 0 8 3.5a12.5 12.5 0 0 0-4.52 1.267c-.26.18-.48.452-.48.73 0 .003 0 .004 0 .004v.002z"/>
          </svg>
        </span>
        <span className="contact-button-text">Contáctanos</span>
      </button>
      
      {/* Panel de opciones */}
      <div className="contact-options-panel">
        <div className="panel-title">¿Cómo prefieres contactarnos?</div>
        
        {/* Opción de WhatsApp */}
        <a 
          href={`https://wa.me/${whatsappNumber}?text=${whatsappText}`} 
          className="contact-option option-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="option-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
            </svg>
          </div>
          <div className="option-text">
            <span className="option-label">WhatsApp</span>
            <span className="option-desc">Respuesta inmediata</span>
          </div>
        </a>
        
        {/* Opción de Correo */}
        <a 
          href={`mailto:${email}?subject=Contacto desde la página web`} 
          className="contact-option option-email"
        >
          <div className="option-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
            </svg>
          </div>
          <div className="option-text">
            <span className="option-label">Correo Electrónico</span>
            <span className="option-desc">{email}</span>
          </div>
        </a>
        
        {/* Opción de Teléfono */}
        <a 
          href={`tel:${phone}`} 
          className="contact-option option-phone"
        >
          <div className="option-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
            </svg>
          </div>
          <div className="option-text">
            <span className="option-label">Línea de Atención</span>
            <span className="option-desc">{formatPhone(phone)}</span>
          </div>
        </a>
        
        {/* Opción de Chat */}
        <a 
          href={chatUrl} 
          className="contact-option option-chat"
        >
          <div className="option-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
            </svg>
          </div>
          <div className="option-text">
            <span className="option-label">Chat en Vivo</span>
            <span className="option-desc">Habla con nuestro equipo</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default EnhancedContactButton;