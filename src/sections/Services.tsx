'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { StarBadge } from '@components/common/Stickers'

interface SolutionCard {
  id: string
  number: string
  title: string
  description: string
}

export default function Services() {
  const solutions: SolutionCard[] = [
    {
      id: '1',
      number: '01',
      title: 'Para empresas que precisam vender melhor',
      description: 'Sites e landing pages de alta conversão para transformar cliques em clientes.',
    },
    {
      id: '2',
      number: '02',
      title: 'Para empresas que precisam operar melhor',
      description: 'Sistemas e dashboards sob medida para automatizar processos e organizar a casa.',
    },
    {
      id: '3',
      number: '03',
      title: 'Para empresas que querem crescer com inteligência',
      description: 'IA e análise de dados para apoiar decisões e escalar o seu negócio.',
    },
    {
      id: '4',
      number: '04',
      title: 'Para empresas que querem se posicionar melhor',
      description: 'Estratégia e design para construir autoridade e clareza de marca no mercado.',
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <section id="solucoes" className="py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Textura orgânica de fundo — Neo-Memphis, opacidade baixa, não interativa */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] z-0"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-50 120 C 150 20, 350 220, 550 100 S 900 40, 1150 160"
          stroke="#111111"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M-80 480 C 180 380, 320 620, 560 500 S 880 380, 1250 540"
          stroke="#111111"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="180" cy="650" r="120" stroke="#111111" strokeWidth="6" />
        <circle cx="1050" cy="140" r="90" stroke="#111111" strokeWidth="6" />
        <path
          d="M700 700 C 780 620, 900 720, 980 650 S 1120 600, 1220 680"
          stroke="#111111"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M50 260 C 40 340, 140 380, 120 300 S 90 200, 50 260 Z"
          stroke="#111111"
          strokeWidth="6"
        />
      </svg>

      <div className="relative z-10 container px-4 md:px-6">
        <m.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top: Full-width header */}
          <m.div className="relative mb-14 text-center flex flex-col items-center mx-auto" variants={itemVariants}>
            <StarBadge className="hidden md:block absolute -top-6 -right-2 w-12 h-12 -rotate-6" />
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none tracking-tight mb-5"
              style={{ fontFamily: "'Archivo Black', sans-serif", fontWeight: 900 }}
            >
              NOSSAS SOLUÇÕES
            </h2>
            <p className="text-sm opacity-50 max-w-2xl leading-relaxed mx-auto">
              A ATO não vende ferramentas isoladas. Entendemos sua operação e construímos a estrutura digital certa para o seu problema real.
            </p>
          </m.div>

          {/* Bottom: Cards left + Logo right */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Left: Stacked horizontal cards */}
            <m.div
              className="flex-1 flex flex-col gap-5 w-full"
              variants={containerVariants}
            >
              {solutions.map((sol) => (
                <m.div
                  key={sol.id}
                  variants={itemVariants}
                  className="bg-white p-5 md:p-6 flex flex-col rounded-2xl border border-neutral-200/60 shadow-[0_10px_28px_rgba(0,0,0,0.06)] hover:translate-y-[-3px] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-200"
                >
                  <h3
                    className="text-base md:text-lg uppercase mb-2 tracking-tight leading-tight"
                    style={{ fontFamily: "'Archivo Black', sans-serif", fontWeight: 900 }}
                  >
                    {sol.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-60">
                    {sol.description}
                  </p>
                </m.div>
              ))}
            </m.div>

            {/* Right: Adesivo ATO */}
            <div className="hidden lg:flex items-center justify-center shrink-0" style={{ width: '300px' }}>
              <Image
                src="/adesivo-ato.png"
                width={1254}
                height={1254}
                sizes="288px"
                alt="Adesivo com o símbolo da ATO., agência de tecnologia em Brasília que desenvolve sites, sistemas sob medida, automações e inteligência artificial para empresas"
                className="w-56 sm:w-64 lg:w-72 h-auto object-contain select-none -rotate-3"
              />
            </div>
          </div>
        </m.div>
      </div>
    </section>
  )
}
