import Link from 'next/link'
import {
  siteName,
  siteUrl,
  contactEmail,
  contactPhone,
  companyCnpj,
  locationAddress,
} from '@lib/seoConfig'

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-ato-white text-ato-black min-h-screen py-16">
      <div className="ato-container max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center min-h-[48px] text-xs font-bold uppercase tracking-widest text-ato-green hover:opacity-70">
          ← Voltar para o site
        </Link>

        <h1 className="font-display font-black text-3xl md:text-5xl uppercase mt-6 mb-8">
          Política de Privacidade
        </h1>

        <div className="space-y-6 text-sm leading-relaxed opacity-80">
          <p>
            Esta Política de Privacidade descreve como a <strong>{siteName}</strong>
            {' '}(CNPJ {companyCnpj}), com sede em {locationAddress}, coleta, usa,
            armazena e protege os dados pessoais dos visitantes do site{' '}
            <a href={siteUrl} className="text-ato-green underline">{siteUrl}</a>, em
            conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
          </p>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">1. Dados coletados</h2>
            <p>
              Coletamos dados fornecidos voluntariamente por meio de formulários de contato
              e WhatsApp (nome, e-mail, telefone e mensagem), além de dados de navegação
              coletados automaticamente por cookies e ferramentas de analytics (páginas
              visitadas, origem do acesso, dispositivo e localização aproximada).
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">2. Finalidade do uso</h2>
            <p>
              Os dados são utilizados exclusivamente para responder solicitações de
              orçamento e contato, melhorar a experiência de navegação, medir o
              desempenho do site e personalizar comunicações comerciais. Não vendemos
              nem compartilhamos dados pessoais com terceiros para fins alheios a estes.
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">3. Cookies e tecnologias de rastreamento</h2>
            <p>
              Utilizamos cookies próprios e de terceiros (Google Analytics, Meta Pixel,
              Microsoft Clarity e Google Tag Manager, quando ativos) para entender como
              o site é utilizado e otimizar campanhas de marketing. Você pode gerenciar
              ou bloquear cookies diretamente nas configurações do seu navegador.
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">4. Compartilhamento de dados</h2>
            <p>
              Dados podem ser compartilhados com provedores de infraestrutura, analytics
              e comunicação (ex.: hospedagem, e-mail, WhatsApp Business) estritamente
              para viabilizar a operação do site e o atendimento comercial.
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">5. Direitos do titular</h2>
            <p>
              Nos termos da LGPD, você pode solicitar a qualquer momento a confirmação,
              o acesso, a correção, a anonimização ou a eliminação dos seus dados
              pessoais, além de revogar consentimentos previamente concedidos.
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">6. Contato do controlador</h2>
            <p>
              Para exercer seus direitos ou tirar dúvidas sobre esta política, entre em
              contato pelo e-mail{' '}
              <a href={`mailto:${contactEmail}`} className="text-ato-green underline">
                {contactEmail}
              </a>{' '}
              ou pelo telefone {contactPhone}.
            </p>
          </section>

          <section>
            <h2 className="font-display font-black text-lg uppercase mb-2">7. Alterações desta política</h2>
            <p>
              Esta política pode ser atualizada periodicamente para refletir melhorias
              no site ou mudanças legais. A data da última atualização é sempre
              indicada no rodapé desta página.
            </p>
          </section>

          <p className="text-xs opacity-40 pt-6 border-t border-black/10">
            Última atualização: setembro de 2026.
          </p>
        </div>
      </div>
    </main>
  )
}
