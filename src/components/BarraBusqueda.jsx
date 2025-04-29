'use client';

import { useState } from 'react';

export function BarraBusqueda({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      maxWidth: '400px', 
      margin: '0 auto', 
      marginTop: '16px' 
    }}>
      <div style={{ position: 'relative', flexGrow: 1 }}>
        <input
          type="text"
          placeholder="Buscar por municipio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            width: '100%',
            padding: '8px 8px 8px 36px',
            border: 'none',
            borderRadius: '4px 0 0 4px',
            outline: 'none'
          }}
        />
        <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <button
        onClick={handleSearch}
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
    </div>
  );
}