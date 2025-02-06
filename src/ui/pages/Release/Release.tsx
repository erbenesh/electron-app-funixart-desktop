import styles from './Release.module.css'

import { BsCollectionPlay } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { GoHash } from "react-icons/go";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { getSeasonFromUnix, minutesToTime } from '../../services/utils';
import { LuFlag } from "react-icons/lu";
import { ReleasePlayer } from '../../components/ReleasePlayer/ReleasePlayer';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoBookmarkOutline } from "react-icons/io5"
import { IoBookmark } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import jFlag from '../../assets/icons/j_flag.svg'
import cnFlag from '../../assets/icons/cn_flag.svg'

import interestCardStyles from "../../components/InterestingCard/InterestingCard.module.css"
import { Comment } from "../../components/Comment/Comment"
import { useUserStore } from '../../services/api/auth';
import { ReleaseCard } from '../../components/ReleaseCard/ReleaseCard';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useParams } from 'react-router-dom';
import { Toolbar } from '../../components/Toolbar/Toolbar';
import { ReleaseVotesCounter } from '../../components/ReleaseVotesCounter/ReleaseVotesCounter';
import { FakeHeader } from '../../components/FakeHeader/FakeHeader';
import { lists, profile_lists, releaseService, weekDay } from '../../services/ReleaseService';
import { commentService } from '../../services/CommentService';
import { bookmarksService } from '../../services/BookmarksService';

export const Release = () => {

    const { releaseId } = useParams();

    const token = useUserStore((state) => state.token);

    const [ isDescriptionHidden, setDescriptionHidden ] = useState(true);

    const [ textLineCount, setTextLineCount] = useState(0);

    const [ currentIndex, setCurrentIndex ] = useState(0);

    const [ isDropdownListsHidden, setIsDropdownListsHidden ] = useState(false);

    const textInput = useRef(null);

    const queryClient = useQueryClient();

    const currentRelease = useQuery({
        queryKey: ['getCurrentRelease', releaseId, token],
        queryFn: () => releaseService.getCurrentRelease(releaseId, token),
    });

    const release = currentRelease.data?.data.release;

    const currentReleaseComments = useInfiniteQuery({
        queryKey: ['getCurrentReleaseComments', releaseId, token],
        queryFn: meta => commentService.getAllComments("release", releaseId, meta.pageParam, token),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.length === 0) {
              return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.content)
    })

    const fetchDeleteFromFavorite = useMutation({
        mutationKey: ['delete from favorite', releaseId, token],
        mutationFn: () => bookmarksService.setDeleteFromFavorite(releaseId, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const fetchAddToFavorite = useMutation({
        mutationKey: ['add to favorite', releaseId, token],
        mutationFn: () => bookmarksService.setAddToFavorite(releaseId, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const fetchAddToList = useMutation({
        mutationKey: ['add to bookmark list', releaseId, token],
        mutationFn: (list: number) => bookmarksService.addToBookmarkList(list, releaseId, token),
        onSuccess() {
            queryClient.refetchQueries({queryKey: ['getCurrentRelease']});
        }
    });

    const scrollPosition = useScrollPosition();
    useEffect(() => {
        
        if (scrollPosition >= 85) {
            currentReleaseComments.fetchNextPage();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollPosition])

    useEffect(() => {
        function handleLineCount() {

            const el = textInput.current;
            const lineHeight = parseInt(window.getComputedStyle(el).lineHeight);
            const lineCount = Math.ceil(el.scrollHeight / lineHeight);
    
            setTextLineCount(lineCount);
        }

        if( release ) {
            handleLineCount();
        }
        
    }, [release]);

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
            // setUserFavorite(!userFavorite);
            if (release.is_favorite) {
                fetchDeleteFromFavorite.mutate();
            } else {
                fetchAddToFavorite.mutate();
            }
        }
    }

    function addToList(list: number) {
        if (token) {
            
            
            fetchAddToList.mutate(list);
            setIsDropdownListsHidden(false);
        }
    }

    
    if (currentRelease.status === "error") {
        return ('An error has occurred: ' + currentRelease.error.message);
    }

    return (

        currentRelease.isPending || !release ? 
        <div className="loader-container">	
            <i className="loader-circle" />
        </div>
        :
        <div className={styles.release_page_wrap}>

            <div className={styles.release_page}>

                <FakeHeader />

             

                {
                    release.status && release.status.name != "Анонс" && !release.is_view_blocked &&
                    (
                        <div className={styles.release_header}>

                            <div className={styles.header_image_borders}>

                                <div className={styles.header_background_image_border}>
                                    <img className={styles.header_background_title_image} src={release.image} alt={release.title_ru} />
                                </div>
                    
                                <div className={styles.video_player_wrap}>
                                    <div className={styles.video_player}>
                                    
                                        <ReleasePlayer id={releaseId} />
                                    
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    )
                }

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
                                                style={release.profile_list_status ? {borderColor: `${profile_lists[release.profile_list_status].bg_color}`, color: `${profile_lists[release.profile_list_status].bg_color}`, width: 9+"rem", justifyContent: "center"} : {}} type='button'>
                                                    <IoIosArrowDown className={styles.comments_b_ico}/>
                                                    <p>{release.profile_list_status ? profile_lists[release.profile_list_status].name : "Не смотрю"}</p>
                                                </button>
                                                <div className={styles.dropdown_lists} style={isDropdownListsHidden ? {display: "flex"} : {}}>
                                                    {lists.map(li => li.name !== profile_lists[release.profile_list_status]?.name && (
                                                        <button key={li.list} className={styles.info_button_list} onClick={() => addToList(li.list)} type='button'>
                                                            {li.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <button className={release.is_favorite? styles.info_button_favorite : styles.info_button} onClick={() => addToFavorite()} type='button'>
                                                {release.is_favorite? <IoBookmark className={styles.comments_b_ico}/> : <IoBookmarkOutline className={styles.comments_b_ico}/>}
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
                                                <img src={release.country === "Япония" ? jFlag : release.country === "Китай" ? cnFlag : ""} alt="" />
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
                                        release.vote_count > 0 && 
                                        <ReleaseVotesCounter release={release}/>
                                    }

                                </div>
                            </div>
          
                            <div className={styles.genres_wrap}>
                                <p className={styles.genres}><GoHash className={styles.hash_ico} style={{width: 1.2+"rem"}}/> {release.genres}</p>
                            </div>

                            <div className={styles.description_wrap}>
                                <p ref={textInput} className={isDescriptionHidden? styles.description_hidden : styles.description}>{release.description}</p>
                                
                                { textLineCount > 4 && <button className={styles.description_button} onClick={() => setDescriptionHidden(!isDescriptionHidden)}>
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
                                    {currentReleaseComments.data?.map(comment => comment.id && (
                                        <Comment key={comment.id} comment={comment}/>
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
                                {release?.related_releases.map(el => el.id !== release.id && <ReleaseCard key={el.id} release={el} />)}
                            </div>
                        }
                        <h2 className={styles.section_title}>Рекомендуем также</h2>
                        { 
                        release.recommended_releases?.length > 0 ? 
                            <div className={styles.recommends_and_related_column}>
                                {release?.recommended_releases.map(el => el.id && <ReleaseCard key={el.id} release={el} />)}
                            </div> : 'Упс, таких нет'    
                        }                                      
                    </div>

                </div>

            </div>
            
        </div>
    )
}