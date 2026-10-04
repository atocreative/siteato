// Montagem do texto do briefing (WhatsApp / e-mail / copiar). Puro: sem DOM nem React.

import type { BriefingSection, BriefingQuestion } from '../constants/briefing'
import { cleanFreeText, buildWhatsappUrl } from './funnelMessage.ts'

export interface BriefingState {
  empresa: string
  nome: string
  contato: string
  /** respostas das perguntas abertas: id -> texto */
  texts: Record<string, string>
  /** opções marcadas: id -> índices */
  picks: Record<string, number[]>
  /** textos das opções "Outro": `${id}:${índice}` -> texto */
  others: Record<string, string>
}

export const emptyBriefingState = (): BriefingState => ({
  empresa: '',
  nome: '',
  contato: '',
  texts: {},
  picks: {},
  others: {},
})

export interface BriefingLimitsLike {
  lead: number
  textarea: number
  other: number
}

/** Resposta de uma pergunta como texto único ('' quando não respondida). */
export function answerFor(q: BriefingQuestion, state: BriefingState, limits: BriefingLimitsLike): string {
  if (q.type === 'textarea') return cleanFreeText(state.texts[q.id] ?? '', limits.textarea)
  const picked = [...(state.picks[q.id] ?? [])].sort((a, b) => a - b)
  return picked
    .map((k) => {
      const option = q.options?.[k]
      if (!option) return ''
      if (!option.other) return option.label
      const extra = cleanFreeText(state.others[`${q.id}:${k}`] ?? '', limits.other)
      return extra ? `${option.label}: ${extra}` : option.label
    })
    .filter(Boolean)
    .join(', ')
}

export function countAnswered(sections: BriefingSection[], state: BriefingState, limits: BriefingLimitsLike): number {
  let n = 0
  for (const s of sections) for (const q of s.questions) if (answerFor(q, state, limits)) n++
  return n
}

export function buildBriefingText(sections: BriefingSection[], state: BriefingState, limits: BriefingLimitsLike): string {
  const empresa = cleanFreeText(state.empresa, limits.lead) || '—'
  const nome = cleanFreeText(state.nome, limits.lead) || '—'
  const contato = cleanFreeText(state.contato, limits.lead) || '—'

  let out = `*Briefing de Identidade Visual — ${empresa}*\n`
  out += `Respondido por: ${nome} (${contato})\n`

  sections.forEach((section, i) => {
    const lines: string[] = []
    for (const q of section.questions) {
      const answer = answerFor(q, state, limits)
      if (answer) lines.push(`• ${q.q}\n${answer}`)
    }
    if (lines.length) out += `\n*${i + 1}. ${section.title}*\n${lines.join('\n\n')}\n`
  })

  return out.trim()
}

export const buildWhatsappLink = buildWhatsappUrl

export function buildMailtoLink(email: string, empresa: string, text: string): string {
  const subject = `Briefing de Identidade Visual — ${cleanFreeText(empresa, 120) || 'marca'}`
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
}
