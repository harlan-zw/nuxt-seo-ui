import { defineNuxtConfig } from 'nuxt/config'
import NuxtSeoUi from '../src/module'

export default defineNuxtConfig({
  modules: [
    NuxtSeoUi,
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-component-meta',
  ],
  componentMeta: {
    globalsOnly: true,
    debug: 2,
    checkerOptions: {
      forceUseTs: true,
    },
    metaFields: {
      props: true,
      slots: true,
      events: true,
      exposed: true,
    },
  },
  seoUi: {
    global: true,
  },
  i18n: {
    lazy: true,
    langDir: 'locales/',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr-FR.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
  },
})
