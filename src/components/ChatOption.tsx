"use client";

import React from 'react';
import Image from 'next/image';

const ChatOption = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://reporte.lineatransparencia.co/electrohuila', '_blank');
  };

  return (
    <a href="#" onClick={handleClick} className="service-option">
      <Image 
        src="/images/iconos/soborno.png" 
        alt="Chat" 
        width={20} 
        height={20}
      />
      <span>Denuncia actos de Corrupción</span>
    </a>
  );
};

export default ChatOption;