// Config central de marca/contato/GEO — lida de VITE_* com fallback para os dados reais da ATO.
// Nunca hardcode aqui um segundo lugar: qualquer novo consumidor deve importar deste módulo.


export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://atodev.com.br').replace(/\/$/, '')
export const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'ATO. Soluções em Tecnologia Digital'
export const siteDescription =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  'Agência de tecnologia em Brasília especializada em sites, sistemas internos, automações e IA para negócios.'

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'suporte.atocriative@gmail.com'
export const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE || '+55 61 99199-5064'
export const whatsappUrl = `https://wa.me/556191995064?text=${encodeURIComponent(
  'Olá! Vim pelo site da ATO. e quero saber mais sobre os serviços.'
)}`
export const instagramUrl = 'https://www.instagram.com/ato.vc'
export const companyCnpj = process.env.NEXT_PUBLIC_COMPANY_CNPJ || '00.000.000/0001-00'

export const locationCity = process.env.NEXT_PUBLIC_LOCATION_CITY || 'Brasília, DF'
export const locationAddress =
  process.env.NEXT_PUBLIC_LOCATION_ADDRESS ||
  'Estádio Nacional - Eixo Monumental - SRPN - 2º Andar, CEP 70070-701'

export const ogImage = process.env.NEXT_PUBLIC_OG_IMAGE || '/og-image.jpg'

export const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
export const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID || ''
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''
export const gtmId = process.env.NEXT_PUBLIC_GTM_ID || ''

export const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ''
export const bingSiteVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || ''
export const indexNowKey = process.env.NEXT_PUBLIC_INDEXNOW_KEY || ''

// Camadas de intenção GEO usadas em JSON-LD e FAQ Answer-First
export const geoLayers = {
  micro: ['Eixo Monumental', 'SRPN', 'Asa Norte', 'Asa Sul', 'Zona Cívico-Administrativa'],
  regional: ['Brasília', 'Distrito Federal', 'DF', 'Entorno do DF'],
  national: ['Brasil'],
}

export const areaServed = [
  ...geoLayers.micro,
  ...geoLayers.regional,
  ...geoLayers.national,
]

export const privacyPolicyPath = '/politica-de-privacidade'
