import React from 'react';
import { useField } from 'formik';
import { Select, SelectProps } from '../Select/Select';

export interface SelectFieldProps extends Omit<SelectProps, 'value' | 'onChange'> {
  name: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({ name, ...rest }) => {
  const [field, , helpers] = useField<any>(name);
  return (
    <Select {...rest} value={field.value} onChange={(v) => helpers.setValue(v)} />
  );
};


