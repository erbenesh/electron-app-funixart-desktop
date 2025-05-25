import styles from './RandomRelease.module.css';

import { RandomReleaseCard } from '../RandomReleaseCard/RandomReleaseCard';
import { IRelease } from 'src/ui/sections/Release/IRelease';
import axios from 'axios';
import { DefinedQueryObserverResult } from '@tanstack/react-query';

interface Props {
  randomRelease: DefinedQueryObserverResult<axios.AxiosResponse<any, any>, Error> | any;
}

export const RandomRelease = ({ randomRelease }: Props) => {
  return (
    <div className={styles.title_wrap}>
      <div className={styles.random_background}>
        <img
          className={styles.title_image_bg}
          src={randomRelease?.data?.data.release.image}
          alt=""
        />
      </div>

      {/* <Schedule fetchSchedule={props.fetchSchedule} /> */}

      {randomRelease.isPending || randomRelease.isRefetching ? (
        <div className="loader-container_home">
          <i className="loader-circle" />
        </div>
      ) : (
        <RandomReleaseCard randomRelease={randomRelease.data?.data.release} />
      )}
    </div>
  );
};
