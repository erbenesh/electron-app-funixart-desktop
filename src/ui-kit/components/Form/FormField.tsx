import React from 'react';
import { useField } from 'formik';
import styles from './FormField.module.css';

export interface FormFieldProps {
  name: string;
  label?: React.ReactNode;
  help?: React.ReactNode;
  children: (field: ReturnType<typeof useField>[0]) => React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ name, label, help, children }) => {
  const [field, meta] = useField(name);
  const hasError = Boolean(meta.touched && meta.error);
  return (
    <label className={[styles.field, hasError ? styles.error : ''].join(' ')}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={styles.control}>{children(field)}</div>
      {help && !hasError && <div className={styles.help}>{help}</div>}
      {hasError && <div className={styles.errorText}>{meta.error}</div>}
    </label>
  );
};


