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