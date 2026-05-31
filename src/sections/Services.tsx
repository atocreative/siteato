import { motion } from 'framer-motion'

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
    <section id="solucoes" className="py-12 md:py-20 bg-ato-white relative overflow-hidden">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
          style={{ border: '2.5px solid #0D0D0D' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {solutions.map((sol) => (
            <motion.div
              key={sol.id}
              variants={itemVariants}
              className="group"
              style={{ border: '2.5px solid #0D0D0D' }}
            >
              <div className="p-5 md:p-8 flex flex-col min-h-[200px] md:min-h-[280px] hover:bg-[#39FF14] transition-colors duration-150 cursor-pointer">
                <div className="font-mono text-[11px] font-bold tracking-widest text-[#39FF14] group-hover:text-ato-black mb-4 transition-colors duration-150">
                  {sol.number}
                </div>
                <h3 className="font-display font-black text-xl md:text-2xl uppercase mb-4 tracking-tight leading-tight">
                  {sol.title}
                </h3>
                <p className="text-sm leading-relaxed opacity-60 group-hover:opacity-80 transition-opacity duration-150">
                  {sol.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
