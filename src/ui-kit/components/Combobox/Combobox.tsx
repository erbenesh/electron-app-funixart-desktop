import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './Combobox.module.css';

export interface ComboboxOption<T = any> {
  value: T;
  label: string;
}

export interface ComboboxProps<T = any> {
  value?: T;
  onChange?: (value: T, option: ComboboxOption<T>) => void;
  options: ComboboxOption<T>[];
  placeholder?: string;
}

export function Combobox<T>({ value, onChange, options, placeholder }: ComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const id = useId();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const filtered = options.filter(o => o.label.toLowerCase().includes(input.toLowerCase()));

  return (
    <div className={styles.root} ref={ref} role="combobox" aria-expanded={open} aria-owns={`${id}-list`}>
      <input
        className={styles.input}
        placeholder={placeholder}
        value={input}
        onChange={e => { setInput(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
      />
      {open && (
        <div id={`${id}-list`} role="listbox" className={styles.popup}>
          {filtered.length === 0 && <div className={styles.empty}>Ничего не найдено</div>}
          {filtered.map(o => (
            <div key={String(o.label)} role="option" className={styles.option}
                 onClick={() => { onChange?.(o.value, o); setInput(o.label); setOpen(false); }}>
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


