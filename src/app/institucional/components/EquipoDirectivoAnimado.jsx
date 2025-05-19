import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../css/equipo-directivo-animado.css';

const EquipoDirectivoAnimado = () => {
  // Estado para controlar las animaciones
  const [animateCards, setAnimateCards] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  
  // Datos del equipo directivo (mismo que en la imagen 7)
  const miembrosEquipo = [
    {
      id: 1,
      nombre: 'Nika Duniezhka Cuellar',
      apellido: 'Cuenca',
      cargo: 'Gerente General (E)',
      imagen: '/images/equipo/nika-cuellar.jpg'
    },
    {
      id: 2,
      nombre: 'Luis Alfredo Carballo',
      apellido: 'Gutiérrez',
      cargo: 'Secretario General (E) Y Asesor Legal',
      imagen: '/images/equipo/luis-carballo.jpg'
    },
    {
      id: 3,
      nombre: 'Sebastián Andrés Repiso',
      apellido: 'Ramón',
      cargo: 'Subgerente Administrativo y Financiero (E)',
      imagen: '/images/equipo/sebastian-repiso.jpg'
    },
    {
      id: 4,
      nombre: 'Jhonatan Torres',
      apellido: 'Cleves',
      cargo: 'Subgerente Comercial',
      imagen: '/images/equipo/jhonatan-torres.jpg'
    },
    {
      id: 5,
      nombre: 'Alberto Bladimir Solis',
      apellido: 'Perdomo',
      cargo: 'Subgerente de Distribución (E)',
      imagen: '/images/equipo/alberto-solis.jpg'
    }
  ];

  // Datos de los comités
  const comites = [
    'Gobierno Corporativo Talento Humano y Sostenibilidad',
    'Comité de Estrategia y Finanzas',
    'Comité de Auditoría y Riesgos'
  ];

  // Efecto para activar la animación al cargar
  useEffect(() => {
    setAnimateCards(true);
  }, []);

  return (
    <div className="equipo-directivo-container">
      <h1 className="equipo-title">Equipo Directivo</h1>
      <div className="separator-line"></div>
      
      <div className="equipo-cards-container">
        {miembrosEquipo.map((miembro, index) => (
          <div 
            key={miembro.id}
            className={`equipo-card ${animateCards ? 'animate' : ''}`}
            style={{ animationDelay: `${index * 150}ms` }}
            onMouseEnter={() => setActiveCard(miembro.id)}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="equipo-card-inner">
              <div className="equipo-card-front">
                <div className="equipo-image-container">
                  <Image 
                    src={miembro.imagen} 
                    alt={`${miembro.nombre} ${miembro.apellido}`}
                    width={200}
                    height={200}
                    className="equipo-image"
                  />
                </div>
                <h3 className="equipo-nombre">{miembro.nombre}</h3>
                <h4 className="equipo-apellido">{miembro.apellido}</h4>
                <p className="equipo-cargo">{miembro.cargo}</p>
              </div>
              <div className="equipo-card-back">
                <h3>Experiencia</h3>
                <p>Profesional con más de 10 años de experiencia en el sector.</p>
                <h3>Formación</h3>
                <p>Magíster en Administración de Empresas</p>
                <p>Especialista en Gestión de Proyectos</p>
                <div className="equipo-card-social">
                  <a href="#" className="social-icon">in</a>
                  <a href="#" className="social-icon">@</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="equipo-group-photo">
        <Image 
          src="/images/equipo/foto-grupal.jpg" 
          alt="Foto grupal del equipo directivo" 
          width={600} 
          height={350}
          className="group-image"
        />
      </div>
      
      <h2 className="comites-title">Comités</h2>
      <div className="separator-line"></div>
      
      <div className="comites-container">
        {comites.map((comite, index) => (
          <div 
            key={index}
            className={`comite-item ${animateCards ? 'animate' : ''}`}
            style={{ animationDelay: `${(miembrosEquipo.length + index) * 150}ms` }}
          >
            <span className="comite-icon">✓</span> {comite}
          </div>
        ))}
      </div>
      
      <div className="codigo-btn-container">
        <a href="/documentos/codigo-buen-gobierno.pdf" className="codigo-btn">
          <span className="download-icon">↓</span> Código de Buen Gobierno
        </a>
      </div>
    </div>
  );
};

export default EquipoDirectivoAnimado;