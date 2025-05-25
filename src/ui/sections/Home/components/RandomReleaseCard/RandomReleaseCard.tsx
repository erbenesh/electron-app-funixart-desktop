import styles from './RandomReleaseCard.module.css';

import { Link } from 'react-router-dom';
import { IoShuffle } from 'react-icons/io5';
import { IRelease } from 'src/ui/sections/Release/IRelease';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  randomRelease: IRelease;
}

export const RandomReleaseCard = ({ randomRelease }: Props) => {
  const queryClient = useQueryClient();
  return (
    <div className={styles.title}>
      <Link to={`/release/${randomRelease?.id}`} className={styles.image_border}>
        <img className={styles.title_image} src={randomRelease?.image} alt="" />
      </Link>

      <div className={styles.title_title}>
        <div className={styles.title_with_button}>
          <Link to={`/release/${randomRelease?.id}`} className={styles.random_release_title}>
            {randomRelease?.title_ru}
          </Link>
          <button
            className={styles.random_button}
            onClick={() => queryClient.refetchQueries({ queryKey: ['get randomRelease'] })}
            type="button"
          >
            <IoShuffle className={styles.random_ico} />
          </button>
        </div>
        <p className={styles.random_description}>{randomRelease?.description}</p>
      </div>
    </div>
  );
};
