"use client";

import React from 'react';
import Image from 'next/image';

interface ChatButtonProps {
  iconSrc: string;
  alt: string;
  label: string;
  chatUrl: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ iconSrc, alt, label, chatUrl }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(chatUrl, '_blank');
  };

  return (
    <a href="#" onClick={handleClick} className="service-option">
      <Image 
        src={iconSrc} 
        alt={alt} 
        width={20} 
        height={20}
      />
      <span>{label}</span>
    </a>
  );
};

export default ChatButton;