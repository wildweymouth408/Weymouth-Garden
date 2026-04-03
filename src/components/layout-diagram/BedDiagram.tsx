interface Row {
  label: string
  plant: string
  variety: string
  color: string
  timing: string
}

interface BedDiagramProps {
  rows: Row[]
}

export function BedDiagram({ rows }: BedDiagramProps) {
  const rowHeight = 44
  const svgHeight = rows.length * rowHeight + 20
  const width = 340

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${svgHeight}`}
        className="w-full"
        style={{ maxHeight: 220 }}
        role="img"
        aria-label="Raised bed layout diagram"
      >
        {/* Bed outline */}
        <rect x="2" y="2" width={width - 4} height={svgHeight - 4} rx="6" ry="6"
          fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />

        {/* Soil texture */}
        <rect x="6" y="6" width={width - 12} height={svgHeight - 12} rx="4" ry="4"
          fill="#fef3c7" opacity="0.4" />

        {/* Rows */}
        {rows.map((row, i) => {
          const y = 10 + i * rowHeight
          const isLast = i === rows.length - 1
          return (
            <g key={row.label}>
              {/* Row fill */}
              <rect x="6" y={y} width={width - 12} height={rowHeight - 2}
                fill={row.color} opacity="0.15"
                rx={i === 0 ? '4' : '0'}
                style={{ borderRadius: isLast ? '0 0 4px 4px' : undefined }}
              />
              {/* Divider */}
              {!isLast && (
                <line x1="6" y1={y + rowHeight - 2} x2={width - 6} y2={y + rowHeight - 2}
                  stroke="#d1fae5" strokeWidth="1" strokeDasharray="4,3" />
              )}
              {/* Row label */}
              <text x="14" y={y + 16} fontSize="10" fill="#166534" fontWeight="600"
                fontFamily="Inter, system-ui, sans-serif">
                {row.label}
              </text>
              {/* Plant name */}
              <text x="14" y={y + 29} fontSize="13" fill={row.color} fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif">
                {row.plant}
              </text>
              {/* Variety */}
              <text x={width - 10} y={y + 20} fontSize="10" fill="#6b7280" textAnchor="end"
                fontFamily="Inter, system-ui, sans-serif">
                {row.variety}
              </text>
              {/* Timing badge */}
              <rect x={width - 74} y={y + 26} width={68} height={14} rx="7"
                fill={row.timing === 'Sow now' ? '#dcfce7' : '#fef9c3'} />
              <text x={width - 40} y={y + 36} fontSize="9" textAnchor="middle"
                fill={row.timing === 'Sow now' ? '#15803d' : '#92400e'}
                fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
                {row.timing}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
