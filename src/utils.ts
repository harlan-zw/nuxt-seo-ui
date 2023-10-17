import { loadNuxtModuleInstance, useNuxt } from '@nuxt/kit'
import type { Nuxt, NuxtModule } from 'nuxt/schema'

/**
 * Get the user provided options for a Nuxt module.
 *
 * These options may not be the resolved options that the module actually uses.
 * @param module
 * @param nuxt
 */
export async function getNuxtModuleOptions(module: string | NuxtModule, nuxt: Nuxt = useNuxt()) {
  const moduleMeta = (typeof module === 'string' ? { name: module } : await module.getMeta?.()) || {}
  const { nuxtModule } = (await loadNuxtModuleInstance(module, nuxt))
  const inlineOptions = (
    await Promise.all(
      nuxt.options.modules
        .filter(async (m) => {
          if (!Array.isArray(m))
            return false
          const _module = m[0]
          return typeof module === 'object'
            ? (await (_module as any as NuxtModule).getMeta?.() === moduleMeta.name)
            : _module === moduleMeta.name
        })
        .map(m => m?.[1 as keyof typeof m]),
    )
  )[0] || {}
  if (nuxtModule.getOptions)
    return nuxtModule.getOptions(inlineOptions, nuxt)
  return inlineOptions
}
