import { motion } from 'framer-motion'
import { Sparkle } from '@components/common/Stickers'
import { StarsBackground } from '@sections/Hero'
import { whatsappUrl } from '@lib/seoConfig'
import { trackEvent } from '@lib/analytics'

export default function CTABanner() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 relative overflow-hidden flex flex-col items-center justify-center text-center py-28 lg:py-36 px-6 text-white"
    >
      <StarsBackground />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Sparkle className="hidden md:block absolute -top-8 -left-10 w-9 h-9 rotate-[-6deg] opacity-70" color="#ffffff" />

        <h2
          className="font-display font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl max-w-4xl leading-[1.1] mb-4 text-white"
          style={{ fontFamily: "'Archivo Black', sans-serif" }}
        >
          PRONTO PARA TIRAR SUA OPERAÇÃO DO{' '}
          <span
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              color: 'transparent',
              WebkitTextStroke: '2px rgb(255, 255, 255)',
              paintOrder: 'stroke fill',
            }}
          >
            IMPROVISO?
          </span>
        </h2>

        <div className="flex items-center justify-center mt-8 z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_whatsapp', { location: 'cta_banner' })}
            className="bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 hover:scale-[1.03] text-xs uppercase tracking-widest"
          >
            Quero saber mais
          </a>
        </div>
      </motion.div>
    </section>
  )
}
