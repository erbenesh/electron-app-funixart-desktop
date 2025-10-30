import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({ fallback, ...rest }) => {
  const [error, setError] = React.useState(false);
  if (error) return <>{fallback ?? '🖼️'}</>;
  return <img loading='lazy' onError={() => setError(true)} {...rest} />;
};


