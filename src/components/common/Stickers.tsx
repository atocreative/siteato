interface StickerProps {
  className?: string
  color?: string
  accent?: string
}

/** Sparkle de 8 pontas — Y2K starburst */
export function Sparkle({ className = '', color = '#0D0D0D' }: StickerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M50 0 L58 40 L70 8 L64 44 L100 30 L68 52 L100 70 L62 60 L70 100 L52 64 L34 100 L42 62 L4 76 L36 50 L0 32 L40 40 Z"
        fill={color}
      />
    </svg>
  )
}

/** Globo 3D wireframe */
export function WireGlobe({ className = '', color = '#0D0D0D' }: StickerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="40" />
      <ellipse cx="50" cy="50" rx="40" ry="15" />
      <ellipse cx="50" cy="50" rx="16" ry="40" />
      <line x1="10" y1="50" x2="90" y2="50" />
    </svg>
  )
}

/** Sol sorridente estilo webcore, chunky */
export function Smiley({ className = '', color = '#0D0D0D', accent = '#39FF14' }: StickerProps) {
  const rays = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180
    return {
      x1: 50 + 34 * Math.cos(angle),
      y1: 50 + 34 * Math.sin(angle),
      x2: 50 + 46 * Math.cos(angle),
      y2: 50 + 46 * Math.sin(angle),
    }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {rays.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={color} strokeWidth="4" strokeLinecap="round" />
      ))}
      <circle cx="50" cy="50" r="30" fill={accent} stroke={color} strokeWidth="3" />
      <circle cx="38" cy="45" r="4" fill={color} />
      <circle cx="62" cy="45" r="4" fill={color} />
      <path d="M35 58 Q50 72 65 58" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/** Margarida arredondada */
export function Daisy({ className = '', color = '#0D0D0D', accent = '#ffffff' }: StickerProps) {
  const petals = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180
    return { cx: 50 + 22 * Math.cos(angle), cy: 50 + 22 * Math.sin(angle) }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {petals.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r="16" fill={accent} stroke={color} strokeWidth="2" />
      ))}
      <circle cx="50" cy="50" r="13" fill={color} />
    </svg>
  )
}

/** Anéis wireframe estilo torus */
export function WireRing({ className = '', color = '#0D0D0D' }: StickerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      stroke={color}
      strokeWidth="2.5"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="50" rx="44" ry="18" />
      <ellipse cx="50" cy="50" rx="30" ry="11" />
    </svg>
  )
}

/** Badge estrela — selo Y2K */
export function StarBadge({ className = '', color = '#0D0D0D', accent = '#39FF14' }: StickerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="#ffffff" stroke={color} strokeWidth="2.5" />
      <path
        d="M50 20 L58 41 L80 41 L62 54 L69 76 L50 62 L31 76 L38 54 L20 41 L42 41 Z"
        fill={accent}
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
