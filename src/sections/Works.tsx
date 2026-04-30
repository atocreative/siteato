import { motion } from 'framer-motion'
import Button from '@components/common/Button'
import type { Work } from '@types'

export default function Works() {
  const works: Work[] = [
    {
      id: '1',
      title: 'Clínica Dr. Silva',
      category: 'Site & Social Media com IA',
      client: 'Clínica Médica — Brasília, DF',
      tag: 'SITE + SOCIAL MEDIA IA',
      bgColor: 'bg-ato-green'
    },
    {
      id: '2',
      title: 'Advocacia Plural',
      category: 'Sistema Web',
      client: 'Escritório — DF',
      tag: 'SISTEMA WEB',
      bgColor: 'bg-ato-purple'
    },
    {
      id: '3',
      title: 'Instituto Saúde+',
      category: 'App Mobile',
      client: 'Saúde — Brasília, DF',
      tag: 'APP MOBILE',
      bgColor: 'bg-ato-yellow'
    },
    {
      id: '4',
      title: 'Vinícola Planalto',
      category: 'Branding + Site',
      client: 'Vinícola — DF',
      tag: 'BRANDING + SITE',
      bgColor: 'bg-ato-black'
    },
    {
      id: '5',
      title: 'Advocacia Lemos',
      category: 'Social Media com IA',
      client: 'Escritório — DF',
      tag: 'SOCIAL MEDIA IA',
      bgColor: 'bg-ato-red'
    },
    {
      id: '6',
      title: 'Clínica Estética',
      category: 'Sistema & App',
      client: 'Estética Avançada — DF',
      tag: 'SISTEMA + APP',
      bgColor: 'bg-gray-400'
    }
  ]

  return (
    <section id="trabalhos" className="py-20 border-b-brutal border-ato-black">
      <div className="ato-container">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-7 h-0.5 bg-ato-green"></div>
              <span className="text-xs font-bold uppercase tracking-widest">Portfólio</span>
            </div>
            <h2 className="font-display font-black text-5xl md:text-6xl uppercase leading-tight tracking-tight">
              NOSSOS<br />TRABALHOS
            </h2>
          </div>
          <Button variant="outline">Quero o meu</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-brutal border-ato-black">
          {works.map((work, idx) => {
            let colSpan = 'md:col-span-6'

            if (idx === 0) {
              colSpan = 'md:col-span-7'
            } else if (idx === 1 || idx === 2) {
              colSpan = 'md:col-span-5'
            } else if (idx >= 3) {
              colSpan = 'md:col-span-4'
            }

            return (
              <motion.div
                key={work.id}
                className={`${colSpan} border-brutal border-ato-black overflow-hidden group cursor-pointer hover:bg-opacity-50`}
                whileHover={{ opacity: 0.85 }}
              >
                <div className={`${work.bgColor} min-h-60 flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <span className="font-display font-black text-white text-xl tracking-wide">Ver projeto</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-ato-black text-white text-xs font-bold px-3 py-1 tracking-widest">
                    {work.tag}
                  </div>
                </div>
                <div className="p-5 bg-ato-off border-t-brutal border-ato-black">
                  <div className="text-xs font-bold uppercase tracking-widest text-ato-green-dark mb-2">{work.category}</div>
                  <h3 className="font-display font-black text-lg uppercase tracking-tight">{work.title}</h3>
                  <p className="text-xs opacity-40 mt-1">{work.client}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
