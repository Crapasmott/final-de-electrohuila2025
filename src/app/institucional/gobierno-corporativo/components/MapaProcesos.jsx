import React, { useState } from 'react';
import styles from './MapaProcesos.module.css';
import Image from 'next/image';

const MapaProcesos = () => {
  const [mostrarMapa, setMostrarMapa] = useState(false);
  
  return (
    <div className={styles.container}>
      <button
        className={styles.mapaProcesosBtn}
        onClick={() => setMostrarMapa(!mostrarMapa)}
      >
        Mapa de Procesos {mostrarMapa ? '−' : '+'}
      </button>
      
      {mostrarMapa && (
        <div className={styles.mapaContainer}>
          <div className={styles.mapaImg}>
            {/* Aquí debes colocar tu imagen del mapa de procesos */}
            <Image 
              src="/images/directivos/mapa-de-procesos-electrohuila.svg" 
              alt="Mapa de Procesos" 
              width={800} 
              height={600} 
              layout="responsive"
            />
          </div>
          
          {/* Alternativa: Si no quieres usar Image de Next.js, puedes usar un div con background-image */}
          {/* <div 
            className={styles.mapaImgFallback}
            style={{ backgroundImage: `url('/images/mapa-procesos.png')` }}
          ></div> */}
          
          <div className={styles.leyenda}>
            <div className={styles.procesoItem}>
              <div className={`${styles.procesoColor} ${styles.estrategico}`}></div>
              <span>Estratégico</span>
            </div>
            <div className={styles.procesoItem}>
              <div className={`${styles.procesoColor} ${styles.cadenaValor}`}></div>
              <span>Cadena de Valor</span>
            </div>
            <div className={styles.procesoItem}>
              <div className={`${styles.procesoColor} ${styles.soporte}`}></div>
              <span>Soporte</span>
            </div>
            <div className={styles.procesoItem}>
              <div className={`${styles.procesoColor} ${styles.control}`}></div>
              <span>Control</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapaProcesos;