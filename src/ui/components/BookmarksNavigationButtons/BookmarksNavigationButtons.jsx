
import styles from './CollectionsTopButtons.module.css'

const SectionTitleMapping = {
    collections: "Коллекции",
    myCollections: "Мои коллекции",
    bookmarks: "Закладки"
};

export const BookmarksNavigationButtons = ({...props}) => {

    return (
        <div className={styles.buttons_empty_wrap}>
            <div className={styles.buttons_bg_wrap} style={props.isHeaderHidden ? {transform: "translateY(-9rem)"} : {}}>
                <ul className={styles.buttons_list}>

                    <li className={props.currentSection === "collections" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("collections")}>{SectionTitleMapping.collections}</li>

                    <li className={props.currentSection === "myCollections" ? styles.button_active : styles.button} 
                        onClick={() => props.setCurrentSection("myCollections")}>{SectionTitleMapping.myCollections}</li>

                </ul>
            </div>
        </div>
    );

}