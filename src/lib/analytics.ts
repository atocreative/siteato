// Helper único de tracking — dispara GA4 e Meta Pixel simultaneamente quando presentes.
// Chamado pelo GA4AutoTracker (delegação global de cliques); componentes não precisam de onClick.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    fbq?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }

  if (typeof window.fbq === 'function') {
    // generate_lead (WhatsApp/telefone/e-mail) vira o evento padrão Lead do Meta Pixel
    if (eventName === 'generate_lead') window.fbq('track', 'Lead', params)
    else window.fbq('trackCustom', eventName, params)
  }
}
