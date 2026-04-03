export function GazeboArea() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 340 110" className="w-full" role="img" aria-label="Gazebo strawberry area">
        {/* Gazebo outline */}
        <rect x="10" y="20" width="320" height="80" rx="8"
          fill="#fef3c7" stroke="#ca8a04" strokeWidth="2" strokeDasharray="6,3" />
        {/* Roof hint */}
        <polygon points="170,5 10,20 330,20"
          fill="#fde68a" stroke="#ca8a04" strokeWidth="1.5" opacity="0.7" />
        <text x="170" y="17" fontSize="10" textAnchor="middle" fill="#92400e"
          fontFamily="Inter, system-ui, sans-serif" fontWeight="700">GAZEBO</text>

        {/* Strawberry patches around edges */}
        {[30, 80, 130, 180, 230, 280].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy={40} r={10} fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8" />
            <text x={x} y={45} fontSize="14" textAnchor="middle">🍓</text>
          </g>
        ))}
        {[30, 80, 130, 180, 230, 280].map((x, i) => (
          <g key={i + 10}>
            <circle cx={x} cy={88} r={10} fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8" />
            <text x={x} y={93} fontSize="14" textAnchor="middle">🍓</text>
          </g>
        ))}

        {/* Center label */}
        <text x="170" y="68" fontSize="13" textAnchor="middle" fill="#92400e"
          fontWeight="600" fontFamily="Inter, system-ui, sans-serif">
          Strawberry Crowns
        </text>
        <text x="170" y="82" fontSize="10" textAnchor="middle" fill="#78350f"
          fontFamily="Inter, system-ui, sans-serif">
          Plant around edges or in hanging baskets
        </text>
      </svg>
    </div>
  )
}
