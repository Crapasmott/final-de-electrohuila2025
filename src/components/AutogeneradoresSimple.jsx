"use client";

import React, { useState } from 'react';
import Image from 'next/image';

export default function AutogeneradoresSimple() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="quick-card relative">
      <div className="icon-container">
        <Image 
          src="/images/iconos/identificacion.png" 
          alt="Autogeneradores" 
          width={60} 
          height={60} 
          className="card-icon animated-icon"
        />
      </div>
      <h3>Autogeneradores</h3>
      <p>Permiten al usuario gestionar de una manera eficiente los objetivos.</p>
      
      <div className="relative">
        <button 
          className="btn-green w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          Autogeneradores
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-lg mt-2 p-4 z-10">
            <p className="text-center font-medium text-sm mb-3">Seleccione un sistema:</p>
            
            <a 
              href="http://200.21.4.66:8070/ehfact2/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-blue-50 hover:bg-blue-100 p-3 rounded mb-2 transition-all hover:translate-y-[-2px]"
            >
              <div className="font-bold text-blue-900">Sistema EHFACT2</div>
              <div className="text-xs text-gray-600">Sistema de facturación eléctrica</div>
            </a>
            
            <a 
              href="http://35.184.36.98/solicitante/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-blue-50 hover:bg-blue-100 p-3 rounded transition-all hover:translate-y-[-2px]"
            >
              <div className="font-bold text-blue-900">Sistema Solicitante</div>
              <div className="text-xs text-gray-600">Portal para solicitantes</div>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}