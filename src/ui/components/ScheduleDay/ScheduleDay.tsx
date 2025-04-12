import { ScheduleList } from '../../sections/lists/ScheduleList/ScheduleList'
import styles from './ScheduleDay.module.css'

export const ScheduleDay = (props) => {

    return (
        <div key={props.key} className={styles.releases_schedule}>
            <li className={styles.sh_day_title}>{props.day_title}</li>

            <ScheduleList array={props.array}/>
            
        </div>
    )
}