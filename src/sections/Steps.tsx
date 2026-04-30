import { motion } from 'framer-motion'

interface Step {
  number: string
  title: string
  description: string
}

export default function Steps() {
  const steps: Step[] = [
    {
      number: '01',
      title: 'Diagnóstico real da operação',
      description: 'Entendemos como sua empresa funciona hoje, onde estão os gargalos, o que está travando o crescimento e quais oportunidades digitais podem gerar mais retorno.'
    },
    {
      number: '02',
      title: 'Desenho da estrutura ideal',
      description: 'Transformamos o diagnóstico em uma solução clara: site, sistema, automação, IA, dashboard ou uma combinação de estruturas digitais sob medida.'
    },
    {
      number: '03',
      title: 'Pré-visualização e validação',
      description: 'Criamos uma prévia da solução para alinhar visual, fluxo, proposta e experiência antes da implementação final. Nada sai sem seu aval.'
    },
    {
      number: '04',
      title: 'Desenvolvimento e implementação',
      description: 'Construímos a estrutura com foco em usabilidade, performance, clareza e aplicação real no dia a dia do negócio.'
    },
    {
      number: '05',
      title: 'Ajustes, evolução e ROI',
      description: 'Acompanhamos os resultados, fazemos melhorias e buscamos evoluir a estrutura para gerar mais eficiência, conversão e retorno real.'
    }
  ]

  return (
    <section id="passos" className="bg-ato-black text-ato-white py-20 border-y-brutal border-ato-white relative overflow-hidden">
      <div className="ato-container">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-7 h-0.5 bg-ato-green"></div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-50">Nosso método</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-tight tracking-tight mb-4 break-words">
            COMO A ATO<br />TRANSFORMA<br />IDEIA EM<br />ESTRUTURA
          </h2>
          <p className="text-sm opacity-40 max-w-md leading-relaxed mt-4">
            Um método direto para tirar sua operação do improviso e construir soluções digitais que funcionam no mundo real.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 border-brutal border-white/15">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className={`p-6 transition-all duration-200 ${i < steps.length - 1 ? 'border-r-0 md:border-r-brutal border-b-brutal md:border-b-0 border-white/15' : ''}`}
              whileHover={{ backgroundColor: 'rgba(0, 217, 74, 0.07)' }}
            >
              <div className="font-display font-black text-5xl md:text-6xl text-ato-green mb-5 leading-none">{step.number}</div>
              <h3 className="font-display font-black text-sm md:text-base uppercase tracking-wide mb-3 leading-tight">{step.title}</h3>
              <p className="text-xs leading-relaxed opacity-50">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
