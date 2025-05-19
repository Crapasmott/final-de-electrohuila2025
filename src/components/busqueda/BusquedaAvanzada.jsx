import React, { useState } from 'react';
import BusquedaBase from './BusquedaBase';
import styles from './BusquedaAvanzada.module.css';

const BusquedaAvanzada = ({ 
  categorias = [], 
  filtrosIniciales = {},
  onSearch,
  ...props 
}) => {
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [filtros, setFiltros] = useState(filtrosIniciales);

  const handleBusqueda = (query) => {
    if (onSearch) {
      onSearch({ query, ...filtros });
    }
  };

  const toggleFiltros = () => {
    setFiltrosAbiertos(!filtrosAbiertos);
  };

  const actualizarFiltro = (clave, valor) => {
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [clave]: valor
    }));
  };

  return (
    <div className={styles.busquedaAvanzadaContainer}>
      <BusquedaBase 
        variante="avanzada" 
        onSearch={handleBusqueda}
        {...props} 
      />
      
      <button 
        type="button" 
        className={styles.toggleFiltros}
        onClick={toggleFiltros}
      >
        Filtros avanzados
        <svg 
          className={`${styles.iconoFlecha} ${filtrosAbiertos ? styles.rotado : ''}`}
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {filtrosAbiertos && (
        <div className={styles.panelFiltros}>
          {categorias.length > 0 && (
            <div className={styles.grupoFiltro}>
              <label className={styles.etiquetaFiltro}>Categoría</label>
              <select 
                className={styles.selectFiltro}
                value={filtros.categoria || ''}
                onChange={(e) => actualizarFiltro('categoria', e.target.value)}
              >
                <option value="">Todas las categorías</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          )}
          
          <div className={styles.grupoFiltro}>
            <label className={styles.etiquetaFiltro}>Fecha</label>
            <div className={styles.filtroFechas}>
              <div>
                <label className={styles.subEtiqueta}>Desde</label>
                <input 
                  type="date" 
                  className={styles.inputFiltro}
                  value={filtros.fechaDesde || ''}
                  onChange={(e) => actualizarFiltro('fechaDesde', e.target.value)}
                />
              </div>
              <div>
                <label className={styles.subEtiqueta}>Hasta</label>
                <input 
                  type="date" 
                  className={styles.inputFiltro}
                  value={filtros.fechaHasta || ''}
                  onChange={(e) => actualizarFiltro('fechaHasta', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.grupoFiltro}>
            <label className={styles.etiquetaFiltro}>Estado</label>
            <div className={styles.opcionesFiltro}>
              <label className={styles.opcionFiltro}>
                <input 
                  type="checkbox"
                  checked={filtros.activo === true}
                  onChange={(e) => actualizarFiltro('activo', e.target.checked)}
                />
                Activo
              </label>
              <label className={styles.opcionFiltro}>
                <input 
                  type="checkbox"
                  checked={filtros.archivado === true}
                  onChange={(e) => actualizarFiltro('archivado', e.target.checked)}
                />
                Archivado
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusquedaAvanzada;