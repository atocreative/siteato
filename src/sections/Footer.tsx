import { instagramUrl, whatsappUrl, privacyPolicyPath } from '@lib/seoConfig'
import { trackEvent } from '@lib/analytics'

const links = [
  { label: 'Instagram', href: instagramUrl, external: true, event: 'click_instagram' },
  { label: 'WhatsApp', href: whatsappUrl, external: true, event: 'click_whatsapp' },
  { label: 'Contato', href: 'mailto:suporte.atocriative@gmail.com', external: false, event: 'click_email' },
  { label: 'Política de Privacidade', href: privacyPolicyPath, external: false, event: null },
]

export default function Footer() {
  return (
    <footer className="bg-black text-ato-white py-16 md:py-20">
      <div className="flex flex-col items-center text-center mx-auto max-w-4xl px-4">
        <img src="/atobranco.svg" alt="ATO." className="w-28 object-contain mb-6" />

        <p className="text-sm md:text-base text-neutral-400 max-w-md mx-auto leading-relaxed mb-8">
          Sistemas, sites e automações que transformam operação em faturamento real.
        </p>

        <div className="w-full max-w-xs h-px bg-white/10 mb-8" />

        <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              onClick={() => link.event && trackEvent(link.event, { location: 'footer' })}
              className="text-sm text-neutral-400 hover:text-ato-green transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} ATO. Todos os direitos reservados. Brasília, DF.
        </p>
      </div>
    </footer>
  )
}
