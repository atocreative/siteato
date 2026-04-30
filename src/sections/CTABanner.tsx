import { motion } from 'framer-motion'
import Button from '@components/common/Button'

export default function CTABanner() {
  return (
    <section id="contato" className="scroll-mt-24 bg-gradient-to-b from-ato-green to-ato-green-dark text-ato-black py-20 md:py-28 border-y-brutal border-ato-black relative overflow-hidden">
      <div className="ato-container">
        <motion.div
          className="relative z-10 max-w-3xl"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-7 h-0.5 bg-ato-black opacity-40"></div>
            <span className="text-xs font-bold uppercase tracking-widest opacity-60">Vamos conversar</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase leading-none tracking-tight mb-6 break-words">
            PRONTO PARA<br />TIRAR SUA<br />OPERAÇÃO DO<br />IMPROVISO?
          </h2>
          <p className="text-sm md:text-base opacity-70 max-w-md mb-10 leading-relaxed">
            Vamos entender seu negócio e criar uma estrutura digital que ajude sua empresa a operar melhor, vender com mais inteligência e crescer com tecnologia aplicada ao mundo real.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-ato-black text-ato-white border-ato-black shadow-brutal"
              onClick={() => {
                window.location.href = 'mailto:contato@atosolutions.com.br'
              }}
            >
              Quero conversar com a ATO
            </Button>
            <a
              href="#solucoes"
              className="text-xs font-bold uppercase tracking-widest underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity"
            >
              Ver nossas soluções
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 text-[14rem] font-display font-black text-black/5 pointer-events-none leading-none select-none">
        →
      </div>
    </section>
  )
}
