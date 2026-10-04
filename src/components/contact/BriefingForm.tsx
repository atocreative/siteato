'use client'

import { useEffect, useRef, useState } from 'react'
import {
  briefingSections,
  briefingTotalQuestions,
  briefingLimits,
  briefingLongMessageThreshold,
} from '@constants/briefing'
import {
  buildBriefingText,
  buildMailtoLink,
  buildWhatsappLink,
  countAnswered,
  emptyBriefingState,
  type BriefingState,
} from '@lib/briefingMessage'
import { contactEmail, whatsappNumber } from '@lib/seoConfig'

const REVIEW_STEP = briefingSections.length + 1
const LAST_STEP = REVIEW_STEP

const fieldClass =
  'w-full rounded-xl border-2 border-white/25 bg-white/5 px-4 py-3 text-base text-ato-white placeholder:text-white/50 focus:border-ato-green focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green'

const primaryBtn =
  'inline-flex items-center justify-center min-h-[52px] rounded-full bg-ato-green px-8 text-xs font-bold uppercase tracking-widest text-ato-black shadow-[0_0_25px_rgba(57,255,20,0.4)] transition-all duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white'
const ghostBtn =
  'inline-flex items-center justify-center min-h-[52px] rounded-full border-2 border-white/30 px-8 text-xs font-bold uppercase tracking-widest text-ato-white transition-colors hover:border-ato-green hover:text-ato-green focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ato-green'

export default function BriefingForm() {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<BriefingState>(emptyBriefingState)
  const [leadError, setLeadError] = useState(false)
  const [notice, setNotice] = useState('')

  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    window.scrollTo({ top: 0 })
    headingRef.current?.focus()
  }, [step])

  const limits = briefingLimits
  const progress = Math.round((step / LAST_STEP) * 100)
  const section = step >= 1 && step <= briefingSections.length ? briefingSections[step - 1] : null
  const leadOk = state.empresa.trim() && state.nome.trim() && state.contato.trim()

  function setLead(field: 'empresa' | 'nome' | 'contato', value: string) {
    setState((s) => ({ ...s, [field]: value }))
    setLeadError(false)
  }

  function toggle(qid: string, index: number, type: 'single' | 'multi', max?: number) {
    setState((s) => {
      const current = s.picks[qid] ?? []
      const active = current.includes(index)
      let next: number[]
      if (type === 'single') next = active ? [] : [index]
      else if (active) next = current.filter((k) => k !== index)
      else if (max && current.length >= max) return s // bloqueia acima do máximo
      else next = [...current, index]
      return { ...s, picks: { ...s.picks, [qid]: next } }
    })
  }

  function start() {
    if (!leadOk) {
      setLeadError(true)
      return
    }
    setStep(1)
  }

  const text = buildBriefingText(briefingSections, state, limits)
  const answered = countAnswered(briefingSections, state, limits)
  const whatsappHref = buildWhatsappLink(whatsappNumber, text)
  const mailHref = buildMailtoLink(contactEmail, state.empresa, text)
  const tooLong = text.length > briefingLongMessageThreshold

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(text)
      setNotice('Respostas copiadas. Cole na conversa com a gente.')
    } catch {
      setNotice('Não foi possível copiar automaticamente. Selecione o texto abaixo e copie manualmente.')
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Progresso */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 font-mono text-[11px] font-bold uppercase tracking-[2px] text-white/70">
          <span>{step === 0 ? 'Introdução' : step === REVIEW_STEP ? 'Revisão' : `Seção ${step} de ${briefingSections.length}`}</span>
          <span>{progress}%</span>
        </div>
        <div
          className="h-2 w-full rounded-full bg-white/10 overflow-hidden"
          role="progressbar"
          aria-label="Progresso do briefing"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div className="h-full bg-ato-green transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div key={step} className="ato-fade-up">
        {step === 0 && (
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display font-black text-3xl uppercase leading-tight tracking-tight text-ato-white mb-4 focus:outline-none"
            >
              Antes de começar
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-2">
              Essas respostas são a base pra criarmos a identidade visual da sua marca. Leva uns 10 minutos.
            </p>
            <p className="text-base text-white/80 leading-relaxed mb-8">
              Não existe resposta certa ou errada — quanto mais contexto, melhor.
            </p>

            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="lead-empresa" className="block mb-2 text-sm font-bold text-ato-white">
                  Nome da empresa ou marca
                </label>
                <input
                  id="lead-empresa"
                  type="text"
                  autoComplete="organization"
                  maxLength={limits.lead}
                  placeholder="Ex.: PlusRev"
                  value={state.empresa}
                  onChange={(e) => setLead('empresa', e.target.value)}
                  className={`${fieldClass} min-h-[52px]`}
                />
              </div>
              <div>
                <label htmlFor="lead-nome" className="block mb-2 text-sm font-bold text-ato-white">
                  Seu nome
                </label>
                <input
                  id="lead-nome"
                  type="text"
                  autoComplete="name"
                  maxLength={limits.lead}
                  placeholder="Quem está respondendo"
                  value={state.nome}
                  onChange={(e) => setLead('nome', e.target.value)}
                  className={`${fieldClass} min-h-[52px]`}
                />
              </div>
              <div>
                <label htmlFor="lead-contato" className="block mb-2 text-sm font-bold text-ato-white">
                  WhatsApp ou e-mail pra contato
                </label>
                <input
                  id="lead-contato"
                  type="text"
                  autoComplete="email"
                  maxLength={limits.lead}
                  placeholder="Pra gente te retornar"
                  value={state.contato}
                  onChange={(e) => setLead('contato', e.target.value)}
                  className={`${fieldClass} min-h-[52px]`}
                />
              </div>
              {leadError && (
                <p role="alert" className="text-sm font-bold text-ato-orange">
                  Preenche esses três campos pra começar.
                </p>
              )}
              <button type="button" onClick={start} className={`${primaryBtn} w-full`}>
                Começar
              </button>
            </div>
          </div>
        )}

        {section && (
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display font-black text-3xl sm:text-4xl uppercase leading-tight tracking-tight text-ato-white mb-8 focus:outline-none"
            >
              {section.title}
            </h2>

            <div className="flex flex-col gap-9">
              {section.questions.map((q) => {
                const hintId = q.hint ? `${q.id}-hint` : undefined
                if (q.type === 'textarea') {
                  return (
                    <div key={q.id}>
                      <label htmlFor={q.id} className="block text-base font-bold text-ato-white leading-snug">
                        {q.q}
                      </label>
                      {q.hint && (
                        <p id={hintId} className="mt-1 text-sm text-white/70">
                          {q.hint}
                        </p>
                      )}
                      <textarea
                        id={q.id}
                        rows={4}
                        maxLength={limits.textarea}
                        aria-describedby={hintId}
                        value={state.texts[q.id] ?? ''}
                        onChange={(e) => setState((s) => ({ ...s, texts: { ...s.texts, [q.id]: e.target.value } }))}
                        className={`${fieldClass} mt-3`}
                      />
                    </div>
                  )
                }

                const picked = state.picks[q.id] ?? []
                return (
                  <fieldset key={q.id} className="min-w-0">
                    <legend className="text-base font-bold text-ato-white leading-snug">{q.q}</legend>
                    {q.hint && (
                      <p id={hintId} className="mt-1 text-sm text-white/70">
                        {q.hint}
                      </p>
                    )}
                    <div
                      role="group"
                      aria-label={q.q}
                      data-qid={q.id}
                      data-type={q.type}
                      className="mt-3 flex flex-wrap gap-2.5"
                    >
                      {q.options?.map((option, k) => {
                        const active = picked.includes(k)
                        return (
                          <button
                            key={`${option.label}-${k}`}
                            type="button"
                            aria-pressed={active}
                            data-chip=""
                            onClick={() => toggle(q.id, k, q.type as 'single' | 'multi', q.max)}
                            className={`inline-flex items-center min-h-[48px] rounded-full border-2 px-5 py-2 text-sm font-bold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ato-green ${
                              active
                                ? 'border-ato-green bg-ato-green text-ato-black shadow-[3px_3px_0_#ffffff]'
                                : 'border-white/25 bg-white/5 text-ato-white hover:border-ato-green'
                            }`}
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                    {q.max && (
                      <p className={`mt-2 text-xs font-bold ${picked.length >= q.max ? 'text-ato-green' : 'text-white/70'}`} aria-live="polite">
                        {picked.length} de {q.max}
                      </p>
                    )}
                    {q.options?.map((option, k) =>
                      option.other && picked.includes(k) ? (
                        <div key={`other-${k}`} className="mt-3">
                          <label htmlFor={`${q.id}-other-${k}`} className="sr-only">
                            {option.label}: especifique
                          </label>
                          <input
                            id={`${q.id}-other-${k}`}
                            type="text"
                            maxLength={limits.other}
                            placeholder={option.placeholder ?? 'Qual?'}
                            value={state.others[`${q.id}:${k}`] ?? ''}
                            onChange={(e) => setState((s) => ({ ...s, others: { ...s.others, [`${q.id}:${k}`]: e.target.value } }))}
                            className={`${fieldClass} min-h-[52px]`}
                          />
                        </div>
                      ) : null
                    )}
                  </fieldset>
                )
              })}
            </div>
          </div>
        )}

        {step === REVIEW_STEP && (
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display font-black text-3xl sm:text-4xl uppercase leading-tight tracking-tight text-ato-white mb-4 focus:outline-none"
            >
              Tudo pronto<span className="text-ato-green">.</span>
            </h2>
            <p className="text-base text-white/80 leading-relaxed mb-8" id="briefing-summary">
              Você respondeu <b>{answered} de {briefingTotalQuestions}</b> perguntas. Pode voltar e completar o que faltar, ou enviar agora.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-label="Briefing — enviar no WhatsApp"
                className={`${primaryBtn} w-full`}
              >
                Enviar pelo WhatsApp
              </a>
              <button type="button" onClick={copyAll} className={`${ghostBtn} w-full`}>
                Copiar respostas
              </button>
              <a
                href={mailHref}
                data-ga-label="Briefing — enviar por e-mail"
                className="inline-flex items-center justify-center min-h-[48px] text-sm font-bold text-white/80 underline hover:text-ato-green"
              >
                ou enviar por e-mail
              </a>
            </div>

            {tooLong && (
              <p className="mt-6 rounded-xl border border-ato-yellow/50 bg-ato-yellow/10 p-4 text-sm text-ato-white">
                Suas respostas ficaram longas e o WhatsApp pode cortar parte do texto. Se isso acontecer, use <b>Copiar respostas</b> e cole na conversa.
              </p>
            )}
            <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm font-bold text-ato-green">
              {notice}
            </p>
          </div>
        )}
      </div>

      {/* Navegação */}
      {step > 0 && (
        <div className="mt-10 flex items-center justify-between gap-4">
          <button type="button" onClick={() => setStep(step - 1)} className={ghostBtn}>
            Voltar
          </button>
          {step < REVIEW_STEP && (
            <button type="button" onClick={() => setStep(step + 1)} className={primaryBtn}>
              {step === REVIEW_STEP - 1 ? 'Revisar' : 'Continuar'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
