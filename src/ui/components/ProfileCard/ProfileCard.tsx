import { Dispatch, SetStateAction } from 'react';
import styles from './ProfileCard.module.css';

import { useNavigate } from 'react-router-dom';

interface Props {
  profile: any;
  clickCallBack: Dispatch<SetStateAction<string>>;
}

export const ProfileCard = ({ profile, clickCallBack }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${profile.id}`);
    clickCallBack && clickCallBack('');
  };

  return (
    <div id="profile_card" className={styles.profile_card} onClick={handleClick}>
      <div className={styles.profile_avatar_wrapper}>
        <div className={styles.profile_avatar}>
          <img className={styles.avatar} src={profile.avatar} alt="" />
        </div>
      </div>

      <div className={styles.profile_info}>
        <div className={styles.profile_login}>{profile.login}</div>
      </div>
    </div>
  );
};
