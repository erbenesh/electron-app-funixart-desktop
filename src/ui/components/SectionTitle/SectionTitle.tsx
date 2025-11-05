import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from 'ui-kit/components/Typography/Title';
import { IoChevronForward } from 'react-icons/io5';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
    children: React.ReactNode;
    link?: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, link, level = 2 }) => {
    const navigate = useNavigate();

    if (!link) {
        return <Title level={level}>{children}</Title>;
    }

    return (
        <div 
            className={styles.section_title_wrapper}
            onClick={() => navigate(link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(link);
                }
            }}
        >
            <Title level={level} className={styles.section_title}>
                {children}
            </Title>
            <IoChevronForward className={styles.section_title_icon} />
        </div>
    );
};

