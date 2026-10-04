import type { Metadata } from 'next'
import { PrivacyPolicyPage } from '@components/common'
import { privacyPolicyPath } from '@lib/seoConfig'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como a ATO. coleta, usa e protege os dados pessoais dos visitantes do site, em conformidade com a LGPD.',
  alternates: { canonical: privacyPolicyPath },
  openGraph: { url: privacyPolicyPath },
}

export default function Page() {
  return <PrivacyPolicyPage />
}
