import React from 'react';
import { useEsMovil } from '../../hooks/useMediaQuery';
import styles from './MenuResponsivo.module.css';

const MenuResponsivo = ({ 
  items = [], 
  logo, 
  onItemClick,
  className = "" 
}) => {
  const esMovil = useEsMovil();
  const [menuAbierto, setMenuAbierto] = React.useState(false);
  
  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  
  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    if (esMovil) {
      setMenuAbierto(false);
    }
  };
  
  return (
    <nav className={`${styles.navContainer} ${className}`}>
      <div className={styles.navBar}>
        {logo && (
          <div className={styles.logoContainer}>
            {logo}
          </div>
        )}
        
        {esMovil ? (
          <button 
            className={styles.menuButton} 
            onClick={toggleMenu}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
          >
            <span className={`${styles.hamburger} ${menuAbierto ? styles.activo : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        ) : (
          <ul className={styles.menuDesktop}>
            {items.map((item, index) => (
              <li key={index} className={styles.menuItem}>
                <a 
                  href={item.url} 
                  className={`${styles.menuEnlace} ${item.activo ? styles.activo : ''}`}
                  onClick={(e) => {
                    if (item.accion) {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                >
                  {item.icono && <span className={styles.itemIcono}>{item.icono}</span>}
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {esMovil && (
        <div className={`${styles.menuMovil} ${menuAbierto ? styles.abierto : ''}`}>
          <ul className={styles.menuMovilItems}>
            {items.map((item, index) => (
              <li key={index} className={styles.menuMovilItem}>
                <a 
                  href={item.url} 
                  className={`${styles.menuMovilEnlace} ${item.activo ? styles.activo : ''}`}
                  onClick={(e) => {
                    if (item.accion) {
                      e.preventDefault();
                      handleItemClick(item);
                    }
                  }}
                >
                  {item.icono && <span className={styles.itemIcono}>{item.icono}</span>}
                  {item.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MenuResponsivo;