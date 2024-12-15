import styles from './ReleaseCard.module.css'

const profile_lists = {
    // 0: "Не смотрю",
    1: { name: "Смотрю", bg_color: "rgb(26, 212, 85, 0.8)" },
    2: { name: "В планах", bg_color: "rgb(140, 119, 197, 0.8)" },
    3: { name: "Просмотрено", bg_color: "rgb(91, 93, 207, 0.8)" },
    4: { name: "Отложено", bg_color: "rgb(233, 196, 47, 0.8)" },
    5: { name: "Брошено", bg_color: "rgb(231, 115, 80, 0.8)" },
};

export const ReleaseCard = ({...props}) => {

    const profile_list_status = props.release.profile_list_status;
    let user_list = null;
  
    if (profile_list_status != null || profile_list_status != 0) {
      user_list = profile_lists[profile_list_status];
    }

    return (
        <div className={styles.card} onClick={() => props.setCurrentChoosenRelease(props.release.id)}>

            <div className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt="" />
                {user_list && <div className={styles.user_list_name} style={{background: user_list.bg_color}}>{user_list.name}</div>}
            </div>

            <div className={styles.anime_title}>{props.release.title_ru}</div>

            {props.release.status?.name !== 'Анонс' ? 
            <p className={styles.anime_subinfo}>{props.release.episodes_released || '?'} из {props.release.episodes_total || '?'} эп • {String(props.release.grade).slice(0, 3)}</p> 
            : <p className={styles.anime_subinfo}>{props.release.year || 'скоро'}</p>}

        </div>
    )
}