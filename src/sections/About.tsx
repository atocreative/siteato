export default function About() {
  return (
    <section id="sobre" className="py-12 md:py-20 relative overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Imagem com blob shape — esquerda */}
          <div className="flex items-center justify-center order-2 md:order-1">
            <img
              src="/mane.jpg"
              alt="ATO Soluções Digitais"
              className="w-full max-w-[400px] aspect-square"
              style={{
                objectFit: 'cover',
                borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
              }}
            />
          </div>

          {/* Texto — direita */}
          <div className="order-1 md:order-2">
            <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight mb-8 break-words">
              SOMOS A<br /><span className="text-ato-green">ATO.</span>
            </h2>
            <p className="text-sm md:text-md leading-relaxed opacity-65 mb-8">
              Nascemos em Brasília para conectar negócios reais à tecnologia. Somos amigos de longa data que decidiram unir suas melhores qualidades para criar uma parceria estratégica. Unimos visão de mercado, design e engenharia de software para posicionar empresas da melhor forma possível no digital, construindo sistemas, sites e plataformas que resolvem problemas de verdade. Nossos escritórios ficam no Estádio Mané Garrincha e estamos à disposição para quem quiser agendar uma reunião presencial.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
