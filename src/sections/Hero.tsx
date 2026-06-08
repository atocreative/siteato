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
          backgroundImage: 'radial-gradient(at 75% 0%, rgba(57, 255, 20, 0.3) 0%, transparent 55%), radial-gradient(at 15% 100%, rgba(57, 255, 20, 0.2) 0%, transparent 45%)'
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
    const isMobile = window.innerWidth < 768
    const radius = isMobile ? 320 : 250
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
        'color:#fff',
        "font-family:'Arial Black', Arial, sans-serif",
        'font-weight:900',
        'letter-spacing:1px',
        'text-transform:uppercase',
        'text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
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
        className="flex-1 flex flex-col items-center justify-center relative z-20 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="ato-container w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-6 ">
          {/* Left: headline copy */}
          <motion.div className="flex flex-col gap-0 min-w-0" variants={itemVariants}>
            {['DIGITAL', 'QUE', 'CONVERTE', 'RESULTADOS'].map((word) => {
              const isConverte = word === 'CONVERTE';
              const isResultados = word === 'RESULTADOS';

              return (
                <h1
                  key={word}
                  className={`font-display font-black leading-none uppercase tracking-tight text-[2.5rem] sm:text-[3.3rem] md:text-[4rem] lg:text-[4rem] xl:text-[4.6rem] ${isResultados ? 'whitespace-nowrap' : 'break-words'}`}
                  style={isConverte ? {
                    color: 'transparent',
                    WebkitTextStroke: '2px #ffffff',
                    paintOrder: 'stroke fill',
                  } : { color: '#ffffff' }}
                >
                  {word}
                  {isResultados && (
                    <span 
                      className="inline-block ml-1 md:ml-2"
                      style={{ 
                        width: '0.22em',
                        height: '0.22em',
                        backgroundColor: '#010202',
                        border: '2px solid #ffffff',
                      }}
                    />
                  )}
                </h1>
              );
            })}
          </motion.div>

          {/* Right: 3D orbit system */}
          <motion.div className="flex items-center justify-center" variants={itemVariants}>
            {/* Aquário 3D — perspective + preserve-3d no MESMO container pai */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px] scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 transform origin-center"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Logo — centered, z-index 2 so it sits between ring halves */}
              <img
                src="/atoverde.svg"
                alt="ATO. Soluções Digitais"
                className="absolute object-contain select-none w-56 sm:w-60 md:w-64 lg:w-[250px]"
                style={{ top: '50%', left: '50%', transform: 'translate3d(-50%, -50%, 0px)', minWidth: '180px', minHeight: '60px', filter: 'drop-shadow(0px 10px 15px rgba(0,0,0,0.8))', willChange: 'filter' }}
              />

              {/* Anel de texto — irmão direto da logo no mesmo espaço 3D */}
              <div
                className="absolute top-1/2 left-1/2"
                style={{
                  transformStyle: 'preserve-3d',
                  animation: '20s ease-in-out',
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
          </motion.div>
        </div>
      </motion.div> 


      <style>{`

        @keyframes orbit-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
          0% { transform: rotateX(0deg) rotateZ(20deg);
        }
      `}</style>
    </section>
  )
}
