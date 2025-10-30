import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';

export const ActiveLink: React.FC<NavLinkProps> = (props) => (
  <NavLink {...props} className={({ isActive }) => [props.className, isActive ? 'active' : ''].filter(Boolean).join(' ')} />
);


