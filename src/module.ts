import { addComponentsDir, addImports, createResolver, defineNuxtModule, hasNuxtModule, installModule } from '@nuxt/kit'
import { installNuxtSiteConfig } from 'nuxt-site-config-kit'

export * from './runtime/types'

export interface ModuleOptions {
  /**
   * Whether the sitemap.xml should be generated.
   *
   * @default true
   */
  enabled: boolean

  /**
   * @default 's'
   */
  prefix?: string

  /**
   * @default false
   */
  global?: boolean
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-seo-ui',
    compatibility: {
      nuxt: '^3.5.0',
      bridge: false,
    },
    configKey: 'seoUi',
  },
  defaults() {
    return {
      enabled: true,
      prefix: 'S',
    }
  },
  async setup(config, nuxt) {
    if (!config.enabled)
      return

    const { resolve, resolvePath } = createResolver(import.meta.url)

    // for trailing slashes / absolute urls
    await installNuxtSiteConfig()
    await installModule('nuxt-icon')

    await addComponentsDir({
      path: resolve('runtime', 'components'),
      prefix: config.prefix,
      global: config.global,
      watch: false,
    })

    addImports({
      from: resolve('./runtime/composables/defineBreadcrumbItems'),
      name: 'defineBreadcrumbItems',
    })
    addImports({
      from: resolve('./runtime/composables/generateBreadcrumbsFromRoute'),
      name: 'generateBreadcrumbsFromRoute',
    })
    addImports({
      from: resolve('./runtime/composables/normaliseBreadcrumbItem'),
      name: 'normaliseBreadcrumbItem',
    })

    const hasModuleSchemaOrg = nuxt.options.modules.some((m: any) => typeof m === 'string' && m === 'nuxt-schema-org')
    // add defineSchemaOrgBreadcrumbs import
    addImports({
      from: resolve(`./runtime/composables/schemaOrg/${hasModuleSchemaOrg ? 'defineSchemaOrgBreadcrumbs' : 'mock'}`),
      name: 'defineSchemaOrgBreadcrumbs',
    })

    const hasModuleI18n = nuxt.options.modules.some((m: any) => typeof m === 'string' && m === '@nuxtjs/i18n')
    // add defineSchemaOrgBreadcrumbs import
    addImports({
      from: resolve(`./runtime/composables/i18n/${hasModuleI18n ? 'translateSeoUILabel' : 'mock'}`),
      name: 'translateSeoUILabel',
    })

    // if it exists
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./runtime/locales'),
        locales: [
          { code: 'en', file: 'en.json' },
          { code: 'fr', file: 'fr.json' },
          { code: 'it', file: 'it.json' },
        ],
      })
    })

    const appConfigFile = await resolvePath(resolve('./runtime/app.config'))
    nuxt.hook('app:resolve', (app) => {
      app.configs.push(appConfigFile)
    })

    // we need to extend the tailwind config to parse our breadcrumbs component
    nuxt.hook('tailwindcss:config', (tailwindConfig) => {
      tailwindConfig.content = tailwindConfig.content || []
      // @ts-expect-error untyped
      if (tailwindConfig.content.files) {
        // @ts-expect-error untyped
        tailwindConfig.content.files.push(appConfigFile)
      }
      else {
        // @ts-expect-error untyped
        tailwindConfig.content.push(appConfigFile)
      }
    })
  },
})
