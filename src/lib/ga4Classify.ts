// Classificação pura (sem DOM, sem React) de cliques em eventos nativos do GA4.
// Isolada para poder ser testada em Node (scripts/verify-ga4.mjs).

export interface Ga4Event {
  name: string
  params: Record<string, string | boolean>
}

const SOCIAL_HOSTS: Array<[RegExp, string]> = [
  [/(^|\.)instagram\.com$/, 'instagram'],
  [/(^|\.)(facebook\.com|fb\.com|fb\.me)$/, 'facebook'],
  [/(^|\.)tiktok\.com$/, 'tiktok'],
  [/(^|\.)linkedin\.com$/, 'linkedin'],
  [/(^|\.)(youtube\.com|youtu\.be)$/, 'youtube'],
  [/(^|\.)(twitter\.com|x\.com)$/, 'x'],
  [/(^|\.)(threads\.net)$/, 'threads'],
  [/(^|\.)(t\.me|telegram\.me)$/, 'telegram'],
]

const WHATSAPP_HOSTS = /(^|\.)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp\.com|chat\.whatsapp\.com)$/

/** Classifica uma URL (href) em um evento recomendado do GA4. Retorna null quando não é contato/social. */
export function classifyHref(href: string, baseOrigin = 'http://localhost'): Ga4Event | null {
  const raw = href.trim()
  if (!raw) return null

  const lower = raw.toLowerCase()
  if (lower.startsWith('tel:')) {
    return { name: 'generate_lead', params: { method: 'phone', link_url: raw } }
  }
  if (lower.startsWith('mailto:')) {
    return { name: 'generate_lead', params: { method: 'email', link_url: raw } }
  }

  let url: URL
  try {
    url = new URL(raw, baseOrigin)
  } catch {
    return null
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null

  const host = url.hostname.toLowerCase()

  if (WHATSAPP_HOSTS.test(host)) {
    return {
      name: 'generate_lead',
      params: { method: 'whatsapp', link_url: raw, link_domain: host, outbound: true },
    }
  }

  for (const [pattern, platform] of SOCIAL_HOSTS) {
    if (pattern.test(host)) {
      return {
        name: 'select_content',
        params: { content_type: 'social_link', item_id: platform, link_url: raw, link_domain: host, outbound: true },
      }
    }
  }

  return null
}

const MAX_TEXT = 100

export function cleanText(value: string | null | undefined): string {
  return (value ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_TEXT)
}

export interface ClickMeta {
  href?: string | null
  /** Valor de data-ga-event (evento customizado). */
  dataEvent?: string | null
  /** Valor de data-ga-label. */
  dataLabel?: string | null
  text?: string | null
  ariaLabel?: string | null
  sectionId?: string | null
  /** Marca presença de data-ga-click (CTA sem URL de contato). */
  dataClick?: boolean
  baseOrigin?: string
}

const EVENT_NAME = /^[a-zA-Z][a-zA-Z0-9_]{0,39}$/

/** Decide qual evento GA4 enviar para um clique, ou null se o clique não deve ser rastreado. */
export function buildEvent(meta: ClickMeta): Ga4Event | null {
  const extra: Record<string, string | boolean> = {}
  const text = cleanText(meta.text)
  const aria = cleanText(meta.ariaLabel)
  if (text) extra.button_text = text
  if (aria) extra.aria_label = aria
  if (meta.sectionId) extra.section_id = meta.sectionId
  if (meta.dataLabel) extra.label = cleanText(meta.dataLabel)

  // 1) Evento customizado declarado no HTML (data-ga-event), com prioridade sobre a classificação.
  if (meta.dataEvent && EVENT_NAME.test(meta.dataEvent)) {
    const fromHref = meta.href ? classifyHref(meta.href, meta.baseOrigin) : null
    return {
      name: meta.dataEvent,
      params: { ...(fromHref?.params ?? (meta.href ? { link_url: meta.href } : {})), ...extra },
    }
  }

  // 2) Classificação automática por URL (WhatsApp, telefone, e-mail, redes sociais).
  if (meta.href) {
    const auto = classifyHref(meta.href, meta.baseOrigin)
    if (auto) return { name: auto.name, params: { ...auto.params, ...extra } }
  }

  // 3) CTA marcado com data-ga-click, sem evento nem URL de contato.
  if (meta.dataClick) {
    return { name: 'select_content', params: { content_type: 'cta', item_id: extra.label ?? text ?? 'cta', ...extra } }
  }

  return null
}
