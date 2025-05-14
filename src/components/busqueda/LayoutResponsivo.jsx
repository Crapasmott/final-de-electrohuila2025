import React, { useEffect, useState } from 'react';
import styles from './LayoutResponsivo.module.css';

const LayoutResponsivo = ({
  children,
  breakpointMovil = 768,
  breakpointTablet = 1024,
  className = "",
  mobileFirst = false
}) => {
  const [dispositivoActual, setDispositivoActual] = useState('desktop');
  
  useEffect(() => {
    const manejarRedimension = () => {
      const ancho = window.innerWidth;
      
      if (ancho < breakpointMovil) {
        setDispositivoActual('mobile');
      } else if (ancho < breakpointTablet) {
        setDispositivoActual('tablet');
      } else {
        setDispositivoActual('desktop');
      }
    };
    
    // Verificación inicial
    manejarRedimension();
    
    // Agregar listener
    window.addEventListener('resize', manejarRedimension);
    
    // Limpieza
    return () => window.removeEventListener('resize', manejarRedimension);
  }, [breakpointMovil, breakpointTablet]);
  
  const dispositivos = {
    mobile: styles.contenedorMovil,
    tablet: styles.contenedorTablet,
    desktop: styles.contenedorEscritorio
  };
  
  return (
    <div className={`${dispositivos[dispositivoActual]} ${className} ${mobileFirst ? styles.mobileFirst : ''}`}>
      {children}
    </div>
  );
};

export default LayoutResponsivo;