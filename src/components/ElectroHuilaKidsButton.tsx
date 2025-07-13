'use client';

import React, { useState } from 'react';

const ElectroHuilaKidsButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
    window.open('https://kids.electrohuila.com.co/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed left-3 md:left-6 bottom-20 md:bottom-24 z-40">
      <button
        className={`
          relative overflow-hidden
          bg-gradient-to-r from-blue-400 via-blue-500 via-cyan-500 via-sky-400 to-blue-600
          text-white font-bold text-sm md:text-lg
          px-3 py-2 md:px-6 md:py-3 rounded-full
          shadow-2xl hover:shadow-blue-500/40
          transition-all duration-500 ease-out
          transform hover:scale-105 md:hover:scale-110
          animate-pulse hover:animate-none
          border-2 md:border-4 border-white/30
          backdrop-blur-sm
          cursor-pointer
          ${isHovered ? 'rotate-2' : 'rotate-0'}
          ${isClicked ? 'scale-95' : ''}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        aria-label="Ir a KIDS - Plataforma educativa"
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out animate-shimmer"></div>
        
        {/* Partículas flotantes - Solo en desktop */}
        <div className="absolute inset-0 overflow-hidden rounded-full hidden md:block">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 md:w-1.5 md:h-1.5 bg-yellow-300 rounded-full opacity-80
                animate-bounce
              `}
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${1 + i * 0.1}s`
              }}
            />
          ))}
        </div>

        {/* Contenido del botón */}
        <div className="relative flex items-center gap-2 md:gap-3">
          {/* 🎯 IMAGEN DE LUZILA ANIMADA */}
          <div className={`
            relative
            w-8 h-8 md:w-12 md:h-12
            transform transition-all duration-300
            ${isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}
          `}>
            {/* Aura de energía alrededor de Luzila */}
            <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 rounded-full opacity-30 animate-ping"></div>
            <div className="absolute -inset-0.5 md:-inset-1 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
            
            {/* Imagen de Luzila */}
            <img 
              src="/images/luzila.png" 
              alt="Luzila - Guardiana ElectroHuila" 
              className={`
                w-full h-full object-contain 
                transition-all duration-300 
                ${isHovered ? 'brightness-110 drop-shadow-lg' : 'brightness-105'}
                ${isClicked ? 'scale-90' : ''}
              `}
              style={{
                filter: `
                  drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))
                  drop-shadow(0 0 12px rgba(34, 197, 94, 0.4))
                  ${isHovered ? 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.8))' : ''}
                `,
                animation: isHovered ? 'lucilaFloat 2s ease-in-out infinite' : 'none'
              }}
              onError={(e) => {
                // Fallback si no encuentra la imagen
                e.currentTarget.style.display = 'none';
                const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                if (next) next.style.display = 'block';
              }}
            />
            
            {/* Fallback emoji si no carga la imagen */}
            <div className="hidden w-full h-full flex items-center justify-center text-2xl md:text-4xl animate-bounce">
              ⚡
            </div>
            
            {/* Chispas alrededor de Luzila */}
            {isHovered && (
              <>
                <div className="absolute -top-2 -right-1 text-yellow-400 text-xs md:text-sm animate-ping">✨</div>
                <div className="absolute -bottom-1 -left-1 text-blue-400 text-xs animate-pulse">💫</div>
                <div className="absolute top-1/2 -right-2 text-green-400 text-xs animate-bounce">⭐</div>
              </>
            )}
          </div>
          
          <span className="font-extrabold tracking-wide text-lg md:text-xl leading-tight text-yellow-300">
            KIDS
          </span>
          
          {/* Icono de estrella parpadeante - Solo en desktop */}
          <div className="text-sm md:text-xl animate-ping hidden md:block">
            ✨
          </div>
        </div>

        {/* Ondas de energía - Más sutiles en móvil */}
        <div className="absolute -inset-1 md:-inset-2 rounded-full border-1 md:border-2 border-cyan-300/60 animate-ping"></div>
        <div className="absolute -inset-2 md:-inset-4 rounded-full border-1 md:border-2 border-blue-300/40 animate-ping" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute -inset-3 md:-inset-6 rounded-full border-1 border-yellow-300/30 animate-ping hidden md:block" style={{animationDelay: '1s'}}></div>
      </button>

      {/* Texto flotante mejorado - Solo en desktop */}
      <div className={`
        absolute left-full ml-4 top-1/2 transform -translate-y-1/2
        bg-gradient-to-r from-white to-blue-50 text-blue-600 px-4 py-3 rounded-xl shadow-xl
        font-bold text-sm whitespace-nowrap
        transition-all duration-300 ease-out
        hidden md:block
        border-2 border-blue-200
        ${isHovered ? 'opacity-100 translate-x-0 scale-105' : 'opacity-0 -translate-x-4 scale-95'}
      `}>
        <div className="flex items-center gap-2">
          <span>¡Diversión y aprendizaje!</span>
          <div className="text-lg animate-bounce">🎮</div>
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
        
        {/* Efectos de partículas en el tooltip */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60 animate-ping"
              style={{
                left: `${20 + i * 30}%`,
                top: `${30 + i * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Rastro de energía cuando se hace hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse"
              style={{
                left: `${-20 - i * 8}px`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
        
        @keyframes lucilaFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-3px) rotate(2deg); }
          50% { transform: translateY(-2px) rotate(0deg); }
          75% { transform: translateY(-1px) rotate(-1deg); }
        }
        
        @keyframes energyPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-luzila-float {
          animation: lucilaFloat 2s ease-in-out infinite;
        }
        
        .animate-energy-pulse {
          animation: energyPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ElectroHuilaKidsButton;