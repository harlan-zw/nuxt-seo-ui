import { describe, expect, it } from 'vitest'
import { createResolver } from '@nuxt/kit'
import { $fetch, setup } from '@nuxt/test-utils'

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
    const sitemapIndex = (await $fetch('/sitemap_index.xml')).replace(/lastmod>(.*?)</g, 'lastmod><')

    expect(sitemapIndex).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><?xml-stylesheet type=\\"text/xsl\\" href=\\"/__sitemap__/style.xsl\\"?>
      <sitemapindex xmlns=\\"http://www.sitemaps.org/schemas/sitemap/0.9\\">
          <sitemap>
              <loc>https://nuxt-seo-ui.com/posts-sitemap.xml</loc>
          </sitemap>
          <sitemap>
              <loc>https://nuxt-seo-ui.com/pages-sitemap.xml</loc>
              <lastmod></lastmod>
          </sitemap>
          <sitemap>
              <loc>https://www.odysseytraveller.com/sitemap-pages.xml</loc>
          </sitemap>
      </sitemapindex>
      <!-- XML Sitemap generated by Nuxt Simple Sitemap -->"
    `)

    expect(await $fetch('/posts-sitemap.xml')).toMatchInlineSnapshot(`
      "<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?><?xml-stylesheet type=\\"text/xsl\\" href=\\"/__sitemap__/style.xsl\\"?>
      <urlset xmlns:xsi=\\"http://www.w3.org/2001/XMLSchema-instance\\" xmlns:xhtml=\\"http://www.w3.org/1999/xhtml\\" xmlns:image=\\"http://www.google.com/schemas/sitemap-image/1.1\\" xsi:schemaLocation=\\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd http://www.google.com/schemas/sitemap-image/1.1 http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd\\" xmlns=\\"http://www.sitemaps.org/schemas/sitemap/0.9\\">
          <url>
              <loc>https://nuxt-seo-ui.com/blog</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/tags</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/tags\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/post-1</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/post-1\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/post-2</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/post-2\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/post-3</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/post-3\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/post-4</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/post-4\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/post-5</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/post-5\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/tags/new</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/tags/new\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/tags/edit</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/tags/edit\\" />
          </url>
          <url>
              <loc>https://nuxt-seo-ui.com/blog/categories</loc>
              <xhtml:link rel=\\"alternate\\" hreflang=\\"fr\\" href=\\"https://nuxt-seo-ui.com/fr/blog/categories\\" />
          </url>
      </urlset>
      <!-- XML Sitemap generated by Nuxt Simple Sitemap -->"
    `)

    expect(await $fetch('/pages-sitemap.xml')).toContain('<?xml')
  }, 60000)
})