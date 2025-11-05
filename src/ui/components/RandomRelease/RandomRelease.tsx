import { type UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { RandomReleaseCard } from "../RandomReleaseCard/RandomReleaseCard";
import styles from './RandomRelease.module.css';

interface RandomReleaseProps {
    randomRelease: UseQueryResult<any>;
    fetchSchedule?: UseQueryResult<any>;
}

export const RandomRelease = ({ randomRelease, fetchSchedule }: RandomReleaseProps) => {
    const queryClient = useQueryClient();

    return (
        <div className={styles.title_wrap}> 
            <div className={styles.random_background}>
                <img 
                    className={styles.title_image_bg} 
                    src={randomRelease?.data?.release?.image} 
                    alt="Random release background" 
                />
            </div>

            {randomRelease.isPending || randomRelease.isRefetching ? (
                <div className="loader-container_home">	
                    <i className="loader-circle"></i>
                </div>
            ) : (
                <RandomReleaseCard 
                    randomRelease={randomRelease.data?.release} 
                    queryClient={queryClient}
                />
            )}
        </div>
    );
}