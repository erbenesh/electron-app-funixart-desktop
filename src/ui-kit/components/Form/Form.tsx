import React from 'react';
import styles from './Form.module.css';

export const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.container}>{children}</div>
);

export const SubmitBar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={styles.submitBar}>
    <div className={styles.inner}>{children}</div>
  </div>
);


