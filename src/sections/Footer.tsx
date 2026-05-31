export default function Footer() {
  const whatWeDo = [
    'Sites e landing pages',
    'Sistemas internos',
    'Automações',
    'IA para negócios',
    'Posicionamento digital'
  ]

  return (
    <footer className="bg-ato-black text-ato-white">
      <div className="ato-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b border-white/10">

          {/* Col 1 — O que fazemos */}
          <div className="py-8 md:pr-12 border-b md:border-b-0 md:border-r border-white/10">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ato-green mb-5">O que fazemos</p>
            <ul className="space-y-2">
              {whatWeDo.map((item, i) => (
                <li key={i} className="text-sm opacity-50 flex items-center gap-2">
                  <span className="w-1 h-1 bg-ato-green rounded-full flex-shrink-0 opacity-60"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Vamos conversar */}
          <div className="py-8 md:pl-12">
            <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ato-green mb-5">Vamos conversar</p>
            <div className="space-y-4">
              <div>
                <p className="font-mono text-[10px] opacity-30 uppercase tracking-widest mb-1">E-mail</p>
                <a href="mailto:suporte.atocriative@gmail.com" className="font-display font-black text-sm hover:text-ato-green transition-colors break-all">
                  suporte.atocriative@gmail.com
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] opacity-30 uppercase tracking-widest mb-1">WhatsApp</p>
                <a href="https://wa.me/556191995064" target="_blank" rel="noreferrer" className="font-display font-black text-sm hover:text-ato-green transition-colors">
                  Falar no WhatsApp →
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] opacity-30 uppercase tracking-widest mb-1">Instagram</p>
                <a href="https://instagram.com/ato.creative" target="_blank" rel="noopener noreferrer" className="font-display font-black text-sm hover:text-ato-green transition-colors">
                  @ato.creative →
                </a>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="font-mono text-[10px] opacity-20 leading-relaxed">
                  Estádio Nacional - Eixo Monumental - SRPN - 2º Andar. CEP: 70070-701
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center text-center gap-6 md:gap-4 py-8 md:py-4 text-xs">
          <img src="/atobranco.svg" alt="ATO." className="w-24 object-contain order-1" />
          <span className="font-mono text-[10px] tracking-widest text-ato-green opacity-80 uppercase order-2 md:order-3" style={{ color: '#39FF14' }}>
            Sistemas em movimento.
          </span>
          <span className="opacity-20 order-3 md:order-2">
            © 2026 ATO. Soluções Digitais. Todos os direitos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
