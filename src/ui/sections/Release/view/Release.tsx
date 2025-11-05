import '../styles/Release.css';

import interestCardStyles from "#/components/InterestingCard/InterestingCard.module.css";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { BsCollectionPlay } from "react-icons/bs";
import { GoHash } from "react-icons/go";
import { GrGroup } from "react-icons/gr";
import { IoIosArrowDown } from 'react-icons/io';
import { IoBookmark, IoBookmarkOutline, IoCalendarOutline, IoChatbubbleOutline, IoEllipsisVertical, IoPlayCircle } from "react-icons/io5";
import { LuFlag } from "react-icons/lu";
import { useNavigate, useParams } from 'react-router-dom';

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
import Carousel from 'ui-kit/components/Carousel/Carousel';
import { Container } from 'ui-kit/components/Container/Container';
import { HorizontalList } from 'ui-kit/components/HorizontalList/HorizontalList';
import { Flex } from 'ui-kit/components/Layout/Flex';
import { Lightbox } from 'ui-kit/components/Lightbox/Lightbox';
import { Page } from 'ui-kit/components/Page/Page';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';

export const Release = () => {

    const { releaseId } = useParams();
    const navigate = useNavigate();

    const token = useUserStore((state) => state.token);

    const [ isDescriptionHidden, setDescriptionHidden ] = useState(true);

    const [ textLineCount, setTextLineCount] = useState(0);

    const [ screensIndex, setScreensIndex ] = useState(0);
    const [ videosIndex, setVideosIndex ] = useState(0);

    const [ isDropdownListsHidden, setIsDropdownListsHidden ] = useState(false);
    const [ isMenuOpen, setIsMenuOpen ] = useState(false);
    const [ newComment, setNewComment ] = useState('');
    const [ isSpoiler, setIsSpoiler ] = useState(false);
    const [ trailerUrl, setTrailerUrl ] = useState<string | null>(null);
    const [ lightboxSrc, setLightboxSrc ] = useState<string | null>(null);

    const textInput = useRef(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    

    const currentRelease = useGetCurrentRelease({ id: releaseId, token });
    const reportRelease = useReportRelease();

    const release = currentRelease.data?.release;

    // Video data is provided by video/release/:id endpoint below
    // We'll compute blocks and lists after that query resolves
    let trailersList: any[] = [];
    let previewsList: any[] = [];
    let openingsList: any[] = [];
    let endingsList: any[] = [];
    let clipsList: any[] = [];
    let lastVideos: any[] = [];

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
        // keep full payload: { code, release, blocks, last_videos }
    });

    const videosPayload = releaseVideos.data as any;
    const releaseBlocks = videosPayload?.blocks || [];
    const findBlock = (id: number, nameRe: RegExp) => releaseBlocks.find((b: any) => b?.category?.id === id || nameRe.test(b?.category?.name || ''));
    if (Array.isArray(releaseBlocks) && releaseBlocks.length) {
        trailersList = findBlock(1, /трейлер/i)?.videos || [];
        previewsList = findBlock(2, /превью/i)?.videos || [];
        openingsList = findBlock(3, /опенинг/i)?.videos || [];
        endingsList = findBlock(4, /эндинг/i)?.videos || [];
        clipsList = findBlock(5, /клип/i)?.videos || [];
    }
    lastVideos = Array.isArray(videosPayload?.last_videos) ? videosPayload.last_videos : [];

    // Arrays used by carousels
    const trailersListResolved = trailersList;
    const previewsListResolved = previewsList;
    const openingsListResolved = openingsList;
    const endingsListResolved = endingsList;
    const clipsListResolved = clipsList;
    const lastVideosResolved = lastVideos;

    useEffect(() => {
        // Debug logs for release video blocks and resolved arrays
        // eslint-disable-next-line no-console
        console.groupCollapsed('[Release page] Video data debug');
        // eslint-disable-next-line no-console
        console.log('blocks:', releaseBlocks);
        // eslint-disable-next-line no-console
        console.log('last_videos:', lastVideos);
        // eslint-disable-next-line no-console
        console.log('releaseVideos payload:', videosPayload);
        // eslint-disable-next-line no-console
        console.log('trailers:', trailersListResolved?.length, trailersListResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.log('previews:', previewsListResolved?.length, previewsListResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.log('openings:', openingsListResolved?.length, openingsListResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.log('endings:', endingsListResolved?.length, endingsListResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.log('clips:', clipsListResolved?.length, clipsListResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.log('lastVideosResolved:', lastVideosResolved?.length, lastVideosResolved?.slice(0, 2));
        // eslint-disable-next-line no-console
        console.groupEnd();
    }, [releaseBlocks, lastVideos, videosPayload, trailersListResolved, previewsListResolved, openingsListResolved, endingsListResolved, clipsListResolved, lastVideosResolved]);

    const { add: addFavorite, remove: deleteFavorite } = useFavoriteReleaseMutations({
        releaseId: releaseId,
        token: token,
    });

    const fetchAddToList = useAddToBookmarkList({ releaseId: releaseId, token: token });

    // Close profile-lists dropdown on outside click
    const listsRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(listsRef, () => setIsDropdownListsHidden(false));
    
    // Close menu dropdown on outside click
    useClickOutside(menuRef, () => setIsMenuOpen(false));

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
        <Page topOffset="md">
        <Container>
        { currentRelease.isPending || !release ? (
            <Flex align="center" justify="center" style={{ minHeight: 240 }}>
                <Spinner />
            </Flex>
        ) : (
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
                                    
                                        <ReleasePlayer />
                                    
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
                                    {/* Titles */}
                                    <div className="release_titles">
                                        <h1 className="release_title">{release.title_ru}</h1>
                                        <p className="release_title_alt">{release.title_original}</p>
                                        {release.age_rating && (
                                            <span className="age_rating">{release.age_rating}+</span>
                                        )}
                                    </div>

                                    {/* Compact action row */}
                                    <div className="release_action_row">
                                        <div ref={listsRef} className="status_button_wrap">
                                            <button 
                                                className="status_button" 
                                                onClick={() => setIsDropdownListsHidden(!isDropdownListsHidden)} 
                                                style={release.profile_list_status ? {
                                                    borderColor: `${profile_lists[release.profile_list_status].bg_color}`, 
                                                    color: `${profile_lists[release.profile_list_status].bg_color}`
                                                } : {}}
                                                type='button'
                                            >
                                                <IoIosArrowDown />
                                                <span>{release.profile_list_status ? profile_lists[release.profile_list_status].name : "Не смотрю"}</span>
                                            </button>
                                            <div className="dropdown_lists" style={isDropdownListsHidden ? {display: "flex"} : {}}>
                                                {lists.map(li => li.name !== profile_lists[release.profile_list_status]?.name && (
                                                    <button key={li.list} className="info_button_list" onClick={() => addToList(li.list)} type='button'>
                                                        {li.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <button className="icon_button" onClick={() => addToFavorite()} type='button' title="В закладки">
                                            {release.is_favorite ? <IoBookmark /> : <IoBookmarkOutline />}
                                            <span className="icon_button_text">
                                                {release.favorites_count > 999 
                                                    ? `${(release.favorites_count / 1000).toFixed(0)}K` 
                                                    : release.favorites_count}
                                            </span>
                                        </button>
                                        
                                        <button className="icon_button" type='button' title="Комментарии">
                                            <IoChatbubbleOutline />
                                        </button>
                                    </div>

                                    {/* Big action button - Watch or Year announcement */}
                                    <div className="watch_button_row">
                                        {release.status?.name === "Анонс" ? (
                                            /* Для анонсов - кнопка с годом */
                                            <button 
                                                className="year_button" 
                                                type="button"
                                                disabled
                                            >
                                                <span>{release.year || new Date().getFullYear()} ГОД</span>
                                            </button>
                                        ) : (
                                            /* Для остальных - кнопка "Смотреть" */
                                            <button 
                                                className="watch_button" 
                                                type="button"
                                                onClick={() => navigate(`/release/${releaseId}/watch/episode`)}
                                            >
                                                <IoPlayCircle className="play_icon" />
                                                <span>Смотреть</span>
                                            </button>
                                        )}
                                        
                                        <div ref={menuRef} className="menu_button_wrap">
                                            <button 
                                                className="menu_button" 
                                                type='button' 
                                                title="Еще"
                                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                            >
                                                <IoEllipsisVertical />
                                            </button>
                                            {isMenuOpen && (
                                                <div className="menu_dropdown">
                                                    <button className="menu_item" type='button'>
                                                        Показать в коллекциях
                                                    </button>
                                                    <button className="menu_item" type='button'>
                                                        Добавить в коллекцию
                                                    </button>
                                                    <button className="menu_item" type='button' onClick={onReportRelease}>
                                                        Пожаловаться
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info banner for announcements */}
                                    {release.status?.name === "Анонс" && (
                                        <div className="info_banner">
                                            <p>Премьера в {release.year} году.</p>
                                            <p>Больше подробностей сообщат позже.</p>
                                        </div>
                                    )}

                                    </div>
                                    <div className="release_info_table">
                                        {/* Страна и год */}
                                        <div className="info_row">
                                            <div className="info_icon">
                                                <img src={release.country === "Япония" ? jFlag : release.country === "Китай" ? cnFlag : ""} alt="" />
                                                {release.country !== "Япония" && release.country !== "Китай" && <LuFlag className="mini_ico"/>}
                                            </div>
                                            <div className="info_text">
                                                {release.country && release.country}
                                                {(release.aired_on_date != 0 || release.year) && ", "}
                                                {release.aired_on_date != 0 &&
                                                    `${getSeasonFromUnix(release.aired_on_date)} `}
                                                {release.year && `${release.year} г.`}
                                            </div>
                                        </div>

                                        {/* Эпизоды */}
                                        <div className="info_row">
                                            <div className="info_icon">
                                                <BsCollectionPlay className="mini_ico"/>
                                            </div>
                                            <div className="info_text">
                                                {release.episodes_released ? release.episodes_released : "?"}
                                                {"/"}
                                                {release.episodes_total ? release.episodes_total + " эп. " : "? эп. "}
                                                {release.duration != 0 && `по ${minutesToTime(release.duration, "daysHours")}`}
                                            </div>
                                        </div>

                                        {/* Категория и расписание */}
                                        <div className="info_row">
                                            <div className="info_icon">
                                                <IoCalendarOutline className="mini_ico"/>
                                            </div>
                                            <div className="info_text">
                                                { release.category?.name + ", " }
                                                { release.broadcast === 0
                                                    ? release.status.name
                                                    : `выходит ${weekDay[release.broadcast]}` }
                                            </div>
                                        </div>

                                        {/* Студия, автор, режиссёр */}
                                        <div className="info_row">
                                            <div className="info_icon">
                                                <GrGroup className="mini_ico"/>
                                            </div>
                                            <div className="info_text">
                                                {release.studio && (
                                                <>
                                                {"Студия "}
                                                {release.studio
                                                    .split(", ")
                                                    .map((studio: string, index: number) => {
                                                        return (
                                                            <span key={index}>
                                                            {index > 0 && ", "}
                                                            <a>{studio}</a>
                                                            </span>
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
                                            </div>
                                        </div>
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

                        {/* User lists section */}
                        {release.watching_count > 0 && (
                            <div className="user_lists_section">
                                <h2 className="section_title">В списках у людей</h2>
                                <div className="user_stat_row">
                                    <IoCalendarOutline className="stat_icon" />
                                    <p className="stat_text">
                                        {release.watching_count.toLocaleString('ru-RU')} {
                                            release.status?.name === "Анонс" 
                                                ? "пользователей планируют смотреть этот релиз" 
                                                : "пользователей смотрят этот релиз"
                                        }
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Rating section */}
                        {release.vote_count > 0 && (
                            <div className="rating_section">
                                <h2 className="section_title">Оценки</h2>
                                <ReleaseVotesCounter release={release}/>
                            </div>
                        )}

                        { release?.screenshot_images?.length > 0 && (
                        <div className="screens_wrap">
                            <h2 className="section_title">Кадры</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {release.screenshot_images.map((screen: string) => (
                                    <img key={screen} className="release_screen_img" src={screen} alt="screenshot" onClick={() => setLightboxSrc(screen)} />
                                ))}
                            </Carousel>
                        </div>)}


                        {/* Trailers section rendered below with data guard */}

                        <div className="screens_wrap">
                            <h2 className="section_title">Трейлеры</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {trailersListResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        <div className="screens_wrap">
                            <h2 className="section_title">Клипы</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {clipsListResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        <div className="screens_wrap">
                            <h2 className="section_title">Превью</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {previewsListResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        <div className="screens_wrap">
                            <h2 className="section_title">Опенинги</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {openingsListResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        <div className="screens_wrap">
                            <h2 className="section_title">Эндинги</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {endingsListResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        <div className="screens_wrap">
                            <h2 className="section_title">Последние видео</h2>
                            <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                                {lastVideosResolved.map((video: any) => (
                                    <img key={video.id} className={`${interestCardStyles.release_image} release_trailer_img`} src={video.image} alt={video.title || ''} onClick={() => setTrailerUrl(video.player_url || video.url)} />
                                ))}
                            </Carousel>
                        </div>

                        {lightboxSrc && <Lightbox open={true} src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
                        {trailerUrl && (
                          <Lightbox open={true} onClose={() => setTrailerUrl(null)}>
                            <iframe className="video_iframe" src={trailerUrl} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
                          </Lightbox>
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
                                <HorizontalList>
                                    {relatedList.filter((el) => el && el.id && el.id !== release.id).map((el) => (
                                        <ScheduleReleaseCard key={el.id} release={el} />
                                    ))}
                                </HorizontalList>
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
                            <HorizontalList>
                                {recommendedList.filter((el) => el && el.id).map((el) => (
                                    <ScheduleReleaseCard key={el.id} release={el} />
                                ))}
                            </HorizontalList>
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
        </Container>
        </Page>
    )
}