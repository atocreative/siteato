// Helper único de tracking — dispara GA4 e Meta Pixel simultaneamente quando presentes.

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
    window.fbq('trackCustom', eventName, params)
  }
}
