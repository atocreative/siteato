import { useEffect } from 'react'
import { gaMeasurementId, metaPixelId, clarityId, gtmId } from '@lib/seoConfig'

function injectOnce(id: string, create: () => void) {
  if (document.getElementById(id)) return
  create()
}

export default function Analytics() {
  useEffect(() => {
    // Filtro de hostname: nunca dispara tracking em localhost/preview local
    const host = window.location.hostname
    if (host === 'localhost' || host === '127.0.0.1') return

    if (gaMeasurementId) {
      injectOnce('ga4-script', () => {
        const script = document.createElement('script')
        script.id = 'ga4-script'
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`
        document.head.appendChild(script)

        window.dataLayer = window.dataLayer || []
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer!.push(args)
        }
        window.gtag('js', new Date())
        window.gtag('config', gaMeasurementId)
      })
    }

    if (metaPixelId) {
      injectOnce('meta-pixel-script', () => {
        const script = document.createElement('script')
        script.id = 'meta-pixel-script'
        script.innerHTML = `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `
        document.head.appendChild(script)
      })
    }

    if (clarityId) {
      injectOnce('ms-clarity-script', () => {
        const script = document.createElement('script')
        script.id = 'ms-clarity-script'
        script.innerHTML = `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)
          })(window, document, "clarity", "script", "${clarityId}");
        `
        document.head.appendChild(script)
      })
    }

    if (gtmId) {
      injectOnce('gtm-script', () => {
        const script = document.createElement('script')
        script.id = 'gtm-script'
        script.innerHTML = `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `
        document.head.appendChild(script)

        const noscript = document.createElement('noscript')
        noscript.id = 'gtm-noscript'
        noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
        document.body.prepend(noscript)
      })
    }
  }, [])

  return null
}
