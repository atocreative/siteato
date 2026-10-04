// Formulários de ajustes finais (/ajustes). O formulário de SITE replica a página "Ajustes finais | ATO."
// (nomes de campo idênticos, para o e-mail continuar com o mesmo formato). O de SISTEMA segue a mesma lógica.
// Edite aqui para mudar perguntas, textos e opções.

export type AjusteKind = 'site' | 'sistema'

export interface TextField {
  kind: 'field'
  id: string
  label: string
  type?: 'text' | 'textarea' | 'email' | 'tel' | 'url'
  placeholder?: string
  hint?: string
  required?: boolean
}

export interface ChoiceField {
  kind: 'choice'
  id: string
  label: string
  hint?: string
  options: string[]
}

/** Bloco "Está ok / Quero ajustar": os campos só aparecem (e só são enviados) com "Quero ajustar". */
export interface AdjustGroup {
  kind: 'group'
  /** id base: o status vira `${id}_status` */
  id: string
  label: string
  hint?: string
  fields: TextField[]
}

export type AjusteItem = TextField | ChoiceField | AdjustGroup

export interface AjusteSection {
  title: string
  hint?: string
  items: AjusteItem[]
}

export interface AjusteConfig {
  kind: AjusteKind
  label: string
  description: string
  heading: string
  intro: string
  /** Assunto do e-mail (_subject) */
  subject: string
  sections: AjusteSection[]
  confirmation: string
  submitLabel: string
}

export const ADJUST_OK = 'Está ok'
export const ADJUST_CHANGE = 'Quero ajustar'

const field = (id: string, label: string, extra: Partial<TextField> = {}): TextField => ({ kind: 'field', id, label, ...extra })
const area = (id: string, label: string, placeholder: string, extra: Partial<TextField> = {}): TextField =>
  ({ kind: 'field', id, label, type: 'textarea', placeholder, ...extra })

export const siteConfig: AjusteConfig = {
  kind: 'site',
  label: 'Meu site',
  description: 'Página institucional, landing page, loja ou catálogo que a ATO. criou para você.',
  heading: 'Últimos ajustes antes de ir ao ar.',
  intro: 'Abra a prévia que enviamos e conte pra gente o que fica e o que muda. Tudo em um único envio, sem ida e volta. Se algo já está bom, é só deixar como está.',
  subject: 'Briefing de ajustes finais recebido — SITE',
  confirmation: 'Revisei a prévia e este é o conjunto final de ajustes. Sei que mudanças fora deste briefing podem entrar em uma nova rodada.',
  submitLabel: 'Enviar ajustes finais',
  sections: [
    {
      title: 'Quem está enviando',
      hint: 'Pra gente saber de quem é este briefing.',
      items: [
        field('empresa', 'Nome do negócio', { required: true, placeholder: 'Ex: Studio Lume' }),
        field('responsavel', 'Seu nome', { required: true, placeholder: 'Ex: Marina Duarte' }),
        field('email', 'E-mail', { required: true, type: 'email', placeholder: 'voce@seunegocio.com.br' }),
        field('whatsapp', 'WhatsApp (opcional)', { type: 'tel', placeholder: '(61) 9 0000-0000' }),
        field('link_previa', 'Link da prévia que você está avaliando (opcional)', { type: 'url', placeholder: 'https://...' }),
      ],
    },
    {
      title: 'Como você viu a prévia no geral?',
      hint: 'Sua primeira impressão já nos ajuda a calibrar.',
      items: [
        {
          kind: 'choice',
          id: 'visao_geral',
          label: 'Impressão geral',
          options: ['Gostei, pode seguir quase como está', 'Gostei, com alguns ajustes', 'Quero mudanças maiores'],
        },
        area('visao_geral_obs', 'Algo que gostou muito, ou que não pode ficar de fora? (opcional)', 'Ex: Adorei o jeito que a página ficou leve. Não quero perder isso.'),
      ],
    },
    {
      title: 'Seção por seção',
      hint: 'Em cada parte da página, escolha "Está ok" ou "Quero ajustar". Só abre os campos de quem quer mudar.',
      items: [
        {
          kind: 'group',
          id: 'topo',
          label: 'Topo da página · título, subtítulo e botão principal',
          fields: [
            area('topo_titulo', 'Título principal', 'Cole aqui o texto exato que deve aparecer'),
            area('topo_subtitulo', 'Subtítulo', 'Texto de apoio abaixo do título'),
            field('topo_botao_texto', 'Texto do botão', { placeholder: 'Ex: Falar no WhatsApp' }),
            field('topo_botao_link', 'Para onde o botão leva', { placeholder: 'Link, WhatsApp ou e-mail' }),
            area('topo_outros', 'Outros ajustes nesta parte', "Fale do seu jeito. Pode ser 'trocar a foto', 'deixar o texto menor', 'tirar essa frase'..."),
          ],
        },
        {
          kind: 'group',
          id: 'sobre',
          label: 'Sobre / Quem somos',
          fields: [
            area('sobre_texto', 'Texto definitivo', 'Cole o texto que deve entrar. Se preferir manter parte do atual, diga o que fica e o que muda.'),
            area('sobre_outros', 'Fotos ou outros detalhes', 'Ex: Usar a foto da equipe que está na pasta (link na seção 4).'),
          ],
        },
        {
          kind: 'group',
          id: 'servicos',
          label: 'Serviços, produtos ou catálogo',
          fields: [
            area(
              'servicos_ajustes',
              'O que muda',
              "Ex:\n- Trocar 'Limpeza facial' por 'Limpeza de pele profunda' e alterar o valor para R$ 180\n- Incluir novo serviço: Design de sobrancelhas\n- Remover 'Massagem relaxante'",
              { hint: 'Uma linha por mudança já ajuda bastante. Preços, nomes, descrições, ordem, fotos.' }
            ),
          ],
        },
        {
          kind: 'group',
          id: 'contato',
          label: 'Contato, endereço e redes sociais',
          fields: [
            field('contato_whatsapp', 'WhatsApp do negócio', { type: 'tel', placeholder: '(61) 9 0000-0000' }),
            field('contato_email', 'E-mail de contato', { type: 'email', placeholder: 'contato@seunegocio.com.br' }),
            area('contato_endereco', 'Endereço e horário de atendimento', 'Rua, número, bairro, cidade\nSeg a sex, 9h às 18h'),
            area('contato_redes', 'Redes sociais', 'Instagram: @seunegocio\nLinkedIn: linkedin.com/company/...'),
          ],
        },
        {
          kind: 'group',
          id: 'visual',
          label: 'Visual: cores, logo e estilo',
          fields: [
            area(
              'visual_ajustes',
              'O que você quer mudar no visual',
              'Ex: Deixar o verde mais escuro, usar meu logo novo, aumentar as letras, mais espaço entre as seções. Se tiver uma referência de site que você gosta, cole o link.'
            ),
          ],
        },
        {
          kind: 'group',
          id: 'outras',
          label: 'Alguma outra parte da página · depoimentos, perguntas frequentes, rodapé, etc.',
          fields: [
            area('outras_ajustes', 'Qual parte e o que muda', 'Descreva a seção e o ajuste. Se quiser adicionar uma parte nova, explique o que ela deve ter.'),
          ],
        },
      ],
    },
    {
      title: 'Imagens e materiais',
      hint: 'Logo, fotos, textos prontos, PDFs. Tudo o que for entrar na página.',
      items: [
        field('link_materiais', 'Link da pasta com os arquivos (Google Drive, Dropbox, WeTransfer)', {
          type: 'url',
          placeholder: 'https://drive.google.com/...',
          hint: 'Confirme que o link está com acesso liberado pra quem tem o link.',
        }),
        area('materiais_obs', 'Instruções sobre os arquivos (opcional)', "Ex: 'fachada.jpg' vai no topo. As fotos 3 e 4 não usar. Ainda vou mandar o logo novo até sexta."),
        {
          kind: 'choice',
          id: 'imagens_apoio',
          label: 'Se faltar alguma imagem, podemos usar imagens de apoio?',
          options: ['Sim, pode usar', 'Prefiro aguardar as minhas'],
        },
      ],
    },
    {
      title: 'Publicação',
      hint: 'Pra deixar tudo pronto pro dia de ir ao ar.',
      items: [
        { kind: 'choice', id: 'dominio_status', label: 'Você já tem um domínio (o endereço .com.br)?', options: ['Já tenho', 'Ainda não tenho', 'Não sei'] },
        field('dominio', 'Qual é o endereço?', { placeholder: 'www.seunegocio.com.br' }),
        field('prazo_desejado', 'Tem alguma data em que precisa da página no ar? (opcional)', { placeholder: 'Ex: Antes do evento do dia 15' }),
      ],
    },
    {
      title: 'Mais alguma coisa?',
      hint: 'Espaço livre. Fale como se estivesse mandando um áudio.',
      items: [area('observacoes', 'Observações', 'Qualquer detalhe que não coube nos campos acima.')],
    },
  ],
}

export const sistemaConfig: AjusteConfig = {
  kind: 'sistema',
  label: 'Meu sistema',
  description: 'Sistema interno, painel, CRM, automação ou plataforma sob medida que a ATO. desenvolveu.',
  heading: 'Últimos ajustes no seu sistema.',
  intro:
    'Use o sistema como a sua equipe usaria no dia a dia e conte pra gente o que fica e o que muda. Tudo em um único envio, sem ida e volta. Se algo já está bom, é só deixar como está. Nunca envie senhas por aqui.',
  subject: 'Briefing de ajustes finais recebido — SISTEMA',
  confirmation: 'Testei o sistema e este é o conjunto final de ajustes. Sei que mudanças fora deste briefing podem entrar em uma nova rodada.',
  submitLabel: 'Enviar ajustes finais',
  sections: [
    {
      title: 'Quem está enviando',
      hint: 'Pra gente saber de quem é este briefing.',
      items: [
        field('empresa', 'Nome do negócio', { required: true, placeholder: 'Ex: Studio Lume' }),
        field('responsavel', 'Seu nome', { required: true, placeholder: 'Ex: Marina Duarte' }),
        field('email', 'E-mail', { required: true, type: 'email', placeholder: 'voce@seunegocio.com.br' }),
        field('whatsapp', 'WhatsApp (opcional)', { type: 'tel', placeholder: '(61) 9 0000-0000' }),
        field('link_sistema', 'Link do sistema ou do ambiente de testes (opcional)', { type: 'url', placeholder: 'https://...', hint: 'Não coloque login nem senha aqui. Combinamos o acesso por outro canal.' }),
      ],
    },
    {
      title: 'Como você viu o sistema no geral?',
      hint: 'Sua primeira impressão já nos ajuda a calibrar.',
      items: [
        {
          kind: 'choice',
          id: 'visao_geral',
          label: 'Impressão geral',
          options: ['Funciona bem, pode seguir quase como está', 'Funciona, com alguns ajustes', 'Quero mudanças maiores'],
        },
        area('visao_geral_obs', 'Algo que gostou muito, ou que não pode mudar? (opcional)', 'Ex: O cadastro de clientes ficou perfeito. Não quero perder isso.'),
      ],
    },
    {
      title: 'Módulo por módulo',
      hint: 'Em cada parte do sistema, escolha "Está ok" ou "Quero ajustar". Só abre os campos de quem quer mudar.',
      items: [
        {
          kind: 'group',
          id: 'acesso',
          label: 'Acesso e usuários · login, perfis e permissões',
          fields: [area('acesso_ajustes', 'O que muda', 'Ex: O perfil "Vendedor" não deve ver o financeiro. Incluir perfil "Gerente".')],
        },
        {
          kind: 'group',
          id: 'telas',
          label: 'Telas e cadastros',
          fields: [
            area('telas_ajustes', 'O que muda', 'Ex:\n- Cadastro de cliente: incluir o campo "Data de aniversário"\n- Tela de pedidos: mostrar o status em cores', {
              hint: 'Uma linha por mudança já ajuda bastante. Campos, nomes, ordem, botões.',
            }),
          ],
        },
        {
          kind: 'group',
          id: 'regras',
          label: 'Fluxos e regras de negócio · aprovações, cálculos e status',
          fields: [area('regras_ajustes', 'O que muda', 'Descreva a regra como ela deve funcionar. Ex: Pedidos acima de R$ 5.000 precisam de aprovação do gerente.')],
        },
        {
          kind: 'group',
          id: 'relatorios',
          label: 'Relatórios, dashboards e exportações',
          fields: [area('relatorios_ajustes', 'O que muda', 'Ex: Incluir total por vendedor no relatório mensal e exportar em Excel.')],
        },
        {
          kind: 'group',
          id: 'integracoes',
          label: 'Integrações e automações · pagamentos, WhatsApp, e-mail, ERP',
          fields: [area('integracoes_ajustes', 'O que muda', 'Ex: Avisar o cliente no WhatsApp quando o pedido for enviado.')],
        },
        {
          kind: 'group',
          id: 'visual',
          label: 'Visual e usabilidade',
          fields: [area('visual_ajustes', 'O que você quer mudar', 'Ex: Letras maiores, menu mais simples, usar as cores da minha marca, logo novo.')],
        },
        {
          kind: 'group',
          id: 'bugs',
          label: 'Erros, travamentos ou lentidão que você percebeu',
          fields: [
            area('bugs_descricao', 'O que acontece', 'Ex: Ao salvar um pedido com desconto, aparece uma mensagem de erro.'),
            area('bugs_passos', 'Como fazer o erro aparecer (opcional)', 'Passo a passo: onde clicou, o que digitou, em que tela estava.'),
          ],
        },
        {
          kind: 'group',
          id: 'outras',
          label: 'Alguma outra parte do sistema',
          fields: [area('outras_ajustes', 'Qual parte e o que muda', 'Descreva o módulo e o ajuste. Se quiser incluir algo novo, explique o que ele deve fazer.')],
        },
      ],
    },
    {
      title: 'Dados e materiais',
      hint: 'Logo, planilhas, manuais, exemplos. Tudo o que ajude a gente a ajustar.',
      items: [
        field('link_materiais', 'Link da pasta com os arquivos (Google Drive, Dropbox, WeTransfer)', {
          type: 'url',
          placeholder: 'https://drive.google.com/...',
          hint: 'Confirme que o link está com acesso liberado pra quem tem o link.',
        }),
        area('materiais_obs', 'Instruções sobre os arquivos (opcional)', "Ex: 'clientes.xlsx' é a lista para importar. O logo novo chega até sexta."),
        {
          kind: 'choice',
          id: 'dados_reais',
          label: 'Os dados que aparecem hoje no sistema são...',
          options: ['De teste, podem ser apagados', 'Dados reais, devem ser mantidos', 'Não sei'],
        },
      ],
    },
    {
      title: 'Entrega e implantação',
      hint: 'Pra deixar tudo pronto pro dia de usar de verdade.',
      items: [
        { kind: 'choice', id: 'implantacao', label: 'Onde o sistema vai rodar?', options: ['Já tenho servidor ou domínio', 'Preciso que a ATO. cuide disso', 'Não sei'] },
        { kind: 'choice', id: 'treinamento', label: 'Você quer um treinamento rápido para a sua equipe?', options: ['Sim, quero', 'Não preciso', 'Talvez, quero conversar'] },
        field('prazo_desejado', 'Tem alguma data em que precisa do sistema funcionando? (opcional)', { placeholder: 'Ex: Antes da virada do mês' }),
      ],
    },
    {
      title: 'Mais alguma coisa?',
      hint: 'Espaço livre. Fale como se estivesse mandando um áudio.',
      items: [area('observacoes', 'Observações', 'Qualquer detalhe que não coube nos campos acima.')],
    },
  ],
}

export const ajusteConfigs: Record<AjusteKind, AjusteConfig> = { site: siteConfig, sistema: sistemaConfig }

export const ajusteLimits = { text: 300, textarea: 2000 }
