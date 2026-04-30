export default function Footer() {
  const whatWeDo = [
    'Sites e landing pages',
    'Sistemas internos',
    'Automações',
    'IA para negócios',
    'Posicionamento digital'
  ]

  const socials = [
    { label: 'WhatsApp', href: '#', short: 'WA' },
    { label: 'Instagram', href: '#', short: 'IG' },
    { label: 'LinkedIn', href: '#', short: 'LI' },
    { label: 'YouTube', href: '#', short: 'YT' }
  ]

  return (
    <footer className="bg-ato-black text-ato-white border-t-brutal border-ato-white">
      <div className="ato-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-white/10">

          {/* Col 1 — Brand */}
          <div className="py-10 md:py-12 pr-0 md:pr-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-between gap-10">
            <div>
              <span className="font-display font-black text-3xl tracking-widest block mb-4">ATO.</span>
              <p className="text-sm opacity-40 leading-relaxed max-w-xs">
                Estruturas digitais para empresas que querem operar melhor, vender com mais inteligência e crescer com tecnologia aplicada ao mundo real.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ato-green mb-3">Siga a ATO</p>
              <div className="flex gap-2 flex-wrap">
                {socials.map(s => (
                  <a
                    key={s.short}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 border border-white/20 flex items-center justify-center text-xs font-bold hover:bg-ato-green hover:border-ato-green hover:text-ato-black transition-all"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2 — O que fazemos */}
          <div className="py-10 md:py-12 md:px-12 border-b md:border-b-0 md:border-r border-white/10">
            <p className="text-xs font-bold uppercase tracking-widest text-ato-green mb-6">O que fazemos</p>
            <ul className="space-y-3">
              {whatWeDo.map((item, i) => (
                <li key={i}>
                  <a
                    href="#solucoes"
                    className="text-sm opacity-50 hover:opacity-100 hover:text-ato-green transition-all flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-ato-green rounded-full flex-shrink-0 opacity-60"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Vamos conversar */}
          <div className="py-10 md:py-12 md:pl-12 flex flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-ato-green mb-6">Vamos conversar</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs opacity-30 uppercase tracking-widest mb-1">E-mail</p>
                  <a
                    href="mailto:contato@atosolutions.com.br"
                    className="font-display font-black text-sm hover:text-ato-green transition-colors break-all"
                  >
                    contato@atosolutions.com.br
                  </a>
                </div>
                <div>
                  <p className="text-xs opacity-30 uppercase tracking-widest mb-1">WhatsApp</p>
                  <a href="#" className="font-display font-black text-sm hover:text-ato-green transition-colors">
                    Falar no WhatsApp →
                  </a>
                </div>
                <div>
                  <p className="text-xs opacity-30 uppercase tracking-widest mb-1">Instagram</p>
                  <a href="#" className="font-display font-black text-sm hover:text-ato-green transition-colors">
                    @atosolutions →
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs opacity-20 leading-relaxed">
                Setor de Autarquias Sul Q. 4 Bloco A<br />
                Edifício Victória Office Tower, 6º andar<br />
                Asa Sul, Brasília — DF
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 py-5 text-xs">
          <div className="flex items-center gap-4">
            <span className="font-display font-black text-lg tracking-widest">ATO.</span>
            <span className="opacity-20">© 2025 ATO. Soluções Digitais. Todos os direitos reservados.</span>
          </div>
          <span className="font-display font-black text-xs tracking-widest text-ato-green opacity-60 uppercase">
            Tecnologia aplicada ao mundo real.
          </span>
        </div>
      </div>
    </footer>
  )
}
