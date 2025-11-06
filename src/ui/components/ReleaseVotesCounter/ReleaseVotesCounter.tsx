import { useEffect, useRef, useState } from 'react'
import { IoStar, IoStarOutline } from 'react-icons/io5'
import { numberDeclension } from '../../api/utils'
import styles from './ReleaseVotesCounter.module.css'
import Chart from 'chart.js/auto'
import { releaseService } from '#/api/ReleaseService'
import { useUserStore } from '#/auth/store/auth'

interface ReleaseVotesCounterProps {
    release: any;
    onVoteSuccess?: () => void;
}

export const ReleaseVotesCounter = ({ release, onVoteSuccess }: ReleaseVotesCounterProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    // @ts-ignore - Chart type from chart.js
    const chartRef = useRef<typeof Chart | null>(null)
    const [hoveredStar, setHoveredStar] = useState<number | null>(null)
    const [isVoting, setIsVoting] = useState(false)
    const token = useUserStore((state) => state.token)

    useEffect(() => {
        if (!canvasRef.current || !release) return
        // Destroy previous instance (hot reload / rerender)
        if (chartRef.current) {
            chartRef.current.destroy()
            chartRef.current = null
        }

        const votes = [
            release.vote_5_count || 0,
            release.vote_4_count || 0,
            release.vote_3_count || 0,
            release.vote_2_count || 0,
            release.vote_1_count || 0,
        ]

        chartRef.current = new Chart(canvasRef.current, {
            type: 'bar',
            data: {
                labels: ['5', '4', '3', '2', '1'],
                datasets: [
                    {
                        label: 'Голоса',
                        data: votes,
                        backgroundColor: 'rgba(189, 78, 44, 0.8)',
                        borderRadius: 8,
                        maxBarThickness: 18,
                    },
                ],
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        ticks: { color: 'rgb(200,200,200)' },
                        grid: { color: 'rgba(255,255,255,0.08)' },
                    },
                    y: {
                        ticks: { color: 'rgb(200,200,200)' },
                        grid: { display: false },
                    },
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: ctx => `${ctx.raw as number} ${numberDeclension(ctx.raw as number, 'голос', 'голоса', 'голосов')}`,
                        },
                    },
                },
                animation: { duration: 300 },
            },
        })

        return () => { chartRef.current?.destroy(); chartRef.current = null }
    }, [release])

    const handleVote = async (rating: number) => {
        if (!token || isVoting) return
        
        setIsVoting(true)
        try {
            await releaseService.voteRelease(release.id, rating, token)
            onVoteSuccess?.()
        } catch (error) {
            console.error('Failed to vote:', error)
        } finally {
            setIsVoting(false)
        }
    }

    const userVote = release.your_vote || release.my_vote || 0

    return (
        <div className={styles.rate}>
            <div className={styles.rating_panels}>
                <div className={styles.big_rate_number}>
                    <p className={styles.grade_number}>{String(release.grade).slice(0,4)}</p>
                    <p className={styles.votes_count}>
                        {release.vote_count.toLocaleString('ru-RU')} {numberDeclension(release.vote_count, 'голос', 'голоса', 'голосов')}
                    </p>
                </div>
                <div style={{ width: '100%', minHeight: '140px' }}>
                    <canvas ref={canvasRef} />
                </div>
            </div>

            {/* Star rating */}
            {token && (
                <div className={styles.starRating}>
                    <div className={styles.starRow}>
                        {[1, 2, 3, 4, 5].map((star) => {
                            const isFilled = hoveredStar !== null ? star <= hoveredStar : star <= userVote
                            return (
                                <button
                                    key={star}
                                    className={styles.starButton}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    onMouseLeave={() => setHoveredStar(null)}
                                    onClick={() => handleVote(star)}
                                    disabled={isVoting}
                                    type="button"
                                >
                                    {isFilled ? (
                                        <IoStar className={styles.starIcon} />
                                    ) : (
                                        <IoStarOutline className={styles.starIcon} />
                                    )}
                                </button>
                            )
                        })}
                    </div>
                    {userVote > 0 && (
                        <p className={styles.userVoteText}>
                            Ваша оценка: {userVote}
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}