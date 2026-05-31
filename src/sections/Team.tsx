export default function Team() {
  const team = [
    {
      id: '1',
      role: 'CEO & Co-founder',
      name: 'João Oliveira',
      photo: '/joao.png',
      photoAlt: 'João Gabriel - CEO da ATO',
      bio: 'Administrador, graduando em Ciência de Dados e estrategista de marketing. Especialista em posicionamento digital e gestão de pessoas com foco em cultura organizacional. Une dados, mercado e estética com um único objetivo: transformar a presença digital de nossos clientes em um motor real de faturamento e crescimento.',
      rotation: '-rotate-1',
    },
    {
      id: '2',
      role: 'CTO & Co-founder',
      name: 'Caio Vilela',
      photo: '/caio.png',
      photoAlt: 'Caio Vilela - CTO da ATO',
      bio: 'Desenvolvedor e especialista em Engenharia de IA. Responsável por arquitetar os sistemas e ferramentas da empresa, une engenharia e sensibilidade de design para transformar estratégias de mercado em soluções tecnológicas focadas em performance, automação e crescimento real.',
      rotation: 'rotate-1',
    }
  ]

  return (
    <section id="equipe" className="py-12 md:py-20 bg-ato-white overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-6 break-words mx-auto">
            A EQUIPE QUE<br />TRANSFORMA<br />OPERAÇÃO EM<br />TECNOLOGIA.
          </h2>
          <p className="text-sm leading-relaxed opacity-60 max-w-md mx-auto">
            Por trás da ATO existe uma equipe jovem, criativa e prática, focada em entender negócios de verdade e construir soluções digitais que funcionam no dia a dia.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center md:flex-wrap">
          {team.map((member) => (
            <div
              key={member.id}
              className={`${member.rotation} w-full max-w-[280px] bg-ato-off border-brutal border-ato-black shadow-lg p-3 pb-10`}
            >
              <img
                src={member.photo}
                alt={member.photoAlt}
                className="w-full aspect-square object-cover object-top mb-4 bg-gray-200"
              />
              <div className="px-2">
                <span className="font-mono text-[10px] font-bold tracking-widest px-2 py-1 bg-ato-green text-ato-black border border-ato-black mb-3 inline-block uppercase">
                  {member.role}
                </span>
                <h3 className="font-display font-black text-xl uppercase tracking-tight leading-tight mb-3">
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
