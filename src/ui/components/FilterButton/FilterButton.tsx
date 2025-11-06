import { NavLink, useMatch } from 'react-router-dom'
import { Chip } from 'ui-kit/components/Chip/Chip'
import { useTelegramHaptic } from '../../hooks/useTelegramHaptic'

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
            onClick={handleClick}
        >
            <Chip active={!!match}>{props.button.ru_name}</Chip>
        </NavLink>
    )

}