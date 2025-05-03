import styles from './FilterButtons.module.css';

import { useRouteContext } from '../../main-layout/main-layout';
import { FilterButton } from '../components/FilterButton/FilterButton';

export const FilterButtons = (props) => {
   
  const { isHeaderHidden }: any = useRouteContext();

  return (
    <div className={styles.bookmarks_nav_buttons_wrap}>
      <div
        className={styles.bookmarks_nav_buttons_fixed}
        style={isHeaderHidden ? { transform: 'translateY(-5rem)', paddingTop: '2rem' } : {}}
      >
        {props.buttonsArray.map((button) => (
          <FilterButton key={button.id} button={button} />
        ))}
      </div>
    </div>
  );
};
