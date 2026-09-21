import { useEffect, useState } from 'react'
import { privacyPolicyPath } from '@lib/seoConfig'

const CONSENT_KEY = 'cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const consent = window.localStorage.getItem(CONSENT_KEY)
      if (consent !== 'granted') setVisible(true)
    } catch {
      setVisible(true)
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

  function handleDismiss() {
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-4 left-4 z-50 max-w-[320px] sm:max-w-[340px] bg-black/90 backdrop-blur-md border border-neutral-800 rounded-xl p-3.5 shadow-2xl"
    >
      <p className="text-[11px] leading-snug text-neutral-400 font-normal mb-3">
        Usamos cookies para melhorar sua experiência e medir desempenho, em conformidade com a LGPD.{' '}
        <a href={privacyPolicyPath} className="text-neutral-300 hover:text-white underline">
          Política de Privacidade
        </a>
        .
      </p>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleAccept}
          className="text-xs font-bold bg-[#39FF14] text-black px-3 py-1 rounded-md hover:bg-[#2BD60E] transition-colors"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Fechar aviso de cookies"
          className="text-neutral-500 hover:text-white text-xs px-2 py-1"
        >
          ×
        </button>
      </div>
    </div>
  )
}
