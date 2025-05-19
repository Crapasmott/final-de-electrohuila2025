// components/SearchButtonFix.jsx
import { useEffect } from 'react';

const SearchButtonFix = () => {
  useEffect(() => {
    // Función para ajustar el botón de búsqueda
    const ajustarBotonBusqueda = () => {
      // Array de posibles selectores para el botón de búsqueda
      const selectoresBoton = [
        'button[aria-label="Buscar"]',
        '.search-button',
        '.boton-busqueda',
        '.icono-busqueda',
        '.search-icon',
        'button:has(svg)' // Para botones que contienen un SVG
      ];
      
      // Intenta encontrar el botón con cada selector
      let botonBusqueda = null;
      for (const selector of selectoresBoton) {
        try {
          const elemento = document.querySelector(selector);
          if (elemento) {
            botonBusqueda = elemento;
            break;
          }
        } catch (e) {
          // Algunos navegadores pueden no soportar ciertos selectores
          continue;
        }
      }
      
      // Si encontramos el botón, ajustamos su posición
      if (botonBusqueda) {
        botonBusqueda.style.position = 'relative';
        botonBusqueda.style.marginLeft = 'auto';
        botonBusqueda.style.marginRight = '70px'; // Ajusta este valor según necesites
      }
    };
    
    // Ejecutar cuando el componente se monta
    if (typeof window !== 'undefined') {
      // Ejecutar inmediatamente
      ajustarBotonBusqueda();
      
      // Ejecutar después de un breve retraso (por si hay cargas dinámicas)
      const timer = setTimeout(ajustarBotonBusqueda, 500);
      
      // Limpiar el timeout cuando el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, []);
  
  // Este componente no renderiza nada visible
  return null;
};

export default SearchButtonFix;