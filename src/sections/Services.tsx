import { motion } from 'framer-motion'
import type { SolutionCard } from '@types'

export default function Services() {
  const solutions: SolutionCard[] = [
    {
      id: '1',
      number: '01',
      title: 'Para empresas que precisam vender melhor',
      description: 'Sites e landing pages de alta conversão para transformar cliques em clientes.',
      services: ['Sites institucionais', 'Landing pages', 'Páginas de captura', 'Apresentação comercial', 'Estrutura para tráfego pago']
    },
    {
      id: '2',
      number: '02',
      title: 'Para empresas que precisam operar melhor',
      description: 'Sistemas e dashboards sob medida para automatizar processos e organizar a casa.',
      services: ['Sistemas sob medida', 'Dashboards', 'Automações', 'CRM interno', 'Ferramentas operacionais']
    },
    {
      id: '3',
      number: '03',
      title: 'Para empresas que querem crescer com inteligência',
      description: 'IA e análise de dados para apoiar decisões e escalar o seu negócio.',
      services: ['IA para atendimento', 'IA para gestão', 'Automações comerciais', 'Análise operacional', 'Integrações e dados']
    },
    {
      id: '4',
      number: '04',
      title: 'Para empresas que querem se posicionar melhor',
      description: 'Estratégia e design para construir autoridade e clareza de marca no mercado.',
      services: ['Social media estratégico', 'Posicionamento digital', 'Conteúdo', 'Identidade de comunicação', 'Estrutura comercial']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <section id="solucoes" className="py-20 bg-ato-white relative overflow-hidden">
      <div className="container">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-tight tracking-tight mb-4 break-words mx-auto">
            NOSSAS<br />SOLUÇÕES
          </h2>
          <p className="text-sm opacity-50 max-w-lg leading-relaxed mx-auto">
            A ATO não vende ferramentas isoladas. Entendemos sua operação e construímos a estrutura digital certa para o seu problema real.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-0 border-brutal border-ato-black"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((sol) => (
            <motion.div
              key={sol.id}
              variants={itemVariants}
              className="border-brutal border-ato-black group"
            >
              <div className="p-8 flex flex-col justify-between min-h-[360px] hover:bg-ato-green transition-colors duration-150 cursor-pointer">
                <div className="flex-1">
                  <div className="text-xs font-bold tracking-widest text-ato-green group-hover:text-ato-black mb-4 transition-colors duration-150">
                    {sol.number}
                  </div>
                  <h3 className="font-display font-black text-xl md:text-2xl uppercase mb-4 tracking-tight leading-tight">
                    {sol.title}
                  </h3>
                  <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80 mb-6 max-w-xs transition-opacity duration-150">
                    {sol.description}
                  </p>
                  <ul className="space-y-1 mb-6">
                    {sol.services.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-50 group-hover:opacity-70 transition-opacity duration-150">
                        <span className="w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <a
                    href="#contato"
                    className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 border-brutal border-ato-black bg-ato-off group-hover:bg-ato-black group-hover:text-ato-white transition-colors duration-150 self-start"
                  >
                    Entender essa solução →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
