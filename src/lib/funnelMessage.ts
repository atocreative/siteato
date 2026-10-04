// Montagem da mensagem do funil e da URL do WhatsApp. Sem dependências de DOM/React (testável em Node).

export interface FunnelAnswers {
  /** id da pergunta -> respostas escolhidas */
  choices: Record<string, string[]>
  name: string
  company: string
  message: string
}

export interface FunnelQuestionLike {
  id: string
  title: string
}

/** Remove caracteres de controle e < >, normaliza espaços e limita o tamanho. */
export function cleanFreeText(value: string, max: number): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

export function buildFunnelMessage(questions: FunnelQuestionLike[], answers: FunnelAnswers): string {
  const lines: string[] = [
    'Olá, ATO.! Vim pelo site e quero um orçamento. Estas são as minhas respostas:',
    '',
  ]

  questions.forEach((q, index) => {
    const picked = answers.choices[q.id] ?? []
    lines.push(`*${index + 1}. ${q.title}*`)
    lines.push(picked.length ? picked.join(', ') : 'Não respondi')
    lines.push('')
  })

  lines.push('*Nome*')
  lines.push(answers.name)
  if (answers.company) {
    lines.push('', '*Empresa*', answers.company)
  }
  if (answers.message) {
    lines.push('', '*Mensagem adicional*', answers.message)
  }

  return lines.join('\n')
}

export function buildWhatsappUrl(phoneDigits: string, message: string): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
}
