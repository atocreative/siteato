import type { Metadata } from 'next'
import Link from 'next/link'
import ContactFunnel from '@components/contact/ContactFunnel'
import { StarsBackground } from '@sections/Hero'
import {
  siteUrl,
  siteName,
  siteDescription,
  contactPagePath,
  whatsappUrl,
  contactEmail,
  contactPhone,
} from '@lib/seoConfig'

export const metadata: Metadata = {
  title: 'Fale com a ATO.',
  description:
    'Conte o que você precisa em poucas perguntas e fale direto com a ATO. no WhatsApp: sites, sistemas internos, automações e IA para o seu negócio em Brasília e todo o Brasil.',
  alternates: { canonical: contactPagePath },
  openGraph: { url: contactPagePath, title: `Fale com a ATO. — ${siteName}` },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': `${siteUrl}${contactPagePath}#contact`,
      url: `${siteUrl}${contactPagePath}`,
      name: `Fale com a ATO. — ${siteName}`,
      description: siteDescription,
      inLanguage: 'pt-BR',
      about: { '@type': 'ProfessionalService', name: siteName, url: siteUrl, email: contactEmail, telephone: contactPhone },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${siteUrl}/` },
        { '@type': 'ListItem', position: 2, name: 'Contato', item: `${siteUrl}${contactPagePath}` },
      ],
    },
  ],
}

export default function ContatoPage() {
  return (
    <main id="conteudo" className="relative min-h-screen overflow-x-hidden bg-ato-black text-ato-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <StarsBackground />

      <div className="relative z-20">
        <header className="ato-container flex items-center justify-between py-6">
          <Link href="/" aria-label="Voltar para a página inicial da ATO.">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/atobranco.svg"
              alt="Logotipo branco da ATO., agência de tecnologia em Brasília"
              width={260}
              height={91}
              className="h-auto w-auto object-contain"
              style={{ maxHeight: '32px' }}
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center min-h-[48px] px-2 text-xs font-bold uppercase tracking-[2px] text-white/80 hover:text-ato-green"
          >
            ← Voltar ao site
          </Link>
        </header>

        <section className="ato-container pb-20 pt-6 sm:pt-12">
          <div className="mx-auto mb-10 max-w-2xl">
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[3px] text-ato-green">Orçamento sem enrolação</p>
            <h1 className="font-display font-black text-4xl sm:text-5xl uppercase leading-none tracking-tight">
              Conte seu projeto<span className="text-ato-green">.</span>
            </h1>
            <p className="mt-4 text-base text-white/75 leading-relaxed">
              Responda poucas perguntas e a gente já abre o WhatsApp com tudo pronto para conversar sobre o que a ATO. pode fazer pelo seu negócio.
            </p>
          </div>

          <ContactFunnel />

          <noscript>
            <p className="mx-auto mt-10 max-w-2xl text-sm text-white/80">
              O formulário precisa de JavaScript. Você também pode{' '}
              <a href={whatsappUrl} className="font-bold text-ato-green underline">
                falar direto pelo WhatsApp
              </a>
              .
            </p>
          </noscript>
        </section>
      </div>
    </main>
  )
}
