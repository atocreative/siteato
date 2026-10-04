import type { MetadataRoute } from 'next'
import { siteUrl } from '@lib/seoConfig'

const aiCrawlers = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Claude-SearchBot',
  'anthropic-ai',
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'msnbot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
