
import { IoIosStarOutline } from 'react-icons/io'

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