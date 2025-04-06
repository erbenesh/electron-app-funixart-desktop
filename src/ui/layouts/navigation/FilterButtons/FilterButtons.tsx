import { useOutletContext } from 'react-router-dom';
import styles from './FilterButtons.module.css'
import { FilterButton } from '../components/FilterButton/FilterButton';

export const FilterButtons = (props) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ isHeaderHidden ]: any = useOutletContext();

    return(
        <div className={styles.bookmarks_nav_buttons_wrap}>
            <div className={styles.bookmarks_nav_buttons_fixed} style={isHeaderHidden ? {transform: "translateY(-5rem)", paddingTop: "2rem"} : {}}>
                { props.buttonsArray.map(button => 
                    <FilterButton key={button.id} button={button}/>
                )}
            </div>
        </div>
        
    )
}