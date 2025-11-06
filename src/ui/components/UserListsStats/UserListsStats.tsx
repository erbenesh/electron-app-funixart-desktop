import { useMemo } from 'react';
import type { Release } from '#/types/entities';
import styles from './UserListsStats.module.css';

interface UserListsStatsProps {
    release: Release;
}

export const UserListsStats = ({ release }: UserListsStatsProps) => {
    const stats = useMemo(() => {
        const watching = release.watching_count || 0;
        const planned = release.plan_count || 0;
        const onHold = release.hold_on_count || 0;
        const dropped = release.dropped_count || 0;
        const completed = release.completed_count || 0;

        const total = watching + planned + onHold + dropped + completed;

        if (total === 0) {
            return null;
        }

        return {
            watching,
            planned,
            onHold,
            dropped,
            completed,
            total,
            watchingPercent: (watching / total) * 100,
            plannedPercent: (planned / total) * 100,
            onHoldPercent: (onHold / total) * 100,
            droppedPercent: (dropped / total) * 100,
            completedPercent: (completed / total) * 100,
        };
    }, [release]);

    if (!stats) {
        return null;
    }

    const formatNumber = (num: number) => {
        return num.toLocaleString('ru-RU');
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>В списках у людей</h2>

            {/* Progress bar */}
            <div className={styles.progressBar}>
                {stats.watchingPercent > 0 && (
                    <div
                        className={styles.progressSegment}
                        style={{
                            width: `${stats.watchingPercent}%`,
                            backgroundColor: 'rgb(26, 212, 85)',
                        }}
                    />
                )}
                {stats.plannedPercent > 0 && (
                    <div
                        className={styles.progressSegment}
                        style={{
                            width: `${stats.plannedPercent}%`,
                            backgroundColor: 'rgb(140, 119, 197)',
                        }}
                    />
                )}
                {stats.completedPercent > 0 && (
                    <div
                        className={styles.progressSegment}
                        style={{
                            width: `${stats.completedPercent}%`,
                            backgroundColor: 'rgb(91, 93, 207)',
                        }}
                    />
                )}
                {stats.onHoldPercent > 0 && (
                    <div
                        className={styles.progressSegment}
                        style={{
                            width: `${stats.onHoldPercent}%`,
                            backgroundColor: 'rgb(233, 196, 47)',
                        }}
                    />
                )}
                {stats.droppedPercent > 0 && (
                    <div
                        className={styles.progressSegment}
                        style={{
                            width: `${stats.droppedPercent}%`,
                            backgroundColor: 'rgb(231, 115, 80)',
                        }}
                    />
                )}
            </div>

            {/* Legend */}
            <div className={styles.legend}>
                {stats.watching > 0 && (
                    <div className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: 'rgb(26, 212, 85)' }}
                        />
                        <span className={styles.legendText}>
                            Смотрю {formatNumber(stats.watching)}
                        </span>
                    </div>
                )}
                {stats.planned > 0 && (
                    <div className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: 'rgb(140, 119, 197)' }}
                        />
                        <span className={styles.legendText}>
                            В планах {formatNumber(stats.planned)}
                        </span>
                    </div>
                )}
                {stats.completed > 0 && (
                    <div className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: 'rgb(91, 93, 207)' }}
                        />
                        <span className={styles.legendText}>
                            Просмотрено {formatNumber(stats.completed)}
                        </span>
                    </div>
                )}
                {stats.onHold > 0 && (
                    <div className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: 'rgb(233, 196, 47)' }}
                        />
                        <span className={styles.legendText}>
                            Отложено {formatNumber(stats.onHold)}
                        </span>
                    </div>
                )}
                {stats.dropped > 0 && (
                    <div className={styles.legendItem}>
                        <div
                            className={styles.legendDot}
                            style={{ backgroundColor: 'rgb(231, 115, 80)' }}
                        />
                        <span className={styles.legendText}>
                            Брошено {formatNumber(stats.dropped)}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

