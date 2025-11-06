import { VideoCategoryCard } from '#/components/VideoCategoryCard/VideoCategoryCard';
import Carousel from 'ui-kit/components/Carousel/Carousel';
import styles from './ReleaseVideosSection.module.css';

interface VideoCategory {
    id: string;
    name: string;
    videos: any[];
    isNew?: boolean;
}

interface ReleaseVideosSectionProps {
    categories: VideoCategory[];
    lastVideos?: any[];
}

export const ReleaseVideosSection = ({ 
    categories,
    lastVideos = []
}: ReleaseVideosSectionProps) => {
    // Filter categories with videos
    let categoriesWithVideos = categories.filter(cat => cat.videos.length > 0);

    // Add "more videos" as a special category if lastVideos exist
    if (lastVideos.length > 0) {
        categoriesWithVideos = [
            ...categoriesWithVideos,
            {
                id: 'more-videos',
                name: 'Еще видео',
                videos: lastVideos,
            }
        ];
    }

    if (categoriesWithVideos.length === 0) {
        return null;
    }

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <h2 className={styles.title}>Видео</h2>
            </div>

            {/* Category cards carousel */}
            <Carousel showArrows desktopColumns={1} mobilePeek={0.12} gap={12}>
                {categoriesWithVideos.map((category) => (
                    <VideoCategoryCard
                        key={category.id}
                        categoryName={category.name}
                        categoryId={category.id}
                        previewImage={category.videos[0]?.image}
                        videoCount={category.videos.length}
                    />
                ))}
            </Carousel>
        </div>
    );
};

