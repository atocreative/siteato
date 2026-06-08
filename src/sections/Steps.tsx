import { motion } from 'framer-motion'

interface Step {
  number: string
  title: string
  description: string
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
    <section id="transformacao" className="bg-ato-black text-ato-white py-12 md:py-20 relative overflow-hidden">
      <div className="container">
        <div className="mb-16 text-center">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-tight tracking-tight mb-4 break-words mx-auto">
            COMO A ATO<br />TRANSFORMA<br />IDEIA EM<br />ESTRUTURA
          </h2>
          <p className="text-sm opacity-40 max-w-md leading-relaxed mt-4 mx-auto">
            Um método direto para tirar sua operação do improviso e construir soluções digitais que funcionam no mundo real.
          </p>
        </div>

        {/* Timeline horizontal */}
        <div className="relative">
          {/* Linha conectora — passa pelo centro dos nós (nó: 40px, topo do nó: py-8=32px → centro = 32+20=52px) */}
          <div
            className="hidden md:block absolute left-0 right-0 h-[2px] bg-white/15 z-0"
            style={{ top: '52px' }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center px-4 py-8 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Nó da timeline — centralizado sobre a linha */}
                <div className="w-10 h-10 rounded-full border-2 border-ato-green bg-ato-black flex items-center justify-center mb-4 z-10 flex-shrink-0">
                  <span className="font-mono text-[10px] font-bold text-ato-green">{step.number}</span>
                </div>

                {/* Seta entre nós — posicionada no centro exato da linha */}
                {i < steps.length - 1 && (
                  <span
                    className="hidden md:block absolute text-white/30 text-[10px] select-none z-20 leading-none"
                    style={{ top: '52px', right: '-5px', transform: 'translateY(-50%)' }}
                  >▶</span>
                )}

                <h3 className="font-display font-black text-sm uppercase tracking-wide mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed opacity-50 max-w-[140px]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
