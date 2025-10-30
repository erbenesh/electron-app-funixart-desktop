import React from 'react';
import { useField } from 'formik';
import { Upload, UploadProps } from '../Upload/Upload';

export interface UploadFieldProps extends Omit<UploadProps, 'onChange'> {
  name: string;
}

export const UploadField: React.FC<UploadFieldProps> = ({ name, ...rest }) => {
  const [, , helpers] = useField<File[] | File | null>(name);
  return <Upload {...rest} onChange={(files) => helpers.setValue(files)} />;
};


