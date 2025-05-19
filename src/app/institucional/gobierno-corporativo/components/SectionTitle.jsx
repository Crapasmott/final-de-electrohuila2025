import React from 'react';
import styles from './SectionTitle.module.css';

const SectionTitle = ({ title }) => {
  return (
    <div className={styles.titleContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.underline}></div>
    </div>
  );
};

export default SectionTitle;