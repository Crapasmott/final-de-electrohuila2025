'use client';

import React from 'react';
import styles from './page.module.css';
import ComposicionAccionaria from './components/ComposicionAccionaria';
import TablaAccionistas from './components/TablaAccionistas';
import JuntaDirectiva from './components/JuntaDirectiva';
import MapaProcesos from './components/MapaProcesos';
import Organigrama from './components/Organigrama';
import EquipoDirectivo from './components/EquipoDirectivo';
import Comites from './components/Comites';
import InformacionFinanciera from './components/InformacionFinanciera';
import SectionTitle from './components/SectionTitle';

export default function GobiernoCorporativo() {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.pageTitle}>Gobierno <span className={styles.highlight}>Corporativo</span></h1>
        <div className={styles.breadcrumb}>
          <a href="/">Inicio</a> | Gobierno Corporativo
        </div>
      </div>

      <section className={styles.section}>
        <SectionTitle title="Composición Accionaria" />
        <ComposicionAccionaria />
        <TablaAccionistas />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Nuestra Junta Directiva" />
        <JuntaDirectiva />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Mapa de Procesos" />
        <MapaProcesos />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Organigrama" />
        <Organigrama />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Equipo Directivo" />
        <EquipoDirectivo />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Comités" />
        <Comites />
      </section>

      <section className={styles.section}>
        <SectionTitle title="Información Financiera y de Control Interno" />
        <InformacionFinanciera />
      </section>
    </div>
  );
}