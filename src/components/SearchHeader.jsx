// components/SearchHeader.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SECTIONS = [
  { title: 'Trámites', path: '/tramites', items: ['Licencias', 'Certificados', 'Permisos'] },
  { title: 'Servicios', path: '/servicios', items: ['Agua', 'Luz', 'Internet'] },
  { title: 'Institucional', path: '/institucional', items: ['Misión', 'Visión', 'Organigrama'] },
  { title: 'Contacto', path: '/contactenos', items: ['Teléfonos', 'Correo', 'Dirección'] },
  { title: 'Puntos de Pago', path: '/puntos-de-pago', items: ['Bancos', 'En línea', 'Oficinas'] },
  { title: 'Proveedores', path: '/proveedores-contratistas', items: ['Licitaciones', 'Contratos'] },
  { title: 'Ley de Transparencia', path: '/ley-de-transparencia', items: ['Informes', 'Documentos'] },
];

const SearchHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Function to search content without a database
  const searchContent = (searchQuery) => {
    if (!searchQuery.trim()) {
      return [];
    }
    
    const searchTerms = searchQuery.toLowerCase().trim().split(' ');
    let matchedResults = [];
    
    // Search through predefined sections and items
    SECTIONS.forEach(section => {
      // Check if section title matches
      const titleMatches = searchTerms.some(term => 
        section.title.toLowerCase().includes(term)
      );
      
      // Check if any items match
      const itemMatches = section.items.filter(item => 
        searchTerms.some(term => item.toLowerCase().includes(term))
      );
      
      if (titleMatches) {
        matchedResults.push({
          type: 'section',
          title: section.title,
          path: section.path
        });
      }
      
      itemMatches.forEach(item => {
        matchedResults.push({
          type: 'item',
          title: item,
          section: section.title,
          path: `${section.path}#${item.toLowerCase().replace(/ /g, '-')}`
        });
      });
    });
    
    return matchedResults.slice(0, 8); // Limit to 8 results
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setResults(searchContent(value));
    setSelectedIndex(-1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selected = results[selectedIndex];
      router.push(selected.path);
      setIsOpen(false);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Toggle search visibility
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Icon Button */}
      <button 
        onClick={toggleSearch}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        aria-label="Buscar"
      >
        <Search size={20} className="text-gray-600 dark:text-gray-300" />
      </button>

      {/* Search Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 transition-all duration-300 ease-in-out animate-fadeIn">
          <div className="p-3 flex items-center border-b border-gray-200 dark:border-gray-700">
            <Search size={18} className="text-gray-500 dark:text-gray-400 mr-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Buscar trámites, servicios..."
              className="flex-1 bg-transparent border-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-500"
              autoComplete="off"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <X size={18} />
              </button>
            )}
          </div>

          {query && (
            <div className="max-h-80 overflow-y-auto py-2">
              {results.length > 0 ? (
                results.map((result, index) => (
                  <Link 
                    href={result.path} 
                    key={`${result.type}-${index}`}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      selectedIndex === index ? 'bg-gray-100 dark:bg-gray-700' : ''
                    }`}
                  >
                    <div className="text-gray-800 dark:text-gray-200 font-medium">
                      {result.title}
                    </div>
                    {result.type === 'item' && (
                      <div className="text-gray-500 dark:text-gray-400 text-sm">
                        {result.section}
                      </div>
                    )}
                  </Link>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-center">
                  No se encontraron resultados para "{query}"
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Búsquedas populares</h3>
              <div className="flex flex-wrap gap-2">
                {['Trámites', 'Facturas', 'Pagos', 'Certificados'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setQuery(term);
                      setResults(searchContent(term));
                    }}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchHeader;