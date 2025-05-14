"use client";

import React from 'react';
import Link from 'next/link';

// Interfaz para las propiedades de cada botón flotante
interface FloatingButtonProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  color?: string;
}

// Componente para cada botón flotante individual
const FloatingButton: React.FC<FloatingButtonProps> = ({ 
  href, 
  icon, 
  label,
  color = 'bg-blue-500 hover:bg-blue-600' 
}) => {
  return (
    <Link href={href}>
      <span className={`flex items-center justify-center ${color} text-white rounded-full p-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110`}>
        <span className="mr-2">{icon}</span>
        <span>{label}</span>
      </span>
    </Link>
  );
};

// Componente principal que contiene todos los botones flotantes
const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
      {/* Botón de chat */}
      <FloatingButton 
        href="https://chat.electrohuila.com.co"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>}
        label="Chat"
        color="bg-green-500 hover:bg-green-600"
      />
      
      {/* Botón de contacto */}
      <FloatingButton 
        href="mailto:contacto@electrohuila.com.co"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>}
        label="Contacto"
        color="bg-blue-500 hover:bg-blue-600"
      />
      
      {/* Botón de WhatsApp */}
      <FloatingButton 
        href="https://wa.me/573101234567"
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
        </svg>}
        label="WhatsApp"
        color="bg-green-600 hover:bg-green-700"
      />
    </div>
  );
};

export default FloatingButtons;