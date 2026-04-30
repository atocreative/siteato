import { motion } from 'framer-motion'

export default function About() {
  const stats = [
    { number: '50+', label: 'Projetos entregues' },
    { number: '3x', label: 'Crescimento médio' },
    { number: '100%', label: 'Foco em resultado' }
  ]

  const pillars = [
    { icon: '01', title: 'Estratégia antes de tudo', text: 'Antes de qualquer linha de código, entendemos seu negócio.' },
    { icon: '02', title: 'Tecnologia com propósito', text: 'Desenvolvemos com qualidade, sempre pensando no resultado.' },
    { icon: '03', title: 'Resultado no caixa', text: 'Não medimos sucesso por curtida. Medimos por faturamento real.' },
    { icon: '04', title: 'Parceria de longo prazo', text: 'Não somos fornecedor — somos parceiros que crescem com você.' }
  ]

  const hoverText = {
    y: -8,
    filter: 'blur(0.4px)',
    opacity: 1,
    transition: { type: 'spring', stiffness: 400, damping: 30 }
  }

  return (
    <section id="sobre" className="py-20 border-b-brutal border-ato-black relative overflow-hidden">
      <div className="ato-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-0.5 bg-ato-green"></div>
              <span className="text-xs font-bold uppercase tracking-widest">Sobre nós</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-8 break-words">
              SOMOS A<br /><span className="text-ato-green">ATO.</span><br />SOLUÇÕES<br />DIGITAIS.
            </h2>
            <motion.p
              className="text-sm leading-relaxed opacity-65 mb-8 cursor-default"
              whileHover={hoverText}
            >
              Nascemos em Brasília com uma missão clara: tirar negócios do lugar e colocá-los no digital de um jeito que faz sentido — estratégico, humano e que vende.
            </motion.p>
            <motion.p
              className="text-sm leading-relaxed opacity-65 mb-8 cursor-default"
              whileHover={hoverText}
            >
              Não somos uma agência. Somos uma empresa de tecnologia que entende de negócio. Desenvolvemos sistemas, sites, apps e soluções de social media.
            </motion.p>

            <div className="grid grid-cols-3 gap-0 border-brutal border-ato-black">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className={`p-5 flex flex-col justify-center ${i < stats.length - 1 ? 'border-r-brutal border-ato-black' : ''}`}
                  whileHover={{ backgroundColor: '#F0F0EE' }}
                >
                  <div className="font-display font-black text-3xl md:text-4xl text-ato-green leading-none">{stat.number}</div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-45 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-0 border-brutal border-ato-black">
            {pillars.map((pillar, i) => {
              const isGreenCard = i % 2 === 0

              return (
                <motion.div
                  key={i}
                  className={`flex h-[146px] w-full flex-col px-5 py-4 text-black md:px-6 md:py-5 ${isGreenCard ? 'bg-[#00FF41]' : 'bg-white'} ${i < pillars.length - 1 ? 'border-b-brutal border-ato-black' : ''}`}
                  whileHover={{ y: -4 }}
                >
                  <div className="font-display font-black text-2xl mb-5">{pillar.icon}</div>
                  <div className="mt-auto">
                    <h3 className="font-display font-black text-sm uppercase tracking-wide mb-2">{pillar.title}</h3>
                    <p className="text-xs leading-relaxed opacity-70">{pillar.text}</p>
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
