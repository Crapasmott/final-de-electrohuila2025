import React from 'react';
import styles from './EquipoDirectivo.module.css';
import Image from 'next/image';

const EquipoDirectivo = () => {
  const directivos = [
    {
      nombre: 'Nika Duniezhka Cuellar Cuenca',
      cargo: 'Gerente General (E)',
      imagen: '/images/directivos/Dra-nika-768x768.jpg.webp'
    },
    
    {
      nombre: 'Sebastián Andrés Repiso Ramón',
      cargo: 'Subgerente Administrativo y Financiero (E)',
      imagen: '/images/directivos/sebastioa-768x768.jpg.webp'
    },
    {
      nombre: 'Jhonatan Torres Cleves',
      cargo: 'Subgerente Comercial',
      imagen: '/images/directivos/jhonatan-torres.png.webp'
    },
    {
      nombre: 'Alberto Bladimir Solis Perdomo',
      cargo: 'Subgerente de Distribución (E)',
      imagen: '/images/directivos/Sin-titulo-2-v3-768x768.jpg.webp'
    },
    {
      nombre: 'Luis Alfredo Carballo Gutiérrez',
      cargo: 'Secretario General (E) Y Asesor Legal',
      imagen: '/images/directivos/luis-carballo-768x768.jpg.webp'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.directivosContainer}>
        {directivos.map((directivo, index) => (
          <div key={index} className={styles.directivoCard}>
            <div className={styles.avatarContainer}>
              {/* Puedes usar una imagen de placeholder si no tienes las imágenes reales */}
              <div className={styles.avatar}>
                <Image 
                  src={directivo.imagen} 
                  alt={directivo.nombre} 
                  width={200} 
                  height={200}
                  className={styles.avatarImg}
                  onError={(e) => {
                    e.target.src = '/images/placeholder-avatar.jpg';
                  }}
                />
              </div>
            </div>
            <div className={styles.directivoInfo}>
              <h3 className={styles.nombre}>{directivo.nombre}</h3>
              <p className={styles.cargo}>{directivo.cargo}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipoDirectivo;