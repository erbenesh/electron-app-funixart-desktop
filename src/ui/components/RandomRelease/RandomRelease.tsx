import { useQueryClient } from "@tanstack/react-query";
import { RandomReleaseCard } from "../RandomReleaseCard/RandomReleaseCard";
import styles from './RandomRelease.module.css';

export const RandomRelease = (props) => {

    const queryClient = useQueryClient();

    return (
        <div className={styles.title_wrap}> 

            <div className={styles.random_background}>
                <img className={styles.title_image_bg} src={props.randomRelease?.data?.release?.image} alt="" />
            </div>

            {/* <Schedule fetchSchedule={props.fetchSchedule} /> */}

            { props.randomRelease.isPending || props.randomRelease.isRefetching ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
                    <RandomReleaseCard randomRelease={props.randomRelease.data?.release} queryClient={queryClient}/>
                )
            }

            
        </div>
    )
}