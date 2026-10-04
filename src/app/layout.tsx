import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Archivo_Black, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { Analytics, CookieBanner, GA4AutoTracker, MotionProvider, StructuredData } from '@components/common'
import {
  siteUrl,
  siteName,
  siteDescription,
  ogImage,
  gaMeasurementId,
  googleSiteVerification,
  bingSiteVerification,
} from '@lib/seoConfig'
import '@styles/globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})
const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-archivo-black',
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'agência de tecnologia em Brasília',
    'desenvolvimento de sites',
    'sistemas internos',
    'automação com IA',
    'agência digital DF',
    'ATO.',
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName,
    title: siteName,
    description: siteDescription,
    url: '/',
    images: [{ url: ogImage, width: 1200, height: 630, alt: siteName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [ogImage],
  },
  verification: {
    google: googleSiteVerification || undefined,
    other: bingSiteVerification ? { 'msvalidate.01': bingSiteVerification } : undefined,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${archivoBlack.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(localStorage.getItem('cookie_consent')==='granted')document.documentElement.classList.add('consent-granted')}catch(e){}",
          }}
        />
      </head>
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-100 focus:bg-ato-green focus:text-ato-black focus:font-bold focus:px-4 focus:py-3 focus:rounded-md"
        >
          Pular para o conteúdo
        </a>
        <StructuredData />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
        <GA4AutoTracker />
        <CookieBanner />
        {gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (!/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) {
  gtag('js', new Date());
  gtag('config', '${gaMeasurementId}');
}`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
