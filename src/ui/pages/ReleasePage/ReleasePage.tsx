import styles from './ReleasePage.module.css'
import { GoArrowLeft } from "react-icons/go";
import { BsCollectionPlay } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { RxCardStackPlus } from "react-icons/rx";
import { GoHash } from "react-icons/go";
import { anixartService } from '../../services/AnixartService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getSeasonFromUnix, minutesToTime, numberDeclension, sinceUnixDate, unixToDate } from '../../services/utils';
import { LuFlag } from "react-icons/lu";
import { ReleasePlayer } from '../../components/ReleasePlayer/ReleasePlayer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoBookmarkOutline } from "react-icons/io5"
import { IoBookmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { LuReplyAll } from "react-icons/lu";

import interestCardStyles from "../../components/InterestingCard/InterestingCard.module.css"
import { useUserStore } from '../../services/auth';
import { ReleaseCard } from './../../components/ReleaseCard/ReleaseCard';
import { useScrollPosition } from '../../hooks/useScrollPosition';


const profile_lists = {
    0: { name: "Не смотрю", bg_color: "rgb(39, 39, 39)" },
    1: { name: "Смотрю", bg_color: "rgb(26, 212, 85)" },
    2: { name: "В планах", bg_color: "rgb(140, 119, 197)" },
    3: { name: "Просмотрено", bg_color: "rgb(91, 93, 207)" },
    4: { name: "Отложено", bg_color: "rgb(233, 196, 47)" },
    5: { name: "Брошено", bg_color: "rgb(231, 115, 80)" },
};

const lists = [
    { list: 0, name: "Не смотрю" },
    { list: 1, name: "Смотрю" },
    { list: 2, name: "В планах" },
    { list: 3, name: "Просмотрено" },
    { list: 4, name: "Отложено" },
    { list: 5, name: "Брошено" },
];

const weekDay = [
    "_",
    "каждый понедельник",
    "каждый вторник",
    "каждую среду",
    "каждый четверг",
    "каждую пятницу",
    "каждую субботу",
    "каждое воскресенье",
];

export const ReleasePage = (props) => {

    const token = useUserStore((state) => state.token);

    const [ release, setRelease ] = useState({} as any);

    const [ commentsPage, setCommentsPage ] = useState(0);

    const [ commentsList, setCommentsList ] = useState(null);

    const [ isDescriptionHidden, setDescriptionHidden ] = useState(true);

    const [ textLineCount, setTextLineCount] = useState(0);

    const [ currentIndex, setCurrentIndex ] = useState(0);

    const [ userList, setUserList ] = useState(null);

    const [ userFavorite, setUserFavorite ] = useState(false);

    const [ isDropdownListsHidden, setIsDropdownListsHidden ] = useState(false);

    const textInput = useRef(null);

    const queryClient = useQueryClient();

    const fetchCurrentRelease = useQuery({
        queryKey: ['getCurrentRelease', props.currentChoosenRelease, token],
        queryFn: () => anixartService.getCurrentRelease(props.currentChoosenRelease, token)
    });

    const fetchCurrentReleaseComments = useQuery({
        queryKey: ['getCurrentRelease', props.currentChoosenRelease, commentsPage, token],
        queryFn: () => anixartService.getAllComments("release", props.currentChoosenRelease, commentsPage, token)
    });

    const fetchDeleteFromFavorite = useMutation({
        mutationKey: ['delete from favorite', props.currentChoosenRelease, token],
        mutationFn: () => anixartService.setDeleteFromFavorite(props.currentChoosenRelease, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const fetchAddToFavorite = useMutation({
        mutationKey: ['add to favorite', props.currentChoosenRelease, token],
        mutationFn: () => anixartService.setAddToFavorite(props.currentChoosenRelease, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const fetchAddToList = useMutation({
        mutationKey: ['add to bookmark list', userList, props.currentChoosenRelease, token],
        mutationFn: (list: number) => anixartService.addToBookmarkList(list, props.currentChoosenRelease, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (scrollPosition >= 85) {
            if(commentsPage === 0) {
                setCommentsPage(1);
            } else {
                setCommentsPage(commentsPage + 1);
            }
            // console.log('Обновление страницы', page);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    useEffect(() => {
        
        async function _loadInitialComments() {
            const commentsData = fetchCurrentReleaseComments.data?.data.content;

            setCommentsList(commentsData);
            console.log(commentsData);
        }

        if(commentsPage === 0 && fetchCurrentReleaseComments.status === "success") {
            _loadInitialComments();
            setCommentsPage(commentsPage + 1);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchCurrentReleaseComments.status]);

    useEffect(() => {
        async function _nextLoadInitialComments() {
            const commentsData = fetchCurrentReleaseComments.data?.data.content;
            const newComments = [...commentsList, ...commentsData]
            setCommentsList(newComments);
        }

        if(commentsPage > 0 && fetchCurrentReleaseComments.status === "success") {
            _nextLoadInitialComments();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentsPage, fetchCurrentReleaseComments.status]);

    useEffect(() => {

        function handleLineCount() {
            if(fetchCurrentRelease.status === "success") {

                const el = textInput.current;
                const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
                const lineCount = Math.ceil(el.scrollHeight / lineHeight);
        
                setTextLineCount(lineCount);
            }
        }

        async function _loadInitialRelease() {
            const releaseData = fetchCurrentRelease.data?.data.release;
            setRelease(releaseData);

            setUserFavorite(releaseData.is_favorite);

            const profile_list_status = releaseData.profile_list_status;
      
            if (profile_list_status != null || profile_list_status != 0) {
                setUserList(profile_lists[profile_list_status]);
            }
            console.log(releaseData)
        }

        if(fetchCurrentRelease.status === "success") {
            _loadInitialRelease();
            handleLineCount();
        }
        console.log(fetchCurrentRelease.status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchCurrentRelease.status]);

    const goToSlide = (index: number) => {
        
        if (index < 0) {
            index = 0;
        } else if (index >= (Math.ceil(release.screenshot_images.length/3)*2)) {
            index = (Math.ceil(release.screenshot_images.length/3)*2);
        }
        console.log((Math.ceil(release.screenshot_images.length/3)*2));
        console.log(index, currentIndex);
        setCurrentIndex(index);
        document.getElementById("screens_inner").style.transform = `translateX(-${index * 24.5}rem)`;
    }
    
    const goToNextSlide = () => {
        const newIndex = currentIndex + 3;
        goToSlide(newIndex);
    }
    
    const goToPrevSlide = () => {
        const newIndex = currentIndex - 3;
        goToSlide(newIndex);
    }


    function addToFavorite() {
        if (token) {
            setUserFavorite(!userFavorite);
            if (userFavorite) {
                fetchDeleteFromFavorite.mutate();
            } else {
                fetchAddToFavorite.mutate();
            }
        }
    }

    function addToList(list: number) {
        if (token) {
            console.log(list);
            setUserList(profile_lists[list]);
            fetchAddToList.mutate(list);
            setIsDropdownListsHidden(false);
        }
    }


    if (fetchCurrentRelease.status === "pending") {
        return (
            <div className="loader-container">	
                <i className="loader-circle"></i>
            </div>
        )
    }

    if (fetchCurrentRelease.status === "error") {
        return ('An error has occurred: ' + fetchCurrentRelease.error.message);
    }

    return (
        <div className={styles.release_page_wrap}>

            <div className={styles.release_page}>

                <div className={styles.fake_header_nav}/>

                <div className={styles.toolbar}>

                    <button onClick={() => props.setCurrentChoosenRelease(null)} className={styles.back_button}>
                        <GoArrowLeft className={styles.back_ico} />
                    </button>

                    <button className={styles.back_button}>
                        <RxCardStackPlus className={styles.back_ico} />
                    </button>

                </div>

                {release.status && release.status.name != "Анонс" && !release.is_view_blocked &&
                (<div className={styles.release_header}>

                    <div className={styles.header_image_borders}>

                        <div className={styles.header_background_image_border}>
                            <img className={styles.header_background_title_image} src={release.image} alt={release.title_ru} />
                        </div>

             
                        <div className={styles.video_player_wrap}>
                            <div className={styles.video_player}>
                            
                                <ReleasePlayer id={props.currentChoosenRelease} />
                            
                            </div>
                        </div>
                        
                    </div>

                </div>
                )}

                <div className={styles.release_page_body}>
                    <div className={styles.release_block}>
                        <div className={styles.release_info}>
                        {release.is_view_blocked ? <div className={styles.off_view}>Просмотр только на официальном ресурсе</div> : ''}
                            <div className={styles.release_info_header}>
                                <div className={styles.header_title_image_border}>
                                    <img className={styles.header_title_image} src={release.image} alt={release.title_ru} />
                                </div>

                                <div className={styles.release_base_info}>
                                    <div>
                                        <p className={styles.release_title}>{release.title_ru}</p>
                                        <p className={styles.release_title_alt}>{release.title_original}</p>
                                    </div>

                                    <div className={styles.releases_info_buttons}>
                                        <div className={styles.info_buttons_wrap}>
                                            <div>
                                                <button className={styles.info_button} 
                                                onClick={() => setIsDropdownListsHidden(!isDropdownListsHidden)} 
                                                style={userList ? {borderColor: `${userList.bg_color}`, color: `${userList.bg_color}`, width: 9+"rem", justifyContent: "center"} : {}} type='button'>
                                                    <IoIosArrowDown className={styles.comments_b_ico}/>
                                                    <p>{userList ? userList.name : "Не смотрю"}</p>
                                                </button>
                                                <div className={styles.dropdown_lists} style={isDropdownListsHidden ? {display: "flex"} : {}}>
                                                    {lists.map(li => li.name !== userList?.name && (
                                                        <button key={li.list} className={styles.info_button_list} onClick={() => addToList(li.list)} type='button'>
                                                            {li.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <button className={userFavorite? styles.info_button_favorite : styles.info_button} onClick={() => addToFavorite()} type='button'>
                                                {userFavorite? <IoBookmark className={styles.comments_b_ico}/> : <IoBookmarkOutline className={styles.comments_b_ico}/>}
                                                {release.favorites_count > 9999 ? 
                                                `${String(release.favorites_count).slice(0, 2)} ${String(release.favorites_count).slice(2)}` 
                                                : release.favorites_count > 999 ? 
                                                `${String(release.favorites_count).slice(0, 1)} ${String(release.favorites_count).slice(1)}` 
                                                : release.favorites_count}
                                            </button>
                                                                             
                                            <button className={styles.info_button} type='button'>
                                                Показать в коллекциях
                                            </button>

                                            <button className={styles.info_button} type='button'>
                                                Добавить себе в коллекцию
                                            </button>


                                        </div>

                                    </div>
                                    <div className={styles.release_info_table}>

                                        <ul className={styles.parameters_icons}>
                                            <li className={styles.icon}>
                                                <img src={release.country === "Япония" ? "/j_flag.svg" : release.country === "Китай" ? "/cn_flag.svg" : ""} alt="flag" />
                                                {release.country !== "Япония" && release.country !== "Китай" && <LuFlag className={styles.mini_ico}/>}
                                            </li>
                                            <li className={styles.icon}><BsCollectionPlay className={styles.mini_ico}/></li>
                                            <li className={styles.icon}><IoCalendarOutline className={styles.mini_ico}/></li>
                                            <li className={styles.icon}><GrGroup className={styles.mini_ico}/></li>
                                        </ul>

                                        <ul className={styles.parameters}>

                                            <li className={styles.param}>
                                                {release.country && release.country}
                                                {(release.aired_on_date != 0 || release.year) && ", "}
                                                {release.aired_on_date != 0 &&
                                                    `${getSeasonFromUnix(release.aired_on_date)} `}
                                                {release.year && `${release.year} г.`}
                                            </li>

                                            <li className={styles.param}>
                                                {release.episodes_released ? release.episodes_released : "?"}
                                                {"/"}
                                                {release.episodes_total ? release.episodes_total + " эп. " : "? эп. "}
                                                {release.duration != 0 && `по ${minutesToTime(release.duration, "daysHours")}`}
                                            </li>

                                            <li className={styles.param}>
                                            { release.category?.name + ", " }
                                                { release.broadcast === 0
                                                    ? release.status.name
                                                    : `выходит ${weekDay[release.broadcast]}` }
                                            </li>

                                            <li className={styles.param}>
                                                {release.studio && (
                                                <>
                                                {"Студия "}
                                                {release.studio
                                                    .split(", ")
                                                    .map((studio: string, index: number) => {
                                                        return (
                                                            <div key={index} style={{display: 'inline'}}>
                                                            {index > 0 && ", "}
                                                            <a>{studio}</a>
                                                            </div>
                                                        );
                                                    })
                                                }
                                                {(release.author || release.director) && ", "}
                                                </>
                                                )}
                                                {release.author && (
                                                    <>
                                                    {"автор "}
                                                    <a>{release.author}</a>
                                                    {release.director && ", "}
                                                    </>
                                                )}
                                                {release.director && (
                                                    <>
                                                    {"режиссёр "}
                                                    <a>{release.director}</a>
                                                    </>
                                                )}
                                            </li>

                                        </ul>

                                    </div>

                                    {
                                        release.vote_count > 0 && <div>
                                            <div className={styles.rate}>
                                                <div className={styles.rating_panels}>
                                                    <div className={styles.big_rate_number}>
                                                        <p className={styles.grade_number}>{String(release.grade).slice(0,3)}</p>
                                                        <p className={styles.votes_count}>{release.vote_count} {numberDeclension(release.vote_count, "голос", "голоса", "голосов")}</p>
                                                    </div>
                                                    <ul className={styles.rate_lines}>
                                                        <li className={styles.vote_list_line}>5 <div className={styles.vote_line} style={{background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_5_count / release.vote_count * 100)}%, grey 0)`}}/></li>
                                                        <li className={styles.vote_list_line}>4 <div className={styles.vote_line} style={{background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_4_count / release.vote_count * 100)}%, grey 0)`}}/></li>
                                                        <li className={styles.vote_list_line}>3 <div className={styles.vote_line} style={{background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_3_count / release.vote_count * 100)}%, grey 0)`}}/></li>
                                                        <li className={styles.vote_list_line}>2 <div className={styles.vote_line} style={{background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_2_count / release.vote_count * 100)}%, grey 0)`}}/></li>
                                                        <li className={styles.vote_list_line}>1 <div className={styles.vote_line} style={{background: `linear-gradient(90deg, rgb(230, 230, 230) 0 ${(release.vote_1_count / release.vote_count * 100)}%, grey 0)`}}/></li>
                                                    </ul>
                                                </div>
                                                <div className={styles.my_vote_stars}>
                                                
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            {/* {release.is_view_blocked ? <div className={styles.off_view}>Просмотр только на официальном ресурсе</div> : ''} */}

                            <div className={styles.genres_wrap}>
                                <p className={styles.genres}><GoHash className={styles.hash_ico} style={{width: 1.2+"rem"}}/> {release.genres}</p>
                            </div>

                            <div className={styles.description_wrap}>
                                <p ref={textInput} className={isDescriptionHidden? styles.description_hidden : styles.description}>{release.description}</p>
                                
                                {textLineCount > 4 && <button className={styles.description_button} onClick={() => setDescriptionHidden(!isDescriptionHidden)}>
                                    {isDescriptionHidden ? 'Подробнее...' : 'Скрыть'}
                                </button>}
                            </div>

                        </div>

                        { release?.screenshot_images?.length > 0 &&
                        (<div className={styles.screens_wrap}>

                            <h2 className={styles.section_title}>Кадры</h2>

                            <div className="carousel">
                                <div id='screens_inner' className="carousel-inner">
                                    {release?.screenshot_images?.map((screen: string) => (
                                        <div key={screen} className={styles.screens_card} style={{cursor: "default"}}>
                                            <div className={styles.screens_image_border}>
                                                <img className={interestCardStyles.release_image} src={screen} alt="screens" />
                                            </div>
                                        </div>
                                        )
                                    )}
                                </div>
                            
                                <div className={styles.carousel_buttons}>
                                    <button className={styles.carousel_prev_button} style={currentIndex <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevSlide()}>
                                        <IoIosArrowBack className={styles.arrow_ico}/>
                                    </button>

                                    <button className={styles.carousel_next_button} style={currentIndex >= (Math.ceil(release.screenshot_images.length/3)*2) ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextSlide()}>
                                        <IoIosArrowForward className={styles.arrow_ico}/>
                                    </button>

                                </div>

                            </div>
                        </div>)}


                        <div className={styles.screens_wrap}>

                            <h2 className={styles.section_title}>Трейлеры</h2>

                        </div>

                        <div className={styles.screens_wrap}>

                            <h2 className={styles.section_title}>Комментарии</h2>

                            <div className={styles.comments_section_wrap}>
                                <div className={styles.comments_section}>
                                    {commentsList?.map(comment => comment.id && (
                                        <div key={comment.id} className={styles.comment_wrap}>
                                            <div className={styles.comment}>
                                                <div className={styles.avatar}>
                                                    <div className={styles.image_border}>
                                                        <img src={comment.profile.avatar} className={styles.ava_image} alt={comment.profile.login + "ava"} />
                                                    </div>
                                                </div>
                                                <div className={styles.info}>
                                                    <div className={styles.text_block}>
                                                        <div className={styles.login_and_time}>
                                                            <p className={styles.commenter_login}>{comment.profile.login}</p>
                                                            <time className={styles.timestamp} dateTime={comment.timestamp.toString()} title={unixToDate(comment.timestamp, "full")}>
                                                                {sinceUnixDate(comment.timestamp)}
                                                            </time>
                                                        </div>
                                                        <p>{comment.message}</p>
                                                    </div>
                                                    <div className={styles.action_buttons}>
                                                        <div className={styles.reply_and_like_buttons}>
                                                            <button className={styles.reply_button} type="button">Ответить</button>
                                                            <div className={styles.dislike_and_like_button}>
                                                                <button className={styles.like_button} type="button"><IoIosArrowDown/></button>
                                                                <p className={styles.likes_count}>{comment.likes_count}</p>
                                                                <button className={styles.like_button} type="button"><IoIosArrowUp/></button>
                                                            </div>
        
                                                        </div>
                                                        { 
                                                        comment.reply_count > 0 && 
                                                            <button className={styles.show_all_replys} type="button">
                                                                <LuReplyAll className={styles.show_all_replys_ico}/> 
                                                                <p>Показать {comment.reply_count} ответов</p>
                                                            </button>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                        </div>


                    </div>

                    <div className={styles.recommends_and_related_block}>
                        {release.related_releases?.length > 0 && <h2 className={styles.section_title}>Связанные релизы</h2>}
                        { 
                        release.related_releases?.length > 0 &&
                            <div className={styles.recommends_and_related_column}>
                                {release?.related_releases.map(el => el.id !== release.id && <ReleaseCard key={el.id} release={el} setCurrentChoosenRelease={props.setCurrentChoosenRelease}/>)}
                            </div>
                        }
                        <h2 className={styles.section_title}>Рекомендуем также</h2>
                        { 
                        release.recommended_releases?.length > 0 ? 
                            <div className={styles.recommends_and_related_column}>
                                {release?.recommended_releases.map(el => el.id && <ReleaseCard key={el.id} release={el} setCurrentChoosenRelease={props.setCurrentChoosenRelease}/>)}
                            </div> : 'Упс, таких нет'    
                        }                                      
                    </div>

                </div>

            </div>
            
        </div>
    )
}