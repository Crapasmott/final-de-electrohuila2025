import { useState, useEffect } from 'react';

/**
 * Hook personalizado para detectar media queries
 * @param {string} query - La media query CSS a verificar
 * @returns {boolean} - Retorna true si la media query coincide
 */
const useMediaQuery = (query) => {
    const [coincide, setCoincide] = useState(false);

    useEffect(() => {
        // Crear un objeto MediaQueryList
        const mediaQuery = window.matchMedia(query);

        // Establecer el estado inicial
        setCoincide(mediaQuery.matches);

        // Función para actualizar el estado cuando cambia la media query
        const manejarCambio = (event) => {
            setCoincide(event.matches);
        };

        // Registrar el listener
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', manejarCambio);
        } else {
            // Fallback para navegadores más antiguos
            mediaQuery.addListener(manejarCambio);
        }

        // Limpiar
        return () => {
            if (mediaQuery.removeEventListener) {
                mediaQuery.removeEventListener('change', manejarCambio);
            } else {
                mediaQuery.removeListener(manejarCambio);
            }
        };
    }, [query]);

    return coincide;
};

// Media queries predefinidas
export const useEsMovil = () => useMediaQuery('(max-width: 767px)');
export const useEsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
export const useEsEscritorio = () => useMediaQuery('(min-width: 1024px)');
export const useEsPantallaGrande = () => useMediaQuery('(min-width: 1280px)');
export const useModoOscuro = () => useMediaQuery('(prefers-color-scheme: dark)');
export const useReduccionMovimiento = () => useMediaQuery('(prefers-reduced-motion: reduce)');

export default useMediaQuery;