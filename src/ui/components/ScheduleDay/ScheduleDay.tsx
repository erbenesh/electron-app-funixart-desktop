import { useRef, useState } from 'react'
import { ScheduleList } from '../ScheduleList/ScheduleList'
import styles from './ScheduleDay.module.css'
import { useClickOutside } from '../../hooks/useClickOutside';

export const ScheduleDay = (props) => {

    return (
        <div key={props.key} className={styles.releases_schedule}>
            <li className={styles.sh_day_title}>{props.day_title}</li>

            <ScheduleList array={props.array}/>
            
        </div>
    )
}