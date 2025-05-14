import dynamic from 'next/dynamic';
import { conCarga } from '../components/common/ComponenteCargable';

/**
 * Utilidad para cargar componentes de forma perezosa
 * @param {string} ruta - Ruta del componente a importar
 * @param {object} opciones - Opciones para la carga dinámica
 * @returns {Component} - Componente cargado dinámicamente
 */
export const cargarComponente = (ruta, opciones = {}) => {
    const {
        ssr = true,
        tipoEsqueleto = "texto",
        ...esqueletoProps
    } = opciones;

    return dynamic(
        () => import(`../components/${ruta}`),
        {
            ssr,
            loading: () => null, // Usamos nuestro propio sistema de carga
        }
    );
};

/**
 * Utilidad para cargar páginas de forma perezosa con esqueleto personalizado
 * @param {string} ruta - Ruta de la página a importar
 * @param {object} opciones - Opciones para la carga dinámica
 * @returns {Component} - Página cargada dinámicamente
 */
export const cargarPagina = (ruta, opciones = {}) => {
    const {
        ssr = true,
        tipoEsqueleto = "texto",
        ...esqueletoProps
    } = opciones;

    const DynamicComponent = dynamic(
        () => import(`../pages/${ruta}`),
        {
            ssr,
            loading: () => null, // Usamos nuestro propio sistema de carga
        }
    );

    return conCarga(DynamicComponent, { tipoEsqueleto, ...esqueletoProps });
};

/**
 * Optimiza imágenes con carga perezosa personalizada
 * @param {HTMLElement} el - Elemento contenedor para aplicar observador
 */
export const optimizarImagenes = (el) => {
    if (typeof window === 'undefined' || !el) return;

    const imagenes = el.querySelectorAll('img[data-src]');

    if (!imagenes.length) return;

    const cargarImagen = (imagen) => {
        const src = imagen.getAttribute('data-src');
        if (!src) return;

        imagen.src = src;
        imagen.removeAttribute('data-src');
        imagen.classList.add('cargada');
    };

    // Usar IntersectionObserver si está disponible
    if ('IntersectionObserver' in window) {
        const observador = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    cargarImagen(entrada.target);
                    observador.unobserve(entrada.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        imagenes.forEach(imagen => {
            observador.observe(imagen);
        });
    } else {
        // Fallback para navegadores sin soporte
        imagenes.forEach(imagen => {
            cargarImagen(imagen);
        });
    }
};

/**
 * Optimiza la carga de fuentes para mejorar CLS
 */
export const optimizarFuentes = () => {
    if (typeof window === 'undefined') return;

    // Crear un elemento link para precargar la fuente
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'font';
    preloadLink.type = 'font/woff2';
    preloadLink.href = '/fonts/nombre-fuente.woff2';
    preloadLink.crossOrigin = 'anonymous';

    // Agregar al head
    document.head.appendChild(preloadLink);

    // Aplicar clase para evitar FOUT (Flash of Unstyled Text)
    document.documentElement.classList.add('fuentes-cargadas');
};

/**
 * Optimiza la carga de scripts de terceros
 * @param {string} url - URL del script a cargar
 * @param {Function} callback - Función a ejecutar cuando el script se carga
 */
export const cargarScriptDiferido = (url, callback) => {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.src = url;
    script.defer = true;

    if (callback) {
        script.onload = callback;
    }

    document.body.appendChild(script);
};