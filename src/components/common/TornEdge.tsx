interface TornEdgeProps {
  topColor: string
  bottomColor: string
  variant?: 1 | 2
  className?: string
}

const VIEWBOX_W = 1440
const VIEWBOX_H = 80

/** PRNG determinístico (mulberry32) — mesma seed sempre gera o mesmo rasgo, sem padrão periódico */
function mulberry32(seed: number) {
  let s = seed | 0
  return function random() {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Constrói um path de borda rasgada orgânica: passos de largura irregular,
 * alternando curvas cúbicas suaves (C), quadráticas (Q) e micro-rasgos retos
 * agudos (L) com deslocamento vertical pseudoaleatório — nunca um dente-de-serra
 * matemático/periódico.
 */
function buildTornPath(seed: number, baseline: number, amplitude: number, segments: number): string {
  const rand = mulberry32(seed)
  const step = VIEWBOX_W / segments
  let x = 0
  let y = baseline + (rand() - 0.5) * amplitude
  let d = `M0,${y.toFixed(1)} `

  for (let i = 0; i < segments; i++) {
    const isLast = i === segments - 1
    const nx = isLast ? VIEWBOX_W : Math.min(VIEWBOX_W, x + step * (0.55 + rand() * 0.9))
    const ny = baseline + (rand() - 0.5) * amplitude * (rand() < 0.2 ? 1.7 : 1)
    const roll = rand()

    if (roll < 0.22) {
      // micro-rasgo agudo — quebra reta curta simulando fibra arrancada
      d += `L${nx.toFixed(1)},${ny.toFixed(1)} `
    } else if (roll < 0.4) {
      // curva quadrática — dente médio irregular
      const qx = x + (nx - x) * (0.35 + rand() * 0.3)
      const qy = baseline + (rand() - 0.5) * amplitude * 1.3
      d += `Q${qx.toFixed(1)},${qy.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)} `
    } else {
      // curva cúbica suave — trecho de tensão da fibra do papel
      const c1x = x + (nx - x) * (0.2 + rand() * 0.25)
      const c1y = y + (rand() - 0.5) * amplitude * 0.9
      const c2x = x + (nx - x) * (0.6 + rand() * 0.25)
      const c2y = ny + (rand() - 0.5) * amplitude * 0.9
      d += `C${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)} `
    }

    x = nx
    y = ny
  }

  d += `L${VIEWBOX_W},${VIEWBOX_H} L0,${VIEWBOX_H} Z`
  return d
}

/** Duas seeds/baselines distintas por variante — fibra (exterior, mais densa/irregular) e núcleo (cor, recuado) */
const RECIPES: Record<1 | 2, { fiberSeed: number; coreSeed: number; baseline: number; amplitude: number }> = {
  1: { fiberSeed: 132471, coreSeed: 907733, baseline: 30, amplitude: 20 },
  2: { fiberSeed: 552013, coreSeed: 118829, baseline: 34, amplitude: 24 },
}

const FRINGE = 9 // deslocamento vertical do núcleo em relação à fibra — franja branca exposta (~3-5px renderizados)

/** Divisor de seção com efeito de papel rasgado — fibra branca + silhueta de cor recuada */
export default function TornEdge({ topColor, bottomColor, variant = 1, className = '' }: TornEdgeProps) {
  const { fiberSeed, coreSeed, baseline, amplitude } = RECIPES[variant]
  // fibra: mais segmentos e amplitude levemente maior — micro-fibras nítidas, sem aspecto de mancha borrada
  const fiberPath = buildTornPath(fiberSeed, baseline, amplitude * 1.1, 64)
  const corePath = buildTornPath(coreSeed, baseline + FRINGE, amplitude * 0.85, 48)

  return (
    <div
      className={`relative z-20 w-full overflow-hidden leading-none pointer-events-none select-none -mt-[2px] -mb-[2px] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        preserveAspectRatio="none"
        className="block w-full h-10 sm:h-12 md:h-16 align-bottom"
        style={{ filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.35))' }}
      >
        <rect x="0" y="0" width={VIEWBOX_W} height={VIEWBOX_H} fill={topColor} />
        <path d={fiberPath} fill="#ffffff" />
        <path d={corePath} fill={bottomColor} />
      </svg>
    </div>
  )
}
