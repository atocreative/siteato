import { useEffect, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'

export const StarsBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 150 }).map(() => ({
      size: Math.random() < 0.9 ? 1 + Math.random() : 2 + Math.random(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationName: Math.random() < 0.5 ? 'twinkle-drift-1' : 'glow-gravitational-2',
      duration: 30 + Math.random() * 70,
      delay: Math.random() * 100,
      baseOpacity: Math.random() < 0.8 ? 0.2 : 0.9,
    }))
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#010202] pointer-events-none">
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_10px_rgba(0,217,74,0.7)]"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              top: star.top,
              left: star.left,
              opacity: 0,
              animation: `${star.animationName} ${star.duration}s linear ${star.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: 'radial-gradient(at 75% 0%, rgba(0, 217, 74, 0.28) 0%, transparent 55%), radial-gradient(at 15% 100%, rgba(0, 217, 74, 0.1) 0%, transparent 45%)'
        }}
      />
    </div>
  )
}

export default function Hero() {
  const mainOrbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mainOrbitRef.current
    if (!container) return

    const text = 'APPS • PLATAFORMAS • AUTOMAÇÃO COM IA • ALTA PERFORMANCE'
    const repeatedText = `${text}   •   ${text}   •   `
    const radius = 280
    const panelCount = 28
    const panelWidth = (2 * Math.PI * radius) / panelCount
    const circumference = panelWidth * panelCount

    const probe = document.createElement('span')
    probe.style.cssText = [
      'visibility:hidden',
      'position:absolute',
      'top:-9999px',
      'left:-9999px',
      'white-space:nowrap',
      "font-family:'Arial Black', Arial, sans-serif",
      'font-weight:900',
      'letter-spacing:1px',
      'text-transform:uppercase',
    ].join(';')
    probe.innerText = repeatedText
    document.body.appendChild(probe)

    let fontSize = 12
    probe.style.fontSize = `${fontSize}px`
    while (probe.offsetWidth < circumference && fontSize < 32) {
      fontSize += 1
      probe.style.fontSize = `${fontSize}px`
    }
    if (probe.offsetWidth > circumference && fontSize > 12) {
      fontSize -= 1
    }
    document.body.removeChild(probe)

    container.innerHTML = ''

    for (let index = 0; index < panelCount; index += 1) {
      const angle = (360 / panelCount) * index
      const leftOffset = -(panelWidth * index)

      const panel = document.createElement('div')
      panel.style.cssText = [
        'position:absolute',
        `width:${panelWidth + 2}px`,
        'height:72px',
        'overflow:hidden',
        `transform:translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
      ].join(';')

      const span = document.createElement('span')
      span.style.cssText = [
        'position:absolute',
        `left:${leftOffset}px`,
        `font-size:${fontSize}px`,
        'width:max-content',
        'white-space:nowrap',
        'color:#d1d1d1',
        "font-family:'Arial Black', Arial, sans-serif",
        'font-weight:900',
        'letter-spacing:1px',
        'text-transform:uppercase',
      ].join(';')
      span.innerText = repeatedText

      panel.appendChild(span)
      container.appendChild(panel)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section className="w-full min-h-screen bg-ato-black text-ato-white relative overflow-hidden border-b-brutal border-ato-black flex flex-col pt-16">
      <StarsBackground />

      {/* Main grid */}
      <motion.div
        className="flex-1 relative z-20 py-10 md:py-14"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ato-container grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-6 h-full">
          {/* Left: headline copy */}
          <motion.div className="flex flex-col gap-0 min-w-0" variants={itemVariants}>
            {['DIGITAL', 'QUE', 'CONVERTE', 'RESULTADOS.'].map((word) => (
              <h1
                key={word}
                className="font-display font-black leading-none uppercase tracking-tight break-words text-[2.5rem] sm:text-[3.3rem] md:text-[4.15rem] lg:text-[4.15rem] xl:text-[5rem]"
                style={word === 'CONVERTE' ? {
                  color: '#010202',
                  WebkitTextStroke: '2px #ffffff',
                  paintOrder: 'stroke fill',
                } : { color: '#ffffff' }}
              >
                {word}
              </h1>
            ))}
          </motion.div>

          {/* Right: 3D orbit system */}
          <motion.div className="flex items-center justify-center" variants={itemVariants}>
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                  <img
                    src="/atoverde.svg"
                    alt="ATO. Soluções Digitais"
                    className="object-contain select-none"
                    style={{ width: '250px', minWidth: '250px', minHeight: '80px' }}
                  />
                </div>

                <div
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    animation: 'nuclear-wobble 20s ease-in-out infinite',
                  }}
                >
                  <div
                    ref={mainOrbitRef}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transformStyle: 'preserve-3d',
                      animation: 'orbit-spin 30s linear infinite',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>


      <style>{`
        @keyframes orbit-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        @keyframes nuclear-wobble {
          0% { transform: rotateX(25deg) rotateZ(10deg); }
          25% { transform: rotateX(-15deg) rotateZ(20deg); }
          50% { transform: rotateX(-25deg) rotateZ(-10deg); }
          75% { transform: rotateX(15deg) rotateZ(-20deg); }
          100% { transform: rotateX(25deg) rotateZ(10deg); }
        }
      `}</style>
    </section>
  )
}
