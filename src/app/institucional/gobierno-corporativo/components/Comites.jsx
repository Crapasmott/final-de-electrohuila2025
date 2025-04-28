import React from 'react';
import styles from './Comites.module.css';
import Image from 'next/image';

const Comites = () => {
  const comites = [
    'Gobierno Corporativo Talento Humano y Sostenibilidad',
    'Comité de Estrategia y Finanzas',
    'Comité de Auditoría y Riesgos'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.comitesContainer}>
        <div className={styles.comitesImage}>
          {/* Imagen del equipo de trabajo */}
          <Image 
            src="/images/directivos/comite-768x512.jpg.webp" 
            alt="Equipo de trabajo" 
            width={400} 
            height={300}
            layout="responsive"
            onError={(e) => {
              e.target.src = 'public/images/directivos/comite-768x512.jpg.webp';
            }}
          />
        </div>
        <div className={styles.comitesList}>
          <ul className={styles.list}>
            {comites.map((comite, index) => (
              <li key={index} className={styles.comiteItem}>
                <span className={styles.checkIcon}></span>
                {comite}
              </li>
            ))}
          </ul>
          <div className={styles.codigoBtnContainer}>
            <a href="/documentos/gobierne-corporativo/codigo-buen-gobierno.pdf" className={styles.codigoBtn} target="_blank" rel="noopener noreferrer">
              <span className={styles.downloadIcon}></span>
              Código de Buen Gobierno
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comites;