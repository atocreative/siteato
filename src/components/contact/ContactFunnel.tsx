'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { funnelQuestions, funnelFinalTitle, funnelLimits, identityServiceValue } from '@constants/funnel'
import { buildFunnelMessage, buildWhatsappUrl, cleanFreeText } from '@lib/funnelMessage'
import { whatsappNumber } from '@lib/seoConfig'

const TOTAL_STEPS = funnelQuestions.length + 1
const ADVANCE_DELAY_MS = 220

const fieldClass =
  'w-full min-h-[52px] rounded-xl border-2 border-white/25 bg-white/5 px-4 py-3 text-base text-ato-white placeholder:text-white/50 focus:border-ato-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green'

export default function ContactFunnel() {
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState<Record<string, string[]>>({})
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')
  const [showError, setShowError] = useState(false)

  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)
  const advanceTimer = useRef<number | null>(null)

  // Move o foco para o título a cada etapa (leitores de tela anunciam a nova pergunta)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  useEffect(() => {
    return () => {
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [])

  const isFinal = step === funnelQuestions.length
  const question = isFinal ? null : funnelQuestions[step]
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100)

  function goTo(next: number) {
    setStep(Math.max(0, Math.min(funnelQuestions.length, next)))
  }

  function choose(value: string) {
    if (!question) return
    if (question.multiple) {
      setChoices((prev) => {
        const current = prev[question.id] ?? []
        const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value]
        return { ...prev, [question.id]: next }
      })
      return
    }
    setChoices((prev) => ({ ...prev, [question.id]: [value] }))
    if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    advanceTimer.current = window.setTimeout(() => goTo(step + 1), ADVANCE_DELAY_MS)
  }

  const cleanName = cleanFreeText(name, funnelLimits.name)
  const cleanCompany = cleanFreeText(company, funnelLimits.company)
  const cleanMessage = cleanFreeText(message, funnelLimits.message)
  const nameValid = cleanName.length >= 2

  const whatsappHref = buildWhatsappUrl(
    whatsappNumber,
    buildFunnelMessage(funnelQuestions, { choices, name: cleanName, company: cleanCompany, message: cleanMessage })
  )

  const selected = question ? choices[question.id] ?? [] : []

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 font-mono text-[11px] font-bold uppercase tracking-[2px] text-white/70">
          <span>
            Etapa {step + 1} de {TOTAL_STEPS}
          </span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-white/10 overflow-hidden"
          role="progressbar"
          aria-label="Progresso do formulário"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="h-full bg-ato-green transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={step} className="ato-fade-up">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="font-display font-black text-3xl sm:text-4xl uppercase leading-tight tracking-tight text-ato-white mb-3 focus:outline-none"
        >
          {question ? question.title : funnelFinalTitle}
        </h2>
        {question?.help && <p className="text-sm text-white/70 mb-6">{question.help}</p>}

        {question && (
          <div
            role={question.multiple ? 'group' : 'radiogroup'}
            aria-label={question.title}
            className="mt-6 flex flex-col gap-3"
          >
            {question.options.map((option) => {
              const active = selected.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  role={question.multiple ? undefined : 'radio'}
                  aria-checked={question.multiple ? undefined : active}
                  aria-pressed={question.multiple ? active : undefined}
                  onClick={() => choose(option.value)}
                  className={`flex w-full items-center gap-4 min-h-[56px] rounded-2xl border-2 px-5 py-3.5 text-left transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green ${
                    active
                      ? 'border-ato-green bg-ato-green text-ato-black shadow-[5px_5px_0_#ffffff]'
                      : 'border-white/25 bg-white/5 text-ato-white hover:border-ato-green hover:bg-white/10'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 text-xs font-black ${
                      question.multiple ? 'rounded-md' : 'rounded-full'
                    } ${active ? 'border-ato-black bg-ato-black text-ato-green' : 'border-white/50'}`}
                  >
                    {active ? '✓' : ''}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-bold leading-snug">{option.label}</span>
                    {option.hint && (
                      <span className={`text-sm leading-snug ${active ? 'text-ato-black/80' : 'text-white/70'}`}>{option.hint}</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {isFinal && (
          <div className="mt-6 flex flex-col gap-5">
            <div>
              <label htmlFor="funil-nome" className="block mb-2 text-sm font-bold text-ato-white">
                Seu nome <span aria-hidden="true">*</span>
              </label>
              <input
                id="funil-nome"
                name="nome"
                type="text"
                autoComplete="name"
                required
                maxLength={funnelLimits.name}
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setShowError(false)
                }}
                aria-invalid={showError && !nameValid}
                aria-describedby={showError && !nameValid ? 'funil-nome-erro' : undefined}
                className={fieldClass}
                placeholder="Como você gosta de ser chamado"
              />
              {showError && !nameValid && (
                <p id="funil-nome-erro" role="alert" className="mt-2 text-sm font-bold text-ato-orange">
                  Informe seu nome para continuar.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="funil-empresa" className="block mb-2 text-sm font-bold text-ato-white">
                Empresa ou projeto <span className="font-normal text-white/70">(opcional)</span>
              </label>
              <input
                id="funil-empresa"
                name="empresa"
                type="text"
                autoComplete="organization"
                maxLength={funnelLimits.company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="funil-mensagem" className="block mb-2 text-sm font-bold text-ato-white">
                Quer contar mais alguma coisa? <span className="font-normal text-white/70">(opcional)</span>
              </label>
              <textarea
                id="funil-mensagem"
                name="mensagem"
                rows={4}
                maxLength={funnelLimits.message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={fieldClass}
              />
            </div>

            {(choices[funnelQuestions[0].id] ?? []).includes(identityServiceValue) && (
              <p className="rounded-2xl border border-ato-green/50 bg-ato-green/10 p-5 text-sm text-ato-white">
                Vai criar ou renovar a identidade visual? Responda também ao{' '}
                <Link href="/briefing" className="font-bold text-ato-green underline">
                  briefing de identidade visual
                </Link>{' '}
                para a gente começar já com contexto.
              </p>
            )}

            <dl className="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm">
              <dt className="mb-3 font-mono text-[11px] font-bold uppercase tracking-[2px] text-ato-green">Resumo das suas respostas</dt>
              {funnelQuestions.map((q) => (
                <dd key={q.id} className="mb-2 last:mb-0 text-white/80">
                  <span className="font-bold text-ato-white">{q.title}</span>
                  <br />
                  {(choices[q.id] ?? []).join(', ') || 'Não respondi'}
                </dd>
              ))}
            </dl>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!nameValid}
              onClick={(e) => {
                if (!nameValid) {
                  e.preventDefault()
                  setShowError(true)
                }
              }}
              data-ga-label="Funil de contato — enviar no WhatsApp"
              className={`inline-flex items-center justify-center min-h-[56px] rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                nameValid
                  ? 'bg-ato-green text-ato-black shadow-[0_0_25px_rgba(57,255,20,0.4)] hover:scale-[1.03] hover:shadow-[0_0_35px_rgba(57,255,20,0.6)]'
                  : 'bg-white/20 text-white/70 cursor-not-allowed'
              }`}
            >
              Enviar pelo WhatsApp
            </a>
            <p className="text-xs text-white/60">
              Ao enviar, o WhatsApp abre com todas as suas respostas prontas. Você revisa e toca em enviar.
            </p>
          </div>
        )}
      </div>

      {/* Navegação */}
      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => goTo(step - 1)}
          disabled={step === 0}
          className="inline-flex items-center min-h-[48px] px-4 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-ato-green disabled:opacity-0 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green"
        >
          ← Voltar
        </button>

        {question?.multiple && (
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            disabled={selected.length === 0}
            className="inline-flex items-center justify-center min-h-[48px] rounded-full bg-ato-green px-8 text-xs font-bold uppercase tracking-widest text-ato-black transition-opacity disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            Continuar
          </button>
        )}
      </div>
    </div>
  )
}
