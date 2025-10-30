import React, { useMemo, useRef, useState } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value' | 'defaultValue'> {
  options?: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  allowClear?: boolean;
  onChange?: (value: string | number | undefined) => void;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  allowClear,
  onChange,
  children,
  ...rest
}) => {
  const [inner, setInner] = useState<string | number | undefined>(defaultValue);
  const isControlled = typeof value !== 'undefined';
  const current = isControlled ? value : inner;

  const onNativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    if (!isControlled) setInner(v);
    onChange?.(v);
  };

  const clear = () => {
    if (!isControlled) setInner(undefined);
    onChange?.(undefined);
  };

  const renderedOptions = useMemo(() => {
    if (options?.length) {
      return options.map(opt => (
        <option key={String(opt.value)} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </option>
      ));
    }
    return children;
  }, [options, children]);

  return (
    <span className={styles.selectWrap}>
      <select className={styles.select} value={current as any} onChange={onNativeChange} {...rest}>
        {allowClear ? <option value="">—</option> : null}
        {renderedOptions}
      </select>
      {allowClear && current !== undefined && current !== '' ? (
        <button type="button" onClick={clear} aria-label="Clear" className={styles.clearBtn}>×</button>
      ) : null}
    </span>
  );
};

export default Select;


