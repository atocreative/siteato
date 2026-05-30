import { motion } from 'framer-motion'
import Button from '@components/common/Button'

export default function CTABanner() {
  return (
    <section id="contato" className="scroll-mt-24 bg-gradient-to-b from-ato-green to-ato-green-dark text-ato-black py-20 md:py-28 relative overflow-hidden">
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
          <p className="text-sm md:text-base opacity-70 max-w-md mb-10 leading-relaxed">
            Criamos estruturas digitais sob medida para sua empresa operar melhor, vender mais e crescer no mundo real.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="bg-ato-black text-ato-white border-ato-black shadow-brutal"
              onClick={() => {
                window.location.href = 'mailto:contato@atosolutions.com.br'
              }}
            >
              Quero saber mais
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 text-[14rem] font-display font-black text-black/5 pointer-events-none leading-none select-none">
        →
      </div>
    </section>
  )
}
