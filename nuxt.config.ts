// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@nuxt/icon'],

  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Admin dashboard renders only on client-side
    '/admin/**': { ssr: false },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  imports: {
    dirs: ['./stores'],
  },
  components: [
    { path: '~/components/admin', prefix: 'Admin' },
    '~/components',
  ],
  css: [
    '~/assets/scss/global.scss',
  ],
})