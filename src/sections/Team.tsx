import { motion } from 'framer-motion'

interface TeamMemberFull {
  id: string
  name: string
  role: string
  title: string
  bio: string
}

export default function Team() {
  const team: TeamMemberFull[] = [
    {
      id: '1',
      name: 'João Gabriel',
      role: 'CEO',
      title: 'Estratégia e crescimento',
      bio: 'Conecta visão de negócio, operação e tecnologia para transformar problemas reais em estruturas digitais.'
    },
    {
      id: '2',
      name: 'Creative Lead',
      role: 'CCO',
      title: 'Direção criativa',
      bio: 'Transforma posicionamento, estética e comunicação em experiências digitais mais fortes e mais claras.'
    },
    {
      id: '3',
      name: 'Tech Lead',
      role: 'CTO',
      title: 'Desenvolvimento e estrutura',
      bio: 'Constrói a base técnica das soluções, sistemas e ferramentas digitais da ATO com foco em performance.'
    },
    {
      id: '4',
      name: 'Growth Lead',
      role: 'CMO',
      title: 'Aquisição e performance',
      bio: 'Pensa em canais, conversão e estratégias para transformar presença digital em crescimento mensurável.'
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  const rotations = [-2, 1.5, -1, 2.5]
  const margins = [0, 48, -16, 32]

  return (
    <section id="equipe" className="py-20 border-b-brutal border-ato-black overflow-hidden">
      <div className="ato-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-0.5 bg-ato-green"></div>
              <span className="text-xs font-bold uppercase tracking-widest">A equipe</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-8 break-words">
              A EQUIPE QUE<br />TRANSFORMA<br />OPERAÇÃO EM<br />TECNOLOGIA.
            </h2>
          </div>
          <div className="md:pt-20">
            <p className="text-sm leading-relaxed opacity-60">
              Por trás da ATO existe uma equipe jovem, criativa e prática, focada em entender negócios de verdade e construir soluções digitais que funcionam no dia a dia.
            </p>
            <p className="text-sm leading-relaxed opacity-60 mt-4">
              Unimos visão estratégica, design, tecnologia e execução para entregar estruturas que fazem sentido para cada cliente — sem jargão, sem enrolação.
            </p>
          </div>
        </div>

        <motion.div
          className="flex gap-8 flex-wrap justify-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={member.id}
              className="flex-1 min-w-[220px] max-w-[280px] shadow-brutal"
              variants={itemVariants}
              style={{
                transform: `rotate(${rotations[idx]}deg)`,
                marginTop: `${margins[idx]}px`
              }}
              whileHover={{
                transform: `rotate(${rotations[idx] - 5}deg) translateY(-10px) scale(1.05)`,
                boxShadow: '16px 16px 0 #0F0F0F'
              }}
            >
              <div className="bg-ato-white border-brutal border-ato-black p-3 transition-all">
                <div className="aspect-video bg-ato-black border border-gray-800 mb-6 flex items-center justify-center overflow-hidden relative">
                  <span className="font-display font-black text-4xl text-ato-green opacity-20 select-none">
                    {member.name.charAt(0)}
                  </span>
                  <div className="absolute bottom-2 left-2">
                    <div className="w-6 h-0.5 bg-ato-green opacity-60"></div>
                  </div>
                </div>
                <div className="px-2 pb-4">
                  <span className="inline-block text-xs font-bold tracking-widest px-2 py-1 bg-ato-green text-ato-black border border-ato-black mb-2">
                    {member.role}
                  </span>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight leading-tight mb-1">{member.name}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">{member.title}</p>
                  <p className="text-xs leading-relaxed opacity-50">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
