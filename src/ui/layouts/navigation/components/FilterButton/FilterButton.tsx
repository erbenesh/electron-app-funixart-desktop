import styles from './FilterButton.module.css';

import { NavLink } from 'react-router-dom';

export const FilterButton = (props) => (
    <NavLink
      to={props.button.link}
      key={props.button.id}
      className={({ isActive }) =>
        isActive ? styles.bookmarks_button_title_active : styles.bookmarks_button_title
      }
    >
      <p>{props.button.ru_name}</p>
    </NavLink>
  );
