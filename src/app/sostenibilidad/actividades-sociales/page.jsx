'use client';

export default function ActividadesSociales() {
  const actividades = [
    {
      id: 1,
      imagen: "/images/mesa-energia-san-agustin.jpg",
      titulo: 'Mesa energía "conectando con tu municipio"',
      subtitulo: "San Agustín",
      descripcion: 'Mesa energía "conectando con tu municipio" - San Agustín.'
    },
    {
      id: 2,
      imagen: "/images/apoyo-casa-hogar-electrohuila.jpg", 
      titulo: "Apoyo - casa hogar de paso ElectroHuila",
      subtitulo: "",
      descripcion: "Apoyo - casa hogar de paso ElectroHuila."
    },
    {
      id: 3,
      imagen: "/images/participacion-gran-salon-pasarela.jpg",
      titulo: "Participación a la III gran salón y pasarela",
      subtitulo: "artesanal tradición y maestría 2023",
      descripcion: "participación a la III gran salón y pasarela artesanal tradición y maestría 2023 entre otras."
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
            <a href="/sostenibilidad" className="text-orange-500 hover:text-orange-600">Sostenibilidad</a>
            <span>/</span>
            <span className="text-gray-900">Actividades Sociales</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Sostenibilidad</h1>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Actividades Sociales
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Electrohuila ha desarrollado la estrategia denominada mesas de energía "conectando con tu municipio", apoyo- casa hogar de paso ElectroHuila, 
            participación a la III gran salón y pasarela artesanal tradición y maestría 2023.
          </p>
        </div>

        {/* Grid de actividades */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {actividades.map((actividad) => (
            <div key={actividad.id} className="text-center">
              {/* Imagen circular con borde verde */}
              <div className="relative mx-auto mb-6">
                {/* Círculos decorativos verdes */}
                <div className="absolute -inset-4 bg-green-400 rounded-full opacity-20"></div>
                <div className="absolute -inset-2 border-4 border-green-400 rounded-full"></div>
                
                {/* Imagen principal */}
                <div className="relative w-64 h-64 rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={actividad.imagen}
                    alt={actividad.titulo}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback si la imagen no carga
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback content */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold" 
                    style={{display: 'none'}}
                  >
                    🤝
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 leading-tight">
                  {actividad.titulo}
                </h3>
                {actividad.subtitulo && (
                  <p className="text-base text-gray-700">
                    {actividad.subtitulo}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sección adicional de información */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Nuestro Compromiso Social
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              A través de nuestras actividades sociales, ElectroHuila fortalece los lazos con las comunidades, 
              promoviendo el desarrollo sostenible y la participación ciudadana en cada municipio que servimos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏘️</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Mesas de Energía</h4>
                <p className="text-sm text-gray-600">
                  Espacios de diálogo y participación con las comunidades locales.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Casa Hogar de Paso</h4>
                <p className="text-sm text-gray-600">
                  Apoyo solidario a quienes más lo necesitan en nuestra región.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Cultura y Tradición</h4>
                <p className="text-sm text-gray-600">
                  Promoción del arte y las tradiciones culturales regionales.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Llamada a la acción */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              ¿Quieres conocer más sobre nuestras actividades sociales?
            </h3>
            <p className="text-gray-600 mb-6">
              Mantente informado sobre nuestras próximas actividades y cómo puedes participar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium">
                Ver más actividades
              </button>
              <button className="px-6 py-3 bg-white text-green-600 border-2 border-green-500 rounded-lg hover:bg-green-50 transition-colors font-medium">
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}