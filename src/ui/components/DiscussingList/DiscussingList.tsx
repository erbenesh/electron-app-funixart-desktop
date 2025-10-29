
import { useUserStore } from '../../auth/store/auth';
import styles from './DiscussingList.module.css';
import { ReleaseCard } from '../ReleaseCard/ReleaseCard';
import { useGetDiscussing } from '../../api/hooks/useDiscover';

export const DiscussingList = () => {

    const token = useUserStore((state) => state.token);

    const discussing = useGetDiscussing(token);

    return (
        discussing.isPending ?
        (
        <div className="loader-container_home">	
            <i className="loader-circle"></i>
        </div>
        ) :
        <div className={styles.discussing_list_page}>
            <div className={styles.discussing_list_cards}>
                
                {
                discussing.data?.data.content.map(release => release.id && (
                    <ReleaseCard key={release.id} release={release}/>
                ))
                }
                
            </div>

        </div>
    )
}