import { IFilterButton } from '../../FilterButtons/FilterButtons';
import styles from './FilterButton.module.css';

import { NavLink } from 'react-router-dom';

interface Props {
  button: IFilterButton;
}

export const FilterButton = ({ button }: Props) => (
  <NavLink
    to={button.link}
    key={button.id}
    className={({ isActive }) =>
      isActive ? styles.bookmarks_button_title_active : styles.bookmarks_button_title
    }
  >
    <p>{button.ru_name}</p>
  </NavLink>
);
