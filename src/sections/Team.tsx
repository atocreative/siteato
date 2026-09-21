import { Daisy } from '@components/common/Stickers'

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
    <section id="equipe" className="py-12 md:py-20 bg-white relative overflow-hidden">
      {/* Textura orgânica de fundo — Neo-Memphis, opacidade baixa, não interativa */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05] z-0"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M-50 120 C 150 20, 350 220, 550 100 S 900 40, 1150 160"
          stroke="#111111"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M-80 480 C 180 380, 320 620, 560 500 S 880 380, 1250 540"
          stroke="#111111"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="180" cy="650" r="120" stroke="#111111" strokeWidth="6" />
        <circle cx="1050" cy="140" r="90" stroke="#111111" strokeWidth="6" />
        <path
          d="M700 700 C 780 620, 900 720, 980 650 S 1120 600, 1220 680"
          stroke="#111111"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M50 260 C 40 340, 140 380, 120 300 S 90 200, 50 260 Z"
          stroke="#111111"
          strokeWidth="6"
        />
      </svg>

      <div className="relative z-10 container px-4 md:px-6">
        <div className="relative text-center mb-16">
          <Daisy className="hidden md:block absolute -top-4 left-1/2 -translate-x-[140px] w-10 h-10 rotate-[-12deg] opacity-90" />
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
              className={`w-full max-w-[280px] bg-white p-3 pb-6 rounded-2xl border border-neutral-200/60 shadow-[0_12px_30px_rgba(0,0,0,0.08)] transform ${member.rotation} transition-transform duration-300`}
            >
              <div className="relative mb-4 rounded-xl overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.photoAlt}
                  className="w-full aspect-square object-cover object-top bg-gray-200"
                />
                <span
                  className="absolute bottom-3 left-3 z-10 font-mono text-[10px] font-bold tracking-widest px-2 py-1 bg-ato-green text-ato-black rounded-full uppercase shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
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
