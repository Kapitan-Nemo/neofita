import type { NuxtPage } from 'nuxt/schema'
// Import the process module
import process from 'node:process'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@samk-dev/nuxt-vcalendar',
    '@nuxt/image',
  ],
  ssr: true,
  nitro: {
    serveStatic: true,
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances: 3,
      },
      nodeVersion: '22',
    },
  },
  experimental: { appManifest: false },
  runtimeConfig: {
    public: {
      FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
      FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
      FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
      FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
      FIREBASE_ADMINID: process.env.FIREBASE_ADMINID,
    },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  imports: {
    dirs: ['./stores'],
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: [
    '~/assets/scss/global.scss',
  ],
  routeRules: {
    '/': { prerender: true },
    '/dashboard': { ssr: true },
    '/dashboard/manage': { ssr: true },
    '/saving-plan': { ssr: true },
    '/settings': { ssr: true },
  },
})
