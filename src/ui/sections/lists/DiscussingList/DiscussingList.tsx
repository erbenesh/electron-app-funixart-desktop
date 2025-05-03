import styles from './DiscussingList.module.css';

import { useQuery } from '@tanstack/react-query';

import { discoverService } from '../../../api/discover/DiscoverService';
import { ReleaseCard } from '../../../components/ReleaseCard/ReleaseCard';

export const DiscussingList = () => {
  const discussing = useQuery({
    queryKey: ['getDiscussing'],
    queryFn: () => discoverService.getDiscussing(),
  });

  return discussing.isPending ? (
    <div className="loader-container_home">
      <i className="loader-circle" />
    </div>
  ) : (
    <div className={styles.discussing_list_page}>
      <div className={styles.discussing_list_cards}>
        {discussing.data?.data.content.map(
          (release) => release.id && <ReleaseCard key={release.id} release={release} />
        )}
      </div>
    </div>
  );
};
