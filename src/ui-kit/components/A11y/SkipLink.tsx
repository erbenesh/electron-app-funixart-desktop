import React from 'react';

export const SkipLink: React.FC<{ href?: string }>
  = ({ href = '#content' }) => (
  <a href={href} style={{ position: 'absolute', left: -9999, top: 0 }} onFocus={(e) => { (e.currentTarget.style.left = '0'); e.currentTarget.style.zIndex = '1500'; }} onBlur={(e) => { (e.currentTarget.style.left = '-9999px'); }}>
    Skip to content
  </a>
);


