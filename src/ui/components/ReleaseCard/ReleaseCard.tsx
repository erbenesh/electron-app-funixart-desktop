import { Link } from 'react-router-dom';
import { unixToDate } from '../../services/utils';
import styles from './ReleaseCard.module.css'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { bookmarksService } from '../../services/BookmarksService';
import { useUserStore } from '../../services/api/auth';

const profile_lists = {
    // 0: "Не смотрю",
    1: { name: "Смотрю", bg_color: "rgba(26, 212, 85, 0.8)" },
    2: { name: "В планах", bg_color: "rgba(140, 119, 197, 0.8)" },
    3: { name: "Просмотрено", bg_color: "rgba(91, 93, 207, 0.8)" },
    4: { name: "Отложено", bg_color: "rgba(233, 196, 47, 0.8)" },
    5: { name: "Брошено", bg_color: "rgba(231, 115, 80, 0.8)" },
};

const yearSeason = ["_", "Зима", "Весна", "Лето", "Осень"];

export const ReleaseCard = (props) => {

    const grade = props.release.grade ? props.release.grade.toFixed(1) : null;

    const profile_list_status = props.release.profile_list_status;
    
    let user_list = null;
  
    if (profile_list_status != null || profile_list_status != 0) {
      user_list = profile_lists[profile_list_status];
    }
    const queryClient = useQueryClient();
    const token = useUserStore((state) => state.token);

    const fetchDeleteFromFavorite = useMutation({
        mutationKey: ['delete from favorite', props.release.id, token],
        mutationFn: () => bookmarksService.setDeleteFromFavorite(props.release.id, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const fetchAddToFavorite = useMutation({
        mutationKey: ['add to favorite', props.release.id, token],
        mutationFn: () => bookmarksService.setAddToFavorite(props.release.id, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    function addToFavorite() {
        if (token) {

            if (props.release.is_favorite) {
                fetchDeleteFromFavorite.mutate();
            } else {
                fetchAddToFavorite.mutate();
            }
        }
    }

    return (
        <div id="vert_card" className={styles.vert_card} 
        // style={{backgroundImage: `linear-gradient(rgba(36, 36, 36, 0.9), rgba(36, 36, 36, 1)), url(${props.release.image})`}}
        >
            <Link to={`/release/${props.release.id}`} className={styles.release_image_border}>
                <img className={styles.release_image} src={props.release.image} alt={props.release.title_ru + " image"} loading='lazy'/>
            </Link>
            <div className={styles.release_lists_info}>
                {user_list && <span className={styles.user_list_name} style={{background: user_list.bg_color}}>{user_list.name}</span>}
            </div>
                
            {/* <div className={styles.anime_title}>{props.release.title_ru}</div> */}

            <div className={styles.description_and_action_buttons}>
                {/* <div className={styles.card_action_buttons}> */}
                    
                <div className={styles.release_info}>

                    <div className={styles.anime_title}>{props.release.title_ru}</div>

                    <div className={styles.anime_subinfo_noborder}>
                        {/*Жанры*/}
                        { props.release.genres }
                    </div>

                    <div className={styles.bottom_info}>

                        { props.release.category &&
                            <span className={styles.anime_subinfo}>
                                {/*Категория*/}
                                { props.release.category.name }
                            </span>
                        }

                        { props.release.status &&
                            <span className={styles.anime_subinfo}>
                                {/*Статус*/}
                                { props.release.status.name }
                            </span>
                        }

                        <span className={styles.anime_subinfo}>
                            {/*Сколько эпизодов*/}
                            { props.release.episodes_released && props.release.episodes_released + " из "}
                            {/*Из скольки эпизодов*/}
                            { 
                                // props.release.status && props.release.status.id !== 3 && 
                                props.release.episodes_total ? props.release.episodes_total + " эп" : "? эп" 
                            }
                        </span>

                        <span className={styles.anime_subinfo}>
                            {/*Оценка или это анонс?*/}
                            { grade ? <>&#9733; {grade}</> 
                            : props.release.status 
                            && props.release.status.id === 0
                            && props.release.aired_on_date !== 0 ? (
                                unixToDate(props.release.aired_on_date, "dayMonthYear")
                            ) : props.release.year ? (
                                <>
                                    {props.release.season && props.release.season != 0
                                    ? `${yearSeason[props.release.season]} `
                                    : ""}
                                    {props.release.year && `${props.release.year} г.`}
                                </>
                            ) : (
                                "Скоро"
                            )}
                        </span>

                        {/* <div className={styles.bookmark}>
                            {
                            props.release.is_favorite? 
                            <IoBookmark style={{color:"rgb(189, 78, 44)", width: '1.2rem', height: '1.2rem'}}/> 
                            : <IoBookmarkOutline style={{color:"rgb(160, 160, 160)", width: '1.2rem', height: '1.2rem'}}/>
                            }
                        </div> */}

                    </div>

                   
                
                </div>
                <p className={styles.description}>{ props.release.description }</p>

                <button className={props.release.is_favorite ? styles.card_action_button_active :  styles.card_action_button} onClick={() => addToFavorite()} type='button'>
                    {props.release.is_favorite ? <IoBookmark className={styles.card_action_button_ico_active} /> : <IoBookmarkOutline className={styles.card_action_button_ico}/>}
                </button>
            </div>
                
        </div>
    )
}