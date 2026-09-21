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

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-[999] bg-ato-black text-ato-white"
      style={{ borderTop: '2px solid #39FF14', boxShadow: '0 -6px 0 rgba(0,0,0,0.15)' }}
    >
      <div className="ato-container flex flex-col md:flex-row items-center justify-between gap-4 py-4">
        <p className="text-xs leading-relaxed opacity-80 text-center md:text-left">
          Usamos cookies e tecnologias semelhantes para melhorar sua experiência, medir
          desempenho e personalizar conteúdo, em conformidade com a LGPD. Saiba mais na{' '}
          <a
            href={privacyPolicyPath}
            className="underline text-ato-green hover:opacity-80"
          >
            Política de Privacidade
          </a>
          .
        </p>
        <button
          type="button"
          onClick={handleAccept}
          className="flex-shrink-0 text-[11px] font-bold uppercase tracking-[2px] px-6 py-3 bg-ato-green text-ato-black border-[1.5px] border-ato-black"
          style={{ boxShadow: '3px 3px 0 #39FF14' }}
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
