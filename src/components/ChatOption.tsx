"use client";

import React from 'react';
import Image from 'next/image';

const ChatOption = () => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://chat.electrohuila.com.co', '_blank');
  };

  return (
    <a href="#" onClick={handleClick} className="service-option">
      <Image 
        src="/images/iconos/chats.png" 
        alt="Chat" 
        width={20} 
        height={20}
      />
      <span>Chat</span>
    </a>
  );
};

export default ChatOption;