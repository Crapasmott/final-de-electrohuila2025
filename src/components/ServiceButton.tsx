"use client";

import React from 'react';
import Image from 'next/image';

const ServiceButton = () => {
  const handleChatClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://chat.electrohuila.com.co', '_blank');
  };

  return (
    <div className="floating-services">
      <div className="service-button">
        <div className="service-icon">
          <Image 
            src="/icons/services-icon.png" 
            alt="Servicios" 
            width={24} 
            height={24} 
          />
          <span>Servicios</span>
        </div>
        
        <div className="service-options">
          <a href="mailto:contacto@electrohuila.com.co" className="service-option">
            <Image 
              src="/icons/email-icon.png" 
              alt="Correo" 
              width={20} 
              height={20}
            />
            <span>Correo</span>
          </a>
          
          <a href="#" onClick={handleChatClick} className="service-option">
            <Image 
              src="/icons/chat-icon.png" 
              alt="Chat" 
              width={20} 
              height={20}
            />
            <span>Chat</span>
          </a>
          
          <a href="https://wa.me/573101234567" className="service-option">
            <Image 
              src="/icons/whatsapp-icon.png" 
              alt="WhatsApp" 
              width={20} 
              height={20}
            />
            <span>WhatsApp</span>
          </a>
          
          <a href="/pqr" className="service-option">
            <Image 
              src="/icons/pqr-icon.png" 
              alt="PQR" 
              width={20} 
              height={20}
            />
            <span>PQR</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceButton;