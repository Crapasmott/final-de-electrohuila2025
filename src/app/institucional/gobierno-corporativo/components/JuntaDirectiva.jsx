import React from 'react';
import styles from './JuntaDirectiva.module.css';

const JuntaDirectiva = () => {
  const miembros = [
    {
      nombre: 'Humberto Londoño Blandón',
      entidad: 'Ministerio de Hacienda y Crédito Público',
      tipo: 'Principal'
    },
    {
      nombre: 'Claudia Marcela Martínez Gómez',
      entidad: 'Ministerio de Hacienda y Crédito Público',
      tipo: 'Principal'
    },
    {
      nombre: 'Jose Alejandro Rico Olaya',
      entidad: 'Ministerio de Hacienda y Crédito Público',
      tipo: 'Principal'
    },
    {
      nombre: 'Luz Dary Carmona Moreno',
      entidad: 'Ministerio de Minas y Energía',
      tipo: 'Principal'
    },
    {
      nombre: 'Jorge Eduardo Salgado Ardila',
      entidad: 'Ministerio de Minas y Energía',
      tipo: 'Principal'
    },
    {
      nombre: 'Nominación a Cargo del Ministerio de Hacienda y Crédito Público',
      entidad: 'Independiente',
      tipo: 'Principal'
    },
    {
      nombre: 'Rodrigo Villalba Mosquera',
      entidad: 'Departamento del Huila',
      tipo: 'Principal'
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.descripcion}>
        <p>
          La Junta Directiva de la Electrificadora del Huila S.A. E.S.P. está compuesta por siete (07) miembros elegidos por la Asamblea General de Accionistas, a saber:
        </p>
        <ul className={styles.listaJunta}>
          <li>Tres (03) representantes del Ministerio de Hacienda.</li>
          <li>Dos (2) representantes del Ministerio de Minas y Energía.</li>
          <li>Un (01) miembro independiente</li>
          <li>El Gobernador del Huila, o el delegado que él designe para que lo reemplace en ausencias temporales.</li>
        </ul>
        <p>Todos son miembros Principales.</p>
      </div>

      <div className={styles.principalesContainer}>
        <h3 className={styles.subtitulo}>Principales</h3>
        <div className={styles.miembrosGrid}>
          {miembros.map((miembro, index) => (
            <div key={index} className={styles.miembroCard}>
              <div className={styles.nombre}>{miembro.nombre}</div>
              <div className={styles.entidad}>{miembro.entidad}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JuntaDirectiva;