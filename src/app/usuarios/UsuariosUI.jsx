'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaCreditCard, FaLightbulb, FaHeadset, FaBolt, FaInfoCircle } from 'react-icons/fa';
import { HiOutlineExclamation } from 'react-icons/hi';

export default function UsuariosUI() {
  const [numeroFactura, setNumeroFactura] = useState('');
  const [activeTab, setActiveTab] = useState('servicios');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consultando factura:', numeroFactura);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Banner de alerta */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <HiOutlineExclamation className="h-5 w-5 text-yellow-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              El servicio estará interrumpido en el sector norte de Neiva el día 12 de abril de 6:00 AM a 12:00 PM.
              <Link href="/mantenimientos" className="font-medium underline ml-1 text-yellow-700 hover:text-yellow-600">
                Ver todos los mantenimientos
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Energía que transforma el Huila</h1>
          <p className="text-xl opacity-90 mb-6">Comprometidos con el desarrollo sostenible y el bienestar de nuestra región.</p>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium flex items-center transition duration-200 shadow-sm">
              <FaCreditCard className="mr-2" /> Pagar factura
            </button>
            <button className="bg-blue-600 border border-white hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium flex items-center transition duration-200 shadow-sm">
              <HiOutlineExclamation className="w-5 h-5 mr-2" /> Reportar falla
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Consulta rápida de factura */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 -mt-8 relative z-10 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Consulta rápida de factura</h2>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow">
              <label htmlFor="numeroFactura" className="block text-sm font-medium text-gray-700 mb-1">
                Número de cliente o factura
              </label>
              <input
                type="text"
                id="numeroFactura"
                placeholder="Ej: 100012345"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                value={numeroFactura}
                onChange={(e) => setNumeroFactura(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white py-2.5 px-5 rounded-md font-medium transition duration-200"
              >
                Consultar
              </button>
            </div>
          </form>
        </div>
        
        {/* Tabs para servicios y estado */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-6">
            <button 
              onClick={() => setActiveTab('servicios')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'servicios' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Nuestros servicios
            </button>
            <button 
              onClick={() => setActiveTab('estado')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'estado' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Estado del servicio
            </button>
          </nav>
        </div>
        
        {/* Contenido de la pestaña seleccionada */}
        {activeTab === 'servicios' ? (
          // Sección de servicios en grid moderno
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Facturación y pagos */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition duration-200 hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <FaCreditCard className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Facturación y pagos</h3>
              <p className="text-gray-600 mb-4">Consulta, descarga y paga tus facturas de manera rápida y segura a través de nuestras plataformas.</p>
              <Link 
                href="/facturacion" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Ver opciones <span className="ml-1">→</span>
              </Link>
            </div>

            {/* Nuevas conexiones */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition duration-200 hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                <FaLightbulb className="text-green-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Nuevas conexiones</h3>
              <p className="text-gray-600 mb-4">Solicita la instalación de un nuevo servicio para tu hogar o negocio con nuestro proceso simplificado.</p>
              <Link 
                href="/nuevas-conexiones" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Solicitar conexión <span className="ml-1">→</span>
              </Link>
            </div>

            {/* Atención al cliente */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 transition duration-200 hover:shadow-md">
              <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                <FaHeadset className="text-orange-600 text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Atención al cliente</h3>
              <p className="text-gray-600 mb-4">Resuelve tus dudas a través de nuestros canales de atención disponibles 24/7 para tu comodidad.</p>
              <Link 
                href="/soporte" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
              >
                Contactar soporte <span className="ml-1">→</span>
              </Link>
            </div>
          </div>
        ) : (
          // Sección de estado del servicio
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {/* Neiva */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Neiva</h3>
                  <p className="text-sm text-gray-500">Actualizado: Hoy, 9:30 AM</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-medium text-green-700">Normal</span>
                </div>
              </div>
              
              {/* Garzón */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Garzón</h3>
                  <p className="text-sm text-gray-500">Actualizado: Hoy, 9:15 AM</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-medium text-green-700">Normal</span>
                </div>
              </div>
              
              {/* Pitalito */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">Pitalito</h3>
                  <p className="text-sm text-gray-500">Actualizado: Hoy, 8:45 AM</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-orange-500 rounded-full mr-2"></span>
                  <span className="font-medium text-orange-700">Mantenimiento</span>
                </div>
              </div>
              
              {/* La Plata */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">La Plata</h3>
                  <p className="text-sm text-gray-500">Actualizado: Hoy, 9:00 AM</p>
                </div>
                <div className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-medium text-green-700">Normal</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/mapa-cobertura" 
                className="inline-flex items-center border border-gray-300 rounded-md px-5 py-2 text-gray-700 bg-white hover:bg-gray-50 transition duration-200"
              >
                Ver mapa de cobertura 
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}