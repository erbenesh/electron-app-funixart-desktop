
import styles from './Schedule.module.css'
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useUserStore } from "../../services/api/auth";
import { ScheduleDay } from '../../components/ScheduleDay/ScheduleDay';
import { discoverService } from '../../services/DiscoverService';

export const Schedule = () => {

    const token = useUserStore((state) => state.token);

    const fetchSchedule = useQuery({
        queryKey: ['getSchedule', token],
        queryFn: () => discoverService.getSchedule(token)
    });

    //Schedule
    const [ monday, setMonday ] = useState(null);
    const [ tuesday, setTuesday ] = useState(null);
    const [ wednesday, setWednesday ] = useState(null);
    const [ thursday, setThursday ] = useState(null);
    const [ friday, setFriday ] = useState(null);
    const [ saturday, setSaturday ] = useState(null);
    const [ sunday, setSunday ] = useState(null);

    useEffect(() => {
        async function _loadInitialReleases() {
            const mondayData = fetchSchedule.data?.data.monday;
            const tuesdayData = fetchSchedule.data?.data.tuesday;
            const wednesdayData = fetchSchedule.data?.data.wednesday;
            const thursdayData = fetchSchedule.data?.data.thursday;
            const fridayData = fetchSchedule.data?.data.friday;
            const saturdayData = fetchSchedule.data?.data.saturday;
            const sundayData = fetchSchedule.data?.data.sunday;

            setMonday(mondayData);
            setTuesday(tuesdayData);
            setWednesday(wednesdayData);
            setThursday(thursdayData);
            setFriday(fridayData);
            setSaturday(saturdayData);
            setSunday(sundayData);
        }

        _loadInitialReleases();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchSchedule.status]);

    if (fetchSchedule.status === "error") {
        return ('An error has occurred: ' + fetchSchedule.error.message);
    }

    return (    
        <div>        
            { fetchSchedule.isPending || !monday || !thursday || !wednesday || !tuesday || !friday || !sunday || !saturday ?
            (
            <div className="loader-container_home">	
                <i className="loader-circle"></i>
            </div>
            ) : (
            <div className={styles.section}>
                {/* <h2 className={styles.section_title}>Расписание</h2> */}

                <ScheduleDay array={monday} day_title={"Понедельник"}/>
                <ScheduleDay array={thursday} day_title={"Вторник"}/>
                <ScheduleDay array={wednesday} day_title={"Среда"}/>
                <ScheduleDay array={tuesday} day_title={"Четверг"}/>
                <ScheduleDay array={friday} day_title={"Пятница"}/>
                <ScheduleDay array={sunday} day_title={"Суббота"}/>
                <ScheduleDay array={saturday} day_title={"Воскресенье"}/>
            </div>
            )
            }   

        </div>
    )
}