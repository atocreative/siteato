/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_SITE_NAME?: string
  readonly VITE_SITE_DESCRIPTION?: string
  readonly VITE_CONTACT_EMAIL?: string
  readonly VITE_CONTACT_PHONE?: string
  readonly VITE_COMPANY_CNPJ?: string
  readonly VITE_LOCATION_CITY?: string
  readonly VITE_LOCATION_ADDRESS?: string
  readonly VITE_OG_IMAGE?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_META_PIXEL_ID?: string
  readonly VITE_CLARITY_ID?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_GOOGLE_SITE_VERIFICATION?: string
  readonly VITE_BING_SITE_VERIFICATION?: string
  readonly VITE_INDEXNOW_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
