'use client'

import { instagramUrl, whatsappUrl, privacyPolicyPath } from '@lib/seoConfig'

const links = [
  { label: 'Instagram', href: instagramUrl, external: true },
  { label: 'WhatsApp', href: whatsappUrl, external: true },
  { label: 'Contato', href: 'mailto:suporte.atocriative@gmail.com', external: false },
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

        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()} ATO. Todos os direitos reservados. Brasília, DF.
        </p>
      </div>
    </footer>
  )
}
