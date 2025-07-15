'use client';

export default function ApoyoSocialDeporte() {
  const apoyos = [
    {
      titulo: "Atlético Huila",
      descripcion: "Patrocinio y apoyo al equipo profesional de fútbol de la región",
      icono: "⚽"
    },
    {
      titulo: "Deportista Tatan",
      descripcion: "Apoyo individual a deportistas destacados del departamento",
      icono: "🏃‍♂️"
    },
    {
      titulo: "Dotación de Uniformes",
      descripcion: "Entrega de uniformes deportivos a equipos locales",
      icono: "👕"
    },
    {
      titulo: "Otros Deportes",
      descripcion: "Apoyo a diversas disciplinas deportivas de la región",
      icono: "🏆"
    }
  ];

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
            <span className="text-gray-900">Apoyo Social al Deporte</span>
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
                  src="/images/apoyo-social-deporte.jpg"
                  alt="Apoyo Social al Deporte - ElectroHuila"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback content */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold" style={{display: 'none'}}>
                  ⚽
                </div>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Apoyo Social al Deporte
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Apoyos Atlético Huila, deportista Tatan, dotación de uniformes deportivos entre otros.
            </p>
          </div>
        </div>

        {/* Sección de tipos de apoyo */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {apoyos.map((apoyo, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{apoyo.icono}</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{apoyo.titulo}</h3>
              <p className="text-sm text-gray-600">{apoyo.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Atlético Huila destacado */}
        <div className="mt-16 bg-gradient-to-r from-yellow-50 to-green-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  🏟️ Atlético Huila
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-4">
                  ElectroHuila es orgulloso patrocinador del Atlético Huila, equipo que representa 
                  el orgullo y la pasión deportiva de nuestro departamento.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">⚽</span>
                    <span>Patrocinio oficial del equipo</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">🏆</span>
                    <span>Apoyo en competencias nacionales</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">👥</span>
                    <span>Fortalecimiento del deporte regional</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 bg-yellow-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-6xl">⚽</span>
                </div>
                <p className="text-sm text-gray-500">
                  Apoyando el talento deportivo del Huila
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Información sobre programas deportivos */}
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Nuestro Compromiso con el Deporte
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Misión</h4>
              <p className="text-sm text-gray-600">
                Promover el desarrollo deportivo como herramienta de transformación social y bienestar comunitario.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Visión</h4>
              <p className="text-sm text-gray-600">
                Ser referente en el apoyo al deporte regional, contribuyendo al desarrollo de talentos deportivos.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Valores</h4>
              <p className="text-sm text-gray-600">
                Compromiso, excelencia, trabajo en equipo y responsabilidad social con nuestra comunidad.
              </p>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-500 mb-2">50+</div>
              <div className="text-sm text-gray-600">Deportistas apoyados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500 mb-2">15</div>
              <div className="text-sm text-gray-600">Equipos patrocinados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Uniformes entregados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-500 mb-2">8</div>
              <div className="text-sm text-gray-600">Disciplinas deportivas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}