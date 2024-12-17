
import { IoIosStarOutline } from 'react-icons/io'
import styles from './Votestars.module.css'

export const VoteStars = (props) => {

    if (props.isMyVote) {

        return (
            <div>
                <IoIosStarOutline />
            </div>
        )

    } else {

        return (
            <div>
                <IoIosStarOutline />
            </div>
        )

    }
}