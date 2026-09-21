import { Sparkle } from '@components/common/Stickers'

export default function About() {
  return (
    <section id="sobre" className="relative overflow-hidden bg-white py-24 lg:py-32">
      {/* Textura orgânica de fundo — Neo-Memphis, opacidade baixa, não interativa */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]"
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

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Coluna esquerda — Título sobre o elemento 3D (backdrop) */}
          <div className="lg:col-span-5 relative overflow-visible flex items-center justify-center w-full min-h-[380px] lg:min-h-[440px]">
            <img
              src="/mane.png"
              alt=""
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-[380px] sm:w-[440px] lg:w-[480px] xl:w-[520px] max-w-full h-auto object-contain opacity-90"
            />
            <h2
              className="relative z-10 text-center select-none uppercase tracking-tight text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.65)) drop-shadow(0 1px 2px rgba(0,0,0,0.85))' }}
            >
              <span className="font-sans text-neutral-950">SOMOS A</span>
              <br />
              <span className="font-display text-[#39FF14]">ATO</span>
              <span className="font-display text-neutral-950">.</span>
            </h2>

            <Sparkle className="hidden md:block absolute -top-2 right-6 w-9 h-9 rotate-[12deg] opacity-80 z-10" />
          </div>

          {/* Coluna direita — Corpo de texto */}
          <div className="lg:col-span-7 text-left space-y-6">
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700">
              Nascemos em Brasília para conectar negócios reais à tecnologia. Somos
              amigos de longa data que decidiram unir suas melhores qualidades em
              uma parceria estratégica.
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700">
              Unimos visão de mercado, design e engenharia de software para
              posicionar empresas da melhor forma possível no digital, construindo
              sistemas, sites e plataformas que resolvem problemas de verdade.
            </p>
            <p className="text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-neutral-700">
              Nossos escritórios ficam no Estádio Mané Garrincha e estamos à
              disposição para quem quiser agendar uma reunião presencial.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
