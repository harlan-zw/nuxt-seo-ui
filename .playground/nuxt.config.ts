import { defineNuxtConfig } from 'nuxt/config'
import NuxtSeoUi from '../src/module'

export default defineNuxtConfig({
  modules: [
    NuxtSeoUi,
    '@nuxthq/ui',
    '@nuxtjs/i18n',
    'nuxt-icon',
  ],

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
    strategy: 'no_prefix',
  },
})
