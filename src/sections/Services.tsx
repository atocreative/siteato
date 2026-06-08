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
    <section id="solucoes" className="py-20 md:py-32 bg-ato-white relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Top: Full-width header */}
          <motion.div className="mb-14 text-center flex flex-col items-center mx-auto" variants={itemVariants}>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase leading-none tracking-tight mb-5"
              style={{ fontFamily: "'Archivo Black', sans-serif", fontWeight: 900 }}
            >
              NOSSAS SOLUÇÕES
            </h2>
            <p className="text-sm opacity-50 max-w-2xl leading-relaxed mx-auto">
              A ATO não vende ferramentas isoladas. Entendemos sua operação e construímos a estrutura digital certa para o seu problema real.
            </p>
          </motion.div>

          {/* Bottom: Cards left + Logo right */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
            {/* Left: Stacked horizontal cards */}
            <motion.div
              className="flex-1 flex flex-col gap-5 w-full"
              variants={containerVariants}
            >
              {solutions.map((sol) => (
                <motion.div
                  key={sol.id}
                  variants={itemVariants}
                  className="bg-white p-5 md:p-6 flex flex-col hover:translate-y-[-2px] transition-all duration-200"
                  style={{
                    border: '1px solid #000000',
                    boxShadow: '4px 4px 0px #000000',
                  }}
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
                </motion.div>
              ))}
            </motion.div>

            {/* Right: ATO logo */}
            <div className="hidden lg:flex items-center justify-center flex-shrink-0" style={{ width: '300px' }}>
              <img
                src="/atoverde.svg"
                alt="ATO. Soluções Digitais"
                className="w-full max-w-[280px] object-contain select-none"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
