import type { Metadata } from 'next'
import Link from 'next/link'
import AjustesForm from '@components/contact/AjustesForm'
import { StarsBackground } from '@sections/Hero'
import { ajustesPagePath } from '@lib/seoConfig'

export const metadata: Metadata = {
  title: 'Ajustes finais do seu site ou sistema',
  description:
    'Área do cliente ATO.: anote em um único envio os ajustes finais que você quer no seu site ou sistema antes de ir ao ar.',
  alternates: { canonical: ajustesPagePath },
  openGraph: { url: ajustesPagePath, title: 'Ajustes finais — ATO.' },
}

export default function AjustesPage() {
  return (
    <main id="conteudo" className="relative min-h-screen overflow-x-hidden bg-ato-black text-ato-white">
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
            <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[3px] text-ato-green">Área do cliente</p>
            <h1 className="font-display font-black text-4xl sm:text-5xl uppercase leading-none tracking-tight">
              Ajustes finais<span className="text-ato-green">.</span>
            </h1>
            <p className="mt-4 text-base text-white/75 leading-relaxed">
              Escolha se o ajuste é no seu site ou no seu sistema e conte o que fica e o que muda. Tudo em um único envio, sem ida e volta.
            </p>
          </div>

          <AjustesForm />

          <noscript>
            <p className="mx-auto mt-10 max-w-2xl text-sm text-white/80">O formulário precisa de JavaScript para funcionar. Ative-o no navegador e recarregue a página.</p>
          </noscript>
        </section>
      </div>
    </main>
  )
}
