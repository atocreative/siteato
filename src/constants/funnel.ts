// Perguntas do funil de contato (/contato). Edite aqui para mudar perguntas, opções ou faixas.
// A mensagem enviada ao WhatsApp usa o `title` de cada pergunta como rótulo.

export interface FunnelOption {
  value: string
  label: string
  hint?: string
}

export interface FunnelQuestion {
  id: string
  title: string
  help?: string
  multiple?: boolean
  options: FunnelOption[]
}

export const funnelQuestions: FunnelQuestion[] = [
  {
    id: 'solucoes',
    title: 'O que você quer construir com a ATO.?',
    help: 'Pode marcar mais de uma opção.',
    multiple: true,
    options: [
      { value: 'Site ou landing page que vende', label: 'Site ou landing page', hint: 'Páginas rápidas, bonitas e feitas para converter' },
      { value: 'Sistema interno sob medida', label: 'Sistema interno', hint: 'Painéis, controle de operação, CRM e ferramentas sob medida' },
      { value: 'Automação de processos e vendas', label: 'Automação', hint: 'Tire tarefas repetitivas das costas da equipe' },
      { value: 'IA aplicada ao negócio', label: 'Inteligência artificial', hint: 'Atendimento, agentes e análises com IA' },
      { value: 'Tráfego pago', label: 'Tráfego pago', hint: 'Anúncios no Google e Meta que trazem clientes e vendas' },
      { value: 'Criação de identidade visual', label: 'Identidade visual e logo', hint: 'Logo, cores e linguagem visual para a sua marca' },
      { value: 'Posicionamento digital e social media', label: 'Posicionamento e social media', hint: 'Marca forte e presença que gera demanda' },
      { value: 'Ainda não sei, preciso de orientação', label: 'Ainda não sei', hint: 'A gente te ajuda a descobrir o melhor caminho' },
    ],
  },
  {
    id: 'segmento',
    title: 'Qual é o segmento do seu negócio?',
    options: [
      { value: 'Varejo e e-commerce', label: 'Varejo e e-commerce' },
      { value: 'Serviços e saúde', label: 'Serviços, clínicas e saúde' },
      { value: 'Alimentação', label: 'Restaurante e alimentação' },
      { value: 'Indústria e atacado', label: 'Indústria e atacado' },
      { value: 'Educação, consultoria e infoprodutos', label: 'Educação, consultoria e infoprodutos' },
      { value: 'Tecnologia e startup', label: 'Tecnologia e startup' },
      { value: 'Outro segmento', label: 'Outro segmento' },
    ],
  },
  {
    id: 'objetivo',
    title: 'Qual resultado você mais quer alcançar?',
    options: [
      { value: 'Vender mais e captar mais clientes', label: 'Vender mais e captar clientes' },
      { value: 'Automatizar tarefas e ganhar tempo', label: 'Automatizar tarefas e ganhar tempo' },
      { value: 'Organizar a operação e ter controle dos dados', label: 'Organizar a operação e os dados' },
      { value: 'Fortalecer a marca e a presença digital', label: 'Fortalecer a marca e a presença digital' },
      { value: 'Lançar um negócio ou produto novo', label: 'Lançar um negócio ou produto novo' },
    ],
  },
  {
    id: 'cenario',
    title: 'Como está sua presença digital hoje?',
    options: [
      { value: 'Ainda não tenho nada', label: 'Ainda não tenho nada' },
      { value: 'Tenho site ou sistema, mas não performa', label: 'Tenho, mas não performa' },
      { value: 'Quero refazer do zero', label: 'Quero refazer do zero' },
      { value: 'Funciona bem e quero evoluir e escalar', label: 'Funciona bem, quero escalar' },
    ],
  },
  {
    id: 'prazo',
    title: 'Para quando você precisa disso?',
    options: [
      { value: 'O mais rápido possível', label: 'O mais rápido possível' },
      { value: 'Em até 30 dias', label: 'Em até 30 dias' },
      { value: 'De 1 a 3 meses', label: 'De 1 a 3 meses' },
      { value: 'Sem pressa, estou pesquisando', label: 'Sem pressa, estou pesquisando' },
    ],
  },
  {
    id: 'investimento',
    title: 'Qual faixa de investimento você tem em mente?',
    help: 'Serve só para a ATO. indicar a solução certa. Nada é fechado aqui.',
    options: [
      { value: 'Menos de R$ 1.000', label: 'Menos de R$ 1.000' },
      { value: 'De R$ 1.000 a R$ 3.000', label: 'De R$ 1.000 a R$ 3.000' },
      { value: 'De R$ 3.000 a R$ 8.000', label: 'De R$ 3.000 a R$ 8.000' },
      { value: 'De R$ 8.000 a R$ 15.000', label: 'De R$ 8.000 a R$ 15.000' },
      { value: 'De R$ 15.000 a R$ 30.000', label: 'De R$ 15.000 a R$ 30.000' },
      { value: 'De R$ 30.000 a R$ 60.000', label: 'De R$ 30.000 a R$ 60.000' },
      { value: 'Acima de R$ 60.000', label: 'Acima de R$ 60.000' },
      { value: 'Prefiro conversar antes de definir', label: 'Prefiro conversar antes' },
    ],
  },
]

/** Resposta da 1ª pergunta que sugere o briefing de identidade visual na etapa final. */
export const identityServiceValue = 'Criação de identidade visual'

export const funnelFinalTitle = 'Quase lá! Como podemos te chamar?'
export const funnelLimits = { name: 60, company: 80, message: 500 }
