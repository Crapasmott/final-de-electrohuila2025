export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    if (!query || query.length < 2) {
        return Response.json({ results: [] });
    }

    try {
        // Cargar el índice de búsqueda (puede ser desde un archivo o base de datos)
        const searchIndex = await loadSearchIndex();

        // Realizar la búsqueda
        const results = performSearch(searchIndex, query);

        return Response.json({ results });
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        return Response.json({ results: [] }, { status: 500 });
    }
}

// Función para cargar el índice de búsqueda
async function loadSearchIndex() {
    try {
        // En un entorno real, esto podría cargar desde una base de datos
        // o un archivo en el sistema de archivos
        const fs = require('fs');
        const path = require('path');

        const indexPath = path.join(process.cwd(), 'public', 'search-index.json');

        if (fs.existsSync(indexPath)) {
            const data = fs.readFileSync(indexPath, 'utf8');
            return JSON.parse(data);
        }

        // Si no existe el archivo, usar datos de respaldo
        return fallbackSearchData;
    } catch (error) {
        console.error('Error al cargar el índice de búsqueda:', error);
        return fallbackSearchData;
    }
}

// Función para realizar la búsqueda
function performSearch(searchIndex, query) {
    const searchTermLower = query.toLowerCase();

    // Función de puntuación para resultados más relevantes
    const getScore = (item) => {
        let score = 0;

        // Título coincidente (mayor peso)
        if (item.title.toLowerCase().includes(searchTermLower)) {
            score += 10;
            // Título comienza con el término (aún mayor peso)
            if (item.title.toLowerCase().startsWith(searchTermLower)) {
                score += 5;
            }
        }

        // Descripción coincidente
        if (item.description && item.description.toLowerCase().includes(searchTermLower)) {
            score += 5;
        }

        // Contenido coincidente
        if (item.content && item.content.toLowerCase().includes(searchTermLower)) {
            score += 2;
        }

        // Tipo coincidente
        if (item.type && item.type.toLowerCase().includes(searchTermLower)) {
            score += 3;
        }

        // URL coincidente (menor peso)
        if (item.url.toLowerCase().includes(searchTermLower)) {
            score += 1;
        }

        return score;
    };

    // Filtrar y ordenar resultados
    return searchIndex
        .filter(item => {
            return (
                item.title.toLowerCase().includes(searchTermLower) ||
                (item.description && item.description.toLowerCase().includes(searchTermLower)) ||
                (item.content && item.content.toLowerCase().includes(searchTermLower)) ||
                (item.type && item.type.toLowerCase().includes(searchTermLower)) ||
                item.url.toLowerCase().includes(searchTermLower)
            );
        })
        .map(item => ({ ...item, score: getScore(item) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 20); // Limitar a 20 resultados
}

// Datos de respaldo en caso de que no se pueda cargar el índice
const fallbackSearchData = [
    {
        id: 'puntos-pago',
        title: 'Puntos de Pago',
        description: 'Consulta los diferentes puntos de pago disponibles para realizar el pago de tu factura de energía.',
        url: '/puntos-de-pago',
        type: 'pago'
    },
    {
        id: 'pago-facturas',
        title: 'Pago de Facturas',
        description: 'Paga tu factura de energía de forma rápida y segura por diferentes medios.',
        url: '/pago',
        type: 'pago'
    },
    {
        id: 'tramites',
        title: 'Trámites Usuarios',
        description: 'Información sobre Trámites Usuarios',
        url: '/tramites',
        type: 'tramite'
    },
    {
        id: 'factura',
        title: 'Factura de venta',
        description: 'Información sobre Factura de venta',
        url: '/conoce-tu-factura',
        type: 'facturacion'
    },
    {
        id: 'tarifas',
        title: 'Tarifas',
        description: 'Información sobre tarifas de energía eléctrica actualizadas',
        url: '/tarifas',
        type: 'tarifa'
    }
];