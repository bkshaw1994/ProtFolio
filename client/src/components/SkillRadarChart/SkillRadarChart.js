import React, { useState } from 'react';
import { motion } from 'framer-motion';

const defaultCategories = [
  { name: 'Frontend Dev', score: 95, color: '#38bdf8' },
  { name: 'Backend & APIs', score: 92, color: '#6366f1' },
  { name: 'Database & ORM', score: 88, color: '#10b981' },
  { name: 'Cloud & DevOps', score: 85, color: '#f59e0b' },
  { name: 'System Design', score: 90, color: '#ec4899' },
  { name: 'Testing & CI/CD', score: 87, color: '#8b5cf6' }
];

const SkillRadarChart = () => {
  const [activeIdx, setActiveIdx] = useState(null);

  const size = 300;
  const center = size / 2;
  const radius = 110;
  const total = defaultCategories.length;

  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string
  const points = defaultCategories
    .map((cat, i) => {
      const { x, y } = getCoordinates(i, cat.score);
      return `${x},${y}`;
    })
    .join(' ');

  // Web background concentric polygons (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl flex flex-col items-center">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-slate-900">
          Domain Proficiency Radar
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Interactive proficiency breakdown across core software engineering domains
        </p>
      </div>

      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Concentric Grid Web */}
          {levels.map((level, lIdx) => {
            const levelPoints = defaultCategories
              .map((_, i) => {
                const { x, y } = getCoordinates(i, level * 100);
                return `${x},${y}`;
              })
              .join(' ');
            return (
              <polygon
                key={lIdx}
                points={levelPoints}
                className="fill-none stroke-slate-200"
                strokeWidth="1"
                strokeDasharray={lIdx === levels.length - 1 ? 'none' : '3 3'}
              />
            );
          })}

          {/* Axis Spokes */}
          {defaultCategories.map((_, i) => {
            const { x, y } = getCoordinates(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                className="stroke-slate-200"
                strokeWidth="1"
              />
            );
          })}

          {/* Radar Filled Polygon */}
          <motion.polygon
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            points={points}
            className="fill-primary-500/20 stroke-primary-500"
            strokeWidth="2.5"
          />

          {/* Data Points & Labels */}
          {defaultCategories.map((cat, i) => {
            const { x, y } = getCoordinates(i, cat.score);
            const labelCoords = getCoordinates(i, 122);
            const isHovered = activeIdx === i;

            return (
              <g key={i} onMouseEnter={() => setActiveIdx(i)} onMouseLeave={() => setActiveIdx(null)}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : 5}
                  className="fill-white stroke-primary-500 cursor-pointer transition-all duration-200"
                  strokeWidth="2.5"
                />
                <text
                  x={labelCoords.x}
                  y={labelCoords.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-[11px] font-semibold transition-all duration-200 ${
                    isHovered
                      ? 'fill-primary-600 font-bold'
                      : 'fill-slate-600'
                  }`}
                >
                  {cat.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active Category Legend Footer */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full">
        {defaultCategories.map((cat, i) => (
          <div
            key={i}
            onMouseEnter={() => setActiveIdx(i)}
            onMouseLeave={() => setActiveIdx(null)}
            className={`px-3 py-2 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition-all ${
              activeIdx === i
                ? 'bg-primary-50 border-primary-500 text-primary-600 shadow-sm'
                : 'bg-slate-50 border-slate-200/60 text-slate-700'
            }`}
          >
            <span className="font-medium truncate">{cat.name}</span>
            <span className="font-bold ml-1">{cat.score}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillRadarChart;
