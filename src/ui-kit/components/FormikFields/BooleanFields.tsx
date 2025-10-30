import React from 'react';
import { useField } from 'formik';
import { Checkbox } from '../Checkbox/Checkbox';
import { Radio } from '../Radio/Radio';
import { Switch } from '../Switch/Switch';

export const CheckboxField: React.FC<{ name: string; children?: React.ReactNode }> = ({ name, children }) => {
  const [field, , helpers] = useField<boolean>(name);
  return <Checkbox checked={!!field.value} onChange={(v) => helpers.setValue(v)}>{children}</Checkbox>;
};

export const SwitchField: React.FC<{ name: string }> = ({ name }) => {
  const [field, , helpers] = useField<boolean>(name);
  return <Switch checked={!!field.value} onChange={(v) => helpers.setValue(v)} />;
};

export const RadioGroupField: React.FC<{ name: string; options: { label: React.ReactNode; value: any }[] }> = ({ name, options }) => {
  const [field, , helpers] = useField(name);
  return (
    <div role="radiogroup">
      {options.map(o => (
        <Radio key={String(o.value)} name={name} checked={field.value === o.value} onChange={() => helpers.setValue(o.value)}>
          {o.label}
        </Radio>
      ))}
    </div>
  );
};


