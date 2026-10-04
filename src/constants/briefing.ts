// Briefing de identidade visual (/briefing). Perguntas e seções replicam o briefing original da ATO.
// Edite aqui para mudar textos, opções ou limites.

export interface BriefingOption {
  label: string
  /** Opção "Outro": abre um campo de texto ao marcar. */
  other?: boolean
  placeholder?: string
}

export interface BriefingQuestion {
  id: string
  type: 'textarea' | 'single' | 'multi'
  q: string
  hint?: string
  /** Máximo de opções marcadas (só multi). */
  max?: number
  options?: BriefingOption[]
}

export interface BriefingSection {
  title: string
  questions: BriefingQuestion[]
}

const opt = (label: string): BriefingOption => ({ label })
const other = (label = 'Outro', placeholder = 'Qual?'): BriefingOption => ({ label, other: true, placeholder })
const text = (id: string, q: string, hint?: string): BriefingQuestion => ({ id, type: 'textarea', q, hint })

export const briefingSections: BriefingSection[] = [
  {
    title: 'Sobre o negócio',
    questions: [
      text('q1', 'Em poucas palavras, o que a sua marca faz?', 'Como você explicaria pra alguém que nunca ouviu falar.'),
      text('q2', 'Qual o principal problema que vocês resolvem pro cliente?'),
      text('q3', 'Qual a principal proposta de valor?', 'Ex.: economia, confiança, praticidade, sofisticação, inovação.'),
      text('q4', 'Como é a jornada do cliente, do primeiro contato até a compra?'),
      text('q5', 'Tem algum diferencial difícil de ser copiado pela concorrência?'),
    ],
  },
  {
    title: 'Público',
    questions: [
      text('q6', 'Quem é o principal cliente da marca?', 'Idade, perfil, comportamento, poder de compra, hábitos digitais.'),
      {
        id: 'q7',
        type: 'multi',
        q: 'O que esse público busca principalmente?',
        options: [opt('Economia'), opt('Confiança'), opt('Praticidade'), opt('Comparar antes de decidir'), opt('Status / exclusividade'), other()],
      },
      text('q8', 'Tem algum perfil de cliente que vocês NÃO querem atrair?'),
    ],
  },
  {
    title: 'Posicionamento',
    questions: [
      text('q9', 'Quando alguém ouve o nome da marca, quais 3 ideias ou sensações você quer que venham à cabeça?'),
      {
        id: 'q10',
        type: 'multi',
        max: 5,
        q: 'Escolha até 5 características da personalidade da marca.',
        options: [
          'Confiável', 'Moderna', 'Tecnológica', 'Inteligente', 'Acessível', 'Premium', 'Simples', 'Transparente',
          'Inovadora', 'Especialista', 'Próxima', 'Ágil', 'Segura', 'Sofisticada', 'Popular',
        ]
          .map(opt)
          .concat(other()),
      },
      text('q11', 'Quais características definitivamente NÃO combinam com a marca?'),
      text('q12', 'Se a marca fosse uma pessoa, como ela seria?', 'Idade, jeito de falar, estilo, personalidade, profissão.'),
    ],
  },
  {
    title: 'Mercado e concorrência',
    questions: [
      text('q13', 'Quais empresas ou apps você considera concorrentes, diretos ou indiretos?'),
      text('q14', 'Tem alguma marca do seu setor cuja comunicação vocês admiram?'),
      text('q15', 'Tem alguma marca do setor cuja estética vocês NÃO querem seguir?'),
      text('q16', 'Fora do seu setor, quais marcas são boas referências?', 'Ex.: Nubank, Apple, iFood, Airbnb. Diga o que gosta em cada uma.'),
    ],
  },
  {
    title: 'Direção visual',
    questions: [
      {
        id: 'q17',
        type: 'multi',
        q: 'Visualmente, a marca está mais perto de qual direção?',
        hint: 'Pode escolher mais de uma.',
        options: [
          'Minimalista', 'Tecnológica', 'Premium', 'Jovem', 'Institucional', 'Elegante', 'Popular e acessível', 'Futurista',
        ]
          .map(opt)
          .concat(other()),
      },
      {
        id: 'q18',
        type: 'single',
        q: 'Já pensaram em alguma cor específica?',
        options: [other('Sim', 'Quais cores?'), opt('Não'), opt('Abertos a sugestões')],
      },
      text('q19', 'Tem alguma cor que vocês NÃO querem usar?'),
      {
        id: 'q20',
        type: 'single',
        q: 'Sobre o símbolo da marca, tem preferência?',
        options: [opt('Só o nome (tipografia)'), opt('Nome + símbolo'), opt('Símbolo que vira ícone do app'), opt('Ainda não temos preferência')],
      },
      text('q21', 'Tem algum elemento visual que já associam à marca?', 'Ex.: check, selo, seta, conexão, movimento. Serve de referência, não precisa aparecer literalmente.'),
    ],
  },
  {
    title: 'Referências',
    questions: [
      text('q22', 'Cole 3 a 5 marcas ou logos que você gosta.', 'Links, @ do Instagram ou nomes. Diga o que chama atenção em cada uma.'),
      text('q23', 'Cole 1 a 3 referências que você NÃO gosta.', 'E o motivo, se der.'),
    ],
  },
  {
    title: 'Onde a marca será usada',
    questions: [
      {
        id: 'q24',
        type: 'multi',
        q: 'Onde a identidade vai ser usada primeiro?',
        hint: 'Marque tudo que se aplica.',
        options: [
          'Site', 'Aplicativo', 'Redes sociais', 'Apresentações comerciais', 'Material pra investidores',
          'Mídia paga', 'Material impresso', 'Uniforme / espaço físico',
        ]
          .map(opt)
          .concat(other()),
      },
      text('q25', 'Tem algum lugar que é especialmente importante pra marca?', 'Ex.: ícone do app, home do site, Instagram.'),
    ],
  },
  {
    title: 'Futuro',
    questions: [
      text('q26', 'Até onde vocês imaginam que a marca pode chegar?'),
      text('q27', 'Tem outros produtos ou serviços que poderiam usar a marca no futuro?'),
      text('q28', 'Daqui a 5 anos, como você quer que a marca seja vista pelo mercado?'),
    ],
  },
  {
    title: 'Nome e comunicação',
    questions: [
      text('q29', 'Tem algum significado por trás do nome da marca?'),
      {
        id: 'q30',
        type: 'single',
        q: 'Como o nome deve ser escrito?',
        options: [opt('Como nome próprio'), opt('TUDO MAIÚSCULO'), opt('tudo minúsculo'), opt('Ainda a definir')],
      },
      text('q31', 'Já existe algum slogan ou frase da marca?'),
      {
        id: 'q32',
        type: 'single',
        q: 'O tom de comunicação deve ser mais...',
        options: [
          opt('Direto e objetivo'), opt('Especialista e técnico'), opt('Próximo e humano'),
          opt('Moderno e descontraído'), opt('Premium e sofisticado'), opt('Educativo'), opt('Combinação'),
        ],
      },
    ],
  },
  {
    title: 'Pra fechar',
    questions: [text('q33', 'Tem algo que a gente não perguntou e que deveria considerar?')],
  },
]

export const briefingTotalQuestions = briefingSections.reduce((n, s) => n + s.questions.length, 0)

export const briefingLimits = { lead: 120, textarea: 1000, other: 120 }

/** Acima disso o WhatsApp pode cortar o texto: sugerimos "Copiar respostas". */
export const briefingLongMessageThreshold = 3500
