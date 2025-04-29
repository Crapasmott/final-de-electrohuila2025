'use client';

import { useState } from 'react';

export function BarraBusqueda({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Importante: prevenir el comportamiento por defecto
    if (onSearch) {
      onSearch(searchTerm);
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        maxWidth: '400px',
        margin: '0 auto',
        marginTop: '16px'
      }}
    >
      <div style={{ position: 'relative', flexGrow: 1 }}>
        {/* Icono de búsqueda con pointer-events: none para evitar que capture clics */}
        <div 
          style={{ 
            position: 'absolute', 
            left: '10px', 
            top: '50%', 
            transform: 'translateY(-50%)',
            pointerEvents: 'none' // Asegura que no capture clicks
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" 
              stroke="#9CA3AF" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        
        {/* Input mejor configurado */}
        <input
          type="text"
          placeholder="Buscar por municipio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 8px 8px 36px',
            border: '1px solid #e2e8f0', // Borde visible para mejor UI
            borderRadius: '4px 0 0 4px',
            outline: 'none',
            zIndex: 1 // Asegura que esté por encima de otros elementos
          }}
          // Asegura que el input sea interactivo
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
      
      {/* Botón de tipo submit para mejor accesibilidad */}
      <button
        type="submit" 
        style={{
          backgroundColor: '#1D4ED8',
          color: 'white',
          padding: '8px 16px',
          border: 'none',
          borderRadius: '0 4px 4px 0',
          cursor: 'pointer'
        }}
      >
        Buscar
      </button>
    </form>
  );
}