// Fonte única das imagens registradas no sitemap (Google Imagens).
// Imagens soltas em public/galeria/ entram automaticamente, sem editar código.

import fs from 'node:fs'
import path from 'node:path'
import { siteName, locationCity } from '@lib/seoConfig'

export interface SeoImage {
  file: string
  title: string
  caption: string
}

export const baseImages: SeoImage[] = [
  {
    file: '/mane.jpg',
    title: `${siteName} — ${locationCity}`,
    caption: `Equipe da ATO. em ${locationCity}: agência de tecnologia especializada em sites, sistemas internos, automações e inteligência artificial para negócios.`,
  },
  {
    file: '/caio.png',
    title: 'Caio Vilela — CTO da ATO.',
    caption: 'Caio Vilela, CTO da ATO., agência de tecnologia em Brasília especializada em engenharia de inteligência artificial e automações.',
  },
  {
    file: '/joao.png',
    title: 'João Oliveira — CEO da ATO.',
    caption: 'João Oliveira, CEO da ATO., agência de tecnologia e posicionamento digital em Brasília, focada em transformar presença digital em faturamento.',
  },
]

const IMAGE_EXT = /\.(png|jpe?g|webp|avif|gif)$/i

function humanize(fileName: string): string {
  return fileName.replace(IMAGE_EXT, '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim()
}

/** Lê public/galeria/ em tempo de build. Retorna [] quando a pasta não existe. */
export function galleryImages(): SeoImage[] {
  const dir = path.join(process.cwd(), 'public', 'galeria')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => IMAGE_EXT.test(name))
    .sort()
    .map((name) => {
      const label = humanize(name)
      return {
        file: `/galeria/${name}`,
        title: `${label} — ${siteName}`,
        caption: `${label}: imagem da galeria de ${siteName} em ${locationCity}, agência de tecnologia que cria sites, sistemas, automações e soluções de inteligência artificial para negócios.`,
      }
    })
}

export function allSeoImages(): SeoImage[] {
  return [...baseImages, ...galleryImages()]
}
