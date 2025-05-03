import styles from './ProfileCard.module.css';

import { useNavigate } from 'react-router-dom';

export const ProfileCard = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/profile/${props.profile.id}`);
    props.clickCallBack && props.clickCallBack('');
  };

  return (
    <div id="profile_card" className={styles.profile_card} onClick={handleClick}>
      <div className={styles.profile_avatar_wrapper}>
        <div className={styles.profile_avatar}>
          <img className={styles.avatar} src={props.profile.avatar} alt="" />
        </div>
      </div>

      <div className={styles.profile_info}>
        <div className={styles.profile_login}>{props.profile.login}</div>
      </div>
    </div>
  );
};
