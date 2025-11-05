import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

interface ProfileVotesChartProps {
  votedReleases: any;
}

export function ProfileVotesChart({ votedReleases }: ProfileVotesChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // @ts-ignore - Chart type
  const chartRef = useRef<typeof Chart | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !votedReleases?.content) return;

    // Destroy previous instance
    if (chartRef.current) {
      chartRef.current.destroy();
      chartRef.current = null;
    }

    // Count votes by rating
    const voteCounts = [0, 0, 0, 0, 0];
    let total = 0;

    votedReleases.content.forEach((release: any) => {
      if (release.vote && release.vote >= 1 && release.vote <= 5) {
        voteCounts[release.vote - 1]++;
        total++;
      }
    });

    setTotalCount(total);

    // Create chart
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['1★', '2★', '3★', '4★', '5★'],
        datasets: [{
          label: 'Оценки',
          data: voteCounts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 159, 64, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(54, 162, 235, 0.5)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
          ],
          borderWidth: 1,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `Распределение оценок (всего: ${total})`,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [votedReleases]);

  if (!votedReleases?.content || votedReleases.content.length === 0) {
    return null;
  }

  return (
    <div className="profile-votes-chart">
      <canvas ref={canvasRef} height={300} />
    </div>
  );
}

