'use client';

import { useState } from 'react';
import { FaFilePdf, FaSearch, FaDownload } from 'react-icons/fa';

export default function NotificacionWebUI() {
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('cuenta');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Datos de ejemplo para la tabla de notificaciones
  const notificaciones = [
    {
      id: 1,
      numeroCuenta: 'CIVELECT SAS, - FRANK JHONY CABRERA CHARRY',
      radicadoEntrada: '05-PQR-007416-E-2025',
      nroDocumento: 'no suministra',
      nombreUsuario: 'FRANK JHONY CABRERA CHARRY',
      radicadoRespuesta: '05-PQR-007879-S-2025',
      radicadoNotificacion: '05-PQR-008632-S-2025',
      fechaPublicacion: '11/04/2025 09:23:58 am',
      fechaDesfijacion: '22/04/2025 09:23:58 am',
      descripcion: 'Notificación por aviso.',
      pdfUrl: '#'
    },
    {
      id: 2,
      numeroCuenta: 'SUPERINTENDENCIA DE SERVICIOS PÚBLICOS DOMICILIARIOS-SSPD - TE RESUELVO',
      radicadoEntrada: '05-PQR-005690-E-2025',
      nroDocumento: 'no suministra',
      nombreUsuario: 'TE RESUELVO',
      radicadoRespuesta: '05-PQR-007520-S-2025',
      radicadoNotificacion: '05-PQR-008460-S-2025',
      fechaPublicacion: '10/04/2025 08:51:36 am',
      fechaDesfijacion: '21/04/2025 08:51:36 am',
      descripcion: 'Notificación por aviso.',
      pdfUrl: '#'
    },
    {
      id: 3,
      numeroCuenta: 'SUPERINTENDENCIA DE SERVICIOS PÚBLICOS DOMICILIARIOS-SSPD - TE RESUELVO',
      radicadoEntrada: '05-PQR-008223-E-2025',
      nroDocumento: 'no suministra',
      nombreUsuario: 'TE RESUELVO',
      radicadoRespuesta: '05-PQR-009080-S-2025',
      radicadoNotificacion: '05-PQR-009175-S-2025',
      fechaPublicacion: '09/04/2025 03:29:20 pm',
      fechaDesfijacion: '16/04/2025 03:29:20 pm',
      descripcion: 'Notificación por aviso.',
      pdfUrl: '#'
    },
    {
      id: 4,
      numeroCuenta: 'Codigo cuenta # 20866492 - GENTIL GUTIERREZ ROMERO',
      radicadoEntrada: '05-PQR-007035-E-2025',
      nroDocumento: '14989669',
      nombreUsuario: 'GENTIL GUTIERREZ ROMERO',
      radicadoRespuesta: '05-PQR-007203-S-2025',
      radicadoNotificacion: '05-PQR-008145-S-2025',
      fechaPublicacion: '08/04/2025 08:24:49 am',
      fechaDesfijacion: '15/04/2025 08:24:49 am',
      descripcion: 'Notificación por aviso.',
      pdfUrl: '#'
    },
    {
      id: 5,
      numeroCuenta: 'SUPERINTENDENCIA DE SERVICIOS PÚBLICOS DOMICILIARIOS-SSPD - PATRICIA ALMARIO ORTIZ',
      radicadoEntrada: '05-PQR-005223-E-2025',
      nroDocumento: '800250984-6',
      nombreUsuario: 'PATRICIA ALMARIO ORTIZ',
      radicadoRespuesta: '05-PQR-006928-S-2025',
      radicadoNotificacion: '05-PQR-007798-S-2025',
      fechaPublicacion: '03/04/2025 07:40:55 am',
      fechaDesfijacion: '10/04/2025 07:40:55 am',
      descripcion: 'Notificación por aviso.',
      pdfUrl: '#'
    }
  ];

  // Filtrar notificaciones según el tipo de búsqueda y valor
  const filteredNotificaciones = notificaciones.filter(notificacion => {
    if (!searchValue) return true;
    
    switch (searchType) {
      case 'cuenta':
        return notificacion.numeroCuenta.toLowerCase().includes(searchValue.toLowerCase());
      case 'documento':
        return notificacion.nroDocumento.toLowerCase().includes(searchValue.toLowerCase());
      case 'nombre':
        return notificacion.nombreUsuario.toLowerCase().includes(searchValue.toLowerCase());
      default:
        return true;
    }
  });

  // Calcular paginación
  const totalPages = Math.ceil(filteredNotificaciones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotificaciones.slice(indexOfFirstItem, indexOfLastItem);

  // Manejar cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Desplazarse al principio de la tabla
    window.scrollTo({
      top: document.getElementById('tabla-notificaciones').offsetTop - 20,
      behavior: 'smooth'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reiniciar a la primera página cuando se busca
    setCurrentPage(1);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Encabezado con logo */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-center mb-4">
            <img 
              src="/electrohuila-logo.png" 
              alt="ElectroHuila" 
              className="h-12"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80' viewBox='0 0 200 80'%3E%3Crect width='200' height='80' fill='%23ffffff'/%3E%3Ctext x='100' y='40' font-family='Arial' font-size='16' font-weight='bold' text-anchor='middle' alignment-baseline='middle' fill='%23ffffff'%3EElectroHuila%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
          <h1 className="text-center text-2xl font-bold">NOTIFICACIONES</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-8">
        {/* Texto informativo */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded-r">
          <p className="text-sm text-gray-700 mb-3">
            Una vez vencidos los cinco (5) días para la notificación personal; conforme a lo dispuesto en los Artículos 68 y 69 de la Ley 1437 de 2011, habiéndose hecho por correo certificado o al no haber encontrado cuenta de correo electrónico, se procede a dar notificación por aviso mediante el sistema la página web oficial de ELECTROHUILA <a href="http://electrohuila.com.co" className="text-blue-600 hover:underline">http://electrohuila.com.co</a>.
          </p>
          <p className="text-sm text-gray-700">
            Si usted considera que como persona natural o jurídica pudo no haber sido notificado de alguna contestación expedida por ELECTROHUILA, puede con su nombre completo o su número de cuenta para hacer búsqueda en la página web oficial de ELECTROHUILA, usando el siguiente buscador.
          </p>
        </div>

        {/* Formulario de búsqueda */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-1">Buscar por:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center">
                  <input
                    id="cuenta"
                    name="searchType"
                    type="radio"
                    checked={searchType === 'cuenta'}
                    onChange={() => setSearchType('cuenta')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="cuenta" className="ml-2 block text-sm text-gray-700">
                    Número de cuenta
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="documento"
                    name="searchType"
                    type="radio"
                    checked={searchType === 'documento'}
                    onChange={() => setSearchType('documento')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="documento" className="ml-2 block text-sm text-gray-700">
                    Número de documento
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="nombre"
                    name="searchType"
                    type="radio"
                    checked={searchType === 'nombre'}
                    onChange={() => setSearchType('nombre')}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="nombre" className="ml-2 block text-sm text-gray-700">
                    Nombre
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Ingrese el valor a buscar"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors sm:w-auto flex-shrink-0"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => {
                  setSearchValue('');
                  setCurrentPage(1);
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors sm:w-auto flex-shrink-0"
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>

        {/* Contador de resultados */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500">
            Notificaciones encontradas: <span className="text-gray-900">{filteredNotificaciones.length}</span>
          </div>
          {filteredNotificaciones.length > 0 && (
            <button 
              className="text-sm bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded flex items-center"
              onClick={() => window.alert('Exportar a Excel (funcionalidad simulada)')}
            >
              <FaDownload className="mr-1" /> Exportar a Excel
            </button>
          )}
        </div>

        {/* Tabla de notificaciones */}
        <div id="tabla-notificaciones" className="overflow-x-auto shadow-md rounded-lg mb-8">
          {currentItems.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número de cuenta
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Radicado
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha publicación
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha desfijación
                  </th>
                  <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Documento
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((notificacion) => (
                  <tr key={notificacion.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-normal text-sm text-gray-900">
                      {notificacion.numeroCuenta}
                    </td>
                    <td className="px-4 py-3 whitespace-normal text-sm text-gray-900">
                      {notificacion.nombreUsuario}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {notificacion.radicadoNotificacion}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {notificacion.fechaPublicacion}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {notificacion.fechaDesfijacion}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                      <a 
                        href={notificacion.pdfUrl} 
                        className="text-red-600 hover:text-red-900"
                        title="Descargar PDF"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFilePdf size={20} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="bg-white p-8 text-center rounded-lg">
              <p className="text-gray-500">No se encontraron notificaciones que coincidan con su búsqueda.</p>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <span className="sr-only">Anterior</span>
                &laquo;
              </button>
              
              {/* Generar números de página */}
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === index + 1
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-gray-50 cursor-pointer'
                }`}
              >
                <span className="sr-only">Siguiente</span>
                &raquo;
              </button>
            </nav>
          </div>
        )}
      </main>

      {/* Pie de página */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Electrificadora del Huila. Todos los derechos reservados.</p>
            <p className="mt-2">Las notificaciones permanecen publicadas en este sitio por un período de 5 días hábiles.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}