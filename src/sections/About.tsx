export default function About() {
  return (
    <section id="sobre" className="py-24 md:py-36 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* Título Mobile (Visível apenas < 768px) */}
          <div className="md:hidden w-full text-center">
            <h2 className="font-display font-black text-4xl sm:text-5xl uppercase leading-tight tracking-tight mb-4 break-words w-full">
              SOMOS A<br />
              <span className="font-display font-black" style={{ color: '#0CBF0C' }}>ATO</span>
              <span className="font-display font-black" style={{ color: '#000000' }}>.</span>
            </h2>
          </div>

          {/* Imagem com blob shape (Coluna Esquerda no Desktop) */}
          <div className="flex items-center justify-center w-full max-w-sm mx-auto md:max-w-none">
            <img
              src="/mane.jpg"
              alt="ATO Soluções Digitais"
              className="w-full max-w-[400px] aspect-square shadow-[-8px_4px_0px_#000000] md:shadow-[-24px_4px_0px_#000000]"
              style={{
                objectFit: 'cover',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              }}
            />
          </div>

          {/* Texto e Título Desktop (Coluna Direita no Desktop) */}
          <div className="w-full text-center md:text-left">
            <h2 className="hidden md:block font-display font-black text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-8 break-words w-full">
              SOMOS A<br />
              <span className="font-display font-black" style={{ color: '#0CBF0C' }}>ATO</span>
              <span className="font-display font-black" style={{ color: '#000000' }}>.</span>
            </h2>
            <p className="text-sm md:text-base leading-relaxed opacity-65 mb-8">
              Nascemos em Brasília para conectar negócios reais à tecnologia. Somos amigos de longa data que decidiram unir suas melhores qualidades para criar uma parceria estratégica. Unimos visão de mercado, design e engenharia de software para posicionar empresas da melhor forma possível no digital, construindo sistemas, sites e plataformas que resolvem problemas de verdade. Nossos escritórios ficam no Estádio Mané Garrincha e estamos à disposição para quem quiser agendar uma reunião presencial.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
