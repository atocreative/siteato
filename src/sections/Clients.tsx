import { motion } from 'framer-motion'
import type { Testimonial } from '@types'

export default function Clients() {
  const logos = [
    { src: '/logos/getme.png',               alt: 'GetMe' },
    { src: '/logos/macho.png',               alt: 'Macho' },
    { src: '/logos/mcsneakers.png',          alt: 'MC Sneakers' },
    { src: '/logos/private.png',             alt: 'Private' },
    { src: '/logos/rfit.png',                alt: 'RFit' },
    { src: '/logos/guimecell.webp',          alt: 'Guimecell' },
    { src: '/logos/logo-bs-diagnostica.webp',alt: 'BS Diagnóstica' },
  ]

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: 'A ATO revolucionou o posicionamento digital da Private. Eles entenderam perfeitamente a nossa essência e entregaram uma estrutura que nos coloca à frente no mercado. O resultado de autoridade é nítido.',
      author: 'Matheus Torres',
      role: 'Private',
      company: ''
    },
    {
      id: '2',
      quote: 'O site novo não é apenas bonito, é uma verdadeira máquina de vendas. A experiência do usuário ficou impecável e a nossa taxa de conversão disparou desde o lançamento. Entrega absurda.',
      author: 'Matheus Caetano',
      role: 'Mc Snearkers',
      company: ''
    },
    {
      id: '3',
      quote: 'Com a nova estrutura e as automações implementadas pela ATO, o faturamento da Guimecell aumentou em mais de 10% logo de cara. O negócio escalou de forma muito mais organizada.',
      author: 'Guilherme',
      role: 'Guimecell',
      company: ''
    }
  ]

  return (
    <section id="clientes" className="bg-ato-green text-ato-black py-20">
      {/* Header */}
      <div className="container mb-12">
        <div className="text-center mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight break-words mx-auto">
            NOSSOS<br />CLIENTES
          </h2>
        </div>
      </div>

      {/* Logos grid — full-bleed fundo transparente, logos brancas */}
      <div className="overflow-hidden mb-16">
        <div className="flex animate-scroll-marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center flex-shrink-0 px-10"
              style={{ height: '120px' }}
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="w-auto object-contain grayscale opacity-75 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                style={{ maxHeight: '80px' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Depoimentos */}
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="p-8 bg-ato-off border-brutal border-ato-black shadow-brutal"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="font-display font-black text-6xl text-ato-green leading-none mb-3">"</div>
              <p className="text-sm leading-relaxed opacity-70 mb-6 text-ato-black">{testimonial.quote}</p>
              <div className="w-7 h-0.5 bg-ato-black mb-3"></div>
              <div className="text-xs font-bold uppercase tracking-widest text-ato-black">{testimonial.author}</div>
              <div className="text-xs opacity-40 mt-1 text-ato-black">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
