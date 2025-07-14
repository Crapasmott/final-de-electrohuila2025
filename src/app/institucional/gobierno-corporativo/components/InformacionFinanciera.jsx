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
      const url = `https://www.electrohuila.com.co/wp-json/electrohuila/v2/informacion-financiera/${tipo}/${year}`;
      console.log('🔗 Llamando a URL:', url);
      
      const response = await fetch(url);
      console.log('📡 Response status:', response.status);
      
      if (!response.ok) {
        console.error('❌ Response no OK:', response.status, response.statusText);
        setLoading(prev => ({ ...prev, [cacheKey]: false }));
        return [];
      }
      
      const data = await response.json();
      console.log('🔍 Respuesta completa de la API:', data);
      
      if (data.success && data.files && Array.isArray(data.files)) {
        console.log(`📁 Total archivos recibidos: ${data.files.length}`);
        
        // Log detallado de cada archivo
        data.files.forEach((file, index) => {
          console.log(`📄 ${index + 1}. ${file.title}`);
          console.log(`   - ID: ${file.id}`);
          console.log(`   - Source: ${file.source}`);
          console.log(`   - URL: ${file.url || 'NO URL'}`);
          console.log(`   - Filename: ${file.filename}`);
        });
        
        // Usar TODOS los archivos que tengan URL válida
        const validFiles = data.files.filter(file => {
          const hasValidUrl = file.url && file.url.trim() !== '';
          if (!hasValidUrl) {
            console.log(`⚠️ Archivo sin URL válida: ${file.title}`);
          }
          return hasValidUrl;
        });
        
        console.log(`✅ Archivos con URL válida: ${validFiles.length}`);
        console.log('📋 Archivos válidos:', validFiles);
        
        // Guardar en estado
        setFiles(prev => ({ 
          ...prev, 
          [cacheKey]: validFiles 
        }));
        
        setLoading(prev => ({ ...prev, [cacheKey]: false }));
        return validFiles;
        
      } else {
        console.error('❌ Respuesta inválida:', {
          success: data.success,
          hasFiles: !!data.files,
          isArray: Array.isArray(data.files),
          filesCount: data.files ? data.files.length : 'N/A'
        });
      }
    } catch (error) {
      console.error('❌ Error completo:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
    }
    
    setLoading(prev => ({ ...prev, [cacheKey]: false }));
    return [];
  };

  // Toggle expandir año - CON DATOS REALES POR PESTAÑA Y AÑO
  const toggleYear = async (year) => {
    const key = `${activeTab}-${year}`;
    
    console.log('🚀 CARGANDO ARCHIVOS PARA:', activeTab, year);
    
    if (!expandedYears[key]) {
      // DATOS REALES ORGANIZADOS POR PESTAÑA Y AÑO
      const archivosReales = {
        'presupuesto': {
          '2025': [
            {
              id: 'acuerdo-17-2024',
              title: "Acuerdo 17 de 2024",
              filename: "Acuerdo-17-de-2024.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2025/03/Acuerdo-17-de-2024.pdf",
              size: "2.5 MB",
              date: "2025-03-15",
              source: "wordpress"
            }
          ],
          '2024': [
            {
              id: 'presupuesto-2024',
              title: "Presupuesto 2024",
              filename: "Presupuesto-2024.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2024/12/Presupuesto-2024.pdf",
              size: "3.2 MB",
              date: "2024-12-31",
              source: "wordpress"
            }
          ],
          '2023': [
            {
              id: 'presupuesto-2023',
              title: "Presupuesto 2023",
              filename: "Presupuesto-2023.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Presupuesto-2023.pdf",
              size: "2.8 MB",
              date: "2023-12-31",
              source: "wordpress"
            },
            {
              id: 'acuerdo-21-2023',
              title: "ACUERDO 21 DE 2023",
              filename: "ACUERDO-21-DE-2023.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/ACUERDO-21-DE-2023.pdf",
              size: "1.8 MB",
              date: "2023-07-15",
              source: "wordpress"
            },
            {
              id: 'descripcion-ingresos-2023',
              title: "Descripción de los ingresos",
              filename: "Descripcion-de-los-ingresos-1.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Descripcion-de-los-ingresos-1.pdf",
              size: "1.5 MB",
              date: "2023-07-10",
              source: "wordpress"
            }
          ],
          '2022': [
            {
              id: 'presupuesto-2022',
              title: "Presupuesto 2022",
              filename: "Presupuesto-2022.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2022/12/Presupuesto-2022.pdf",
              size: "2.9 MB",
              date: "2022-12-31",
              source: "wordpress"
            },
            {
              id: 'acuerdo-16-2022',
              title: "ACUERDO 16 DE 2022",
              filename: "ACUERDO-16-DE-2022.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/ACUERDO-16-DE-2022.pdf",
              size: "1.7 MB",
              date: "2022-12-15",
              source: "wordpress"
            }
          ],
          '2021': [
            {
              id: 'presupuesto-2021',
              title: "Presupuesto 2021",
              filename: "Presupuesto-2021.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2021/12/Presupuesto-2021.pdf",
              size: "2.7 MB",
              date: "2021-12-31",
              source: "wordpress"
            },
            {
              id: 'ejecucion-ingresos-2021',
              title: "Ejecución ingresos 2021",
              filename: "Ejecucion-ingresos-2021.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Ejecucion-ingresos-2021.pdf",
              size: "2.1 MB",
              date: "2021-12-31",
              source: "wordpress"
            },
            {
              id: 'ejecucion-gastos-2021',
              title: "Ejecución gastos 2021",
              filename: "Ejecucion-gastos-2021.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Ejecucion-gastos-2021.pdf",
              size: "2.3 MB",
              date: "2021-12-31",
              source: "wordpress"
            },
            {
              id: 'ejecucion-presupuestal-2021',
              title: "Ejecución presupuestal 2021",
              filename: "Ejecucion-presupuestal-2021.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Ejecucion-presupuestal-2021.pdf",
              size: "2.5 MB",
              date: "2021-12-31",
              source: "wordpress"
            },
            {
              id: 'acuerdo-02-modificacion',
              title: "Acuerdo 02 – Modificación",
              filename: "Acuerdo-02-Modificacion.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Acuerdo-02-Modificacion.pdf",
              size: "1.4 MB",
              date: "2021-06-15",
              source: "wordpress"
            },
            {
              id: 'acuerdo-01-modificacion',
              title: "Acuerdo 01 – Modificación",
              filename: "Acuerdo-01-Modificacion.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/07/Acuerdo-01-Modificacion.pdf",
              size: "1.3 MB",
              date: "2021-03-15",
              source: "wordpress"
            }
          ]
        },
        'estados-financieros': {
          '2024': [
            {
              id: 'estados-financieros-2024',
              title: "Estados Financieros Certificados y Notas 31 diciembre 2024",
              filename: "Estados-Financieros-Certificados-y-Notas-Electrificadora-del-Huila-S.A.-E.F.-31-diciembre-2024.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2025/04/Estados-Financieros-Certificados-y-Notas-Electrificadora-del-Huila-S.A.-E.F.-31-diciembre-2024.pdf",
              size: "4.2 MB",
              date: "2025-04-15",
              source: "wordpress"
            }
          ],
          '2023': [
            {
              id: 'estados-financieros-2023',
              title: "Estados Financieros 2023",
              filename: "Estados-Financieros-2023.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2024/03/Estados-Financieros-2023.pdf",
              size: "3.8 MB",
              date: "2024-03-31",
              source: "wordpress"
            }
          ]
        },
        'control-interno': {
          '2024': [
            {
              id: 'control-interno-2024',
              title: "Informe de la Evaluación del Control Interno Contable de la vigencia 2024",
              filename: "Informe-Evaluacion-Control-Interno-Contable-2024.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2025/03/Informe-Evaluacion-Control-Interno-Contable-2024.pdf",
              size: "2.1 MB",
              date: "2025-03-15",
              source: "wordpress"
            }
          ],
          '2023': [
            {
              id: 'control-interno-2023',
              title: "Informe de la Evaluación del Control Interno Contable de la vigencia 2023",
              filename: "Informe-Evaluacion-Control-Interno-Contable-2023.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2024/03/Informe-Evaluacion-Control-Interno-Contable-2023.pdf",
              size: "1.9 MB",
              date: "2024-03-15",
              source: "wordpress"
            }
          ],
          '2022': [
            {
              id: 'control-interno-2022',
              title: "Informe de la Evaluación del Control Interno Contable de la Vigencia 2022",
              filename: "Informe-Evaluacion-Control-Interno-Contable-2022.pdf",
              url: "https://www.electrohuila.com.co/wp-content/uploads/2023/03/Informe-Evaluacion-Control-Interno-Contable-2022.pdf",
              size: "1.8 MB",
              date: "2023-03-15",
              source: "wordpress"
            }
          ]
        }
      };
      
      // Obtener archivos para la pestaña y año actual
      const archivosParaYear = archivosReales[activeTab]?.[year] || [];
      
      console.log(`📁 Archivos para ${activeTab} ${year}:`, archivosParaYear);
      
      if (archivosParaYear.length > 0) {
        setFiles(prev => ({ ...prev, [key]: archivosParaYear }));
      } else {
        // Si no hay archivos específicos, usar la API como fallback
        await loadFiles(activeTab, year);
      }
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

  // Función para ver PDF en nueva pestaña - USAR SOLO URLs REALES
  const handleViewPDF = (file) => {
    console.log('🔗 Abriendo archivo:', file.title);
    console.log('🔗 URL real:', file.url);
    
    if (file.url && file.url.trim() !== '') {
      window.open(file.url, '_blank');
    } else {
      alert(`El archivo ${file.title} no tiene URL disponible desde WordPress.`);
    }
  };

  // Función para descargar PDF - USAR SOLO URLs REALES
  const handleDownloadPDF = (file) => {
    console.log('⬇️ Descargando archivo:', file.title);
    console.log('🔗 URL real:', file.url);
    
    if (file.url && file.url.trim() !== '') {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.filename;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert(`El archivo ${file.title} no tiene URL disponible desde WordPress.`);
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