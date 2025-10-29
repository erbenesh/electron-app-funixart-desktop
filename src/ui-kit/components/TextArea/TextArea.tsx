import React from 'react';
import styles from './TextArea.module.css';

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea: React.FC<TextAreaProps> = ({ className, ...rest }) => {
  const classNames = [styles.textarea, className].filter(Boolean).join(' ');
  return <textarea className={classNames} {...rest} />;
};


