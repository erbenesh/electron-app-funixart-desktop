import styles from './SideBar.module.css'

import { GoHomeFill } from "react-icons/go";
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { MdLocalFireDepartment } from "react-icons/md";
import { IoMdShuffle } from "react-icons/io";
import { BsCollectionFill } from "react-icons/bs";
import { LuCalendarRange } from "react-icons/lu";
import { GiSettingsKnobs } from "react-icons/gi";

export const SideBar = () => {

    return (
        <div className={styles.aside}>
            
            <div className={styles.aside_buttons}>

                <button className={styles.aside_button}>
                    <GoHomeFill className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <MdLocalFireDepartment className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <PiBookmarkSimpleFill className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <CgProfile className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <IoMdShuffle className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <BsCollectionFill className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <LuCalendarRange className={styles.home_button_ico}/>
                </button>

                <button className={styles.aside_button}>
                    <GiSettingsKnobs className={styles.home_button_ico}/>
                </button>
            
            </div>
        </div>
    )
}