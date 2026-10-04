// Montagem e validação dos formulários de ajustes. Puro: sem DOM nem React (testável em Node).

import type { AjusteConfig, AjusteItem, TextField } from '../constants/ajustes'
import { ADJUST_CHANGE } from '../constants/ajustes.ts'
import { cleanFreeText } from './funnelMessage.ts'

export type AjusteValues = Record<string, string>

export interface AjusteLimits {
  text: number
  textarea: number
}

const maxFor = (f: TextField, limits: AjusteLimits) => (f.type === 'textarea' ? limits.textarea : limits.text)

const clean = (f: TextField, values: AjusteValues, limits: AjusteLimits) =>
  f.type === 'textarea'
    ? cleanFreeText(values[f.id] ?? '', maxFor(f, limits))
    : cleanFreeText(values[f.id] ?? '', maxFor(f, limits)).replace(/\n+/g, ' ')

export interface PayloadEntry {
  id: string
  label: string
  value: string
  section: string
}

/** Todos os campos preenchidos e visíveis (grupos só contam com "Quero ajustar"), na ordem da tela. */
export function collectEntries(config: AjusteConfig, values: AjusteValues, limits: AjusteLimits): PayloadEntry[] {
  const entries: PayloadEntry[] = []
  config.sections.forEach((section) => {
    section.items.forEach((item: AjusteItem) => {
      if (item.kind === 'field') {
        const v = clean(item, values, limits)
        if (v) entries.push({ id: item.id, label: item.label, value: v, section: section.title })
      } else if (item.kind === 'choice') {
        const picked = values[item.id]
        if (picked && item.options.includes(picked)) entries.push({ id: item.id, label: item.label, value: picked, section: section.title })
      } else {
        const status = values[`${item.id}_status`]
        if (!status) return
        entries.push({ id: `${item.id}_status`, label: item.label, value: status, section: section.title })
        if (status === ADJUST_CHANGE) {
          for (const f of item.fields) {
            const v = clean(f, values, limits)
            if (v) entries.push({ id: f.id, label: f.label, value: v, section: section.title })
          }
        }
      }
    })
  })
  return entries
}

export function buildAjustesText(config: AjusteConfig, values: AjusteValues, limits: AjusteLimits): string {
  const entries = collectEntries(config, values, limits)
  const empresa = cleanFreeText(values.empresa ?? '', limits.text) || '—'
  let out = `*Ajustes finais (${config.kind === 'site' ? 'SITE' : 'SISTEMA'}) — ${empresa}*\n`
  let current = ''
  let n = 0
  for (const e of entries) {
    if (e.section !== current) {
      current = e.section
      n = config.sections.findIndex((s) => s.title === current) + 1
      out += `\n*${n}. ${current}*\n`
    }
    out += `• ${e.label}\n${e.value}\n\n`
  }
  return out.trim()
}

/** Payload enviado ao Formspree: campos com os mesmos nomes do formulário original + resumo legível. */
export function buildAjustesPayload(config: AjusteConfig, values: AjusteValues, limits: AjusteLimits, gotcha = ''): Record<string, string> {
  const payload: Record<string, string> = { _subject: config.subject, tipo: config.kind === 'site' ? 'Site' : 'Sistema', _gotcha: gotcha }
  for (const e of collectEntries(config, values, limits)) payload[e.id] = e.value
  payload.resumo = buildAjustesText(config, values, limits)
  payload.confirmacao = 'Sim'
  return payload
}

export interface ValidationResult {
  ok: boolean
  message: string
  fieldId: string
}

const EMAIL = /^\S+@\S+\.\S+$/

export function validateAjustes(config: AjusteConfig, values: AjusteValues, confirmed: boolean, limits: AjusteLimits): ValidationResult {
  for (const section of config.sections) {
    for (const item of section.items) {
      if (item.kind === 'field' && item.required && !clean(item, values, limits)) {
        return { ok: false, message: 'Preencha os campos marcados com *.', fieldId: item.id }
      }
    }
  }
  if (!EMAIL.test(cleanFreeText(values.email ?? '', limits.text))) {
    return { ok: false, message: 'Confira o e-mail, parece que tem algo errado.', fieldId: 'email' }
  }
  if (!confirmed) {
    return { ok: false, message: 'Marque a confirmação no final para enviar.', fieldId: 'confirmacao' }
  }
  return { ok: true, message: '', fieldId: '' }
}
