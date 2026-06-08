export default function Team() {
  const team = [
    {
      id: '1',
      role: 'CEO & Co-founder',
      name: 'João Oliveira',
      photo: '/joao.png',
      photoAlt: 'João Gabriel - CEO da ATO',
      bio: 'Administrador, graduando em Ciência de Dados e estrategista de marketing. Especialista em posicionamento digital e gestão de pessoas com foco em cultura organizacional. Une dados, mercado e estética com um único objetivo: transformar a presença digital de nossos clientes em um motor real de faturamento e crescimento.',
      rotation: 'rotate-0 md:-rotate-[1.5deg] md:hover:rotate-0',
    },
    {
      id: '2',
      role: 'CTO & Co-founder',
      name: 'Caio Vilela',
      photo: '/caio.png',
      photoAlt: 'Caio Vilela - CTO da ATO',
      bio: 'Desenvolvedor e especialista em Engenharia de IA. Responsável por arquitetar os sistemas e ferramentas da empresa, une engenharia e sensibilidade de design para transformar estratégias de mercado em soluções tecnológicas focadas em performance, automação e crescimento real.',
      rotation: 'rotate-0 md:rotate-[1.5deg] md:hover:rotate-0',
    }
  ]

  return (
    <section id="equipe" className="py-12 md:py-20 bg-ato-white overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-6 break-words mx-auto">
            EXECUTIVOS
          </h2>
          <p className="text-sm leading-relaxed opacity-60 max-w-md mx-auto font-bold uppercase tracking-widest">
            A equipe que transforma operação em tecnologia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center md:flex-wrap">
          {team.map((member) => (
            <div
              key={member.id}
              className={`w-full max-w-[280px] bg-white p-3 pb-6 transform ${member.rotation} transition-transform duration-300`}
              style={{
                border: '1px solid #000000',
                boxShadow: '4px 4px 0px #000000',
                borderRadius: '0px'
              }}
            >
              <div className="relative mb-4">
                <img
                  src={member.photo}
                  alt={member.photoAlt}
                  className="w-full aspect-square object-cover object-top bg-gray-200"
                />
                <span 
                  className="absolute bottom-3 left-3 z-10 font-mono text-[10px] font-bold tracking-widest px-2 py-1 bg-ato-green text-ato-black border border-ato-black uppercase"
                  style={{ boxShadow: '2px 2px 0px #000000' }}
                >
                  {member.role}
                </span>
              </div>
              <div className="px-2">
                <h3 className="font-display font-black text-xl uppercase tracking-tight leading-tight mb-2">
                  {member.name}
                </h3>
                <p className="text-xs leading-relaxed opacity-60">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
