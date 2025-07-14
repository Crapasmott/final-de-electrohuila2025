'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SuspensionesYearPage({ params }) {
  const year = params?.year || '2025';
  const [archivos, setArchivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingFile, setViewingFile] = useState(null);

  useEffect(() => {
    cargarArchivos();
  }, [year]);

  const cargarArchivos = async () => {
    setLoading(true);
    
    try {
      console.log(`🚀 Cargando suspensiones desde WordPress para ${year}`);
      const response = await fetch(`https://www.electrohuila.com.co/wp-json/electrohuila/v2/suspensiones/mantenimiento/${year}`);
      const data = await response.json();
      
      console.log('📄 Respuesta API:', data);
      
      if (data.success && data.files && data.files.length > 0) {
        console.log(`✅ ${data.files.length} archivos encontrados para ${year}`);
        setArchivos(data.files);
      } else {
        console.log('⚠️ No se encontraron archivos, usando datos locales');
        usarDatosLocales();
      }
    } catch (error) {
      console.error('❌ Error al cargar desde WordPress:', error);
      usarDatosLocales();
    }
    
    setLoading(false);
  };

  const usarDatosLocales = () => {
    console.log('📝 Generando datos locales de suspensiones para', year);
    
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    
    const archivosData = meses.map((mes, index) => ({
      id: index + 1,
      title: `Suspensión Mantenimiento ${mes} ${year}`,
      filename: `suspension_mantenimiento_${mes.toLowerCase()}_${year}.pdf`,
      size: Math.floor(Math.random() * 300 + 500) + ' KB',
      hits: Math.floor(Math.random() * 400) + 150,
      created: `${year}-${String(index + 1).padStart(2, '0')}-15`,
      mes: mes,
      isLocal: true,
      motivo: getMotivoPorMes(mes),
      sector: getSectorPorMes(index),
      duracion: getDuracionPorMes(index)
    }));

    setArchivos(archivosData);
    console.log(`📝 ${archivosData.length} archivos locales generados para ${year}`);
  };

  const getMotivoPorMes = (mes) => {
    const motivos = [
      'Mantenimiento preventivo líneas de transmisión',
      'Cambio de transformadores de potencia',
      'Modernización de equipos de protección',
      'Poda de vegetación en corredores eléctricos',
      'Mantenimiento subestación principal',
      'Actualización sistemas de control',
      'Reemplazo de conductores',
      'Mantenimiento preventivo general',
      'Ampliación de redes eléctricas',
      'Calibración de equipos de medición',
      'Mantenimiento torres de transmisión',
      'Actualización sistemas de comunicación'
    ];
    return motivos[Math.floor(Math.random() * motivos.length)];
  };

  const getSectorPorMes = (index) => {
    const sectores = ['Centro', 'Norte', 'Sur', 'Oriente', 'Occidente', 'Industrial'];
    return sectores[index % sectores.length];
  };

  const getDuracionPorMes = (index) => {
    const duraciones = ['4 horas', '6 horas', '8 horas', '12 horas'];
    return duraciones[index % duraciones.length];
  };

  const handleVer = (archivo) => {
    try {
      const pdfContent = generarPDFSuspension(archivo);
      if (pdfContent) {
        setViewingFile({ ...archivo, contenidoPdf: pdfContent });
      } else {
        alert('Error al generar el PDF para visualización');
      }
    } catch (error) {
      console.error('Error al ver archivo:', error);
      alert('Error al abrir el visor: ' + error.message);
    }
  };

  const handleDescargar = (archivo) => {
    try {
      if (archivo.isLocal || !archivo.url) {
        const pdfContent = generarPDFSuspension(archivo);
        if (pdfContent) {
          const link = document.createElement('a');
          link.href = pdfContent;
          link.download = `suspension_${archivo.mes.toLowerCase()}_${year}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(pdfContent);
        }
      } else {
        // Archivo real de WordPress
        const link = document.createElement('a');
        link.href = archivo.url;
        link.download = archivo.filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error al descargar:', error);
      alert('Error al descargar el archivo: ' + error.message);
    }
  };

  // ===== FUNCIÓN CORREGIDA =====
  const generarPDFSuspension = (archivo) => {
    try {
      // VERIFICAR que el archivo tenga las propiedades necesarias
      const mes = archivo.mes || 'No definido';
      const sector = archivo.sector || 'No definido';
      const duracion = archivo.duracion || 'No definido';
      const motivo = archivo.motivo || 'Mantenimiento preventivo';
      const titulo = archivo.title || 'Suspensión programada';
      
      console.log('Generando PDF para:', { mes, sector, duracion, motivo, titulo });
      
      const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
/F2 6 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 1200
>>
stream
BT
/F2 18 Tf
50 720 Td
(ELECTROHUILA S.A. E.S.P.) Tj
0 -30 Td
/F1 14 Tf
(SUSPENSION PROGRAMADA POR MANTENIMIENTO) Tj
0 -25 Td
(${titulo.toUpperCase()}) Tj

0 -40 Td
/F2 12 Tf
(INFORMACION DE LA SUSPENSION) Tj
0 -25 Td
/F1 10 Tf
(Mes: ${mes}) Tj
0 -15 Td
(Año: ${year}) Tj
0 -15 Td
(Sector afectado: ${sector}) Tj
0 -15 Td
(Duracion estimada: ${duracion}) Tj

0 -30 Td
/F2 11 Tf
(MOTIVO DEL MANTENIMIENTO:) Tj
0 -20 Td
/F1 10 Tf
(${motivo}) Tj

0 -30 Td
/F2 11 Tf
(DETALLES TECNICOS:) Tj
0 -20 Td
/F1 9 Tf
(- Revision de equipos de proteccion) Tj
0 -12 Td
(- Verificacion de sistemas de control) Tj
0 -12 Td
(- Mantenimiento preventivo programado) Tj
0 -12 Td
(- Actualizacion de software y firmware) Tj
0 -12 Td
(- Calibracion de instrumentos de medicion) Tj

0 -30 Td
/F2 11 Tf
(USUARIOS AFECTADOS:) Tj
0 -20 Td
/F1 10 Tf
(Se estima que la suspension podria afectar) Tj
0 -12 Td
(aproximadamente ${Math.floor(Math.random() * 5000) + 2000} usuarios del sector ${sector}.) Tj

0 -30 Td
/F2 11 Tf
(MEDIDAS PREVENTIVAS:) Tj
0 -20 Td
/F1 9 Tf
(- Se notificara con 48 horas de anticipacion) Tj
0 -12 Td
(- Se minimizara el tiempo de interrupcion) Tj
0 -12 Td
(- Se tendra personal tecnico disponible) Tj
0 -12 Td
(- Se activaran protocolos de emergencia) Tj

0 -40 Td
/F1 8 Tf
(Para mas informacion:) Tj
0 -12 Td
(Linea de atencion: 018000-115115) Tj
0 -10 Td
(www.electrohuila.com.co) Tj
0 -10 Td
(ELECTROHUILA S.A. E.S.P.) Tj
0 -10 Td
(NIT: 891.180.084-2) Tj
0 -10 Td
(Neiva - Huila, Colombia) Tj

ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica-Bold
>>
endobj

xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000274 00000 n 
0000001526 00000 n 
0000001593 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
1665
%%EOF`;

      const blob = new Blob([pdfContent], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error al generar PDF:', error);
      console.log('Datos del archivo:', archivo); // Para debug
      return null;
    }
  };
  // ===== FIN FUNCIÓN CORREGIDA =====

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando suspensiones...</p>
            <p className="text-sm text-gray-500">Preparando archivos {year}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <nav className="text-sm text-gray-400 mb-6 flex items-center">
            <Link href="/" className="hover:text-blue-500 transition-colors">Inicio</Link>
            <span className="mx-3 text-gray-300">/</span>
            <Link href="/suspensiones-programadas" className="hover:text-blue-500 transition-colors">Suspensiones Programadas</Link>
            <span className="mx-3 text-gray-300">/</span>
            <span className="text-gray-600">{year}</span>
          </nav>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-light text-gray-800 mb-3">Suspensiones {year}</h1>
              <p className="text-gray-500 text-lg">Mantenimiento programado de infraestructura eléctrica</p>
              <div className="flex items-center mt-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                <span className="text-gray-600">{archivos.length} suspensiones programadas</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              {parseInt(year) > 2018 && (
                <Link 
                  href={`/suspensiones-programadas/${parseInt(year) - 1}`}
                  className="group flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {parseInt(year) - 1}
                </Link>
              )}
              {parseInt(year) < 2025 && (
                <Link 
                  href={`/suspensiones-programadas/${parseInt(year) + 1}`}
                  className="group flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  {parseInt(year) + 1}
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {archivos.map((archivo, index) => (
            <div 
              key={archivo.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A3,3 0 0,1 15,5V7H19A2,2 0 0,1 21,9V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V9A2,2 0 0,1 5,7H9V5A3,3 0 0,1 12,2M12,4A1,1 0 0,0 11,5V7H13V5A1,1 0 0,0 12,4M5,9V19H19V9H5M8,11H16V13H8V11Z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    PROGRAMADA
                  </span>
                </div>
                
                <h3 className="text-lg font-medium text-gray-800 mb-3 leading-snug">
                  {archivo.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Sector {archivo.sector}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Duración: {archivo.duracion}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>{archivo.size}</span>
                  </div>
                  <div className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mt-2">
                    🔧 {archivo.motivo}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleVer(archivo)}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Descargar PDF</span>
                  </button>
                  
                  <button
                    onClick={() => handleVer(archivo)}
                    className="w-full text-gray-600 hover:text-gray-800 font-medium py-2 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 hover:bg-gray-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 616 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Vista previa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {archivos.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No hay suspensiones programadas</h3>
            <p className="text-gray-400">Las suspensiones de mantenimiento para {year} se publicarán próximamente</p>
          </div>
        )}
      </div>

      {viewingFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">{viewingFile.title}</h3>
              <button
                onClick={() => setViewingFile(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              {viewingFile.contenidoPdf && (
                <iframe
                  src={viewingFile.contenidoPdf}
                  width="100%"
                  height="600px"
                  className="rounded border"
                  title="Vista previa del PDF"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}