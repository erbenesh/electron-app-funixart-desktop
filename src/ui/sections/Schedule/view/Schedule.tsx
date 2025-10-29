
import { useGetSchedule } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';
import { ScheduleDay } from '#/components/ScheduleDay/ScheduleDay';
import { useEffect, useState } from "react";
import '../styles/Schedule.css';


export const Schedule = () => {

    const token = useUserStore((state) => state.token);

    const fetchSchedule = useGetSchedule(token);

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
            const data = (fetchSchedule.data?.schedule ?? fetchSchedule.data) as any;

            if (!data) {
                return;
            }

            const mondayData = data.monday;
            const tuesdayData = data.tuesday;
            const wednesdayData = data.wednesday;
            const thursdayData = data.thursday;
            const fridayData = data.friday;
            const saturdayData = data.saturday;
            const sundayData = data.sunday;

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
            <div className="section">
                <h2 className="section_title">Расписание</h2>

                <ScheduleDay key={"monday"} array={monday} day_title={"Понедельник"}/>
                <ScheduleDay key={"tuesday"} array={tuesday} day_title={"Вторник"}/>
                <ScheduleDay key={"wednesday"} array={wednesday} day_title={"Среда"}/>
                <ScheduleDay key={"thursday"} array={thursday} day_title={"Четверг"}/>
                <ScheduleDay key={"friday"} array={friday} day_title={"Пятница"}/>
                <ScheduleDay key={"saturday"} array={saturday} day_title={"Суббота"}/>
                <ScheduleDay key={"sunday"} array={sunday} day_title={"Воскресенье"}/>
            </div>
            )
            }   

        </div>
    )
}