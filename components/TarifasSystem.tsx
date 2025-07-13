// components/TarifasSystem.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Download, Calendar, FileText, Search, Filter } from 'lucide-react';

interface TarifaFile {
  id: string;
  name: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
  downloadUrl: string;
  month: string;
  year: number;
}

interface TarifaYear {
  year: number;
  files: TarifaFile[];
  totalFiles: number;
}

interface TarifasSystemProps {
  className?: string;
}

const TarifasSystem: React.FC<TarifasSystemProps> = ({ className = '' }) => {
  const [tarifasData, setTarifasData] = useState<TarifaYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set([new Date().getFullYear()]));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [downloadingFiles, setDownloadingFiles] = useState<Set<string>>(new Set());

  // Datos estáticos organizados por año
  const getStaticTarifasData = (): TarifaYear[] => [
    {
      year: 2024,
      totalFiles: 12,
      files: [
        {
          id: "tarifa_2024_12",
          name: "Tarifas Diciembre 2024",
          fileName: "tarifas_diciembre_2024.pdf",
          uploadDate: "2024-12-01",
          fileSize: "2.3 MB",
          downloadUrl: "/api/tarifas/download/tarifas_diciembre_2024.pdf",
          month: "Diciembre",
          year: 2024
        },
        {
          id: "tarifa_2024_11",
          name: "Tarifas Noviembre 2024",
          fileName: "tarifas_noviembre_2024.pdf",
          uploadDate: "2024-11-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_noviembre_2024.pdf",
          month: "Noviembre",
          year: 2024
        },
        {
          id: "tarifa_2024_10",
          name: "Tarifas Octubre 2024",
          fileName: "tarifas_octubre_2024.pdf",
          uploadDate: "2024-10-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_octubre_2024.pdf",
          month: "Octubre",
          year: 2024
        },
        {
          id: "tarifa_2024_09",
          name: "Tarifas Septiembre 2024",
          fileName: "tarifas_septiembre_2024.pdf",
          uploadDate: "2024-09-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_septiembre_2024.pdf",
          month: "Septiembre",
          year: 2024
        },
        {
          id: "tarifa_2024_08",
          name: "Tarifas Agosto 2024",
          fileName: "tarifas_agosto_2024.pdf",
          uploadDate: "2024-08-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_agosto_2024.pdf",
          month: "Agosto",
          year: 2024
        },
        {
          id: "tarifa_2024_07",
          name: "Tarifas Julio 2024",
          fileName: "tarifas_julio_2024.pdf",
          uploadDate: "2024-07-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_julio_2024.pdf",
          month: "Julio",
          year: 2024
        },
        {
          id: "tarifa_2024_06",
          name: "Tarifas Junio 2024",
          fileName: "tarifas_junio_2024.pdf",
          uploadDate: "2024-06-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_junio_2024.pdf",
          month: "Junio",
          year: 2024
        },
        {
          id: "tarifa_2024_05",
          name: "Tarifas Mayo 2024",
          fileName: "tarifas_mayo_2024.pdf",
          uploadDate: "2024-05-01",
          fileSize: "1.8 MB",
          downloadUrl: "/api/tarifas/download/tarifas_mayo_2024.pdf",
          month: "Mayo",
          year: 2024
        },
        {
          id: "tarifa_2024_04",
          name: "Tarifas Abril 2024",
          fileName: "tarifas_abril_2024.pdf",
          uploadDate: "2024-04-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_abril_2024.pdf",
          month: "Abril",
          year: 2024
        },
        {
          id: "tarifa_2024_03",
          name: "Tarifas Marzo 2024",
          fileName: "tarifas_marzo_2024.pdf",
          uploadDate: "2024-03-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_marzo_2024.pdf",
          month: "Marzo",
          year: 2024
        },
        {
          id: "tarifa_2024_02",
          name: "Tarifas Febrero 2024",
          fileName: "tarifas_febrero_2024.pdf",
          uploadDate: "2024-02-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_febrero_2024.pdf",
          month: "Febrero",
          year: 2024
        },
        {
          id: "tarifa_2024_01",
          name: "Tarifas Enero 2024",
          fileName: "tarifas_enero_2024.pdf",
          uploadDate: "2024-01-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_enero_2024.pdf",
          month: "Enero",
          year: 2024
        }
      ]
    },
    {
      year: 2023,
      totalFiles: 12,
      files: [
        {
          id: "tarifa_2023_12",
          name: "Tarifas Diciembre 2023",
          fileName: "tarifas_diciembre_2023.pdf",
          uploadDate: "2023-12-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_diciembre_2023.pdf",
          month: "Diciembre",
          year: 2023
        },
        {
          id: "tarifa_2023_11",
          name: "Tarifas Noviembre 2023",
          fileName: "tarifas_noviembre_2023.pdf",
          uploadDate: "2023-11-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_noviembre_2023.pdf",
          month: "Noviembre",
          year: 2023
        },
        {
          id: "tarifa_2023_10",
          name: "Tarifas Octubre 2023",
          fileName: "tarifas_octubre_2023.pdf",
          uploadDate: "2023-10-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_octubre_2023.pdf",
          month: "Octubre",
          year: 2023
        },
        {
          id: "tarifa_2023_09",
          name: "Tarifas Septiembre 2023",
          fileName: "tarifas_septiembre_2023.pdf",
          uploadDate: "2023-09-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_septiembre_2023.pdf",
          month: "Septiembre",
          year: 2023
        },
        {
          id: "tarifa_2023_08",
          name: "Tarifas Agosto 2023",
          fileName: "tarifas_agosto_2023.pdf",
          uploadDate: "2023-08-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_agosto_2023.pdf",
          month: "Agosto",
          year: 2023
        },
        {
          id: "tarifa_2023_07",
          name: "Tarifas Julio 2023",
          fileName: "tarifas_julio_2023.pdf",
          uploadDate: "2023-07-01",
          fileSize: "1.8 MB",
          downloadUrl: "/api/tarifas/download/tarifas_julio_2023.pdf",
          month: "Julio",
          year: 2023
        },
        {
          id: "tarifa_2023_06",
          name: "Tarifas Junio 2023",
          fileName: "tarifas_junio_2023.pdf",
          uploadDate: "2023-06-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_junio_2023.pdf",
          month: "Junio",
          year: 2023
        },
        {
          id: "tarifa_2023_05",
          name: "Tarifas Mayo 2023",
          fileName: "tarifas_mayo_2023.pdf",
          uploadDate: "2023-05-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_mayo_2023.pdf",
          month: "Mayo",
          year: 2023
        },
        {
          id: "tarifa_2023_04",
          name: "Tarifas Abril 2023",
          fileName: "tarifas_abril_2023.pdf",
          uploadDate: "2023-04-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_abril_2023.pdf",
          month: "Abril",
          year: 2023
        },
        {
          id: "tarifa_2023_03",
          name: "Tarifas Marzo 2023",
          fileName: "tarifas_marzo_2023.pdf",
          uploadDate: "2023-03-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_marzo_2023.pdf",
          month: "Marzo",
          year: 2023
        },
        {
          id: "tarifa_2023_02",
          name: "Tarifas Febrero 2023",
          fileName: "tarifas_febrero_2023.pdf",
          uploadDate: "2023-02-01",
          fileSize: "1.8 MB",
          downloadUrl: "/api/tarifas/download/tarifas_febrero_2023.pdf",
          month: "Febrero",
          year: 2023
        },
        {
          id: "tarifa_2023_01",
          name: "Tarifas Enero 2023",
          fileName: "tarifas_enero_2023.pdf",
          uploadDate: "2023-01-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_enero_2023.pdf",
          month: "Enero",
          year: 2023
        }
      ]
    },
    {
      year: 2022,
      totalFiles: 12,
      files: [
        {
          id: "tarifa_2022_12",
          name: "Tarifas Diciembre 2022",
          fileName: "tarifas_diciembre_2022.pdf",
          uploadDate: "2022-12-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_diciembre_2022.pdf",
          month: "Diciembre",
          year: 2022
        },
        {
          id: "tarifa_2022_11",
          name: "Tarifas Noviembre 2022",
          fileName: "tarifas_noviembre_2022.pdf",
          uploadDate: "2022-11-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_noviembre_2022.pdf",
          month: "Noviembre",
          year: 2022
        },
        {
          id: "tarifa_2022_10",
          name: "Tarifas Octubre 2022",
          fileName: "tarifas_octubre_2022.pdf",
          uploadDate: "2022-10-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_octubre_2022.pdf",
          month: "Octubre",
          year: 2022
        },
        {
          id: "tarifa_2022_09",
          name: "Tarifas Septiembre 2022",
          fileName: "tarifas_septiembre_2022.pdf",
          uploadDate: "2022-09-01",
          fileSize: "1.8 MB",
          downloadUrl: "/api/tarifas/download/tarifas_septiembre_2022.pdf",
          month: "Septiembre",
          year: 2022
        },
        {
          id: "tarifa_2022_08",
          name: "Tarifas Agosto 2022",
          fileName: "tarifas_agosto_2022.pdf",
          uploadDate: "2022-08-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_agosto_2022.pdf",
          month: "Agosto",
          year: 2022
        },
        {
          id: "tarifa_2022_07",
          name: "Tarifas Julio 2022",
          fileName: "tarifas_julio_2022.pdf",
          uploadDate: "2022-07-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_julio_2022.pdf",
          month: "Julio",
          year: 2022
        },
        {
          id: "tarifa_2022_06",
          name: "Tarifas Junio 2022",
          fileName: "tarifas_junio_2022.pdf",
          uploadDate: "2022-06-01",
          fileSize: "1.9 MB",
          downloadUrl: "/api/tarifas/download/tarifas_junio_2022.pdf",
          month: "Junio",
          year: 2022
        },
        {
          id: "tarifa_2022_05",
          name: "Tarifas Mayo 2022",
          fileName: "tarifas_mayo_2022.pdf",
          uploadDate: "2022-05-01",
          fileSize: "2.1 MB",
          downloadUrl: "/api/tarifas/download/tarifas_mayo_2022.pdf",
          month: "Mayo",
          year: 2022
        },
        {
          id: "tarifa_2022_04",
          name: "Tarifas Abril 2022",
          fileName: "tarifas_abril_2022.pdf",
          uploadDate: "2022-04-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_abril_2022.pdf",
          month: "Abril",
          year: 2022
        },
        {
          id: "tarifa_2022_03",
          name: "Tarifas Marzo 2022",
          fileName: "tarifas_marzo_2022.pdf",
          uploadDate: "2022-03-01",
          fileSize: "1.8 MB",
          downloadUrl: "/api/tarifas/download/tarifas_marzo_2022.pdf",
          month: "Marzo",
          year: 2022
        },
        {
          id: "tarifa_2022_02",
          name: "Tarifas Febrero 2022",
          fileName: "tarifas_febrero_2022.pdf",
          uploadDate: "2022-02-01",
          fileSize: "2.2 MB",
          downloadUrl: "/api/tarifas/download/tarifas_febrero_2022.pdf",
          month: "Febrero",
          year: 2022
        },
        {
          id: "tarifa_2022_01",
          name: "Tarifas Enero 2022",
          fileName: "tarifas_enero_2022.pdf",
          uploadDate: "2022-01-01",
          fileSize: "2.0 MB",
          downloadUrl: "/api/tarifas/download/tarifas_enero_2022.pdf",
          month: "Enero",
          year: 2022
        }
      ]
    }
  ];

  // Cargar datos al montar el componente
  useEffect(() => {
    const loadTarifas = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Intentar cargar desde API, si falla usar datos estáticos
        try {
          const url = selectedYear 
            ? `/api/tarifas?year=${selectedYear}`
            : '/api/tarifas';
          
          const response = await fetch(url);
          
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setTarifasData(data.data || []);
              return;
            }
          }
        } catch (apiError) {
          console.log('API no disponible, usando datos estáticos');
        }

        // Usar datos estáticos si la API falla
        let staticData = getStaticTarifasData();
        
        // Filtrar por año si está seleccionado
        if (selectedYear) {
          staticData = staticData.filter(item => item.year === selectedYear);
        }
        
        setTarifasData(staticData);
        
      } catch (err) {
        console.error('Error loading tarifas:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar las tarifas');
        // Incluso con error, cargar datos estáticos
        setTarifasData(getStaticTarifasData());
      } finally {
        setLoading(false);
      }
    };

    loadTarifas();
  }, [selectedYear]);

  // Manejar expansión/colapso de años
  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  // Manejar descarga de archivos
  const handleDownload = async (file: TarifaFile) => {
    try {
      setDownloadingFiles(prev => new Set(prev.add(file.id)));
      
      // Simular descarga (en producción, esto descargaría el archivo real)
      console.log(`Descargando: ${file.fileName}`);
      
      // Crear un enlace temporal para simular descarga
      const link = document.createElement('a');
      link.href = '#';
      link.download = file.fileName;
      link.click();
      
      // Mostrar notificación de descarga
      alert(`Descargando: ${file.name}`);
      
    } catch (err) {
      console.error('Error downloading file:', err);
      alert('Error al descargar el archivo. Por favor, intente nuevamente.');
    } finally {
      setDownloadingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(file.id);
        return newSet;
      });
    }
  };

  // Filtrar archivos según búsqueda
  const getFilteredFiles = (files: TarifaFile[]) => {
    if (!searchTerm) return files;
    
    return files.filter(file => 
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.month.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener años únicos para el filtro
  const availableYears = tarifasData.map(item => item.year).sort((a, b) => b - a);

  if (loading) {
    return (
      <div className={`tarifas-system ${className}`}>
        <div className="tarifas-loading">
          <div className="loading-spinner"></div>
          <p>Cargando tarifas...</p>
        </div>
      </div>
    );
  }

  if (error && tarifasData.length === 0) {
    return (
      <div className={`tarifas-system ${className}`}>
        <div className="tarifas-error">
          <div className="error-icon">⚠️</div>
          <h3>Error al cargar las tarifas</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`tarifas-system ${className}`}>
      {/* Header con controles */}
      <div className="tarifas-header">
        <div className="header-title">
          <h2>📊 Sistema de Tarifas ElectroHuila</h2>
          <p>Consulta las tarifas eléctricas organizadas por año y mes</p>
        </div>
        
        <div className="header-controls">
          {/* Buscador */}
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Buscar por mes o año..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Filtro por año */}
          <div className="filter-container">
            <Filter className="filter-icon" size={20} />
            <select
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(e.target.value ? parseInt(e.target.value) : null)}
              className="year-filter"
            >
              <option value="">Todos los años</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de años y archivos */}
      <div className="tarifas-content">
        {tarifasData.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} className="empty-icon" />
            <h3>No se encontraron tarifas</h3>
            <p>No hay tarifas disponibles para los criterios seleccionados.</p>
          </div>
        ) : (
          tarifasData.map((yearData) => (
            <div key={yearData.year} className="year-container">
              <div 
                className="year-header"
                onClick={() => toggleYear(yearData.year)}
              >
                <div className="year-info">
                  {expandedYears.has(yearData.year) ? (
                    <ChevronDown className="expand-icon" size={24} />
                  ) : (
                    <ChevronRight className="expand-icon" size={24} />
                  )}
                  <Calendar className="year-icon" size={24} />
                  <span className="year-title">Año {yearData.year}</span>
                  <span className="file-count">({yearData.totalFiles} archivos)</span>
                </div>
              </div>
              
              {expandedYears.has(yearData.year) && (
                <div className="files-container">
                  {getFilteredFiles(yearData.files).map((file) => (
                    <div key={file.id} className="file-item">
                      <div className="file-info">
                        <FileText className="file-icon" size={20} />
                        <div className="file-details">
                          <h4 className="file-name">{file.name}</h4>
                          <div className="file-meta">
                            <span className="file-size">{file.fileSize}</span>
                            <span className="file-date">Subido: {formatDate(file.uploadDate)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleDownload(file)}
                        disabled={downloadingFiles.has(file.id)}
                        className="download-button"
                        title={`Descargar ${file.name}`}
                      >
                        {downloadingFiles.has(file.id) ? (
                          <div className="downloading">
                            <div className="download-spinner"></div>
                            Descargando...
                          </div>
                        ) : (
                          <>
                            <Download size={16} />
                            Descargar
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                  
                  {getFilteredFiles(yearData.files).length === 0 && searchTerm && (
                    <div className="no-results">
                      <p>No se encontraron archivos que coincidan con "{searchTerm}"</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Estilos CSS integrados */}
      <style jsx>{`
        .tarifas-system {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .tarifas-loading,
        .tarifas-error {
          text-align: center;
          padding: 4rem 2rem;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f4f6;
          border-top: 4px solid #1A6192;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        .error-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .retry-button {
          background: #1A6192;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          margin-top: 1rem;
        }

        .retry-button:hover {
          background: #144F73;
        }

        .tarifas-header {
          background: linear-gradient(135deg, #1A6192, #1797D5);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .header-title h2 {
          margin: 0 0 0.5rem;
          font-size: 1.75rem;
          font-weight: 700;
        }

        .header-title p {
          margin: 0 0 1.5rem;
          opacity: 0.9;
          font-size: 1.1rem;
        }

        .header-controls {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-container,
        .filter-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-icon,
        .filter-icon {
          position: absolute;
          left: 12px;
          color: #6b7280;
          z-index: 1;
        }

        .search-input,
        .year-filter {
          background: white;
          border: 2px solid transparent;
          border-radius: 8px;
          padding: 0.75rem 0.75rem 0.75rem 2.5rem;
          font-size: 0.875rem;
          min-width: 200px;
          transition: all 0.3s ease;
        }

        .search-input:focus,
        .year-filter:focus {
          outline: none;
          border-color: #1797D5;
          box-shadow: 0 0 0 3px rgba(23, 151, 213, 0.1);
        }

        .tarifas-content {
          space-y: 1rem;
        }

        .year-container {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .year-container:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .year-header {
          background: #f8fafc;
          padding: 1.5rem;
          cursor: pointer;
          transition: background 0.3s ease;
          border-bottom: 1px solid #e5e7eb;
        }

        .year-header:hover {
          background: #f1f5f9;
        }

        .year-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .expand-icon {
          color: #1A6192;
          transition: transform 0.3s ease;
        }

        .year-icon {
          color: #1797D5;
        }

        .year-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .file-count {
          color: #6b7280;
          font-size: 0.875rem;
          margin-left: auto;
        }

        .files-container {
          padding: 0;
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.3s ease;
        }

        .file-item:hover {
          background: #f9fafb;
        }

        .file-item:last-child {
          border-bottom: none;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .file-icon {
          color: #dc2626;
          flex-shrink: 0;
        }

        .file-details {
          flex: 1;
        }

        .file-name {
          margin: 0 0 0.25rem;
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
        }

        .file-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .download-button {
          background: #1A6192;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          min-width: 120px;
          justify-content: center;
        }

        .download-button:hover:not(:disabled) {
          background: #144F73;
          transform: translateY(-1px);
        }

        .download-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .downloading {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .download-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #6b7280;
        }

        .empty-icon {
          color: #d1d5db;
          margin-bottom: 1rem;
        }

        .empty-state h3 {
          margin: 0 0 0.5rem;
          color: #374151;
        }

        .no-results {
          padding: 2rem;
          text-align: center;
          color: #6b7280;
          font-style: italic;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .tarifas-system {
            padding: 1rem;
          }

          .tarifas-header {
            padding: 1.5rem;
          }

          .header-controls {
            flex-direction: column;
          }

          .search-input,
          .year-filter {
            width: 100%;
            min-width: auto;
          }

          .year-info {
            flex-wrap: wrap;
          }

          .file-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .file-info {
            width: 100%;
          }

          .download-button {
            width: 100%;
          }

          .file-meta {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        @media (max-width: 480px) {
          .header-title h2 {
            font-size: 1.5rem;
          }

          .year-title {
            font-size: 1.1rem;
          }

          .file-name {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TarifasSystem;