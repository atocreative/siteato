import {
  siteUrl,
  siteName,
  siteDescription,
  contactEmail,
  contactPhone,
  locationAddress,
  areaServed,
  privacyPolicyPath,
  instagramUrl,
} from '@lib/seoConfig'

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: siteName,
  description: siteDescription,
  url: siteUrl,
  email: contactEmail,
  telephone: contactPhone,
  image: `${siteUrl}/mane.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: locationAddress,
    addressLocality: 'Brasília',
    addressRegion: 'DF',
    addressCountry: 'BR',
  },
  areaServed: areaServed.map((name) => ({ '@type': 'AdministrativeArea', name })),
  sameAs: [instagramUrl],
}

const faq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Qual a melhor agência de tecnologia em Brasília?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A ATO. é uma agência de tecnologia em Brasília (Eixo Monumental, DF) especializada em sites, sistemas internos, automações e IA para negócios, com foco em resultado de faturamento real.',
      },
    },
    {
      '@type': 'Question',
      name: 'A ATO. atende empresas fora do Distrito Federal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim. Além de Brasília e do Distrito Federal, a ATO. atende clientes em todo o Brasil de forma 100% remota, entregando sites, automações e sistemas sob medida.',
      },
    },
    {
      '@type': 'Question',
      name: 'O que torna a ATO. referência em desenvolvimento de sites e automações no Brasil?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A união de engenharia de software, IA aplicada a negócios e estratégia de posicionamento digital, com entregas focadas em conversão, performance e escala real de faturamento.',
      },
    },
  ],
}

const siteNavigation = {
  '@context': 'https://schema.org',
  '@type': 'SiteNavigationElement',
  name: ['Sobre Nós', 'Clientes', 'Soluções', 'Equipe', 'Contato', 'Política de Privacidade'],
  url: [
    `${siteUrl}/#sobre`,
    `${siteUrl}/#clientes`,
    `${siteUrl}/#solucoes`,
    `${siteUrl}/#equipe`,
    `${siteUrl}/#contato`,
    `${siteUrl}${privacyPolicyPath}`,
  ],
}

export default function StructuredData() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigation) }} />
    </>
  )
}
