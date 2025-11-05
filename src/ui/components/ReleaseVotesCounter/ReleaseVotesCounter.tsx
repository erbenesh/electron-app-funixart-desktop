import { useEffect, useRef } from 'react'
import { numberDeclension } from '../../api/utils'
import styles from './ReleaseVotesCounter.module.css'
import Chart from 'chart.js/auto'

export const ReleaseVotesCounter = (props) => {
    const { release } = props
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    // @ts-ignore - Chart type from chart.js
    const chartRef = useRef<typeof Chart | null>(null)

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

    return (
        <div className={styles.rate}>
            <div className={styles.rating_panels}>
                <div className={styles.big_rate_number}>
                    <p className={styles.grade_number}>{String(release.grade).slice(0,3)}</p>
                    <p className={styles.votes_count}>{release.vote_count} {numberDeclension(release.vote_count, 'голос', 'голоса', 'голосов')}</p>
                </div>
                <div style={{ width: '100%', minHeight: '140px' }}>
                    <canvas ref={canvasRef} />
                </div>
            </div>
        </div>
    )
}