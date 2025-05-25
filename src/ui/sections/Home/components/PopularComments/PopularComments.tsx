import { DefinedQueryObserverResult } from '@tanstack/react-query';
import axios from 'axios';
import styles from './PopularComments.module.css';

import { PopularCommentCard } from './components/PopularCommentCard/PopularCommentCard';
import { IComment } from 'src/ui/sections/Release/IRelease';

interface Props {
  popularComments: DefinedQueryObserverResult<axios.AxiosResponse<any, any>, Error> | any;
}

export const PopularComments = ({ popularComments }: Props) => (
  <div className={styles.schedule_preview_wrap}>
    <h2 style={{ alignSelf: 'start' }}>Комментарии недели</h2>

    <div className={styles.schedule}>
      {popularComments.data?.data.content.map((com: IComment) => (
        <PopularCommentCard key={com.id} comment={com} array={popularComments.data?.data.content} />
      ))}
    </div>
  </div>
);
