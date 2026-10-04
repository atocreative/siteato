'use client'

import { instagramUrl, whatsappUrl, privacyPolicyPath, contactPagePath, briefingPagePath, ajustesPagePath } from '@lib/seoConfig'

// Atalhos para clientes (briefing de identidade visual e ajustes finais de site/sistema)
const clientLinks = [
  { label: 'Briefing de identidade visual', href: briefingPagePath },
  { label: 'Ajustes do site ou sistema', href: ajustesPagePath },
]

const links = [
  { label: 'Instagram', href: instagramUrl, external: true },
  { label: 'WhatsApp', href: whatsappUrl, external: true },
  { label: 'Contato', href: contactPagePath, external: false },
  { label: 'Política de Privacidade', href: privacyPolicyPath, external: false },
]

export default function Footer() {
  return (
    <footer className="bg-black text-ato-white py-16 md:py-20">
      <div className="flex flex-col items-center text-center mx-auto max-w-4xl px-4">
        <img src="/atobranco.svg" alt="Logotipo branco da ATO., agência de tecnologia em Brasília especializada em sites, sistemas, automações e inteligência artificial para negócios" width={260} height={91} className="w-28 h-auto object-contain mb-6" />

        <p className="text-sm md:text-base text-neutral-400 max-w-md mx-auto leading-relaxed mb-8">
          Sistemas, sites e automações que transformam operação em faturamento real.
        </p>

        <div className="w-full max-w-xs h-px bg-white/10 mb-8" />

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-8 mb-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center min-h-[48px] px-2 text-sm text-neutral-400 hover:text-ato-green transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <nav aria-label="Área do cliente" className="mb-8 flex flex-col items-center gap-3">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[2px] text-neutral-400">Área do cliente</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {clientLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex items-center min-h-[48px] rounded-full border border-white/25 px-5 text-sm font-bold text-ato-white transition-colors hover:border-ato-green hover:text-ato-green"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} ATO. Todos os direitos reservados. Brasília, DF.
        </p>
      </div>
    </footer>
  )
}
