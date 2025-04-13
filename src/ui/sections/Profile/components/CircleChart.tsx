import React from 'react';
import './CircleChart.module.css';

interface ChartSegment {
  color: string;
  value: number;
  label?: string;
}

interface CircleChartProps {
  segments: ChartSegment[];
  size?: number;
  strokeWidth?: number;
  gapSize?: number;
  showLabels?: boolean;
}

export const CircleChart: React.FC<CircleChartProps> = ({
  segments,
  size = 200,
  strokeWidth = 20,
  gapSize = 2,
  showLabels = false,
}) => {
  // Фильтруем нулевые значения и вычисляем общую сумму
  const validSegments = segments.filter(s => s.value > 0);
  const totalValue = validSegments.reduce((sum, segment) => sum + segment.value, 0);

  // Если нет данных, показываем серый круг
  if (totalValue === 0) {
    return (
      <div className="circle-chart-container" style={{ width: size, height: size }}>
        <svg viewBox="0 0 100 100" className="circle-chart">
          <circle
            cx="50"
            cy="50"
            r={50 - strokeWidth / 2}
            fill="none"
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
          />
        </svg>
      </div>
    );
  }

  // Рассчитываем углы для каждого сегмента
  const calculateAngles = () => {
    const angles = [];
    let currentAngle = -90; // Начинаем с верхней точки (-90 градусов)
    
    for (let i = 0; i < validSegments.length; i++) {
      const segment = validSegments[i];
      const segmentAngle = (segment.value / totalValue) * 360;
      const adjustedAngle = i < validSegments.length - 1 
        ? segmentAngle - gapSize 
        : segmentAngle;
      
      angles.push({
        startAngle: currentAngle,
        endAngle: currentAngle + adjustedAngle,
        color: segment.color,
      });
      
      currentAngle += segmentAngle;
    }
    
    return angles;
  };

  const angles = calculateAngles();
  const radius = 50 - strokeWidth / 2;

  // Генерируем path для сегмента
  const getSegmentPath = (startAngle: number, endAngle: number) => {
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 50 + radius * Math.cos(startRad);
    const y1 = 50 + radius * Math.sin(startRad);
    const x2 = 50 + radius * Math.cos(endRad);
    const y2 = 50 + radius * Math.sin(endRad);
    
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
    
    return `M 50 50 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="circle-chart-container" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className="circle-chart">
        {angles.map((angle, i) => (
          <path
            key={i}
            d={getSegmentPath(angle.startAngle, angle.endAngle)}
            fill={angle.color}
            stroke="none"
          />
        ))}
        
        {/* Центральный круг для создания эффекта "бублика" */}
        <circle
          cx="50"
          cy="50"
          r={radius - strokeWidth / 2}
          fill="#242424"
        />
      </svg>
    </div>
  );
};