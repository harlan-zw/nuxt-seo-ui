import { addComponentsDir, addImports, createResolver, defineNuxtModule, hasNuxtModule, installModule } from '@nuxt/kit'
import { installNuxtSiteConfig } from 'nuxt-site-config-kit'
import type { NuxtI18nOptions } from '@nuxtjs/i18n/dist/module'
import { getNuxtModuleOptions } from './utils'

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
  defaults: {
    enabled: true,
    prefix: 'S',
  },
  async setup(config, nuxt) {
    if (!config.enabled)
      return

    const { resolve } = createResolver(import.meta.url)

    // for trailing slashes / absolute urls
    await installNuxtSiteConfig()
    await installModule('nuxt-icon')

    let nuxtI18nConfig: NuxtI18nOptions = {}
    if (hasNuxtModule('@nuxtjs/i18n')) {
      nuxtI18nConfig = (await getNuxtModuleOptions('@nuxtjs/i18n') || {}) as NuxtI18nOptions
    }
    else {
      addImports({
        from: resolve(`./runtime/composables/mocks/useI18n`),
        name: 'useI18n',
      })
    }

    nuxt.options.runtimeConfig.public['nuxt-seo-ui'] = {
      i18n: {
        strategy: nuxtI18nConfig.strategy || 'prefix',
        defaultLocale: nuxtI18nConfig.defaultLocale || 'en',
        routesNameSeparator: nuxtI18nConfig.routesNameSeparator || '__',
      },
    }

    await addComponentsDir({
      path: resolve('runtime', 'components'),
      prefix: config.prefix,
      global: config.global,
      watch: false,
    })

    ;['useBreadcrumbItems', 'useBreadcrumbsUi', 'defineBreadcrumbItems'].forEach((name) => {
      addImports({
        from: resolve(`./runtime/composables/${name}`),
        name,
      })
    })

    addImports({
      from: resolve(`./runtime/composables/${hasNuxtModule('nuxt-schema-org') ? '' : 'mocks/'}defineSchemaOrgBreadcrumbs`),
      name: 'defineSchemaOrgBreadcrumbs',
    })

    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./runtime/locales'),
        locales: [
          { code: 'en', file: 'en.json' },
          { code: 'fr', file: 'fr.json' },
          { code: 'it', file: 'it.json' },
          { code: 'de', file: 'de.json' },
          { code: 'es', file: 'es.json' },
        ],
      })
    })

    nuxt.hooks.hook('tailwindcss:config', (config) => {
      if (Array.isArray(config.content)) {
        // add our components for scanning
        config.content.push(resolve('./runtime/components/*.vue'))
        config.content.push(resolve('./runtime/composables/useBreadcrumbsUi.ts'))
      }
      else if (config.content?.files && Array.isArray(config.content?.files)) {
        // add our components for scanning
        config.content.files.push(resolve('./runtime/components/*.vue'))
        config.content.files.push(resolve('./runtime/composables/useBreadcrumbsUi.ts'))
      }
    })
  },
})
