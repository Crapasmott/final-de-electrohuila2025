'use client';

import { useState } from 'react';

export default function PDFViewer({ isOpen, onClose, pdfUrl, fileName }) {
  const [loading, setLoading] = useState(true);
  
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      console.log('📥 Iniciando descarga:', fileName);
      
      // Usar nuestro proxy para descargar
      const proxyUrl = `/api/download?url=${encodeURIComponent(pdfUrl)}&name=${encodeURIComponent(fileName)}`;
      
      // Crear enlace de descarga
      const link = document.createElement('a');
      link.href = proxyUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('✅ Descarga iniciada exitosamente');
    } catch (error) {
      console.error('❌ Error en descarga:', error);
      alert('Error al descargar el archivo');
    }
  };

  // URL del proxy para visualización
  const viewerUrl = `/api/download?url=${encodeURIComponent(pdfUrl)}&name=${encodeURIComponent(fileName)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="bg-white rounded-lg shadow-xl w-11/12 h-5/6 max-w-6xl flex flex-col">
        
        {/* Header del visor */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">PDF</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{fileName}</h3>
              <p className="text-sm text-gray-500">Vista previa del documento</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Botón descargar */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar
            </button>
            
            {/* Botón cerrar */}
            <button
              onClick={onClose}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Cerrar
            </button>
          </div>
        </div>

        {/* Contenido del visor */}
        <div className="flex-1 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Cargando documento...</p>
              </div>
            </div>
          )}
          
          {/* iframe para mostrar el PDF */}
          <iframe
            src={viewerUrl}
            className="w-full h-full border-0"
            title={fileName}
            onLoad={() => setLoading(false)}
            onError={() => {
              setLoading(false);
              console.error('Error cargando PDF');
            }}
          />
        </div>

        {/* Footer con información */}
        <div className="p-3 border-t bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>📄 {fileName}</span>
            <span>🔗 Cargado desde ElectroHuila</span>
          </div>
        </div>
      </div>
    </div>
  );
}