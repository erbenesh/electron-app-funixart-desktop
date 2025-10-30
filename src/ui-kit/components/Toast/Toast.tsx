import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import styles from './Toast.module.css';

type ToastType = 'info' | 'success' | 'error';
export interface ToastItem { id: number; type: ToastType; message: string; }

interface ToastContextValue {
  show: (message: string, type?: ToastType, ms?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>');
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ToastItem[]>([]);
  const show = useCallback((message: string, type: ToastType = 'info', ms = 2500) => {
    const id = Date.now() + Math.random();
    setItems((s) => [...s, { id, type, message }]);
    setTimeout(() => setItems((s) => s.filter((i) => i.id !== id)), ms);
  }, []);
  const value = useMemo(() => ({ show }), [show]);
  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.stack}>
        {items.map((i) => (
          <div key={i.id} className={[styles.toast, styles[i.type]].join(' ')}>{i.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};


