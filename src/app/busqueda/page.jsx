'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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

export default function SearchPage() {
    const searchParams = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState([]);
    const [availableFilters, setAvailableFilters] = useState({});

    // Obtener término de búsqueda de la URL
    useEffect(() => {
        const query = searchParams?.get('q') || '';
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
                                para "{searchParams?.get('q') || ''}"
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
                    ) : searchParams?.get('q') ? (
                        <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm text-center">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">No se encontraron resultados</h3>
                            <p className="text-gray-600 mb-4">
                                No se encontraron coincidencias para "{searchParams.get('q')}"
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