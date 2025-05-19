import React, { useState, useCallback } from 'react';
import styles from './Busqueda.module.css';

const BusquedaBase = ({
  placeholder = "Buscar...",
  onSearch,
  className = "",
  variante = "simple",
  autoFocus = false,
  icono = true,
  tema = "claro"
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  }, [query, onSearch]);

  const varianteClasses = {
    simple: styles.busquedaSimple,
    animada: styles.busquedaAnimada,
    avanzada: styles.busquedaAvanzada,
  };

  const temaClasses = {
    claro: styles.temaClaro,
    oscuro: styles.temaOscuro,
    primario: styles.temaPrimario,
  };

  return (
    <form 
      className={`${styles.busquedaContainer} ${varianteClasses[variante]} ${temaClasses[tema]} ${className} ${isFocused ? styles.enfocado : ''}`}
      onSubmit={handleSubmit}
    >
      {icono && (
        <span className={styles.iconoBusqueda}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
      )}
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={styles.inputBusqueda}
        autoFocus={autoFocus}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      
      {variante === "avanzada" && query && (
        <button 
          type="button" 
          className={styles.botonLimpiar}
          onClick={() => setQuery('')}
          aria-label="Limpiar búsqueda"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
      
      {variante === "avanzada" && (
        <button 
          type="submit" 
          className={styles.botonBuscar}
          aria-label="Buscar"
        >
          Buscar
        </button>
      )}
    </form>
  );
};

export default BusquedaBase;