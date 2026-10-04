import { siteUrl, privacyPolicyPath, contactPagePath } from '@lib/seoConfig'
import { allSeoImages } from '@lib/seoImages'

// Route Handler (e não app/sitemap.ts) porque o MetadataRoute.Sitemap do Next só aceita a URL
// da imagem; aqui registramos também <image:title> e <image:caption> para o Google Imagens.
export const dynamic = 'force-static'

const escapeXml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function GET() {
  const lastmod = new Date().toISOString().split('T')[0]

  const images = allSeoImages()
    .map(
      (img) => `    <image:image>
      <image:loc>${siteUrl}${img.file}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
    </image:image>`
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${images}
  </url>
  <url>
    <loc>${siteUrl}${contactPagePath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${siteUrl}${privacyPolicyPath}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
