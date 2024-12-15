
import styles from '../NavigationTopButtons/NavigationTopButtons.module.css'

const SectionTitleMapping = {
    watching: "Смотрю",
    planned: "В планах",
    watched: "Просмотрено",
    delayed: "Отложено",
    abandoned: "Заброшено",
};

export const BookmarksNavigationButtons = ({...props}) => {

    return (
        <div className={styles.buttons_empty_wrap}>
            <div className={styles.buttons_bg_wrap} style={props.isHeaderHidden ? {transform: "translateY(-9rem)"} : {}}>
                <ul className={styles.buttons_list}>

                    <li className={props.currentSection === "watching" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("watching")}>{SectionTitleMapping.watching}</li>

                    <li className={props.currentSection === "planned" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("planned")}>{SectionTitleMapping.planned}</li>

                    <li className={props.currentSection === "watched" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("watched")}>{SectionTitleMapping.watched}</li>

                    <li className={props.currentSection === "delayed" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("delayed")}>{SectionTitleMapping.delayed}</li>

                    <li className={props.currentSection === "abandoned" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("abandoned")}>{SectionTitleMapping.abandoned}</li>

                </ul>
            </div>
        </div>
    );

}