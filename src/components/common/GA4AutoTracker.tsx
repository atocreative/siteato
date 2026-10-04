'use client'

import { useEffect } from 'react'
import { buildEvent } from '@lib/ga4Classify'
import { trackEvent } from '@lib/analytics'

const TARGET_SELECTOR = 'a, button, [role="button"], [data-ga-click], [data-ga-event]'

// Rastreamento 100% automático: um único listener no document (delegação de eventos) classifica
// WhatsApp, telefone, e-mail e redes sociais pelo href e envia eventos recomendados do GA4
// (generate_lead / select_content). Funciona para botões renderizados depois (menus, modais).
// Nenhum onClick individual é necessário nos componentes.
export default function GA4AutoTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = (event: MouseEvent) => {
      // click = botão principal; auxclick só com botão do meio (abrir link em nova aba)
      if (event.type === 'auxclick' && event.button !== 1) return

      const origin = event.target
      if (!(origin instanceof Element)) return

      // closest() resolve cliques em <svg>, <path>, <span> e <img> aninhados dentro do link/botão
      const el = origin.closest(TARGET_SELECTOR)
      if (!el) return

      const anchor = el.closest('a')
      const href = anchor?.getAttribute('href') ?? el.getAttribute('data-ga-href')

      const tracked = buildEvent({
        href,
        dataEvent: el.getAttribute('data-ga-event'),
        dataLabel: el.getAttribute('data-ga-label'),
        dataClick: el.hasAttribute('data-ga-click'),
        text: el.textContent,
        ariaLabel: el.getAttribute('aria-label'),
        sectionId: el.closest('[id]')?.id ?? null,
        baseOrigin: window.location.origin,
      })
      if (!tracked) return

      try {
        trackEvent(tracked.name, tracked.params)
      } catch {
        // analytics nunca pode quebrar a navegação do usuário
      }
    }

    // Fase de captura: o evento é registrado mesmo se algum componente chamar stopPropagation()
    document.addEventListener('click', handler, true)
    document.addEventListener('auxclick', handler, true)
    return () => {
      document.removeEventListener('click', handler, true)
      document.removeEventListener('auxclick', handler, true)
    }
  }, [])

  return null
}
