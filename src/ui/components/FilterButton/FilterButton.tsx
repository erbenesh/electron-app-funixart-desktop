import { NavLink, useMatch } from 'react-router-dom'
import { Chip } from 'ui-kit/components/Chip/Chip'

export const FilterButton = (props) => {
    const match = useMatch(props.button.link);
    return (
        <NavLink to={props.button.link} key={props.button.id} style={{ textDecoration: 'none' }}>
            <Chip active={!!match}>{props.button.ru_name}</Chip>
        </NavLink>
    )

}