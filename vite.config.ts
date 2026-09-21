import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Injeta os tokens __SITE_NAME__, __SITE_URL__, etc. do index.html a partir das
// variáveis VITE_* de ambiente, com fallback para os dados reais da ATO.
// Evita o %ENV% nativo do Vite, que quebra o build quando a variável não existe.
function seoHtmlPlugin(env: Record<string, string>): Plugin {
  const get = (key: string, fallback: string) => env[key] || fallback

  const tokens: Record<string, string> = {
    __SITE_NAME__: get('VITE_SITE_NAME', 'ATO. Soluções em Tecnologia Digital'),
    __SITE_DESCRIPTION__: get(
      'VITE_SITE_DESCRIPTION',
      'Agência de tecnologia em Brasília especializada em sites, sistemas internos, automações e IA para negócios.'
    ),
    __SITE_URL__: get('VITE_SITE_URL', 'https://atocreative.com.br').replace(/\/$/, ''),
    __OG_IMAGE__: get('VITE_OG_IMAGE', '/mane.jpg'),
    __GOOGLE_SITE_VERIFICATION__: get('VITE_GOOGLE_SITE_VERIFICATION', ''),
    __BING_SITE_VERIFICATION__: get('VITE_BING_SITE_VERIFICATION', ''),
  }

  return {
    name: 'ato-seo-html',
    transformIndexHtml(html) {
      let output = html
      for (const [token, value] of Object.entries(tokens)) {
        output = output.split(token).join(value)
      }
      // Remove metatags de verificação quando a env correspondente está vazia
      output = output.replace(/\s*<meta name="google-site-verification" content="">\n?/g, '\n')
      output = output.replace(/\s*<meta name="msvalidate\.01" content="">\n?/g, '\n')
      return output
    },
  }
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
  plugins: [react(), seoHtmlPlugin(env)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@sections': path.resolve(__dirname, './src/sections'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@types': path.resolve(__dirname, './src/types'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@lib': path.resolve(__dirname, './src/lib'),
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    }
  },
  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : []
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion']
  }
  }
})
