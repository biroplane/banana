import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  debug: true,
  ssr: true,
  app: {
    head: {
      link: [{
        rel: "icon", type: "image/png", href: './favicon.png'
      }]
    }
  },
  css: ['~/assets/typography.css', '~/assets/main.css'],
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    families: [
      { name: "Bebas Neue", provider: "google" },
      { name: "gyparody", provider: "local" },
    ]
  },
  runtimeConfig: {
    AIRTABLE_API_TOKEN: process.env.AIRTABLE_API_TOKEN,
    public: {
      AIRTABLE_URL: process.env.AIRTABLE_URL,
      AIRTABLE_BASE: process.env.AIRTABLE_BASE,
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [tailwindcss()]
  }
})