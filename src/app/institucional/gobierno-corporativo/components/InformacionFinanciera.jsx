import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Download, Eye, Loader2, CheckCircle, Calendar } from 'lucide-react';

const InformacionFinanciera = () => {
  const [activeTab, setActiveTab] = useState('presupuesto');
  const [expandedYears, setExpandedYears] = useState({});
  const [years, setYears] = useState([]);
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState({});
  const [connected, setConnected] = useState(false);

  // Configuración de pestañas
  const tabs = [
    { 
      id: 'presupuesto', 
      label: 'Presupuesto',
      color: 'border-blue-500 text-blue-600'
    },
    { 
      id: 'estados-financieros', 
      label: 'Estados Financieros',
      color: 'border-green-500 text-green-600'
    },
    { 
      id: 'control-interno', 
      label: 'Informe Control Interno Contable',
      color: 'border-purple-500 text-purple-600'
    }
  ];

  // Cargar años disponibles
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch('https://www.electrohuila.com.co/wp-json/electrohuila/v2/informacion-financiera/anos');
        const data = await response.json();
        if (data.success) {
          setYears(data.years);
          setConnected(true);
        }
      } catch (error) {
        console.error('Error cargando años:', error);
        setYears(['2025', '2024', '2023', '2022', '2021']);
      }
    };
    fetchYears();
  }, []);

  // Cargar archivos por pestaña y año
  const loadFiles = async (tipo, year) => {
    const cacheKey = `${tipo}-${year}`;
    
    if (files[cacheKey]) {
      return files[cacheKey];
    }

    setLoading(prev => ({ ...prev, [cacheKey]: true }));
    
    try {
      const response = await fetch(`https://www.electrohuila.com.co/wp-json/electrohuila/v2/informacion-financiera/${tipo}/${year}`);
      const data = await response.json();
      
      if (data.success) {
        setFiles(prev => ({ ...prev, [cacheKey]: data.files }));
        setLoading(prev => ({ ...prev, [cacheKey]: false }));
        return data.files;
      }
    } catch (error) {
      console.error('Error cargando archivos:', error);
    }
    
    setLoading(prev => ({ ...prev, [cacheKey]: false }));
    return [];
  };

  // Toggle expandir año
  const toggleYear = async (year) => {
    const key = `${activeTab}-${year}`;
    
    if (!expandedYears[key]) {
      await loadFiles(activeTab, year);
    }
    
    setExpandedYears(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Fecha no disponible';
    }
  };

  // Función para ver PDF en nueva pestaña
  const handleViewPDF = (file) => {
    if (file.url && file.url.trim() !== '') {
      window.open(file.url, '_blank');
    } else {
      // Para archivos sin URL (como los de presupuesto), simular la URL
      const simulatedUrl = `https://www.electrohuila.com.co/wp-content/uploads/documentos/${file.filename}`;
      
      // Intentar abrir la URL simulada
      const newWindow = window.open(simulatedUrl, '_blank');
      
      // Si falla, mostrar mensaje alternativo
      setTimeout(() => {
        if (newWindow && newWindow.closed) {
          alert(`El archivo ${file.title} se está procesando desde WordPress.\n\nSi el archivo no se abre, contacte al administrador para verificar que esté disponible en el sistema.`);
        }
      }, 1000);
    }
  };

  // Función para descargar PDF
  const handleDownloadPDF = (file) => {
    if (file.url && file.url.trim() !== '') {
      // Crear enlace temporal para descarga
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Para archivos sin URL, intentar descarga simulada
      const simulatedUrl = `https://www.electrohuila.com.co/wp-content/uploads/documentos/${file.filename}`;
      
      const link = document.createElement('a');
      link.href = simulatedUrl;
      link.download = file.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Mostrar mensaje informativo
      setTimeout(() => {
        alert(`Descargando: ${file.filename}\n\nSi la descarga no inicia automáticamente, contacte al administrador para verificar que el archivo esté disponible en WordPress.`);
      }, 500);
    }
  };

  // Obtener archivos del cache
  const getFilesForYear = (year) => {
    const cacheKey = `${activeTab}-${year}`;
    return files[cacheKey] || [];
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      {/* Pestañas */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm border-l-4 border-blue-500'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-center">
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-4">
        {years.map((year) => {
          const yearKey = `${activeTab}-${year}`;
          const isExpanded = expandedYears[yearKey];
          const yearFiles = getFilesForYear(year);
          const isLoadingYear = loading[yearKey];

          return (
            <div key={year} className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Header del año */}
              <div
                className="bg-gray-50 border-b border-gray-200 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleYear(year)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {isExpanded ? (
                        <ChevronDown className="w-5 h-5 text-blue-600" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-600" />
                      )}
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Año {year}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {yearFiles.length > 0 && (
                      <span className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded">
                        {yearFiles.length} archivo{yearFiles.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    
                    {isLoadingYear && (
                      <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido expandido */}
              {isExpanded && (
                <div className="p-4 bg-white">
                  {isLoadingYear ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                      <span className="ml-2 text-gray-600">Cargando archivos...</span>
                    </div>
                  ) : yearFiles.length > 0 ? (
                    <div className="space-y-3">
                      {yearFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-red-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{file.title}</h4>
                              <div className="text-sm text-gray-600 flex items-center gap-4">
                                <span>{file.size}</span>
                                <span>{formatDate(file.date)}</span>
                                {file.source === 'wordpress' && (
                                  <span className="flex items-center gap-1 text-green-600">
                                    <CheckCircle className="w-4 h-4" />
                                    WordPress
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                              onClick={() => handleViewPDF(file)}
                            >
                              <Eye className="w-4 h-4" />
                              Ver
                            </button>
                            
                            <button
                              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                              onClick={() => handleDownloadPDF(file)}
                            >
                              <Download className="w-4 h-4" />
                              Descargar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                      <p>No hay archivos disponibles para este año</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InformacionFinanciera;