// Config central de marca/contato/GEO — lida de VITE_* com fallback para os dados reais da ATO.
// Nunca hardcode aqui um segundo lugar: qualquer novo consumidor deve importar deste módulo.

const env = import.meta.env

export const siteUrl = (env.VITE_SITE_URL || 'https://atocreative.com.br').replace(/\/$/, '')
export const siteName = env.VITE_SITE_NAME || 'ATO. Soluções em Tecnologia Digital'
export const siteDescription =
  env.VITE_SITE_DESCRIPTION ||
  'Agência de tecnologia em Brasília especializada em sites, sistemas internos, automações e IA para negócios.'

export const contactEmail = env.VITE_CONTACT_EMAIL || 'suporte.atocriative@gmail.com'
export const contactPhone = env.VITE_CONTACT_PHONE || '+55 61 99199-5064'
export const whatsappUrl = 'https://wa.me/556191995064'
export const companyCnpj = env.VITE_COMPANY_CNPJ || '00.000.000/0001-00'

export const locationCity = env.VITE_LOCATION_CITY || 'Brasília, DF'
export const locationAddress =
  env.VITE_LOCATION_ADDRESS ||
  'Estádio Nacional - Eixo Monumental - SRPN - 2º Andar, CEP 70070-701'

export const ogImage = env.VITE_OG_IMAGE || '/mane.jpg'

export const gaMeasurementId = env.VITE_GA_MEASUREMENT_ID || ''
export const metaPixelId = env.VITE_META_PIXEL_ID || ''
export const clarityId = env.VITE_CLARITY_ID || ''
export const gtmId = env.VITE_GTM_ID || ''

export const googleSiteVerification = env.VITE_GOOGLE_SITE_VERIFICATION || ''
export const bingSiteVerification = env.VITE_BING_SITE_VERIFICATION || ''
export const indexNowKey = env.VITE_INDEXNOW_KEY || ''

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
