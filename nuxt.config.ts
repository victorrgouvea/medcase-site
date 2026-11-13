import tailwindcss from '@tailwindcss/vite'

// Static site: `pnpm generate` writes plain HTML to .output/public for GitHub Pages.
// NUXT_APP_BASE_URL comes from the Pages workflow ("/" on gestoclin.com).
// Public address of the site: link previews need absolute URLs.
const siteUrl = 'https://gestoclin.com'
const title = 'GestoClin, agenda e prontuário para clínicas'
const description = 'Agenda, prontuário eletrônico e equipe da clínica num só lugar. Funciona no navegador do celular, do tablet e do computador.'

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
      title,
      htmlAttrs: { lang: 'pt-BR' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: description },
        { name: 'theme-color', content: '#F4F7FA' },
        // Link preview (WhatsApp, LinkedIn, iMessage, Slack...). Image source: docs/og/og-image.html.
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_BR' },
        { property: 'og:site_name', content: 'GestoClin' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: `${siteUrl}/og-image.png` },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'GestoClin: a clínica inteira no mesmo prontuário.' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: `${siteUrl}/og-image.png` },
      ],
      link: [
        { rel: 'canonical', href: `${siteUrl}/` },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
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
