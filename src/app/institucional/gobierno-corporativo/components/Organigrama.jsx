import React, { useState } from 'react';
import styles from './Organigrama.module.css';
import Image from 'next/image';

const Organigrama = () => {
  const [mostrarOrganigrama, setMostrarOrganigrama] = useState(false);
  
  return (
    <div className={styles.container}>
      <button
        className={styles.organigramaBtn}
        onClick={() => setMostrarOrganigrama(!mostrarOrganigrama)}
      >
        Organigrama {mostrarOrganigrama ? '−' : '+'}
      </button>
      
      {mostrarOrganigrama && (
        <div className={styles.organigramaContainer}>
          <h3 className={styles.subtitulo}>ESTRUCTURA ORGANIZACIONAL</h3>
          <div className={styles.organigramaImg}>
            {/* Aquí debes colocar tu imagen del organigrama */}
            <Image 
              src="/images/organigrama.png" 
              alt="Estructura Organizacional" 
              width={800} 
              height={600} 
              layout="responsive"
            />
          </div>
          
          {/* Alternativa: Si no quieres usar Image de Next.js, puedes usar un div con background-image */}
          {/* <div 
            className={styles.organigramaImgFallback}
            style={{ backgroundImage: `url('/images/organigrama.png')` }}
          ></div> */}
        </div>
      )}
    </div>
  );
};

export default Organigrama;