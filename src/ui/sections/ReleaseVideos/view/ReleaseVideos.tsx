import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { releaseVideoService } from '#/api/ReleaseVideoService';
import { useGetCurrentRelease } from '#/api/hooks';
import { useUserStore } from '#/auth/store/auth';
import { VideoCard } from '#/components/VideoCard/VideoCard';
import { VideoListItem } from '#/components/VideoListItem/VideoListItem';
import { ExternalServiceButton } from '#/components/ExternalServiceButton/ExternalServiceButton';
import { Lightbox } from 'ui-kit/components/Lightbox/Lightbox';
import { Container } from 'ui-kit/components/Container/Container';
import { Page } from 'ui-kit/components/Page/Page';
import { Spinner } from 'ui-kit/components/Spinner/Spinner';
import { Flex } from 'ui-kit/components/Layout/Flex';
import Carousel from 'ui-kit/components/Carousel/Carousel';
import '../styles/ReleaseVideos.css';

export const ReleaseVideos = () => {
    const { releaseId } = useParams();
    const navigate = useNavigate();
    const token = useUserStore((state) => state.token);
    
    const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

    const currentRelease = useGetCurrentRelease({ id: releaseId, token });
    const release = currentRelease.data?.release;

    const releaseVideos = useQuery({
        queryKey: ['getReleaseVideos', releaseId, token],
        queryFn: () => releaseVideoService.getReleaseVideos(releaseId, token || undefined),
        enabled: Boolean(releaseId),
    });

    const videosPayload = releaseVideos.data as any;
    const releaseBlocks = videosPayload?.blocks || [];
    const lastVideos = Array.isArray(videosPayload?.last_videos) ? videosPayload.last_videos : [];

    const findBlock = (id: number, nameRe: RegExp) => 
        releaseBlocks.find((b: any) => b?.category?.id === id || nameRe.test(b?.category?.name || ''));

    const trailersList = findBlock(1, /трейлер/i)?.videos || [];
    const previewsList = findBlock(2, /превью/i)?.videos || [];
    const openingsList = findBlock(3, /опенинг/i)?.videos || [];
    const endingsList = findBlock(4, /эндинг/i)?.videos || [];
    const clipsList = findBlock(5, /клип/i)?.videos || [];
    const otherList = findBlock(6, /другое/i)?.videos || [];

    const handleVideoClick = (video: any) => {
        setTrailerUrl(video.player_url || video.url);
    };

    if (currentRelease.isPending || !release || releaseVideos.isPending) {
        return (
            <Page topOffset="md">
                <Container>
                    <Flex align="center" justify="center" style={{ minHeight: 240 }}>
                        <Spinner />
                    </Flex>
                </Container>
            </Page>
        );
    }

    return (
        <Page topOffset="md">
            <Container>
                <div className="release_videos_page">
                    {/* Header with back button */}
                    <div className="videos_header">
                        <button 
                            className="back_button"
                            onClick={() => navigate(`/release/${releaseId}`)}
                            type="button"
                        >
                            <IoChevronBack />
                        </button>
                    </div>

                    {/* Banner */}
                    <div className="videos_banner">
                        <img 
                            src={release.image} 
                            alt={release.title_ru} 
                            className="banner_image"
                        />
                        <div className="banner_overlay">
                            <h1 className="banner_title">Видео</h1>
                            <p className="banner_subtitle">{release.title_ru}</p>
                        </div>
                    </div>

                    {/* External services */}
                    {/* TODO: Add real external service links if available */}
                    <div className="external_services">
                        {/* These would come from API in real implementation */}
                    </div>

                    {/* Video sections */}
                    {trailersList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Трейлеры</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {trailersList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {previewsList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Превью</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {previewsList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {openingsList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Опенинги</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {openingsList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {endingsList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Эндинги</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {endingsList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {clipsList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Клипы</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {clipsList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {otherList.length > 0 && (
                        <div className="video_section">
                            <div className="section_header">
                                <h2 className="section_title">Другое</h2>
                                <button className="show_all_button" type="button">
                                    <span>Показать все</span>
                                    <IoChevronForward />
                                </button>
                            </div>
                            <Carousel showArrows desktopColumns={2} mobilePeek={0.12} gap={12}>
                                {otherList.map((video: any) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </Carousel>
                        </div>
                    )}

                    {/* Last videos */}
                    {lastVideos.length > 0 && (
                        <div className="video_section">
                            <h2 className="section_title">Последние видео</h2>
                            <div className="videos_list">
                                {lastVideos.map((video: any) => (
                                    <VideoListItem
                                        key={video.id}
                                        video={video}
                                        onClick={() => handleVideoClick(video)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {trailerUrl && (
                        <Lightbox open={true} onClose={() => setTrailerUrl(null)}>
                            <iframe 
                                className="video_iframe" 
                                src={trailerUrl} 
                                allow="autoplay; fullscreen; picture-in-picture" 
                                allowFullScreen 
                            />
                        </Lightbox>
                    )}
                </div>
            </Container>
        </Page>
    );
};

