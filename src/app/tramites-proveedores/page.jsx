'use client';

import { useState } from 'react';

export default function TramitesProveedores() {
  const [acordeonesAbiertos, setAcordeonesAbiertos] = useState({});

  const toggleAcordeon = (id) => {
    setAcordeonesAbiertos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const ChevronDownIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const ChevronUpIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  const CheckIcon = () => (
    <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  const añosPlanAnual = [
    '2025', '2024', '2023', '2022', '2021', 
    '2020', 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>Inicio</span>
            <span>/</span>
            <span>Proveedores y Contratistas</span>
            <span>/</span>
            <span className="text-gray-900">Trámites</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Trámites Proveedores</h1>
          <p className="mt-2 text-gray-600">
            Documentos y trámites necesarios para proveedores y contratistas
          </p>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Plan Anual de Adquisición */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleAcordeon('planAnual')}
            >
              <h2 className="text-xl font-semibold text-gray-900">
                Plan Anual de Adquisición
              </h2>
              {acordeonesAbiertos.planAnual ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
            
            {acordeonesAbiertos.planAnual && (
              <div className="mt-4 space-y-2">
                {añosPlanAnual.map((año) => (
                  <div key={año} className="flex items-center space-x-3 py-2">
                    <CheckIcon />
                    <a 
                      href={`/documentos/tramites-provedores/PLAN-ANUALDE-ADQUISICIONES2020.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      Plan Anual de Adquisición {año}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manual de Contratación */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleAcordeon('manual')}
            >
              <h2 className="text-xl font-semibold text-gray-900">
                Manual de Contratación
              </h2>
              {acordeonesAbiertos.manual ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </div>
            
            {acordeonesAbiertos.manual && (
              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-3 py-2">
                  <CheckIcon />
                  <a 
                    href="/documentos/tramites-provedores/Acuerdo-No.-14-2025-Manual-de-Contratacion-1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Manual de Contratación 2025
                  </a>
                </div>
                <div className="flex items-center space-x-3 py-2">
                  <CheckIcon />
                  <a 
                    href="/documentos/tramites-provedores/Acuerdo-No.-10-de-2024-Manual-de-Contratacion.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Manual de Contratación 2024
                  </a>
                </div>
                <div className="flex items-center space-x-3 py-2">
                  <CheckIcon />
                  <a 
                    href="/documentos/tramites-provedores/MANUAL-DE-CONTRATACION-2021-V-6-DEFINITIVA-firmada_LINA-OBREGON_OK_SUSCRITO_AVO_JUN_22_2021.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Manual de Contratación 2021
                  </a>
                </div>
                <div className="flex items-center space-x-3 py-2">
                  <CheckIcon />
                  <a 
                    href="/documentos/tramites-provedores/REGLAMENTODECONTRATACION.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Manual de Contratación 2019
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Documentos de Descarga */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Documentos para Descarga
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => window.open('/documentos/tramites-provedores/DOCUMENTO-DE-GERENCIA-No.-064.pdf', '_blank')}
              className="flex items-center justify-center space-x-3 p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <DownloadIcon />
              <span>Document de Gerencia No 064</span>
            </button>
            
            <button
               onClick={() => window.open('/documentos/tramites-provedores/manual-supervision-interventoria.pdf', '_blank')}
              className="flex items-center justify-center space-x-3 p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <DownloadIcon />
              <span>Manual de Supervisión e Interventoría</span>
            </button>
            
            <button
              onClick={() => window.open('/documentos/tramites-provedores/Manual-de-Usuario-de-Inscripcion-de-Proveedores.pdf', '_blank')}
              className="flex items-center justify-center space-x-3 p-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <DownloadIcon />
              <span>Inscripción de Proveedores</span>
            </button>
            
            <button
              onClick={() => window.open('/documentos/tramites-provedores/20250310_Circular_001-2025_Facturacion_oblig_Contractuales.pdf', '_blank')}
              className="flex items-center justify-center space-x-3 p-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <DownloadIcon />
              <span>Circular recepción factura electrónica y radicación de documentos</span>
            </button>
          </div>
        </div>

        {/* Información Adicional */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Información Importante
          </h3>
          <div className="text-blue-800 space-y-2">
            <p>• Todos los documentos deben ser descargados y diligenciados completamente.</p>
            <p>• La inscripción como proveedor debe renovarse anualmente.</p>
            <p>• Para más información, contacte al área de contratación.</p>
            <p>• Revise regularmente las actualizaciones del manual de contratación.</p>
          </div>
        </div>
      </div>
    </div>
  );
}