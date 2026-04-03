const HANGING = [
  { id: 1, plant: 'Basil', emoji: '🌿', color: '#16a34a' },
  { id: 2, plant: 'Basil', emoji: '🌿', color: '#16a34a' },
  { id: 3, plant: 'Herbs', emoji: '🌱', color: '#15803d' },
  { id: 4, plant: 'Lettuce', emoji: '🥬', color: '#4ade80' },
]

export function HangingPotsGrid() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 340 130" className="w-full" role="img" aria-label="Hanging pots layout">
        {/* Gazebo beam */}
        <rect x="10" y="8" width="320" height="8" rx="4" fill="#78350f" opacity="0.7" />
        <text x="170" y="7" fontSize="9" textAnchor="middle" fill="#78350f"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="600">GAZEBO BEAM</text>

        {HANGING.map((h, i) => {
          const cx = 42 + i * 78
          return (
            <g key={h.id}>
              {/* Chain/cord */}
              <line x1={cx} y1="16" x2={cx} y2="36" stroke="#9ca3af" strokeWidth="1.5"
                strokeDasharray="3,2" />
              {/* Pot */}
              <ellipse cx={cx} cy={36} rx={24} ry={6} fill={h.color} opacity="0.2" />
              <path d={`M${cx - 22},${36} Q${cx - 26},${90} ${cx - 18},${96} L${cx + 18},${96} Q${cx + 26},${90} ${cx + 22},${36} Z`}
                fill={h.color} opacity="0.15" stroke={h.color} strokeWidth="1.5" />
              <ellipse cx={cx} cy={36} rx={22} ry={6}
                fill={h.color} opacity="0.25" stroke={h.color} strokeWidth="1.5" />
              {/* Plant */}
              <text x={cx} y={75} fontSize="24" textAnchor="middle">{h.emoji}</text>
              {/* Label */}
              <text x={cx} y={112} fontSize="11" textAnchor="middle" fill="#374151"
                fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                {h.plant}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
        Herbs: oregano, thyme, cilantro · Zone 4 drip irrigation
      </p>
    </div>
  )
}
