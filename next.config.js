/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true, // Habilita la minificación SWC para mejor rendimiento

    images: {
        domains: ['localhost'], // Dominios para desarrollo
        // Añade los dominios de producción si vas a cargar imágenes desde URLs externas
        // Por ejemplo: domains: ['localhost', 'tudominio.com', 'cdn.tudominio.com'],

        unoptimized: true, // Necesario para exportación estática en hosting compartido
        // Comentario: Esto desactiva la optimización automática de imágenes para 
        // permitir una exportación estática, pero perderás el beneficio de optimización.
    },

    // Prefijo para recursos estáticos - útil para CDNs
    // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.tudominio.com' : '',

    // Base path - descomenta si desplegas en un subdirectorio
    // basePath: '/directorio',

    // Configuración de páginas estáticas/dinámicas
    // Útil para controlar qué páginas se generan estáticamente
    // exportPathMap: async function () {
    //   return {
    //     '/': { page: '/' },
    //     '/contactenos/pqr-anonimo': { page: '/contactenos/pqr-anonimo' },
    //     // Añade todas tus rutas estáticas aquí
    //   }
    // },

    // Optimizaciones para producción
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production', // Elimina console.log en producción
    },

    // Configura redirecciones si es necesario
    async redirects() {
        return [
            // Ejemplo:
            // {
            //   source: '/pagina-antigua',
            //   destination: '/pagina-nueva',
            //   permanent: true, // 301 redirect (permanente)
            // },
        ];
    },

    // Configura reescrituras para APIs externas si las necesitas
    async rewrites() {
        return [
            // Ejemplo para proxy de API:
            // {
            //   source: '/api/datos',
            //   destination: 'https://api-externa.com/datos',
            // },
        ];
    },

    // Configura headers HTTP para mejorar seguridad
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
        ];
    },

    // Configura webpack si necesitas personalizaciones adicionales
    webpack: (config, { isServer }) => {
        // Ejemplo: Si necesitas manejar un tipo de archivo específico
        // config.module.rules.push({
        //   test: /\.pdf$/,
        //   use: [
        //     {
        //       loader: 'file-loader',
        //       options: {
        //         name: '[path][name].[ext]',
        //       },
        //     },
        //   ],
        // });

        return config;
    },

    // Experimental features si necesitas
    // experimental: {
    //   outputStandalone: true,
    // },

    // Configuración de entorno
    env: {
        // Variables disponibles en cliente y servidor
        SITE_URL: process.env.SITE_URL || 'https://electrohuila.com.co',
    },
};

module.exports = nextConfig;