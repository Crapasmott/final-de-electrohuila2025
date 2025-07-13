'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TarifasYearPage({ params }) {
  const year = params?.year || '2025';
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingFile, setViewingFile] = useState(null);

  useEffect(() => {
    const meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    const archivosData = meses.map((mes, index) => ({
      id: index + 1,
      titulo: `Tarifas ${mes} ${year}`,
      mes: mes,
      fecha: `${mes} ${year}`,
      tamaño: '850 KB',
      tipo: 'pdf',
      estado: 'Publicado',
      // PDF de ejemplo local que SÍ funciona
      contenidoPdf: generateSamplePDF(mes, year)
    }));

    setArchivos(archivosData);
    setLoading(false);
  }, [year]);

  // Generar PDF simple que funciona
  const generateSamplePDF = (mes, year) => {
    return `data:application/pdf;base64,JVBERi0xLjQKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovQ29udGVudHMgNCAwIFIKL1Jlc291cmNlcyA8PAovRm9udCA8PAovRjEgNSAwIFIKPj4KPj4KPj4KZW5kb2JqCjQgMCBvYmoKPDwKL0xlbmd0aCAyNDMKPj4Kc3RyZWFtCkJUCi9GMSAyNCBUZgozNiA3MjAgVGQKKFRhcmlmYXMgRWxlY3Ryb0h1aWxhKSBUagowIC00MCBUZAooTWVzOiAke21lc30gJHt5ZWFyfSkgVGoKMCAtNDAgVGQKKEVzdGUgZXMgdW4gYXJjaGl2byBkZSBlamVtcGxvKSBUagowIC00MCBUZAooUERGIGdlbmVyYWRvIGVuIE5leHQuanMpIFRqCjAgLTQwIFRkCihQYXJhIGVsIHNpc3RlbWEgZGUgdGFyaWZhcykgVGoKMCAtNDAgVGQKKEVsZWN0cm9IdWlsYSAyMDI1KSBUagpFVApzdHJlYW0KZW5kb2JqCjUgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAwMTAgMDAwMDAgbiAKMDAwMDAwMDA1MyAwMDAwMCBuIAowMDAwMDAwMTI1IDAwMDAwIG4gCjAwMDAwMDAzNDggMDAwMDAgbiAKMDAwMDAwMDY0MSAwMDAwMCBuIAp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjc0MAolJUVPRg==`;
  };

  const handleVer = (archivo) => {
    setViewingFile(archivo);
  };

  const handleDescargar = (archivo) => {
    // Crear blob del PDF y descargarlo
    const byteCharacters = atob(archivo.contenidoPdf.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tarifas-${archivo.mes.toLowerCase()}-${year}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando archivos de {year}...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-blue-600">Inicio</Link>
          <span className="mx-2">|</span>
          <Link href="/tarifas" className="hover:text-blue-600">Tarifas</Link>
          <span className="mx-2">|</span>
          <span>{year}</span>
        </nav>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">{year}</h1>
          
          {/* Navegación entre años */}
          <div className="flex gap-2">
            {parseInt(year) > 2008 && (
              <Link 
                href={`/tarifas/${parseInt(year) - 1}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                ← {parseInt(year) - 1}
              </Link>
            )}
            {parseInt(year) < 2025 && (
              <Link 
                href={`/tarifas/${parseInt(year) + 1}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
              >
                {parseInt(year) + 1} →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Lista de archivos */}
      <div className="grid gap-4 md:grid-cols-2">
        {archivos.map((archivo) => (
          <div key={archivo.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icono PDF */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              {/* Información del archivo */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1">{archivo.titulo}</h3>
                <p className="text-sm text-gray-500 mb-2">{archivo.tamaño} • {archivo.fecha}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleVer(archivo)}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                  >
                    👁️ Ver PDF
                  </button>
                  <button
                    onClick={() => handleDescargar(archivo)}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                  >
                    📥 Descargar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para ver PDF */}
      {viewingFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">{viewingFile.titulo}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDescargar(viewingFile)}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                >
                  📥 Descargar
                </button>
                <button
                  onClick={() => setViewingFile(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl px-2"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              <iframe
                src={viewingFile.contenidoPdf}
                className="w-full h-full border rounded"
                title={viewingFile.titulo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}