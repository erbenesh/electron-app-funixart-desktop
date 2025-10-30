import React from 'react';
import styles from './Upload.module.css';

export interface UploadFile { uid: string; name: string; size: number; status?: 'ready' | 'uploading' | 'done' | 'error'; file?: File }

export interface UploadProps {
  accept?: string;
  multiple?: boolean;
  beforeUpload?: (file: File) => boolean | Promise<boolean>;
  onChange?: (files: File[]) => void;
  fileList?: UploadFile[];
  onFileListChange?: (list: UploadFile[]) => void;
  children?: React.ReactNode;
}

export const Upload: React.FC<UploadProps> = ({ accept, multiple, beforeUpload, onChange, fileList, onFileListChange, children }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [internalList, setInternalList] = React.useState<UploadFile[]>([]);
  const list = fileList ?? internalList;

  const onClick = () => inputRef.current?.click();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const passed: File[] = [];
    for (const f of files) {
      const ok = (await beforeUpload?.(f)) ?? true;
      if (ok) passed.push(f);
    }
    onChange?.(passed);
    if (passed.length) {
      const mapped = passed.map((f) => ({ uid: `${Date.now()}-${f.name}`, name: f.name, size: f.size, status: 'ready' as const, file: f }));
      const next = [...list, ...mapped];
      (onFileListChange ?? setInternalList)(next);
    }
    e.target.value = '';
  };

  const onDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const dtFiles = Array.from(e.dataTransfer.files || []);
    const passed: File[] = [];
    for (const f of dtFiles) {
      const ok = (await beforeUpload?.(f)) ?? true;
      if (ok) passed.push(f);
    }
    onChange?.(passed);
    if (passed.length) {
      const mapped = passed.map((f) => ({ uid: `${Date.now()}-${f.name}`, name: f.name, size: f.size, status: 'ready' as const, file: f }));
      const next = [...list, ...mapped];
      (onFileListChange ?? setInternalList)(next);
    }
  };

  return (
    <div onClick={onClick} className={styles.root} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} onChange={handleChange} style={{ display: 'none' }} />
      {children}
      {list.length ? (
        <ul style={{ marginTop: '0.5rem' }}>
          {list.map((it) => (
            <li key={it.uid} style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{it.name}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default Upload;


