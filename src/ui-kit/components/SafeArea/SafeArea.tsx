import React from 'react';

export const SafeAreaTop: React.FC = () => <div style={{ height: 'env(safe-area-inset-top, 0)' }} />;
export const SafeAreaBottom: React.FC = () => <div style={{ height: 'calc(env(safe-area-inset-bottom, 0) + 8px)' }} />;


