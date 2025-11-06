import { useNavigate } from 'react-router-dom';
import styles from './InterestingCard.module.css';

interface InterestingItem {
    id?: number;
    title?: string;
    title_ru?: string;
    title_original?: string;
    image?: string;
    description?: string;
    type?: number; // 1 = release, 2 = collection
    action?: string; // ID as string
    [key: string]: any;
}

interface InterestingCardProps {
    release: InterestingItem;
}

export const InterestingCard = ({ release }: InterestingCardProps) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!release) return;

        // Определяем путь на основе type
        if (release.type === 1 && release.action) {
            // Тип 1 - переход на релиз
            navigate(`/release/${release.action}`);
        } else if (release.type === 2 && release.action) {
            // Тип 2 - переход на коллекцию
            navigate(`/collection/${release.action}`);
        } else if (release.id) {
            // Fallback - если нет type, используем старую логику
            navigate(`/release/${release.id}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    if (!release) return null;

    const getAriaLabel = () => {
        const title = release.title_ru || release.title || release.title_original || '';
        const typeLabel = release.type === 2 ? 'коллекция' : 'релиз';
        return `${title} - ${typeLabel}`;
    };

    return (
        <div 
            className={styles.card}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={getAriaLabel()}
        >
            {/* Image section */}
            <div className={styles.image_container}>
                <img 
                    className={styles.card_image}
                    src={release.image} 
                    alt={release.title_ru || release.title || 'Release'} 
                    loading="lazy"
                />
            </div>

            {/* Text content section - separate from image */}
            <div className={styles.card_content}>
                <h3 className={styles.card_title}>
                    {release.title_ru || release.title}
                </h3>
                {release.description && (
                    <p className={styles.card_description}>
                        {release.description}
                    </p>
                )}
            </div>
        </div>
    );
};

