// Compatibilidade: aceita as variáveis legadas VITE_* (já configuradas no Railway) e
// as expõe como NEXT_PUBLIC_*, que o Next inlina no bundle do cliente.
const keys = [
  'SITE_URL', 'SITE_NAME', 'SITE_DESCRIPTION', 'OG_IMAGE',
  'CONTACT_EMAIL', 'CONTACT_PHONE', 'COMPANY_CNPJ',
  'LOCATION_CITY', 'LOCATION_ADDRESS',
  'META_PIXEL_ID', 'CLARITY_ID', 'GTM_ID', 'GA_MEASUREMENT_ID',
  'GOOGLE_SITE_VERIFICATION', 'BING_SITE_VERIFICATION', 'INDEXNOW_KEY',
]
const env = Object.fromEntries(
  keys.map((k) => [`NEXT_PUBLIC_${k}`, process.env[`NEXT_PUBLIC_${k}`] || process.env[`VITE_${k}`] || ''])
)

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // CSP mínima e segura: o site usa scripts inline (JSON-LD, GA, Next), então script-src fica de fora.
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self'" },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  env,
  turbopack: { root: import.meta.dirname },
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
