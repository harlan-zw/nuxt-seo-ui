import { describe, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { setup } from '@nuxt/test-utils'

const { resolve } = createResolver(import.meta.url)

await setup({
  rootDir: resolve('../.playground'),
  build: true,
  server: true,
  nuxtConfig: {
    sitemap: {
      autoLastmod: false,
      siteUrl: 'https://nuxt-seo-ui.com',
    },
  },
})
describe('prod', () => {
  it('basic', async () => {

  }, 60000)
})
