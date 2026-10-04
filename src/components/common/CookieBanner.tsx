'use client'

import { useEffect, useState } from 'react'
import { privacyPolicyPath } from '@lib/seoConfig'

const CONSENT_KEY = 'cookie_consent'

export default function CookieBanner() {
  // Renderizado no HTML do servidor (nasce visível) para pintar junto com o conteúdo principal e
  // não virar um elemento de LCP tardio. Quem já aceitou é escondido antes da pintura por CSS
  // (classe `consent-granted` aplicada pelo script inline do layout) e aqui após a hidratação.
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(CONSENT_KEY) === 'granted') setVisible(false)
    } catch {
      // localStorage indisponível (modo privado) — mantém o banner visível
    }
  }, [])

  function handleAccept() {
    try {
      window.localStorage.setItem(CONSENT_KEY, 'granted')
    } catch {
      // localStorage indisponível (modo privado) — apenas fecha o banner nesta sessão
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="cookie-banner fixed bottom-4 left-4 z-50 max-w-[320px] sm:max-w-[340px] bg-black/90 backdrop-blur-md border border-neutral-800 rounded-xl p-3.5 shadow-2xl"
    >
      <p className="text-[11px] leading-snug text-neutral-400 font-normal mb-3">
        Usamos cookies para melhorar sua experiência e medir desempenho, em conformidade com a LGPD.{' '}
        <a href={privacyPolicyPath} className="text-neutral-300 hover:text-white underline">
          Política de Privacidade
        </a>
        .
      </p>
      <button
        type="button"
        onClick={handleAccept}
        className="min-h-[48px] text-xs font-bold bg-ato-green text-black px-5 py-1 rounded-md hover:bg-ato-green-dark transition-colors"
      >
        Entendi
      </button>
    </div>
  )
}
