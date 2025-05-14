'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function FloatingServices() {
  const [showOptions, setShowOptions] = useState(false);
  
  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  
  const openChat = () => {
    window.open('https://chat.electrohuila.com.co', '_blank');
  };

  return (
    <div className="floating-services">
      <button 
        onClick={toggleOptions} 
        className="service-icon"
        aria-label="Mostrar opciones de servicio"
      >
        <Image 
          src="/icons/services-icon.png" 
          alt="Servicios" 
          width={24} 
          height={24} 
        />
        <span>Servicios</span>
      </button>
      
      {showOptions && (
        <div className="service-options">
          <Link href="mailto:contacto@electrohuila.com.co" className="service-option">
            <Image 
              src="/icons/email-icon.png" 
              alt="Correo" 
              width={20} 
              height={20}
            />
            <span>Correo</span>
          </Link>
          
          <button onClick={openChat} className="service-option">
            <Image 
              src="/icons/chat-icon.png" 
              alt="Chat" 
              width={20} 
              height={20}
            />
            <span>Chat</span>
          </button>
          
          <Link href="https://wa.me/573101234567" className="service-option">
            <Image 
              src="/icons/whatsapp-icon.png" 
              alt="WhatsApp" 
              width={20} 
              height={20}
            />
            <span>WhatsApp</span>
          </Link>
          
          <Link href="/pqr" className="service-option">
            <Image 
              src="/icons/pqr-icon.png" 
              alt="PQR" 
              width={20} 
              height={20}
            />
            <span>PQR</span>
          </Link>
        </div>
      )}
    </div>
  );
}