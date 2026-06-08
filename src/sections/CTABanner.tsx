import { motion } from 'framer-motion'
import Button from '@components/common/Button'

export default function CTABanner() {
  return (
    <section id="contato" className="scroll-mt-24 text-ato-black py-20 md:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #0CBF0C, #034A1A)' }}>
      <div className="container">
        <motion.div
          className="relative z-10 flex flex-col items-center text-center mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-none tracking-tight mb-6 break-words">
            PRONTO PARA<br />TIRAR SUA<br />OPERAÇÃO DO<br />IMPROVISO?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <a
              href="https://wa.me/556191995064"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest px-8 py-4 bg-ato-black text-ato-white inline-block"
              style={{ boxShadow: '5px 5px 0 #39FF14', transition: 'transform .1s, box-shadow .1s' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = 'translate(4px,4px)'
                el.style.boxShadow = 'none'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.transform = ''
                el.style.boxShadow = '5px 5px 0 #39FF14'
              }}
            >
              Quero saber mais
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
