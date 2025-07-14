'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, FileText, Download, Eye, Loader2, CheckCircle, Calendar } from 'lucide-react';

const InformacionFinanciera = () => {
  const [activeTab, setActiveTab] = useState('presupuesto');
  const [expandedYears, setExpandedYears] = useState({});
  const [documentos, setDocumentos] = useState({});
  const [loading, setLoading] = useState(true);
  const [viewingDocument, setViewingDocument] = useState(null);

  // Datos de estructura completa
  const tabsData = {
    presupuesto: {
      title: 'Presupuesto',
      years: ['2025', '2024', '2023', '2022', '2021'],
      documents: {
        '2025': [
          'Acuerdo 17 de 2024'
        ],
        '2024': [
          'Presupuesto 2024'
        ],
        '2023': [
          'Presupuesto 2023'
        ],
        '2022': [],
        '2021': [
          'Ejecución ingresos 2021',
          'Ejecución gastos 2021',
          'Acuerdo 02 - Modificación',
          'Acuerdo 01 - Modificación',
          'Descripción de los ingresos',
          'Ejecución presupuestal 2021',
          'Presupuesto 2021'
        ]
      }
    },
    estados: {
      title: 'Estados Financieros',
      years: ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'],
      documents: {
        '2025': [
          'Estado de resultados enero 2025',
          'Estado de Situación Financiera enero 2025',
          'Estado de resultados marzo 2025',
          'Estado de Situación Financiera marzo 2025',
          'Estado de resultados febrero 2025',
          'Estado de Situación Financiera febrero 2025',
          'Estado de resultados abril 2025',
          'Estado de Situación Financiera abril 2025'
        ],
        '2024': [
          'Estados Financieros Certificados, Dictaminados y Notas 2024',
          'Estado de resultados noviembre',
          'Estado de situación Financiera noviembre',
          'Estado de resultados octubre',
          'Estado de situación Financiera octubre',
          'Estado de situación Financiera agosto',
          'Estado de resultados agosto',
          'Estado de situación Financiera septiembre',
          'Estado de resultados septiembre',
          'Estado de situación Financiera julio',
          'Estado de resultados julio',
          'Estado de situación Financiera junio',
          'Estado de resultados junio',
          'Estado de situación Financiera mayo',
          'Estado de resultados mayo',
          'Estado de situación Financiera abril',
          'Estado de resultados abril',
          'Estado de situación Financiera enero-marzo',
          'Estado de resultados enero-marzo',
          'Estado de situación Financiera febrero',
          'Estado de resultados febrero',
          'Estado de situación Financiera enero',
          'Estado de resultados enero'
        ],
        '2023': [
          'Estados financieros, dictamen y notas año 2023',
          'Estado de situación Financiera noviembre',
          'Estado de resultados noviembre',
          'Estado de situación Financiera octubre',
          'Estado de resultados octubre',
          'Estado de situación Financiera septiembre',
          'Estado de resultados septiembre',
          'Estado de situación Financiera agosto',
          'Estado de resultados agosto',
          'Estado de situación Financiera julio',
          'Estado de resultados julio',
          'Estado de situación Financiera junio',
          'Estado de resultados junio',
          'Estado de situación Financiera mayo',
          'Estado de resultados mayo',
          'Estado de situación Financiera abril',
          'Estado de resultados abril',
          'Estado de situación Financiera marzo',
          'Estado de resultados marzo',
          'Estado de situación Financiera febrero',
          'Estado de resultados febrero',
          'Estado de situación Financiera enero',
          'Estado de resultados enero'
        ],
        '2022': [
          'Estado de situación Financiera y de Resultados diciembre',
          'Estado de situación Financiera noviembre',
          'Estado de resultados noviembre',
          'Estado de situación Financiera octubre',
          'Estado de resultados octubre',
          'Estado de situación Financiera septiembre',
          'Estado de resultados septiembre',
          'Estado de situación Financiera agosto',
          'Estado de resultados agosto',
          'Estado de situación Financiera julio',
          'Estado de resultados julio',
          'Estado de situación Financiera junio',
          'Estado de resultados junio',
          'Estado de situación Financiera mayo',
          'Estado de resultados mayo',
          'Estado de situación Financiera abril',
          'Estado de resultados abril',
          'Estado de situación Financiera marzo',
          'Estado de resultados marzo',
          'Estado de situación Financiera febrero',
          'Estado de resultados febrero',
          'Estado de situación Financiera enero',
          'Estado de resultados enero'
        ],
        '2021': [
          'Estado de situación Financiera diciembre',
          'Estado de resultados diciembre',
          'Estado de situación Financiera noviembre',
          'Estado de resultados noviembre',
          'Estado de situación Financiera octubre',
          'Estado de resultados octubre',
          'Estado de situación Financiera septiembre',
          'Estado de resultados septiembre',
          'Estado de situación Financiera agosto',
          'Estado de resultados agosto',
          'Estado de situación Financiera julio',
          'Estado de resultados julio',
          'Estado de situación Financiera junio',
          'Estado de resultados junio',
          'Estado de situación Financiera mayo',
          'Estado de resultados mayo',
          'Estado de situación Financiera abril',
          'Estado de resultados abril',
          'Estado de situación Financiera marzo',
          'Estado de resultados marzo',
          'Estado de situación Financiera febrero',
          'Estado de resultados febrero',
          'Estado de situación Financiera enero',
          'Estado de resultados enero'
        ],
        '2020': [
          'Estado de situación Financiera diciembre',
          'Estado de resultados diciembre',
          'Estado de situación Financiera noviembre',
          'Estado de resultados noviembre',
          'Estado de situación Financiera octubre',
          'Estado de resultados octubre',
          'Estado de situación Financiera septiembre',
          'Estado de resultados septiembre',
          'Estado de situación Financiera agosto',
          'Estado de resultados agosto',
          'Estado de situación Financiera julio',
          'Estado de resultados julio',
          'Estado de situación Financiera junio',
          'Estado de resultados junio',
          'Estado de situación Financiera mayo',
          'Estado de resultados mayo',
          'Estado de situación Financiera abril',
          'Estado de resultados abril',
          'Estado de situación Financiera marzo',
          'Estado de resultados marzo',
          'Estado de situación Financiera febrero',
          'Estado de resultados febrero',
          'Estado de situación Financiera enero',
          'Estado de resultados enero'
        ],
        '2019': [
          'Estado de situación Financiera diciembre',
          'Estado de situación Financiera noviembre',
          'Estado de situación Financiera octubre',
          'Estado de situación Financiera septiembre',
          'Estado de situación Financiera agosto',
          'Estado de situación Financiera julio',
          'Estado de situación Financiera junio',
          'Estado de situación Financiera mayo',
          'Estado de situación Financiera abril',
          'Estado de situación Financiera marzo',
          'Estado de situación Financiera febrero',
          'Estado de situación Financiera enero'
        ],
        '2018': [
          'Estado de situación Financiera 2018 - 2017'
        ]
      }
    },
    control: {
      title: 'Informe Control Interno Contable',
      years: ['2024', '2023', '2022'],
      documents: {
        '2024': [
          'Informe de la Evaluación del Control Interno Contable de la vigencia 2024'
        ],
        '2023': [
          'Informe de la Evaluación del Control Interno Contable de la vigencia 2023'
        ],
        '2022': [
          'Informe de la Evaluación del Control Interno Contable de la Vigencia 2022'
        ]
      }
    }
  };

  useEffect(() => {
    // Simular carga de datos
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDocumentos(tabsData);
      setLoading(false);
    };
    loadData();
  }, []);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [`${activeTab}-${year}`]: !prev[`${activeTab}-${year}`]
    }));
  };

  const handleViewDocument = (doc, year) => {
    const documentData = {
      titulo: doc,
      año: year,
      categoria: tabsData[activeTab].title,
      fecha_generacion: new Date().toLocaleDateString('es-ES'),
      descripcion: generateDocumentDescription(doc, year),
      url: `#documento-${doc.replace(/\s+/g, '-').toLowerCase()}`
    };
    setViewingDocument(documentData);
  };

  const handleDownloadDocument = (doc, year) => {
    try {
      const content = generateDocumentContent(doc, year);
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${doc.replace(/\s+/g, '_').toLowerCase()}_${year}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar documento:', error);
    }
  };

  const generateDocumentDescription = (doc, year) => {
    if (activeTab === 'presupuesto') {
      return `Documento presupuestal correspondiente al año ${year}. Incluye información detallada sobre la planificación y ejecución de recursos financieros de Electrohuila S.A. E.S.P.`;
    } else if (activeTab === 'estados') {
      return `Estado financiero que refleja la situación económica y resultados operacionales de la empresa durante el período especificado. Cumple con las normas contables vigentes.`;
    } else {
      return `Informe de evaluación del sistema de control interno contable, elaborado conforme a las normas de auditoría y control fiscal aplicables para empresas de servicios públicos.`;
    }
  };

  const generateDocumentContent = (doc, year) => {
    return `ELECTROHUILA S.A. E.S.P.
${tabsData[activeTab].title.toUpperCase()}

Documento: ${doc}
Año: ${year}
Fecha de generación: ${new Date().toLocaleDateString('es-ES')}

INFORMACIÓN DEL DOCUMENTO:
${generateDocumentDescription(doc, year)}

DATOS INSTITUCIONALES:
- Empresa: Electrificadora del Huila S.A. E.S.P.
- NIT: 891.180.084-2
- Dirección: Neiva, Huila, Colombia
- Teléfono: 018000-115115
- Web: www.electrohuila.com.co

NOTA: Este es un documento generado automáticamente.
Para obtener la información oficial completa, contacte directamente con Electrohuila S.A. E.S.P.

© ${new Date().getFullYear()} Electrohuila S.A. E.S.P. - Todos los derechos reservados.`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Cargando información financiera...</p>
        </div>
      </div>
    );
  }

  const currentTabData = documentos[activeTab];

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Información Financiera
        </h1>
        <p className="text-gray-600">
          Accede a los documentos financieros y presupuestales de Electrohuila S.A. E.S.P.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
        {Object.entries(tabsData).map(([key, data]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 font-medium ${
              activeTab === key
                ? 'bg-blue-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {data.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-semibold flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            {currentTabData.title}
          </h2>
        </div>

        <div className="bg-white rounded-b-lg">
          {currentTabData.years.map((year) => {
            const isExpanded = expandedYears[`${activeTab}-${year}`];
            const yearDocuments = currentTabData.documents[year] || [];
            
            return (
              <div key={year} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-blue-500 mr-3" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-blue-500 mr-3" />
                    )}
                    <span className="text-lg font-medium text-blue-600">
                      {year}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {yearDocuments.length} documento{yearDocuments.length !== 1 ? 's' : ''}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    {yearDocuments.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No hay documentos disponibles para este año</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {yearDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-orange-500 mr-3" />
                              <span className="text-gray-800">{doc}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleViewDocument(doc, year)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-md transition-colors"
                                title="Vista previa"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDownloadDocument(doc, year)}
                                className="p-2 text-green-600 hover:bg-green-100 rounded-md transition-colors"
                                title="Descargar"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal de vista previa */}
      {viewingDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold text-gray-800">
                Vista previa del documento
              </h3>
              <button
                onClick={() => setViewingDocument(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {viewingDocument.titulo}
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Año:</span>
                      <span className="ml-2 text-gray-600">{viewingDocument.año}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Categoría:</span>
                      <span className="ml-2 text-gray-600">{viewingDocument.categoria}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Fecha:</span>
                      <span className="ml-2 text-gray-600">{viewingDocument.fecha_generacion}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Descripción del documento:</h5>
                  <p className="text-gray-700 leading-relaxed">
                    {viewingDocument.descripcion}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-medium text-gray-800 mb-2">Información adicional:</h5>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Documento oficial de Electrohuila S.A. E.S.P.</li>
                    <li>• Cumple con normativas contables vigentes</li>
                    <li>• Información verificada y auditada</li>
                    <li>• Disponible para descarga en formato de texto</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
              <button
                onClick={() => handleDownloadDocument(viewingDocument.titulo, viewingDocument.año)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Descargar Documento
              </button>
              <button
                onClick={() => setViewingDocument(null)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformacionFinanciera;