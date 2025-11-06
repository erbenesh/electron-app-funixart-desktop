import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronForward } from 'react-icons/io5';
import Carousel from 'ui-kit/components/Carousel/Carousel';
import { VideoCard } from '#/components/VideoCard/VideoCard';
import styles from './ReleaseVideosSection.module.css';

interface VideoCategory {
    id: string;
    name: string;
    videos: any[];
    isNew?: boolean;
}

interface ReleaseVideosSectionProps {
    categories: VideoCategory[];
    onVideoClick?: (video: any) => void;
}

export const ReleaseVideosSection = ({ 
    categories, 
    onVideoClick 
}: ReleaseVideosSectionProps) => {
    const navigate = useNavigate();
    const { releaseId } = useParams();
    const [activeCategory, setActiveCategory] = useState<string>(
        categories.find(cat => cat.videos.length > 0)?.id || categories[0]?.id || ''
    );

    const activeVideos = categories.find(cat => cat.id === activeCategory)?.videos || [];

    if (categories.length === 0 || categories.every(cat => cat.videos.length === 0)) {
        return null;
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Видео</h2>
                <button 
                    className={styles.showAllButton}
                    onClick={() => navigate(`/release/${releaseId}/videos`)}
                    type="button"
                >
                    <span>Показать все</span>
                    <IoChevronForward className={styles.chevronIcon} />
                </button>
            </div>

            {/* Category buttons */}
            <div className={styles.categoryButtons}>
                {categories.map((category) => (
                    category.videos.length > 0 && (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${
                                activeCategory === category.id ? styles.categoryButtonActive : ''
                            }`}
                            onClick={() => setActiveCategory(category.id)}
                            type="button"
                        >
                            {category.name}
                            {category.isNew && (
                                <span className={styles.newBadge}>new</span>
                            )}
                        </button>
                    )
                ))}
            </div>

            {/* Videos carousel */}
            {activeVideos.length > 0 && (
                <div className={styles.videosCarousel}>
                    <Carousel showArrows desktopColumns={3} mobilePeek={0.12} gap={12}>
                        {activeVideos.map((video: any) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                onClick={() => onVideoClick?.(video)}
                            />
                        ))}
                    </Carousel>
                </div>
            )}
        </div>
    );
};

