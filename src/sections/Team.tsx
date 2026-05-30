export default function Team() {
  const team = [
    {
      id: '1',
      role: 'CEO & Fundador',
      name: 'João Gabriel',
      bio: 'Graduando em Ciência de Dados e formado em Administração. Dono de uma visão de negócio afiada, é o estrategista que conecta dados, mercado e estética. Sua missão é garantir que toda solução seja um motor real de faturamento e crescimento para o cliente.',
      rotation: '-rotate-1',
    },
    {
      id: '2',
      role: 'CTO & Fundador',
      name: 'Caio Vilela',
      bio: 'Graduado em Análise e Desenvolvimento de Sistemas (ADS) e pós-graduando em Engenharia de IA. Uma mente onde engenharia e design se encontram. Responsável por arquitetar as soluções da ATO, traduzindo estratégias de negócio em sistemas e ferramentas impecáveis.',
      rotation: 'rotate-1',
    }
  ]

  return (
    <section id="equipe" className="py-20 bg-ato-white border-b-brutal border-ato-black overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-6 break-words mx-auto">
            A EQUIPE QUE<br />TRANSFORMA<br />OPERAÇÃO EM<br />TECNOLOGIA.
          </h2>
          <p className="text-sm leading-relaxed opacity-60 max-w-md mx-auto">
            Por trás da ATO existe uma equipe jovem, criativa e prática, focada em entender negócios de verdade e construir soluções digitais que funcionam no dia a dia.
          </p>
        </div>

        <div className="flex gap-12 justify-center flex-wrap">
          {team.map((member) => (
            <div
              key={member.id}
              className={`${member.rotation} w-[280px] bg-ato-off border-brutal border-ato-black shadow-lg p-3 pb-10`}
            >
              <div className="w-full aspect-square bg-ato-black mb-5 flex items-center justify-center overflow-hidden">
                <span className="font-display font-black text-6xl text-ato-green opacity-20 select-none">
                  {member.name.charAt(0)}
                </span>
              </div>
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
