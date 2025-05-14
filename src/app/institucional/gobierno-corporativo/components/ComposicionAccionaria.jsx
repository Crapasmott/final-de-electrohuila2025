import React from 'react';
import styles from './ComposicionAccionaria.module.css';

const ComposicionAccionaria = () => {
  const accionistas = [
    {
      nombre: 'Ministerio de Hacienda',
      acciones: '36.566.229',
      porcentaje: '83,05%',
    },
    {
      nombre: 'Departamento del Huila',
      acciones: '3.628.415',
      porcentaje: '8,24%',
    },
    {
      nombre: 'Infihuila',
      acciones: '2.747.486',
      porcentaje: '6,24%',
    }
  ];

  return (
    <div className={styles.container}>
      {accionistas.map((accionista, index) => (
        <div key={index} className={styles.accionistaCard}>
          <div className={styles.acciones}>{accionista.acciones} Acciones</div>
          <div className={styles.porcentaje}>{accionista.porcentaje}</div>
          <div className={styles.nombre}>{accionista.nombre}</div>
        </div>
      ))}
    </div>
  );
};

export default ComposicionAccionaria;