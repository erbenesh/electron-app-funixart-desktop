import '../styles/Release.css';

import interestCardStyles from "#/components/InterestingCard/InterestingCard.module.css";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { BsCollectionPlay } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { GrGroup } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline, IoCalendarOutline } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import { useParams } from 'react-router-dom';

import { commentService } from '#/api/CommentService';
import { useAddToBookmarkList, useFavoriteReleaseMutations, useGetCurrentRelease } from '#/api/hooks';
import { useReportRelease } from '#/api/hooks/useReport';
import { lists, profile_lists, weekDay } from '#/api/ReleaseService';
import { releaseVideoService } from '#/api/ReleaseVideoService';
import { getSeasonFromUnix, minutesToTime } from '#/api/utils';
import cnFlag from '#/assets/icons/cn_flag.svg';
import jFlag from '#/assets/icons/j_flag.svg';
import { useUserStore } from '#/auth/store/auth';
import { Comment } from '#/components/Comment/Comment';
import { PostInput } from '#/components/PostInput/PostInput';
import { ReleasePlayer } from '#/components/ReleasePlayer/ReleasePlayer';
import { ReleaseVotesCounter } from '#/components/ReleaseVotesCounter/ReleaseVotesCounter';
import { ScheduleReleaseCard } from '#/components/ScheduleReleaseCard/ScheduleReleaseCard';
import { useClickOutside } from '#/hooks/useClickOutside';
import { useScrollPosition } from '#/hooks/useScrollPosition';
import { } from 'react';

export const Release = () => {

    const { releaseId } = useParams();

    const token = useUserStore((state) => state.token);

    const [ isDescriptionHidden, setDescriptionHidden ] = useState(true);

    const [ textLineCount, setTextLineCount] = useState(0);

    const [ screensIndex, setScreensIndex ] = useState(0);
    const [ videosIndex, setVideosIndex ] = useState(0);

    const [ isDropdownListsHidden, setIsDropdownListsHidden ] = useState(false);
    const [ newComment, setNewComment ] = useState('');
    const [ isSpoiler, setIsSpoiler ] = useState(false);
    const [ trailerUrl, setTrailerUrl ] = useState<string | null>(null);

    const textInput = useRef(null);

    

    const currentRelease = useGetCurrentRelease({ id: releaseId, token });
    const reportRelease = useReportRelease();

    const release = currentRelease.data?.release;

    const currentReleaseComments = useInfiniteQuery({
        queryKey: ['getCurrentReleaseComments', releaseId, token],
        queryFn: meta => commentService.getAllComments("release", releaseId, meta.pageParam, token),
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            if (lastPage.content.length === 0) {
              return undefined
            }
            return lastPageParam + 1
          },
        select: data => data.pages.flatMap((page) => page.content)
    })

    const releaseVideos = useQuery({
        queryKey: ['getReleaseVideos', releaseId, token],
        queryFn: () => releaseVideoService.getReleaseVideos(releaseId, token || undefined),
        enabled: Boolean(releaseId),
        select: (data) => data.videos || [],
    });

    const { add: addFavorite, remove: deleteFavorite } = useFavoriteReleaseMutations({
        releaseId: releaseId,
        token: token,
    });

    const fetchAddToList = useAddToBookmarkList({ releaseId: releaseId, token: token });

    // Close profile-lists dropdown on outside click
    const listsRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(listsRef, () => setIsDropdownListsHidden(false));

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

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setTrailerUrl(null);
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, []);

    const goToSlideScreens = (index: number) => {
        if (!release) return;
        const maxIndex = Math.ceil(release.screenshot_images.length/3)*2;
        if (index < 0) index = 0;
        else if (index >= maxIndex) index = maxIndex;
        setScreensIndex(index);
        const el = document.getElementById('screens_inner');
        if (el) el.style.transform = `translateX(-${index * 24.5}rem)`;
    }

    const goToNextScreens = () => goToSlideScreens(screensIndex + 3);
    const goToPrevScreens = () => goToSlideScreens(screensIndex - 3);

    const goToSlideVideos = (index: number, itemsCount: number) => {
        const maxIndex = Math.ceil(itemsCount/3)*2;
        if (index < 0) index = 0;
        else if (index >= maxIndex) index = maxIndex;
        setVideosIndex(index);
        const el = document.getElementById('videos_inner');
        if (el) el.style.transform = `translateX(-${index * 24.5}rem)`;
    }
    const goToNextVideos = (count: number) => goToSlideVideos(videosIndex + 3, count);
    const goToPrevVideos = (count: number) => goToSlideVideos(videosIndex - 3, count);


    function addToFavorite() {
        if (token) {
            // setUserFavorite(!userFavorite);
            if (release.is_favorite) {
                deleteFavorite.mutate();
            } else {
                addFavorite.mutate();
            }
        }
    }

    function addToList(list: number) {
        if (token) {
            fetchAddToList.mutate(list);
            setIsDropdownListsHidden(false);
        }
    }

    function onReportRelease() {
        if (!token || !releaseId) return;
        reportRelease.mutate({ releaseId, request: { reasonId: 1 }, token });
    }

    async function onAddComment() {
        if (!token || !releaseId) return;
        const message = newComment.trim();
        if (!message) return;
        try {
            await commentService.addReleaseComment(releaseId, { message, spoiler: isSpoiler }, token);
            setNewComment('');
            setIsSpoiler(false);
            currentReleaseComments.refetch();
        } catch (e) {
            // noop
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
        <div className="release_page_wrap">

            <div className="release_page">

                {
                    release.status && release.status.name != "Анонс" && !release.is_view_blocked ?
                    (
                        <div className="release_header">

                            <div className="header_image_borders">

                                <div className="header_background_image_border">
                                    <img className="header_background_title_image" src={release.image} alt={release.title_ru} />
                                </div>
                    
                                <div className="video_player_wrap">
                                    <div className="video_player">
                                    
                                        <ReleasePlayer id={releaseId} />
                                    
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    ) : 
                    <div className="off_view">
                        <div data-position="top" className="info_carousel">
                  
                            <span className="info_carousel__text">
                                • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе
                                • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе
                                • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе • Просмотр только на официальном ресурсе
                                • Просмотр только на официальном
                            </span>
                  
                        </div>
                    </div>
                    // <div className={styles.off_view}>Просмотр только на официальном ресурсе</div>
                    
                }

                <div className="release_page_body">
                    <div className="release_block">
                        <div className="release_info release_details_card">

                            <div className="release_info_header">
                                <div className="header_title_image_border">
                                    <img className="header_title_image" src={release.image} alt={release.title_ru} />
                                </div>

                                <div className="release_base_info">
                                    <div>
                                        <p className="release_title">{release.title_ru}</p>
                                        <p className="release_title_alt">{release.title_original}</p>
                                    </div>

                                    <div className="releases_info_buttons">
                                        <div className="info_buttons_wrap">
                                            <div ref={listsRef}>
                                                <button className="info_button" 
                                                onClick={() => setIsDropdownListsHidden(!isDropdownListsHidden)} 
                                                style={release.profile_list_status ? {borderColor: `${profile_lists[release.profile_list_status].bg_color}`, color: `${profile_lists[release.profile_list_status].bg_color}`, width: 9+"rem", justifyContent: "center"} : {}} type='button'>
                                                    <IoIosArrowDown className="comments_b_ico"/>
                                                    <p>{release.profile_list_status ? profile_lists[release.profile_list_status].name : "Не смотрю"}</p>
                                                </button>
                                                <div className="dropdown_lists" style={isDropdownListsHidden ? {display: "flex"} : {}}>
                                                    {lists.map(li => li.name !== profile_lists[release.profile_list_status]?.name && (
                                                        <button key={li.list} className="info_button_list" onClick={() => addToList(li.list)} type='button'>
                                                            {li.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <button className={release.is_favorite? "info_button_favorite" : "info_button"} onClick={() => addToFavorite()} type='button'>
                                                {release.is_favorite? <IoBookmark className="comments_b_ico"/> : <IoBookmarkOutline className="comments_b_ico"/>}
                                                {release.favorites_count > 9999 ? 
                                                `${String(release.favorites_count).slice(0, 2)} ${String(release.favorites_count).slice(2)}` 
                                                : release.favorites_count > 999 ? 
                                                `${String(release.favorites_count).slice(0, 1)} ${String(release.favorites_count).slice(1)}` 
                                                : release.favorites_count}
                                            </button>
                                                                             
                                            <button className="info_button" type='button'>
                                                Показать в коллекциях
                                            </button>

                                            <button className="info_button" type='button'>
                                                Добавить себе в коллекцию
                                            </button>

                                            <button className="info_button" type='button' onClick={onReportRelease}>
                                                Пожаловаться
                                            </button>

                                        </div>

                                    </div>
                                    <div className="release_info_table">

                                        <ul className="parameters_icons">
                                            <li className="icon">
                                                <img src={release.country === "Япония" ? jFlag : release.country === "Китай" ? cnFlag : ""} alt="" />
                                                {release.country !== "Япония" && release.country !== "Китай" && <LuFlag className="mini_ico"/>}
                                            </li>
                                            <li className="icon"><BsCollectionPlay className="mini_ico"/></li>
                                            <li className="icon"><IoCalendarOutline className="mini_ico"/></li>
                                            <li className="icon"><GrGroup className="mini_ico"/></li>
                                        </ul>

                                        <ul className="parameters">

                                            <li className="param">
                                                {release.country && release.country}
                                                {(release.aired_on_date != 0 || release.year) && ", "}
                                                {release.aired_on_date != 0 &&
                                                    `${getSeasonFromUnix(release.aired_on_date)} `}
                                                {release.year && `${release.year} г.`}
                                            </li>

                                            <li className="param">
                                                {release.episodes_released ? release.episodes_released : "?"}
                                                {"/"}
                                                {release.episodes_total ? release.episodes_total + " эп. " : "? эп. "}
                                                {release.duration != 0 && `по ${minutesToTime(release.duration, "daysHours")}`}
                                            </li>

                                            <li className="param">
                                            { release.category?.name + ", " }
                                                { release.broadcast === 0
                                                    ? release.status.name
                                                    : `выходит ${weekDay[release.broadcast]}` }
                                            </li>

                                            <li className="param">
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
          
                            <div className="genres_wrap">
                                <p className="genres"><GoHash className="hash_ico" style={{width: 1.2+"rem"}}/> {release.genres}</p>
                            </div>

                            <div className="description_wrap">
                                <p ref={textInput} className={isDescriptionHidden? "description_hidden" : "description"}>{release.description}</p>
                                
                                { textLineCount > 4 && <button className="description_button" onClick={() => setDescriptionHidden(!isDescriptionHidden)}>
                                    {isDescriptionHidden ? 'Подробнее...' : 'Скрыть'}
                                </button>}
                            </div>

                        </div>

                        { release?.screenshot_images?.length > 0 &&
                        (<div className="screens_wrap">

                            <h2 className="section_title">Кадры</h2>

                            <div className="carousel">
                                <div id='screens_inner' className="carousel-inner">
                                    {release?.screenshot_images?.map((screen: string) => (
                                        <div key={screen} className="screens_card" style={{cursor: "default"}}>
                                            <div className="screens_image_border">
                                                <img className={interestCardStyles.release_image} src={screen} alt="" />
                                            </div>
                                        </div>
                                        )
                                    )}
                                </div>
                            
                                <div className="carousel_buttons">
                                    <button className="carousel_prev_button" style={screensIndex <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevScreens()}>
                                        <IoIosArrowBack className="arrow_ico"/>
                                    </button>

                                    <button className="carousel_next_button" style={screensIndex >= (Math.ceil(release.screenshot_images.length/3)*2) ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextScreens()}>
                                        <IoIosArrowForward className="arrow_ico"/>
                                    </button>

                                </div>

                            </div>
                        </div>)}


                        <div className="screens_wrap">

                            <h2 className="section_title">Трейлеры</h2>

                            <div className="carousel">
                                <div className="carousel-inner">
                                    {release?.video_banners.map(banner => (
                                        <div key={banner.image} className="screens_card">
                                            <div className="screens_image_border">
                                                <img className={interestCardStyles.release_image} src={banner.image} alt="" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                          
    

                                    {/* // "name": "Трейлеры",
                                    // "image": "http://img.youtube.com/vi/ol3VEokpIi4/hqdefault.jpg",
                                    // "value": "1",
                                    // "action_id": 0,
                                    // "is_new": false */}
                
                        

                        </div>

                        {releaseVideos.data && releaseVideos.data.length > 0 && (
                        <div className="screens_wrap">
                            <h2 className="section_title">Клипы и трейлеры</h2>
                            <div className="carousel">
                                <div id='videos_inner' className="carousel-inner">
                                    {releaseVideos.data.map((video: any) => (
                                        <div key={video.id} className="screens_card" onClick={() => setTrailerUrl(video.player_url || video.url) }>
                                            <div className="screens_image_border">
                                                <img className={interestCardStyles.release_image} src={video.image} alt={video.title || ''} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="carousel_buttons">
                                    <button className="carousel_prev_button" style={videosIndex <= 0 ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToPrevVideos(releaseVideos.data.length)}>
                                        <IoIosArrowBack className="arrow_ico"/>
                                    </button>

                                    <button className="carousel_next_button" style={videosIndex >= (Math.ceil(releaseVideos.data.length/3)*2) ? {opacity: 0, pointerEvents: "none"} : {}} onClick={() => goToNextVideos(releaseVideos.data.length)}>
                                        <IoIosArrowForward className="arrow_ico"/>
                                    </button>

                                </div>
                            </div>
                        </div>
                        )}

                        {trailerUrl && (
                        <div className="video_modal" onClick={() => setTrailerUrl(null)}>
                            <div className="video_modal_inner" onClick={(e) => e.stopPropagation()}>
                                <iframe
                                    className="video_iframe"
                                    src={trailerUrl}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                />
                                <button type='button' className="video_modal_close" onClick={() => setTrailerUrl(null)}>×</button>
                            </div>
                        </div>
                        )}

                        <div className="screens_wrap">

                            <h2 className="section_title">Комментарии</h2>

                            <div className="comments_section_wrap">
                                <div className="comment_add_wrap">
                                    <PostInput
                                        avatarUrl={useUserStore.getState().user?.avatar || ''}
                                        placeholder="Написать комментарий..."
                                        onPostSubmit={(text) => { setNewComment(text); onAddComment(); }}
                                    />
                                    <label className="comment_spoiler_under">
                                        <input
                                            type="checkbox"
                                            checked={isSpoiler}
                                            onChange={(e) => setIsSpoiler(e.target.checked)}
                                        />
                                        Спойлер
                                    </label>
                                </div>

                                <div className="comments_section">
                                    {currentReleaseComments.data?.map(comment => comment.id && (
                                        <Comment key={comment.id} type={'release'} comment={comment}/>
                                    ))}
                                </div>

                            </div>

                        </div>


                    </div>

                <div className="recommends_and_related_block">
                        {(() => {
                            const relatedList = Array.isArray(release.related_releases)
                                ? release.related_releases
                                : Array.isArray((release as any)?.related?.releases)
                                ? (release as any).related.releases
                                : Array.isArray((release as any)?.related)
                                ? (release as any).related
                                : [];
                            return relatedList.length > 0 ? (
                            <>
                                <h2 className="section_title">Связанные релизы</h2>
                                <div className="recommends_and_related_column">
                                    {relatedList
                                        .filter((el) => el && el.id && el.id !== release.id)
                                        .map((el) => (
                                            <ScheduleReleaseCard key={el.id} release={el} />
                                        ))}
                                </div>
                            </>
                            ) : null;
                        })()}

                        <h2 className="section_title">Рекомендуем также</h2>
                        {(() => {
                            const recommendedList = Array.isArray(release.recommended_releases)
                                ? release.recommended_releases
                                : Array.isArray((release as any)?.recommended)
                                ? (release as any).recommended
                                : [];
                            return recommendedList.length > 0 ? (
                            <div className="recommends_and_related_column">
                                {recommendedList
                                    .filter((el) => el && el.id)
                                    .map((el) => (
                                        <ScheduleReleaseCard key={el.id} release={el} />
                                    ))}
                            </div>
                            ) : (
                                'Упс, таких нет'
                            );
                        })()}
                    </div>

                </div>

            
            </div> 
        </div>
    )
}