import { motion } from 'framer-motion'
import type { Testimonial } from '@types'

export default function Clients() {
  const clients = [
    'CLÍNICA DR. SILVA',
    'ADVOCACIA LEMOS',
    'VINÍCOLA PLANALTO',
    'INSTITUTO SAÚDE+',
    'ESCRITÓRIO RAMOS',
    'CLÍNICA ESTÉTICA',
    'VINI BRASILIANA',
    'ADVOCACIA PLURAL'
  ]

  const testimonials: Testimonial[] = [
    {
      id: '1',
      quote: 'A ATO. transformou nossa presença digital. Em 4 meses, triplicamos agendamentos online.',
      author: 'Dra. Ana Beatriz',
      role: 'Clínica Dermatológica',
      company: 'Brasília, DF'
    },
    {
      id: '2',
      quote: 'Queríamos modernizar o escritório sem perder credibilidade. A ATO. entregou um site e redes que nos representam.',
      author: 'Dr. Marcos Lemos',
      role: 'Advocacia',
      company: 'DF'
    },
    {
      id: '3',
      quote: 'Trabalhar com a ATO. é diferente. Eles não vendem pacote, vendem solução que abriu canais de venda.',
      author: 'Rafael Guimarães',
      role: 'Vinícola',
      company: 'DF'
    }
  ]

  return (
    <section id="clientes" className="bg-gradient-to-b from-ato-green to-ato-green-dark text-ato-black py-20 border-y-brutal border-ato-black">
      {/* Header — containerized */}
      <div className="ato-container mb-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-7 h-0.5 bg-ato-black"></div>
          <span className="text-xs font-bold uppercase tracking-widest">Quem confia na ATO.</span>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <h2 className="font-display font-black text-4xl md:text-5xl lg:text-6xl uppercase leading-tight tracking-tight break-words">
            NOSSOS<br />CLIENTES
          </h2>
          <p className="text-sm leading-relaxed max-w-xs opacity-65">
            Clínicas, escritórios de advocacia, vinícolas e negócios que crescem no digital com resultado de verdade.
          </p>
        </div>
      </div>

      {/* Full-bleed marquee — deliberadamente fora do container */}
      <div className="bg-ato-black border-y-brutal border-white/20 overflow-hidden mb-16">
        <div className="flex animate-scroll-marquee whitespace-nowrap">
          {[...clients, ...clients, ...clients].map((client, i) => (
            <div key={i} className="inline-flex items-center px-12 py-8">
              <span className="font-display font-black text-white opacity-50 text-sm tracking-widest">{client}</span>
              <span className="ml-12 text-ato-green opacity-40">◆</span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials — containerized */}
      <div className="ato-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="p-8 bg-ato-white border-brutal border-ato-black shadow-brutal"
              whileHover={{ transform: 'translate(-8px, -8px)', boxShadow: '16px 16px 0 #0F0F0F' }}
            >
              <div className="font-display font-black text-6xl text-ato-green leading-none mb-3">"</div>
              <p className="text-sm leading-relaxed opacity-70 mb-6">{testimonial.quote}</p>
              <div className="w-7 h-0.5 bg-ato-black mb-3"></div>
              <div className="text-xs font-bold uppercase tracking-widest">{testimonial.author}</div>
              <div className="text-xs opacity-40 mt-1">{testimonial.role} — {testimonial.company}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
