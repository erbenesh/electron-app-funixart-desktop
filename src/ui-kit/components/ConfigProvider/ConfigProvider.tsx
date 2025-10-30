import React, { createContext, useContext } from 'react';

type Size = 'small' | 'middle' | 'large';

export interface Config {
  size?: Size;
  locale?: Record<string, any>;
}

const Ctx = createContext<Config>({ size: 'middle' });

export const ConfigProvider: React.FC<React.PropsWithChildren<Config>> = ({ size = 'middle', locale, children }) => {
  return (
    <Ctx.Provider value={{ size, locale }}>
      {children}
    </Ctx.Provider>
  );
};

export function useConfig() {
  return useContext(Ctx);
}

export default ConfigProvider;


