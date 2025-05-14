'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/**
 * Componente de búsqueda para el header
 * Este componente se puede colocar en el layout principal o en el header
 */
export function HeaderSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const router = useRouter();

    // Realizar búsqueda cuando cambia el término
    useEffect(() => {
        if (searchTerm.trim().length < 2) {
            setResults([]);
            setShowResults(false);
            return;
        }

        setLoading(true);

        // Usar un timeout para evitar demasiadas búsquedas mientras se escribe
        const timeoutId = setTimeout(() => {
            fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
                .then(response => response.json())
                .then(data => {
                    setResults(data.results);
                    setShowResults(true);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al buscar:', error);
                    setLoading(false);
                });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    // Cerrar resultados cuando se hace clic fuera del componente
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim().length >= 2) {
            router.push(`/busqueda?q=${encodeURIComponent(searchTerm)}`);
            setShowResults(false);
        }
    };

    return (
        <div ref={searchRef} className="relative max-w-xs">
            <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative w-full">
                    {/* Icono de búsqueda */}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>

                    {/* Campo de entrada */}
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Buscar en ElectroHuila..."
                        required
                    />

                    {/* Botón de limpiar */}
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                        >
                            <svg className="w-4 h-4 text-gray-500 hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    )}
                </div>
            </form>

            {/* Resultados de búsqueda */}
            {showResults && (
                <div className="absolute left-0 right-0 z-10 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                    {loading ? (
                        <div className="flex justify-center items-center p-4">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                        </div>
                    ) : results.length > 0 ? (
                        <div className="py-2">
                            <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                                {results.length} resultados para "{searchTerm}"
                            </div>

                            <ul className="py-1">
                                {results.map((result, index) => (
                                    <li key={index}>
                                        <Link
                                            href={result.url}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            onClick={() => setShowResults(false)}
                                        >
                                            <div className="font-medium">{result.title}</div>
                                            {result.description && (
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                    {result.description}
                                                </div>
                                            )}
                                            <div className="text-xs text-gray-400 mt-1">
                                                {result.type ? getTypeLabel(result.type) : 'Página'}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="px-3 py-2 text-xs text-center border-t border-gray-100">
                                <Link
                                    href={`/busqueda?q=${encodeURIComponent(searchTerm)}`}
                                    className="text-blue-500 hover:text-blue-700 flex items-center justify-center"
                                    onClick={() => setShowResults(false)}
                                >
                                    Ver todos los resultados
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">
                            No se encontraron resultados para "{searchTerm}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// Función auxiliar para obtener etiqueta de tipo
function getTypeLabel(type) {
    const types = {
        'tarifa': 'Tarifa',
        'facturacion': 'Facturación',
        'pago': 'Pagos',
        'servicio': 'Servicio',
        'tramite': 'Trámite',
        'proveedor': 'Proveedores',
        'contacto': 'Contacto',
        'pagina': 'Página',
        'institucional': 'Institucional',
        'transparencia': 'Transparencia',
        'suspension': 'Suspensión',
        'atencion': 'Atención'
    };

    return types[type] || 'Página';
}

/**
 * API de búsqueda para Next.js
 * Guardar como: src/app/api/search/route.js
 */
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

/**
 * Página de resultados de búsqueda
 * Guardar como: src/app/busqueda/page.jsx
 */
export default function SearchPage({ searchParams }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState([]);
    const [availableFilters, setAvailableFilters] = useState({});

    // Obtener término de búsqueda de la URL
    useEffect(() => {
        const query = searchParams?.q || '';
        setSearchTerm(query);

        if (query.trim().length >= 2) {
            performSearch(query);
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    // Función para realizar la búsqueda
    const performSearch = async (query) => {
        setLoading(true);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();

            setResults(data.results);
            setFilteredResults(data.results);

            // Configurar filtros disponibles
            const filters = {};
            data.results.forEach(item => {
                if (item.type) {
                    filters[item.type] = (filters[item.type] || 0) + 1;
                }
            });

            setAvailableFilters(filters);
        } catch (error) {
            console.error('Error al buscar:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim().length >= 2) {
            window.history.pushState({}, '', `/busqueda?q=${encodeURIComponent(searchTerm)}`);
            performSearch(searchTerm);
        }
    };

    // Función para aplicar filtros
    const toggleFilter = (filter) => {
        let newFilters;

        if (activeFilters.includes(filter)) {
            newFilters = activeFilters.filter(f => f !== filter);
        } else {
            newFilters = [...activeFilters, filter];
        }

        setActiveFilters(newFilters);

        // Aplicar filtros a los resultados
        if (newFilters.length === 0) {
            setFilteredResults(results);
        } else {
            setFilteredResults(results.filter(item => newFilters.includes(item.type)));
        }
    };

    // Función para limpiar filtros
    const clearFilters = () => {
        setActiveFilters([]);
        setFilteredResults(results);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Resultados de búsqueda</h1>

            {/* Formulario de búsqueda */}
            <div className="mb-8">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <div className="flex-grow relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Buscar en ElectroHuila..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            {/* Contenido principal */}
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar con filtros */}
                {filteredResults.length > 0 && Object.keys(availableFilters).length > 0 && (
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-medium text-gray-800">Filtros</h2>
                                {activeFilters.length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        Limpiar
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-gray-600 mb-2">Tipo de contenido:</p>
                                {Object.entries(availableFilters)
                                    .sort((a, b) => b[1] - a[1])
                                    .map(([type, count]) => (
                                        <div key={type} className="flex items-center">
                                            <button
                                                onClick={() => toggleFilter(type)}
                                                className={`flex items-center w-full px-3 py-2 text-sm rounded-md transition-colors ${activeFilters.includes(type)
                                                        ? 'bg-blue-50 text-blue-700 font-medium'
                                                        : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                <span className="flex-grow text-left">{getTypeLabel(type)}</span>
                                                <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1">
                                                    {count}
                                                </span>
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Resultados de búsqueda */}
                <div className="flex-grow">
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredResults.length > 0 ? (
                        <div className="space-y-4">
                            <p className="text-gray-600 mb-4">
                                {filteredResults.length} resultados {activeFilters.length > 0 ? 'filtrados ' : ''}
                                para "{searchParams?.q || ''}"
                            </p>

                            {filteredResults.map((item, index) => (
                                <div key={index} className="bg-white p-5 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                    <Link href={item.url} className="block">
                                        <h2 className="text-xl font-semibold text-blue-600 hover:underline mb-2">
                                            {item.title}
                                        </h2>

                                        <div className="flex items-center text-sm text-gray-500 mb-2">
                                            <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs mr-2 text-gray-600">
                                                {getTypeLabel(item.type)}
                                            </span>
                                            <span className="text-gray-400 text-xs truncate">
                                                {item.url}
                                            </span>
                                        </div>

                                        {item.description && (
                                            <p className="text-gray-700 mb-2">{item.description}</p>
                                        )}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : searchParams?.q ? (
                        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
                            <p className="text-gray-600 mb-4">
                                No se encontraron coincidencias para "{searchParams.q}"
                            </p>
                            <div className="text-sm text-gray-600 max-w-md mx-auto">
                                <p className="font-medium mb-2">Sugerencias:</p>
                                <ul className="list-disc text-left pl-5 space-y-1">
                                    <li>Revisa si hay errores de ortografía</li>
                                    <li>Intenta usar palabras más generales</li>
                                    <li>Prueba con sinónimos</li>
                                    <li>Usa menos palabras en tu búsqueda</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
                            <p className="text-gray-600">
                                Ingresa un término de búsqueda para ver resultados
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}