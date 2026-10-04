'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface Star {
  size: number
  top: string
  left: string
  animationName: string
  duration: number
  delay: number
  baseOpacity: number
}

export const StarsBackground = () => {
  // Gerado só no cliente: Math.random no SSR causaria erro de hidratação (é puramente decorativo).
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const count = window.innerWidth < 768 ? 24 : 150
    setStars(Array.from({ length: count }).map(() => ({
      size: Math.random() < 0.9 ? 1 + Math.random() : 2 + Math.random(),
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationName: Math.random() < 0.5 ? 'twinkle-drift-1' : 'glow-gravitational-2',
      duration: 30 + Math.random() * 70,
      delay: Math.random() * 100,
      baseOpacity: Math.random() < 0.8 ? 0.2 : 0.9,
    })))
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

const ORBIT_TEXT = 'APPS • PLATAFORMAS • AUTOMAÇÃO COM IA • ALTA PERFORMANCE'
const ORBIT_REPEATED = `${ORBIT_TEXT}   •   ${ORBIT_TEXT}   •   `
const PANEL_COUNT = 28

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-ato-black text-ato-white relative overflow-hidden border-b-brutal border-ato-black flex flex-col pt-16">
      <StarsBackground />

      {/* Main grid */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-20 w-full">
        <div className="ato-container w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-6 ">
          {/* Left: headline copy */}
          <div className="flex flex-col gap-0 min-w-0 ato-fade-up">
            <h1
              className="font-display font-black leading-none uppercase tracking-tight text-[2.5rem] sm:text-[3.3rem] md:text-[4rem] lg:text-[4rem] xl:text-[4.6rem]"
              style={{ color: '#ffffff' }}
            >
              DIGITAL
              <br />
              QUE
              <br />
              <span
                style={{ color: 'transparent', WebkitTextStroke: '2px #ffffff', paintOrder: 'stroke fill' }}
              >
                CONVERTE
              </span>
              <br />
              <span className="whitespace-nowrap">
                RESULTADOS
                <span
                  className="inline-block ml-1 md:ml-2"
                  style={{ width: '0.22em', height: '0.22em', backgroundColor: '#010202', border: '2px solid #ffffff' }}
                  aria-hidden="true"
                />
              </span>
            </h1>
          </div>

          {/* Right: 3D orbit system */}
          <div className="flex items-center justify-center ato-fade-up">
            {/* Aquário 3D — perspective + preserve-3d no MESMO container pai */}
            <div
              className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px] scale-[0.6] sm:scale-75 md:scale-90 lg:scale-100 transform origin-center"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Logo — centered, z-index 2 so it sits between ring halves */}
              <Image
                src="/atoverde.svg"
                width={170}
                height={191}
                priority
                sizes="(min-width: 1024px) 250px, 224px"
                alt="Logotipo verde da ATO., agência de tecnologia de Brasília que cria sites, sistemas internos, automações e soluções de inteligência artificial para negócios"
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
                  className="orbit-ring absolute top-1/2 left-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    animation: 'orbit-spin 30s linear infinite',
                  }}
                  aria-hidden="true"
                >
                  {Array.from({ length: PANEL_COUNT }).map((_, index) => (
                    <div
                      key={index}
                      className="orbit-panel"
                      style={{
                        transform: `translate(-50%, -50%) rotateY(${(360 / PANEL_COUNT) * index}deg) translateZ(var(--orbit-r))`,
                      }}
                    >
                      <span className="orbit-text" style={{ left: `calc(var(--orbit-pw) * -${index})` }}>
                        {ORBIT_REPEATED}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        .orbit-ring { --orbit-r: 250px; --orbit-pw: 56.0999px; --orbit-fs: 18px; }
        @media (max-width: 767px) {
          .orbit-ring { --orbit-r: 320px; --orbit-pw: 71.8078px; --orbit-fs: 24px; }
        }
        .orbit-panel { position: absolute; width: calc(var(--orbit-pw) + 2px); height: 72px; overflow: hidden; }
        .orbit-text {
          position: absolute; width: max-content; white-space: nowrap; color: #fff;
          font-size: var(--orbit-fs);
          font-family: 'Arial Black', Arial, sans-serif; font-weight: 900; letter-spacing: 1px; text-transform: uppercase;
          text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
        }

        @keyframes orbit-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
          0% { transform: rotateX(0deg) rotateZ(20deg);
        }
      `}</style>
    </section>
  )
}
