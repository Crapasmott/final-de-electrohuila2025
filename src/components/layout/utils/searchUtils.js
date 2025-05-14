"use client";

// Este archivo contiene contenido estático que normalmente estaría en una base de datos
// Usamos este enfoque para permitir búsquedas sin base de datos

// Secciones principales en la aplicación, adaptadas a la estructura de Electrohuila
export const SECTIONS = [
    {
        id: 'institucional',
        title: 'Nuestra Empresa',
        description: 'Información sobre Electrohuila',
        path: '/institucional',
        items: [
            {
                id: 'mision-vision',
                title: 'Misión y Visión',
                description: 'Nuestra misión y visión institucional',
                path: '/institucional/mision-vision'
            },
            {
                id: 'historia',
                title: 'Historia',
                description: 'Historia de Electrohuila',
                path: '/institucional/historia'
            },
            {
                id: 'gobierno-corporativo',
                title: 'Gobierno Corporativo',
                description: 'Estructura y gobierno de la empresa',
                path: '/institucional/gobierno-corporativo'
            },
            {
                id: 'informes',
                title: 'Informes de Gestión',
                description: 'Informes y reportes corporativos',
                path: '/institucional/informes'
            },
        ]
    },
    {
        id: 'servicios',
        title: 'Servicios',
        description: 'Servicios ofrecidos por Electrohuila',
        path: '/servicios',
        items: [
            {
                id: 'energia-electrica',
                title: 'Energía Eléctrica',
                description: 'Servicio principal de energía eléctrica',
                path: '/servicios/energia-electrica'
            },
            {
                id: 'nuevas-conexiones',
                title: 'Nuevas Conexiones',
                description: 'Solicitud de conexión al servicio',
                path: '/servicios/nuevas-conexiones'
            },
            {
                id: 'pqrs',
                title: 'PQRS',
                description: 'Peticiones, quejas, reclamos y sugerencias',
                path: '/servicios/pqrs'
            },
            {
                id: 'factura',
                title: 'Factura',
                description: 'Factura electrónica y opciones de pago',
                path: '/servicios/factura'
            },
            {
                id: 'eficiencia-energetica',
                title: 'Eficiencia Energética',
                description: 'Consejos y programas de ahorro energético',
                path: '/servicios/eficiencia-energetica'
            },
        ]
    },
    {
        id: 'proveedores',
        title: 'Proveedores',
        description: 'Información para proveedores y contratistas',
        path: '/proveedores-contratistas',
        items: [
            {
                id: 'contrataciones',
                title: 'Contrataciones',
                description: 'Procesos de contratación vigentes',
                path: '/proveedores-contratistas/contrataciones'
            },
            {
                id: 'registro',
                title: 'Registro de Proveedores',
                description: 'Cómo registrarse como proveedor',
                path: '/proveedores-contratistas/registro'
            },
            {
                id: 'licitaciones',
                title: 'Licitaciones',
                description: 'Licitaciones abiertas y procesos de selección',
                path: '/proveedores-contratistas/licitaciones'
            },
            {
                id: 'compras',
                title: 'Plan de Compras',
                description: 'Plan anual de adquisiciones',
                path: '/proveedores-contratistas/plan-compras'
            },
        ]
    },
    {
        id: 'transparencia',
        title: 'Transparencia',
        description: 'Ley de transparencia y acceso a la información',
        path: '/ley-de-transparencia',
        items: [
            {
                id: 'normatividad',
                title: 'Normatividad',
                description: 'Marco legal y normativo',
                path: '/ley-de-transparencia/normatividad'
            },
            {
                id: 'presupuesto',
                title: 'Presupuesto',
                description: 'Información presupuestal',
                path: '/ley-de-transparencia/presupuesto'
            },
            {
                id: 'control',
                title: 'Control',
                description: 'Informes de control interno y externo',
                path: '/ley-de-transparencia/control'
            },
            {
                id: 'contratacion',
                title: 'Contratación',
                description: 'Procesos de contratación',
                path: '/ley-de-transparencia/contratacion'
            },
            {
                id: 'servicios-informacion',
                title: 'Servicios de Información',
                description: 'Canales de atención e información',
                path: '/ley-de-transparencia/servicios-informacion'
            },
        ]
    },
    {
        id: 'contacto',
        title: 'Contáctenos',
        description: 'Información de contacto y canales de atención',
        path: '/contactenos',
        items: [
            {
                id: 'puntos-atencion',
                title: 'Puntos de Atención',
                description: 'Oficinas y centros de servicio',
                path: '/contactenos/puntos-atencion'
            },
            {
                id: 'lineas-telefonicas',
                title: 'Líneas Telefónicas',
                description: 'Números de contacto y horarios',
                path: '/contactenos/lineas-telefonicas'
            },
            {
                id: 'chat',
                title: 'Chat en Línea',
                description: 'Servicio de chat con agentes',
                path: '/contactenos/chat'
            },
            {
                id: 'formulario',
                title: 'Formulario de Contacto',
                description: 'Envío de mensajes y solicitudes',
                path: '/contactenos/formulario'
            },
        ]
    },
    {
        id: 'pagos',
        title: 'Pagos',
        description: 'Opciones para realizar pagos',
        path: '/pagos',
        items: [
            {
                id: 'pago-en-linea',
                title: 'Pago en Línea',
                description: 'Pague su factura online',
                path: '/pagos/pago-en-linea'
            },
            {
                id: 'puntos-pago',
                title: 'Puntos de Pago',
                description: 'Lugares autorizados para pagos',
                path: '/pagos/puntos-pago'
            },
            {
                id: 'bancos',
                title: 'Bancos Autorizados',
                description: 'Entidades bancarias para pagos',
                path: '/pagos/bancos'
            },
        ]
    },
];

// Búsquedas populares
export const POPULAR_SEARCHES = [
    'Factura', 'Pago en línea', 'Cortes programados', 'Certificado',
    'Reclamo', 'Nueva conexión', 'Horarios de atención', 'Tarifas',
    'Estado de cuenta', 'Reconexión'
];

// Función para realizar búsqueda
export const performSearch = (query) => {
    if (!query || query.trim() === '') {
        return [];
    }

    const searchTerms = query.toLowerCase().trim().split(/\s+/);
    let results = [];

    // Función auxiliar para verificar si un texto coincide con los términos de búsqueda
    const matchesSearchTerms = (text, terms) => {
        if (!text) return false;
        const lowerText = text.toLowerCase();
        return terms.some(term => lowerText.includes(term));
    };

    // Buscar en cada sección y sus elementos
    SECTIONS.forEach(section => {
        // Verificar título y descripción de la sección
        const sectionMatches = matchesSearchTerms(section.title, searchTerms) ||
            matchesSearchTerms(section.description, searchTerms);

        if (sectionMatches) {
            results.push({
                id: `section-${section.id}`,
                title: section.title,
                description: section.description,
                path: section.path,
                type: 'section',
                relevance: 10 // Asignar alta relevancia a coincidencias de sección
            });
        }

        // Verificar cada elemento en la sección
        section.items.forEach(item => {
            const titleMatches = matchesSearchTerms(item.title, searchTerms);
            const descMatches = matchesSearchTerms(item.description, searchTerms);

            if (titleMatches || descMatches) {
                results.push({
                    id: `item-${section.id}-${item.id}`,
                    title: item.title,
                    description: item.description,
                    path: item.path,
                    parentSection: section.title,
                    type: 'item',
                    relevance: titleMatches ? 8 : 5 // Las coincidencias de título son más relevantes
                });
            }
        });
    });

    // Ordenar por relevancia
    results.sort((a, b) => b.relevance - a.relevance);

    return results;
};

// Función para obtener búsquedas relacionadas
export const getRelatedSearches = (query) => {
    if (!query || query.trim() === '') {
        return POPULAR_SEARCHES.slice(0, 5);
    }

    const searchTerm = query.toLowerCase().trim();

    // Filtrar búsquedas populares relacionadas con la consulta
    const related = POPULAR_SEARCHES.filter(term =>
        term.toLowerCase().includes(searchTerm) ||
        searchTerm.includes(term.toLowerCase())
    );

    // Si tenemos menos de 3 términos relacionados, agregar algunos populares
    if (related.length < 3) {
        const additionalTerms = POPULAR_SEARCHES.filter(
            term => !related.includes(term)
        ).slice(0, 3 - related.length);

        return [...related, ...additionalTerms];
    }

    return related.slice(0, 5);
};