import React, { useState } from 'react';
import styles from './TablaAccionistas.module.css';

const TablaAccionistas = () => {
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const accionistasMenores = [
    { nombre: 'Municipio de Aipe', acciones: '173.169', participacion: '0,39%' },
    { nombre: 'Municipio de Neiva', acciones: '167.657', participacion: '0,38%' },
    { nombre: 'Municipio de Pitalito', acciones: '147.869', participacion: '0,34%' },
    { nombre: 'Empresas Públicas de Neiva', acciones: '99.094', participacion: '0,23%' },
    { nombre: 'Municipio de Gigante', acciones: '47.013', participacion: '0,11%' },
    { nombre: 'Municipio de Timaná', acciones: '46.562', participacion: '0,11%' },
    { nombre: 'Municipio de Campoalegre', acciones: '45.364', participacion: '0,10%' },
    { nombre: 'Municipio de Rivera', acciones: '42.076', participacion: '0,10%' },
    { nombre: 'Municipio de Colombia', acciones: '41.849', participacion: '0,10%' },
    { nombre: 'Municipio de La Plata', acciones: '32.340', participacion: '0,07%' },
    { nombre: 'Municipio de Agrado', acciones: '23.534', participacion: '0,05%' },
    { nombre: 'Municipio de Guadalupe', acciones: '19.763', participacion: '0,04%' },
    { nombre: 'Municipio de Yaguará', acciones: '19.445', participacion: '0,04%' },
    { nombre: 'Municipio de Tello', acciones: '19.292', participacion: '0,04%' },
    { nombre: 'Municipio de Garzón', acciones: '18.724', participacion: '0,04%' },
    { nombre: 'Municipio de Tarqui', acciones: '18.052', participacion: '0,04%' },
    { nombre: 'Municipio de Palermo', acciones: '16.848', participacion: '0,04%' },
    { nombre: 'Municipio de Suaza', acciones: '14.489', participacion: '0,03%' },
    { nombre: 'Municipio de Íquira', acciones: '13.138', participacion: '0,03%' },
    { nombre: 'Municipio de Acevedo', acciones: '12.943', participacion: '0,03%' },
    { nombre: 'Municipio de La Argentina', acciones: '12.918', participacion: '0,03%' },
    { nombre: 'Municipio de San Agustín', acciones: '11.983', participacion: '0,03%' },
    { nombre: 'Municipio de Hobo', acciones: '9.483', participacion: '0,02%' },
    { nombre: 'Municipio de Oporapa', acciones: '9.111', participacion: '0,02%' },
    { nombre: 'Municipio de Paicol', acciones: '4.711', participacion: '0,01%' },
    { nombre: 'Municipio de Tesalia', acciones: '4.571', participacion: '0,01%' },
    { nombre: 'Municipio de Saladoblanco', acciones: '3.543', participacion: '0,01%' },
    { nombre: 'Municipio de Baraya', acciones: '3.170', participacion: '0,01%' },
    { nombre: 'Municipio de Pital', acciones: '2.700', participacion: '0,01%' },
    { nombre: 'Municipio de Teruel', acciones: '2.590', participacion: '0,01%' },
    { nombre: 'Municipio de Villavieja', acciones: '2.492', participacion: '0,01%' },
    { nombre: 'Municipio de Altamira', acciones: '201', participacion: '0,00%' },
    { nombre: 'Codensa', acciones: '54', participacion: '0,00%' },
  ];

  return (
    <div className={styles.container}>
      <button
        className={styles.verAccionistasBtn}
        onClick={() => setMostrarTabla(!mostrarTabla)}
      >
        Ver todos los accionistas {mostrarTabla ? '−' : '+'}
      </button>
      
      {mostrarTabla && (
        <div className={styles.tablaContainer}>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Accionista</th>
                <th>No. Acciones</th>
                <th>Participación</th>
              </tr>
            </thead>
            <tbody>
              {accionistasMenores.map((accionista, index) => (
                <tr key={index}>
                  <td>{accionista.nombre}</td>
                  <td>{accionista.acciones}</td>
                  <td>{accionista.participacion}</td>
                </tr>
              ))}
              <tr className={styles.totales}>
                <td>TOTALES</td>
                <td>44.028.878</td>
                <td>100,00%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TablaAccionistas;