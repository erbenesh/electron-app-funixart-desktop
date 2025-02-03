import { NavLink, useOutletContext } from 'react-router-dom';
import styles from './TopFilterButtons.module.css'

export const TopFilterButtons = (props) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ isHeaderHidden ]: any = useOutletContext();

    return(
        <div className={styles.bookmarks_nav_buttons_fixed} style={isHeaderHidden ? {paddingTop: 0.3+'rem'} : {}}>
            { props.buttonsArray.map(button => 
                <NavLink to={button.link} key={button.id} 
                className={
                    ({ isActive }) =>
                    isActive ? 
                    styles.bookmarks_button_title_active : 
                    styles.bookmarks_button_title
                } 
                >

                    <p>{button.ru_name}</p>

                </NavLink>
            )}
        </div>
    )
}