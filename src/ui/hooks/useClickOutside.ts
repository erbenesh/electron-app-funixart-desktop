import { MutableRefObject, useEffect } from 'react';

export const useClickOutside = (ref: MutableRefObject<any>, callback: { (): void; (): void }) => {
  const handleClick = (event: { target: any }) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};

export const useClickOutsideWithButton = (
  ref: { current: { contains: (arg0: any) => any } },
  callback: () => void,
  buttonRef: { current: { contains: (arg0: any) => any } }
) => {
  const handleClick = (event: { target: any }) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  });
};
