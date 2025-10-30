import React from 'react';
import { useField } from 'formik';
import { Input, InputProps } from '../Input/Input';

export interface TextFieldProps extends Omit<InputProps, 'value' | 'onChange'> {
  name: string;
  label?: React.ReactNode;
  mask?: 'digits' | 'phone';
}

export const TextField: React.FC<TextFieldProps> = ({ name, mask, ...rest }) => {
  const [field, meta, helpers] = useField<string>(name);
  const invalid = Boolean(meta.touched && meta.error) || rest.invalid;
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let v = e.target.value;
    if (mask === 'digits') v = v.replace(/\D+/g, '');
    if (mask === 'phone') v = v.replace(/[^+\d]/g, '');
    helpers.setValue(v);
  };
  return (
    <Input {...rest} {...field} value={field.value || ''} onChange={onChange} invalid={invalid} />
  );
};

export const PasswordField: React.FC<TextFieldProps> = (p) => <TextField {...p} type="password" />;
export const NumberField: React.FC<TextFieldProps> = (p) => <TextField {...p} inputMode="numeric" mask='digits' />;


