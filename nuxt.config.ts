import tailwindcss from '@tailwindcss/vite'

// Static site: `pnpm generate` writes plain HTML to .output/public for GitHub Pages.
// NUXT_APP_BASE_URL is set by the Pages workflow (/medcase-site/); locally it stays "/".
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: ['shadcn-nuxt'],
  shadcn: { prefix: '', componentDir: 'app/components/ui' },
  components: [{ path: '~/components', pathPrefix: false, ignore: ['**/ui/**'] }],
  vite: { plugins: [tailwindcss()] },
  app: {
    head: {
      title: 'GestoClin, agenda e prontuário para clínicas',
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Agenda, prontuário eletrônico e equipe da clínica num só lugar. Funciona no navegador do celular, do tablet e do computador.' },
        { name: 'theme-color', content: '#F4F7FA' },
        { property: 'og:title', content: 'GestoClin' },
        { property: 'og:description', content: 'Agenda, prontuário e equipe da clínica num só lugar.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: 'favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      // Where every "Entrar" button points.
      platformUrl: 'https://medcase.vercel.app',
    },
  },
  typescript: { strict: true, typeCheck: false },
})
