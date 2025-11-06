import { NavLink, useMatch } from 'react-router-dom'
import { Chip } from 'ui-kit/components/Chip/Chip'
import { useTelegramHaptic } from '../../hooks/useTelegramHaptic'
import styles from './FilterButton.module.css'

export const FilterButton = (props) => {
    const match = useMatch(props.button.link);
    const { impact } = useTelegramHaptic();
    
    const handleClick = () => {
        // Light haptic feedback on button tap
        impact('light');
    };
    
    return (
        <NavLink 
            to={props.button.link} 
            key={props.button.id} 
            style={{ textDecoration: 'none' }}
            className={styles.bookmarks_button_title}
            onClick={handleClick}
        >
            <Chip active={!!match}>{props.button.ru_name}</Chip>
        </NavLink>
    )

}