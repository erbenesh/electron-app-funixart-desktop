import React from 'react';
import { useField } from 'formik';
import { DatePicker } from '../DatePicker/DatePicker';
import { TimePicker } from '../TimePicker/TimePicker';

export const DatePickerField: React.FC<{ name: string }> = ({ name }) => {
  const [field, , helpers] = useField<string | number | Date>(name);
  return <DatePicker value={field.value as any} onChange={(v) => helpers.setValue(v)} />;
};

export const TimePickerField: React.FC<{ name: string }> = ({ name }) => {
  const [field, , helpers] = useField<string | number | Date>(name);
  return <TimePicker value={field.value as any} onChange={(v) => helpers.setValue(v)} />;
};


