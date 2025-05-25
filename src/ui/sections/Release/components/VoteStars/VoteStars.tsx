import { IoIosStarOutline } from 'react-icons/io';

export const VoteStars = (props: { isMyVote: any }) => {
  if (props.isMyVote) {
    return (
      <div>
        <IoIosStarOutline />
      </div>
    );
  } else {
    return (
      <div>
        <IoIosStarOutline />
      </div>
    );
  }
};
