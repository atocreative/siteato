'use client'

import { useRef, useState } from 'react'
import {
  ADJUST_CHANGE,
  ADJUST_OK,
  ajusteConfigs,
  ajusteLimits,
  type AjusteKind,
  type TextField,
} from '@constants/ajustes'
import {
  buildAjustesPayload,
  buildAjustesText,
  validateAjustes,
  type AjusteValues,
} from '@lib/ajustesMessage'
import { buildWhatsappUrl } from '@lib/funnelMessage'
import { ajustesFormUrl, whatsappNumber } from '@lib/seoConfig'

const kinds: AjusteKind[] = ['site', 'sistema']

const fieldClass =
  'w-full rounded-xl border-2 border-white/25 bg-white/5 px-4 py-3 text-base text-ato-white placeholder:text-white/50 focus:border-ato-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green'
const primaryBtn =
  'inline-flex items-center justify-center min-h-[52px] rounded-full bg-ato-green px-8 text-xs font-bold uppercase tracking-widest text-ato-black shadow-[0_0_25px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-[1.03] disabled:opacity-60 disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
const ghostBtn =
  'inline-flex items-center justify-center min-h-[52px] rounded-full border-2 border-white/30 px-8 text-xs font-bold uppercase tracking-widest text-ato-white transition-colors hover:border-ato-green hover:text-ato-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ato-green'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function AjustesForm() {
  const [kind, setKind] = useState<AjusteKind | null>(null)
  const [values, setValues] = useState<AjusteValues>({})
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [notice, setNotice] = useState('')
  const gotcha = useRef<HTMLInputElement>(null)

  const config = kind ? ajusteConfigs[kind] : null
  const set = (id: string, value: string) => {
    setValues((v) => ({ ...v, [id]: value }))
    setError('')
  }

  function chooseKind(next: AjusteKind) {
    setKind(next)
    setError('')
    setStatus('idle')
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!config) return
    const result = validateAjustes(config, values, confirmed, ajusteLimits)
    if (!result.ok) {
      setError(result.message)
      document.getElementById(result.fieldId)?.focus()
      return
    }
    setError('')
    setStatus('sending')
    try {
      const response = await fetch(ajustesFormUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildAjustesPayload(config, values, ajusteLimits, gotcha.current?.value ?? '')),
      })
      if (!response.ok) throw new Error('bad status')
      setStatus('sent')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setStatus('error')
      setError('Não conseguimos enviar agora. Tente de novo em instantes ou envie pelo WhatsApp.')
    }
  }

  const text = config ? buildAjustesText(config, values, ajusteLimits) : ''
  const whatsappHref = buildWhatsappUrl(whatsappNumber, text)

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(text)
      setNotice('Ajustes copiados. Cole na conversa com a gente.')
    } catch {
      setNotice('Não foi possível copiar automaticamente.')
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="mx-auto max-w-2xl rounded-2xl border-2 border-ato-green bg-ato-green/10 p-8 text-center">
        <p className="font-display text-3xl font-black uppercase leading-tight text-ato-white">Recebido<span className="text-ato-green">.</span></p>
        <p className="mt-4 text-base text-white/85 leading-relaxed">
          Já temos tudo que precisamos. Vamos aplicar os ajustes e voltar com a versão final pra sua aprovação.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Escolha: site ou sistema */}
      <fieldset>
        <legend className="mb-4 font-display text-2xl font-black uppercase leading-tight tracking-tight text-ato-white">
          O que você quer ajustar?
        </legend>
        <div role="radiogroup" aria-label="Tipo de projeto" className="grid gap-4 sm:grid-cols-2">
          {kinds.map((k) => {
            const active = kind === k
            const c = ajusteConfigs[k]
            return (
              <button
                key={k}
                type="button"
                role="radio"
                aria-checked={active}
                data-kind={k}
                onClick={() => chooseKind(k)}
                className={`flex min-h-[56px] flex-col gap-1 rounded-2xl border-2 px-5 py-4 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green ${
                  active
                    ? 'border-ato-green bg-ato-green text-ato-black shadow-[5px_5px_0_#ffffff]'
                    : 'border-white/25 bg-white/5 text-ato-white hover:border-ato-green hover:bg-white/10'
                }`}
              >
                <span className="text-lg font-bold">{c.label}</span>
                <span className={`text-sm leading-snug ${active ? 'text-ato-black/80' : 'text-white/70'}`}>{c.description}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      {config && (
        <form key={config.kind} onSubmit={submit} noValidate className="mt-12 ato-fade-up" aria-label={`Ajustes finais do ${config.label.toLowerCase()}`}>
          <h2 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-ato-white sm:text-4xl">{config.heading}</h2>
          <p className="mt-4 text-base leading-relaxed text-white/80">{config.intro}</p>
          <p className="mt-4 font-mono text-[11px] font-bold uppercase tracking-[2px] text-ato-green">
            ~10 min · Só preencha o que quiser mudar · Sem cadastro
          </p>

          {/* Honeypot anti-spam (mesmo do formulário original) */}
          <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
            <label>
              Não preencha
              <input ref={gotcha} type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {config.sections.map((section, si) => (
            <section key={section.title} className="mt-12">
              <h3 className="font-display text-xl font-black uppercase leading-tight text-ato-white">
                <span className="mr-3 text-ato-green">{si + 1}</span>
                {section.title}
              </h3>
              {section.hint && <p className="mt-1 text-sm text-white/70">{section.hint}</p>}

              <div className="mt-6 flex flex-col gap-6">
                {section.items.map((item) => {
                  if (item.kind === 'field') return <Field key={item.id} f={item} value={values[item.id] ?? ''} onChange={set} />

                  if (item.kind === 'choice') {
                    return (
                      <fieldset key={item.id}>
                        <legend className="text-base font-bold leading-snug text-ato-white">{item.label}</legend>
                        <div role="radiogroup" aria-label={item.label} className="mt-3 flex flex-wrap gap-2.5">
                          {item.options.map((option) => (
                            <Radio key={option} name={item.id} value={option} checked={values[item.id] === option} onChange={() => set(item.id, option)} />
                          ))}
                        </div>
                      </fieldset>
                    )
                  }

                  const status = values[`${item.id}_status`]
                  const open = status === ADJUST_CHANGE
                  return (
                    <fieldset key={item.id} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                      <legend className="px-2 text-base font-bold leading-snug text-ato-white">{item.label}</legend>
                      <div role="radiogroup" aria-label={item.label} className="flex flex-wrap gap-2.5">
                        {[ADJUST_OK, ADJUST_CHANGE].map((option) => (
                          <Radio key={option} name={`${item.id}_status`} value={option} checked={status === option} onChange={() => set(`${item.id}_status`, option)} />
                        ))}
                      </div>
                      {open && (
                        <div className="mt-5 flex flex-col gap-5" data-open={item.id}>
                          {item.fields.map((f) => (
                            <Field key={f.id} f={f} value={values[f.id] ?? ''} onChange={set} />
                          ))}
                        </div>
                      )}
                    </fieldset>
                  )
                })}
              </div>
            </section>
          ))}

          <div className="mt-12">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-ato-white">
              <input
                id="confirmacao"
                type="checkbox"
                name="confirmacao"
                checked={confirmed}
                onChange={(e) => {
                  setConfirmed(e.target.checked)
                  setError('')
                }}
                className="mt-1 h-6 w-6 shrink-0 accent-[#39FF14]"
              />
              <span>{config.confirmation}</span>
            </label>

            {error && (
              <p role="alert" className="mt-4 text-sm font-bold text-ato-orange">
                {error}
              </p>
            )}

            <button type="submit" disabled={status === 'sending'} className={`${primaryBtn} mt-6 w-full`}>
              {status === 'sending' ? 'Enviando...' : config.submitLabel}
            </button>
            <p className="mt-3 text-xs text-white/60">Chega direto pra nossa equipe. Se precisar de algo, é só chamar.</p>

            {status === 'error' && (
              <div className="mt-6 flex flex-col gap-3">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" data-ga-label="Ajustes — enviar no WhatsApp" className={`${ghostBtn} w-full`}>
                  Enviar pelo WhatsApp
                </a>
                <button type="button" onClick={copyAll} className={`${ghostBtn} w-full`}>
                  Copiar ajustes
                </button>
                <p role="status" aria-live="polite" className="min-h-6 text-sm font-bold text-ato-green">
                  {notice}
                </p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

function Field({ f, value, onChange }: { f: TextField; value: string; onChange: (id: string, v: string) => void }) {
  const hintId = f.hint ? `${f.id}-hint` : undefined
  const common = {
    id: f.id,
    name: f.id,
    value,
    placeholder: f.placeholder,
    'aria-describedby': hintId,
    'aria-required': f.required || undefined,
    className: `${fieldClass} ${f.type === 'textarea' ? '' : 'min-h-[52px]'}`,
  }
  return (
    <div>
      <label htmlFor={f.id} className="mb-2 block text-base font-bold leading-snug text-ato-white">
        {f.label}
        {f.required && <span aria-hidden="true"> *</span>}
      </label>
      {f.type === 'textarea' ? (
        <textarea {...common} rows={4} onChange={(e) => onChange(f.id, e.target.value)} />
      ) : (
        <input {...common} type={f.type ?? 'text'} onChange={(e) => onChange(f.id, e.target.value)} />
      )}
      {f.hint && (
        <p id={hintId} className="mt-2 text-sm text-white/70">
          {f.hint}
        </p>
      )}
    </div>
  )
}

function Radio({ name, value, checked, onChange }: { name: string; value: string; checked: boolean; onChange: () => void }) {
  return (
    <label
      className={`inline-flex min-h-[48px] cursor-pointer items-center rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-150 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ato-green ${
        checked ? 'border-ato-green bg-ato-green text-ato-black shadow-[3px_3px_0_#ffffff]' : 'border-white/25 bg-white/5 text-ato-white hover:border-ato-green'
      }`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {value}
    </label>
  )
}
