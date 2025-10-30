import React from 'react';
import styles from './Upload.module.css';

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onChange?: (files: File[]) => void;
  children?: React.ReactNode;
}

export const Upload: React.FC<UploadProps> = ({ accept, multiple, beforeUpload, onChange, children }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const onClick = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const passed: File[] = [];
    for (const f of files) {
      const ok = (await beforeUpload?.(f)) ?? true;
      if (ok) passed.push(f);
    }
    onChange?.(passed);
    e.target.value = '';
  };

  return (
    <span onClick={onClick} className={styles.root}>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
      {children}
    </span>
  );
};

export default Upload;


