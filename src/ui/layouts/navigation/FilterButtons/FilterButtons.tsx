import styles from './FilterButtons.module.css';

import { useRouteContext } from '../../main-layout/main-layout';
import { FilterButton } from '../components/FilterButton/FilterButton';

export interface IFilterButton {
  id: number;
  eng_name: string;
  ru_name: string;
  link: string;
}

interface Props {
  buttonsArray: IFilterButton[];
}

export const FilterButtons = ({ buttonsArray }: Props) => {
  const { isHeaderHidden }: any = useRouteContext();

  return (
    <div className={styles.bookmarks_nav_buttons_wrap}>
      <div
        className={styles.bookmarks_nav_buttons_fixed}
        style={isHeaderHidden ? { transform: 'translateY(-5rem)', paddingTop: '2rem' } : {}}
      >
        {buttonsArray.map((button) => (
          <FilterButton key={button.id} button={button} />
        ))}
      </div>
    </div>
  );
};
