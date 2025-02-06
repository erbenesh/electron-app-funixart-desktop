import { MdAddLink } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useUserStore } from '../../services/api/auth';
import styles from './Profile.module.css';
import { unixToDate } from '../../services/utils';
import { profileService } from "../../services/ProfileService";

export const Profile = () => {

    const authUser = useUserStore();
    const [ user, setUser ] = useState(null);
    const [ isMyProfile, setIsMyProfile ] = useState(false);
  
    const [ isOpen, setIsOpen ] = useState(false);

    const [ totalCount, setTotalCount ] = useState(0);

    const getProfileData = useQuery({
        queryKey: ['getProfile', authUser.user.id, authUser.token],
        queryFn: () => profileService.getProfile(authUser.user.id, authUser.token)
    });

    useEffect(() => {
        if (getProfileData && !user) {
            console.log(getProfileData.data?.data)
            setUser(getProfileData.data?.data.profile);
            setIsMyProfile(getProfileData.data?.data.is_my_profile);
            setTotalCount(
                (getProfileData.data?.data.profile.watching_count + 
                getProfileData.data?.data.profile.plan_count + 
                getProfileData.data?.data.profile.completed_count + 
                getProfileData.data?.data.profile.hold_on_count + 
                getProfileData.data?.data.profile.dropped_count)
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProfileData]);

    if (!user) {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        );
    }

    return (
        <div className={styles.profile_page_wrap}>
            <div className={styles.profile_page}>
                <div className={styles.profile_header}>
                    <div className={styles.avatar_bg_image_wrap}>
                        <img className={styles.avatar_bg_image} src={user.avatar} alt="avatar" />
                    </div>
                    <div className={styles.avatar_wrap}>
                        <div className={styles.avatar_image_wrap}>
                            <img className={styles.avatar_image} src={user.avatar} alt="avatar" />
                        </div>
                        <div className={styles.avatar_text_block}>

                            <div className={styles.top_text}>
                                <div className={styles.profile_name_and_rating}>
                                    <p className={styles.login}>{user.login}</p>
                                    <p className={styles.rating_score}>{user.rating_score}</p>

                                </div>

                                <p className={styles.status}>{user.status}</p>

                                <div className={styles.is_online}>
                                    <p>{user.is_online ? "онлайн" : "был онлайн " + unixToDate(user.last_activity_time, "full")}</p>
                                    <p>{"зарегистрирован(а) " + unixToDate(user.register_date, "full")}</p>
                                
                                </div>

                            </div>

                            <div className={styles.profile_activity_stats}>
                                <div className={styles.activity_state}>
                                    <p className={styles.state_count}>{user.comment_count}</p>
                                    <p>{" коммента"}</p>
                                </div>
                                <div className={styles.activity_state}>
                                    <p className={styles.state_count}>{user.video_count}</p>
                                    <p>{" видео"}</p>
                                </div>
                                <div className={styles.activity_state}>
                                    <p className={styles.state_count}>{user.collection_count}</p>
                                    <p>{" коллекций"}</p>
                                </div>
                                <div className={styles.activity_state}>
                                    <p className={styles.state_count}>{user.friend_count}</p>
                                    <p>{" друга"}</p>
                                </div>

                            </div>
                        </div>
                    </div>
        
                </div>

                <div className={styles.header_buttons}>
                    <div className={styles.buttons_wrap}>
                        <button className={styles.profile_edit_button}>Редактировать</button>
                        <button className={styles.profile_edit_button}>VK</button>
                        <button className={styles.profile_edit_button}>Telegram</button>
                        <button className={styles.profile_edit_button}>Discord</button>
                        <button className={styles.profile_edit_button}>Instagram</button>
                        <button className={styles.profile_edit_button}>TikTok</button>
                        <button className={styles.profile_edit_button}><MdAddLink className={styles.add_link_ico}/></button>
                    </div>
                    
                </div>

                <div className={styles.profile_analytics}>
                    <div className={styles.analytics_wrap}>
                        <h2 className={styles.analytics_title}>Статистика</h2>

                        <div className={styles.analytics}>
                            <div className={styles.analytics_stats}>
                                <ul className={styles.total_stats_lists}>
                                    <li className={styles.total_state_w}>
                                        Смотрю <span className={styles.total_state_value}>{user.watching_count}</span>
                                    </li>
                                    <li className={styles.total_state_p}>
                                        В планах <span className={styles.total_state_value}>{user.plan_count}</span>
                                    </li>
                                    <li className={styles.total_state_v}>
                                        Просмотрено <span className={styles.total_state_value}>{user.completed_count}</span>
                                    </li>
                                    <li className={styles.total_state_h} >
                                        Отложено <span className={styles.total_state_value}>{user.hold_on_count}</span>
                                    </li>
                                    <li className={styles.total_state_d}>
                                        Брошено <span className={styles.total_state_value}>{user.dropped_count}</span>
                                    </li>
                                </ul>
                                <div className={styles.total_stats_viewed}>
                                    <p className={styles.state_viewed}>Просмотрено серий: <span className={styles.total_state_value}>{user.watched_episode_count}</span></p>
                                    <p className={styles.state_viewed}>Время просомтра: <span className={styles.total_state_value}>{user.watched_time}</span></p>
                                </div>
                            </div>
                            <div className={styles.analytics_pie_chart_wrap}>
                                <div className={styles.analytics_pie_chart} 
                                style={
                                    {
                                        background: ` 
                                            conic-gradient(
                                            var(--color-watching) ${(user.watching_count/totalCount*100)}%, 
                                            var(--color-plans) 0 ${(user.watching_count/totalCount*100)+(user.plan_count/totalCount*100)}%, 
                                            var(--color-viewed) 0 ${((user.watching_count/totalCount*100)+(user.plan_count/totalCount*100))+(user.completed_count/totalCount*100)}%, 
                                            var(--color-hold) 0 ${(((user.watching_count/totalCount*100)+(user.plan_count/totalCount*100))+(user.completed_count/totalCount*100))+(user.hold_on_count/totalCount*100)}%, 
                                            var(--color-droped) 0
                                        `,
                                        mask: `
                                        radial-gradient(
                                            transparent 3rem, 
                                            white 3rem
                                        )
                                        `
                                    }
                                }>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className={styles.profile_releases_votes}>
                    <div className={styles.votes_wrap}>
                        <div className={styles.votes_wrap_top}>
                            <h2 className={styles.analytics_title}>Оценки релизов</h2>
                            <button className={styles.profile_edit_button} type="button">Показать все</button>
                        </div>

                        <div className={styles.voted_releases_5_len}>
                            <ul className={styles.voted_releases_list}>
                                { user.votes?.map(voted_release => voted_release.id && (
                                    <li className={styles.voted_release} key={voted_release.id}>
                                        <div className={styles.voted_release_image_wrap}>
                                            <img className={styles.voted_release_image} src={voted_release.image} alt={`${voted_release.name} image`} />
                                        </div>

                                        <div className={styles.voted_release_info}>
                                            <p className={styles.voted_release_title}>{voted_release.title_ru}</p>
                                            <p className={styles.voted_release_vote_rate}>***** • Дата</p>
                                        </div>
                                            
                                    </li>
                                    ))
                                }
                            </ul>
                        </div>

                    </div>
                </div>

                <div className={styles.profile_viewing_dynamics}>
                    
                </div>

                <div className={styles.profile_viewing_dynamics}>
                    
                </div>

                <div className={styles.profile_last_viewed}>
                    
                </div>
            </div>
        </div>
    )
}