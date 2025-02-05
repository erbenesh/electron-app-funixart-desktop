
import { ScheduleReleaseCard } from '../ScheduleReleaseCard/ScheduleReleaseCard'
import styles from './ScheduleList.module.css'

export const ScheduleList = (props) => {


    return(
        <div className={styles.last_releases}>
    
        {
            props.array?.map(
                el => 
                el.id && 
                <ScheduleReleaseCard 
                    key={el.id} 
                    release={el}
                />
            ) 
        }

        </div>
    )
}