// Archivo: data/politicas.js

// Datos de políticas por categoría
export const politicasData = {
    institucionales: [
        {
            id: 'talento-humano',
            title: 'Talento Humano',
            url: '/institucional/politicas/talento-humano',
            description: 'Políticas para la gestión del talento humano, que incluyen los procesos de selección, contratación, desarrollo y bienestar del personal.',
            documents: [
                {
                    title: 'Manual de Talento Humano',
                    url: '/documentos/talento-humano/manual.pdf',
                    icon: '📄'
                },
                {
                    title: 'Plan de Bienestar',
                    url: '/documentos/talento-humano/bienestar.pdf',
                    icon: '📝'
                },
                {
                    title: 'Política de Selección',
                    url: '/documentos/talento-humano/seleccion.pdf',
                    icon: '📋'
                }
            ]
        },
        {
            id: 'planeacion-estrategica',
            title: 'Planeación Estratégica',
            url: '/institucional/politicas/planeacion-estrategica',
            description: 'Lineamientos para la definición, implementación y seguimiento del plan estratégico de la empresa.'
        },
        {
            id: 'etica-cumplimiento',
            title: 'Ética y Cumplimiento',
            url: '/institucional/politicas/etica-cumplimiento',
            description: 'Principios éticos y normas de conducta que rigen el comportamiento de todos los colaboradores de la empresa.',
            documents: [
                {
                    title: 'Código de Ética',
                    url: '/documentos/etica/codigo.pdf',
                    icon: '⚖️'
                },
                {
                    title: 'Manual Anticorrupción',
                    url: '/documentos/etica/anticorrupcion.pdf',
                    icon: '🛡️'
                },
                {
                    title: 'Procedimiento de Denuncias',
                    url: '/documentos/etica/denuncias.pdf',
                    icon: '📢'
                }
            ]
        },
        {
            id: 'organizacion-sistemas',
            title: 'Organización y Sistemas',
            url: '/institucional/politicas/organizacion-sistemas',
            description: 'Políticas para la gestión de la estructura organizacional y los sistemas de información.'
        },
        {
            id: 'responsabilidad-social',
            title: 'Responsabilidad Social y Ambiental',
            url: '/institucional/politicas/responsabilidad-social',
            description: 'Lineamientos para la gestión socialmente responsable y ambientalmente sostenible de nuestras operaciones.',
            documents: [
                {
                    title: 'Política de Sostenibilidad',
                    url: '/documentos/rsa/sostenibilidad.pdf',
                    icon: '🌱'
                },
                {
                    title: 'Plan de Gestión Ambiental',
                    url: '/documentos/rsa/ambiental.pdf',
                    icon: '🌍'
                },
                {
                    title: 'Informe de Responsabilidad Social',
                    url: '/documentos/rsa/informe-rs.pdf',
                    icon: '📊'
                }
            ]
        },
        {
            id: 'sigac',
            title: 'SIGAC',
            url: '/institucional/politicas/sigac',
            description: 'Sistema Integrado de Gestión y Autocontrol que establece los lineamientos para la gestión de calidad, seguridad y salud en el trabajo.'
        },
        {
            id: 'bioseguridad',
            title: 'Protocolo de Bioseguridad',
            url: '/institucional/politicas/bioseguridad',
            description: 'Protocolos y medidas preventivas para garantizar la salud y seguridad de colaboradores y usuarios.'
        },
    ],
    comerciales: [
        {
            id: 'servicio-cliente',
            title: 'Servicio al Cliente',
            url: '/institucional/politicas/servicio-cliente',
            description: 'Lineamientos para garantizar una experiencia de servicio de calidad a nuestros usuarios.'
        },
        {
            id: 'tarifas',
            title: 'Tarifas y Facturación',
            url: '/institucional/politicas/tarifas',
            description: 'Políticas para la determinación de tarifas y los procesos de facturación del servicio.',
            documents: [
                {
                    title: 'Estructura Tarifaria',
                    url: