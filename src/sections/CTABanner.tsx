import { motion } from 'framer-motion'
import { Sparkle } from '@components/common/Stickers'

export default function CTABanner() {
  return (
    <section
      id="contato"
      className="scroll-mt-24 relative overflow-hidden flex flex-col items-center justify-center text-center py-28 lg:py-36 px-6 bg-[#050505] text-white"
    >
      {/* Glow ambiente neon verde, centrado atrás do conteúdo */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(57,255,20,0.20), rgba(57,255,20,0.08) 45%, transparent 75%)',
        }}
      />

      {/* Feixes de luz sutis, angulados */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background:
            'linear-gradient(115deg, rgba(57,255,20,0.08) 0%, transparent 22%), linear-gradient(245deg, rgba(57,255,20,0.06) 0%, transparent 28%)',
        }}
      />

      {/* Poeira estelar sutil */}
      <svg className="pointer-events-none absolute inset-0 z-0 w-full h-full opacity-40" aria-hidden="true">
        <filter id="cta-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 1  0 0 0 0 0.33  0 0 0 0.045 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cta-noise)" />
      </svg>

      {/* Arco de horizonte curvo brilhante, na base da seção */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[-260px] sm:bottom-[-360px] w-[900px] sm:w-[1400px] aspect-square rounded-full z-0"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(57,255,20,0.16), rgba(57,255,20,0.04) 45%, transparent 72%)',
          borderTop: '2px solid rgba(57,255,20,0.65)',
          boxShadow: '0 -10px 40px rgba(57,255,20,0.4), 0 -2px 80px rgba(57,255,20,0.22)',
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Sparkle className="hidden md:block absolute -top-8 -left-10 w-9 h-9 rotate-[-6deg] opacity-70" color="#ffffff" />

        <h2
          className="font-display font-black uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl max-w-4xl leading-[1.1] mb-4"
          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.65)) drop-shadow(0 1px 2px rgba(0,0,0,0.85))' }}
        >
          PRONTO PARA TIRAR SUA OPERAÇÃO DO <span className="text-[#39FF14]">IMPROVISO?</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 z-10">
          <a
            href="https://wa.me/556191995064"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#39FF14] text-black font-bold px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)] transition-all duration-300 hover:scale-[1.03] text-xs uppercase tracking-widest"
          >
            Quero saber mais
          </a>
          <a
            href="https://instagram.com/ato.creative"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700/80 font-medium px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 text-xs uppercase tracking-widest"
          >
            Ver Instagram
          </a>
        </div>
      </motion.div>
    </section>
  )
}
