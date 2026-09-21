import { motion } from 'framer-motion'
import { WireGlobe } from '@components/common/Stickers'

interface Step {
  number: string
  title: string
  description: string
}

function StepCard({ step, align }: { step: Step; align: 'left' | 'right' }) {
  return (
    <div className={align === 'right' ? 'text-right' : 'text-left'}>
      <span className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#39FF14] text-[#39FF14] mb-2">
        Etapa {step.number}
      </span>
      <h3 className="font-display font-black text-lg uppercase tracking-tight mb-2">{step.title}</h3>
      <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">{step.description}</p>
    </div>
  )
}

export default function Steps() {
  const steps: Step[] = [
    { number: '01', title: 'Diagnóstico',    description: 'Mapeamos os gargalos e oportunidades digitais da sua operação.' },
    { number: '02', title: 'Estrutura',      description: 'Desenhamos a solução sob medida (site, sistema ou automação).' },
    { number: '03', title: 'Validação',      description: 'Você aprova o visual e o fluxo antes de escrevermos qualquer linha de código.' },
    { number: '04', title: 'Desenvolvimento',description: 'Construímos com foco absoluto em performance e uso real.' },
    { number: '05', title: 'Evolução',       description: 'Acompanhamos e ajustamos a estrutura para maximizar o retorno.' },
  ]

  return (
    <section id="transformacao" className="bg-[#080808] text-white py-20 md:py-28 relative overflow-hidden">
      {/* Grão/ruído fílmico — textura tátil visível */}
      <svg
        className="pointer-events-none absolute inset-0 z-0 w-full h-full opacity-[0.32]"
        style={{ mixBlendMode: 'overlay' }}
        aria-hidden="true"
      >
        <filter id="steps-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1.1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#steps-grain)" />
      </svg>

      <div className="container relative z-10">
        <div className="relative mb-16 md:mb-20 text-center">
          <WireGlobe className="hidden md:block absolute -top-8 right-2 w-16 h-16 rotate-[-6deg] opacity-60" color="#ffffff" />
          <h2 className="font-display font-black tracking-tight text-3xl sm:text-5xl uppercase text-white mb-4">
            DE IDEIA A <span className="text-[#39FF14]">ESTRUTURA</span>
          </h2>
          <p className="text-sm opacity-40 max-w-md leading-relaxed mx-auto">
            Um método direto para tirar sua operação do improviso e construir soluções digitais que funcionam no mundo real.
          </p>
        </div>

        {/* Timeline vertical */}
        <div className="relative max-w-3xl mx-auto">
          {/* Espinha central — colapsa para a borda esquerda no mobile */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 border-l-2 border-dashed border-neutral-700" />

          <div className="flex flex-col gap-12 md:gap-6">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1

              return (
                <motion.div
                  key={i}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {/* Nó + conteúdo — mobile */}
                  <div className="md:hidden absolute left-6 top-0 -translate-x-1/2 w-12 h-12 rounded-full border-2 border-[#39FF14] bg-black text-[#39FF14] font-black flex items-center justify-center text-lg z-10">
                    {step.number}
                  </div>
                  <div className="md:hidden pl-16 text-left">
                    <StepCard step={step} align="left" />
                  </div>

                  {/* Nó + conteúdo alternado — desktop */}
                  <div className="hidden md:grid md:grid-cols-[1fr_3rem_1fr] md:items-center md:gap-6">
                    <div>{!isRight && <StepCard step={step} align="right" />}</div>

                    <div className="flex items-center">
                      <div className={`h-0 flex-1 border-t border-dashed border-neutral-700 ${isRight ? 'opacity-0' : ''}`} />
                      <div className="w-12 h-12 rounded-full border-2 border-[#39FF14] bg-black text-[#39FF14] font-black flex items-center justify-center text-lg z-10 flex-shrink-0">
                        {step.number}
                      </div>
                      <div className={`h-0 flex-1 border-t border-dashed border-neutral-700 ${!isRight ? 'opacity-0' : ''}`} />
                    </div>

                    <div>{isRight && <StepCard step={step} align="left" />}</div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
