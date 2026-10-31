import React, { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ChartPoint {
  day: string;
  value: number; // 0 to 100 (score)
  displayValue: string;
  label: string;
}

const WEEK_DATA: ChartPoint[] = [
  { day: 'Sun', value: 68, displayValue: '68 pts', label: 'Primary Literature Review' },
  { day: 'Mon', value: 82, displayValue: '82 pts', label: 'Epistemic Logic Models' },
  { day: 'Tue', value: 96, displayValue: '96 pts', label: 'Dialectical Seminar Synthesis' },
  { day: 'Wed', value: 62, displayValue: '62 pts', label: 'Peer Thesis Critique' },
  { day: 'Thu', value: 88, displayValue: '88 pts', label: 'Complex Systems Dynamics' },
  { day: 'Fri', value: 74, displayValue: '74 pts', label: 'Critical Inquiry & Writing' },
  { day: 'Sat', value: 80, displayValue: '80 pts', label: 'Weekly Scholastic Dispatch' },
];

export const InteractiveChart: React.FC<{ compact?: boolean; isDarkTheme?: boolean }> = ({
  compact = false,
  isDarkTheme = false,
}) => {
  // Default to Tuesday (96 pts) peak active point
  const [activePoint, setActivePoint] = useState<ChartPoint | null>(WEEK_DATA[2]);
  const [isManualHover, setIsManualHover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const width = 480;
  const height = compact ? 170 : 210;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 35;

  const maxValue = 100;

  const getCoordinates = (index: number, val: number) => {
    const x =
      paddingLeft +
      (index / (WEEK_DATA.length - 1)) * (width - paddingLeft - paddingRight);
    const y =
      height -
      paddingBottom -
      (val / maxValue) * (height - paddingTop - paddingBottom);
    return { x, y };
  };

  const points = WEEK_DATA.map((d, i) => getCoordinates(i, d.value));

  // Build SVG smooth cubic curve
  const pathD = points.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x} ${curr.y}`;
    const prev = arr[i - 1];
    const cp1x = prev.x + (curr.x - prev.x) / 2;
    const cp1y = prev.y;
    const cp2x = prev.x + (curr.x - prev.x) / 2;
    const cp2y = curr.y;
    return `${acc} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${
    height - paddingBottom
  } L ${points[0].x} ${height - paddingBottom} Z`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scale = width / rect.width;
    const svgX = mouseX * scale;

    let closestIndex = 0;
    let minDiff = Infinity;
    points.forEach((p, idx) => {
      const diff = Math.abs(p.x - svgX);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    setIsManualHover(true);
    setActivePoint(WEEK_DATA[closestIndex]);
  };

  const activeIndex = activePoint
    ? WEEK_DATA.findIndex((p) => p.day === activePoint.day)
    : 2;
  const activeCoord = points[activeIndex] || points[2];

  const strokeColor = isDarkTheme ? '#EDB671' : '#1e293b';
  const gridLineColor = isDarkTheme ? 'rgba(255,255,255,0.08)' : '#f1f5f9';
  const axisTextColor = isDarkTheme ? 'rgba(255,255,255,0.45)' : '#94a3b8';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsManualHover(false);
        setActivePoint(WEEK_DATA[2]); // reset to Tuesday peak
      }}
      className="relative w-full cursor-crosshair select-none overflow-visible"
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="chartGradientFill" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={isDarkTheme ? '#EDB671' : '#cbd5e1'}
              stopOpacity={isDarkTheme ? 0.3 : 0.45}
            />
            <stop
              offset="100%"
              stopColor={isDarkTheme ? '#EDB671' : '#cbd5e1'}
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>

        {/* Horizontal grid lines & Y labels (100, 75, 50, 25, 0 pts) */}
        {[100, 75, 50, 25, 0].map((lvl) => {
          const y =
            height -
            paddingBottom -
            (lvl / maxValue) * (height - paddingTop - paddingBottom);
          return (
            <g key={lvl}>
              <text
                x={paddingLeft - 10}
                y={y + 4}
                textAnchor="end"
                fill={axisTextColor}
                fontSize="10"
                fontFamily="monospace"
              >
                {lvl}
              </text>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke={gridLineColor}
                strokeWidth="1"
                strokeDasharray={lvl === 0 ? undefined : '2 2'}
              />
            </g>
          );
        })}

        {/* Vertical dotted guide line for active point */}
        {activePoint && (
          <line
            x1={activeCoord.x}
            y1={paddingTop}
            x2={activeCoord.x}
            y2={height - paddingBottom}
            stroke={isDarkTheme ? 'rgba(237, 182, 113, 0.4)' : '#94a3b8'}
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}

        {/* Shaded area under curve */}
        <path d={areaD} fill="url(#chartGradientFill)" />

        {/* Main curve stroke */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Active point marker */}
        {activePoint && (
          <g>
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="6"
              fill={isDarkTheme ? '#011936' : '#ffffff'}
              stroke={strokeColor}
              strokeWidth="2.5"
            />
            <circle
              cx={activeCoord.x}
              cy={activeCoord.y}
              r="2.5"
              fill={isDarkTheme ? '#EDB671' : '#011936'}
            />
          </g>
        )}

        {/* X-axis day labels */}
        {WEEK_DATA.map((d, i) => {
          const coord = getCoordinates(i, 0);
          const isActive = activePoint?.day === d.day;
          return (
            <text
              key={d.day}
              x={coord.x}
              y={height - 12}
              textAnchor="middle"
              fill={
                isActive
                  ? isDarkTheme
                    ? '#EDB671'
                    : '#06182E'
                  : axisTextColor
              }
              fontWeight={isActive ? '700' : '500'}
              fontSize="11"
              fontFamily="sans-serif"
            >
              {d.day}
            </text>
          );
        })}
      </svg>

      {/* Floating Tooltip following cursor / locked to active point */}
      {activePoint && (
        <motion.div
          initial={false}
          animate={{
            left: `${(activeCoord.x / width) * 100}%`,
            top: `${(activeCoord.y / height) * 100}%`,
          }}
          transition={{
            type: 'spring',
            stiffness: 450,
            damping: 32,
          }}
          className="absolute -translate-x-1/2 -translate-y-full mb-2 pointer-events-none z-30"
        >
          <div className="bg-[#06182E] text-white px-3 py-1.5 rounded-lg shadow-xl border border-white/10 flex flex-col items-center">
            <span className="font-mono font-bold text-xs tracking-tight text-[#EDB671]">
              {activePoint.displayValue}
            </span>
            <span className="text-[9px] text-white/70 whitespace-nowrap mt-0.5 font-sans">
              {activePoint.label}
            </span>
            {/* Tooltip triangle tail */}
            <div className="w-2 h-2 bg-[#06182E] rotate-45 border-r border-b border-white/10 absolute -bottom-1 left-1/2 -translate-x-1/2" />
          </div>
        </motion.div>
      )}
    </div>
  );
};
