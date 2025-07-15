'use client';

export default function AlianzasConveniosEmpresariales() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <a href="/" className="text-orange-500 hover:text-orange-600">Inicio</a>
            <span>/</span>
            <a href="/institucional/gestion-y-programas-de-sostenibilidad" className="text-orange-500 hover:text-orange-600">Sostenibilidad</a>
            <span>/</span>
            <span className="text-gray-900">Alianzas / Convenios Empresariales</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Sostenibilidad</h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Imagen */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Círculo verde decorativo */}
              <div className="absolute -inset-6 bg-green-400 rounded-full opacity-20"></div>
              <div className="absolute -inset-3 border-4 border-green-400 rounded-full"></div>
              
              {/* Imagen principal - forma ovalada */}
              <div className="relative w-96 h-80 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/images/alianza-sena-electrohuila.jpg"
                  alt="Alianza ElectroHuila con SENA"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback content */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                  🤝
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Alianzas / Convenios Empresariales
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              ElectroHuila realiza alianza con el servicio de aprendizaje SENA/Contraloría.
            </p>
          </div>
        </div>

        {/* Sección adicional de información sobre alianzas */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* SENA */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SENA</h3>
            <p className="text-sm text-gray-600">
              Servicio Nacional de Aprendizaje para capacitación técnica y formación profesional.
            </p>
          </div>

          {/* Contraloría */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 3a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contraloría</h3>
            <p className="text-sm text-gray-600">
              Alianza para fortalecer los procesos de control y transparencia en la gestión empresarial.
            </p>
          </div>

          {/* ElectroHuila */}
          <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">ElectroHuila</h3>
            <p className="text-sm text-gray-600">
              Comprometidos con el desarrollo de alianzas estratégicas que beneficien a la comunidad.
            </p>
          </div>
        </div>

        {/* Información adicional sobre convenios */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Nuestros Convenios y Alianzas Estratégicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Objetivos</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Fortalecer la formación técnica y profesional</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Promover el desarrollo sostenible</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Mejorar la transparencia institucional</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>Generar impacto social positivo</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Beneficios</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Capacitación especializada</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Intercambio de conocimientos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Fortalecimiento institucional</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>Mejora en la prestación de servicios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}