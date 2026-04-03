const CONTAINERS = [
  { id: 1, plant: 'Tomato', note: '1 plant', color: '#dc2626' },
  { id: 2, plant: 'Tomato', note: '1 plant', color: '#dc2626' },
  { id: 3, plant: 'Pepper', note: '1–2 plants', color: '#ea580c' },
  { id: 4, plant: 'Pepper', note: '1–2 plants', color: '#ea580c' },
]

export function ContainerGrid() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 340 140" className="w-full" role="img" aria-label="Container pots layout">
        {/* Fence line */}
        <line x1="10" y1="10" x2="330" y2="10" stroke="#92400e" strokeWidth="3" strokeLinecap="round" />
        <text x="170" y="8" fontSize="9" textAnchor="middle" fill="#92400e"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="600">FENCE</text>

        {CONTAINERS.map((c, i) => {
          const cx = 42 + i * 78
          const cy = 80
          return (
            <g key={c.id}>
              {/* Pot shape */}
              <ellipse cx={cx} cy={cy + 30} rx={28} ry={8} fill={c.color} opacity="0.2" />
              <rect x={cx - 26} y={cy - 20} width={52} height={50} rx="6"
                fill={c.color} opacity="0.15" stroke={c.color} strokeWidth="2" />
              <rect x={cx - 30} y={cy - 24} width={60} height={10} rx="4"
                fill={c.color} opacity="0.3" stroke={c.color} strokeWidth="1.5" />
              {/* Plant icon */}
              <text x={cx} y={cy + 8} fontSize="22" textAnchor="middle">
                {c.plant === 'Tomato' ? '🍅' : '🫑'}
              </text>
              {/* Labels */}
              <text x={cx} y={cy + 44} fontSize="11" textAnchor="middle" fill="#374151"
                fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
                {c.plant}
              </text>
              <text x={cx} y={cy + 57} fontSize="9" textAnchor="middle" fill="#6b7280"
                fontFamily="Inter, system-ui, sans-serif">
                {c.note}
              </text>
              {/* Pot number */}
              <text x={cx} y={cy - 17} fontSize="9" textAnchor="middle" fill={c.color}
                fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                Pot {c.id}
              </text>
            </g>
          )
        })}
      </svg>
      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-1">
        18–24&quot; tall/diameter pots · Zone 3 drip irrigation
      </p>
    </div>
  )
}
