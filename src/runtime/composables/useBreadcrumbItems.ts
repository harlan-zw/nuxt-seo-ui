import { defu } from 'defu'
import { withoutTrailingSlash } from 'ufo'
import type { RouteMeta } from 'vue-router'
import type { Ref } from '@vue/reactivity'
import type { BreadcrumbItemProps, BreadcrumbProps } from '../types'
import { pathBreadcrumbSegments, titleCase } from './utils'
import {
  ref,
  toValue,
  useI18n,
  useRoute,
  useRouter,
  useRuntimeConfig,
  watchEffect,
} from '#imports'

export function useBreadcrumbItems(options: { path?: string | Ref<string> } & Omit<BreadcrumbProps, 'items'> = {}) {
  const items = ref<BreadcrumbItemProps[]>([])
  const router = useRouter()
  const routes = router.getRoutes()
  const current = options.path || useRoute().path
  const { i18n: i18nOptions } = defu(useRuntimeConfig().public['nuxt-seo-ui'], { i18n: false }) as {
    i18n: false | {
      strategy: 'prefix' | 'prefix_except_default' | 'prefix_and_default'
      defaultLocale: string
      routesNameSeparator: string
    }
  }
  const i18n = useI18n()
  watchEffect(() => {
    items.value = pathBreadcrumbSegments(toValue(current))
      .reverse()
      .map(path => ({
        to: path,
      }) as BreadcrumbItemProps)
      .map((item) => {
        const route = routes.find(r => withoutTrailingSlash(r.path) === withoutTrailingSlash(item.to))
        const routeMeta = (route?.meta || {}) as RouteMeta & { title?: string; breadcrumbLabel: string }
        const routeName = route ? String(route.name || route.path) : (item.to === '/' ? 'index' : 'unknown')
        let [name] = routeName.split(i18nOptions ? i18nOptions.routesNameSeparator : '___')
        if (name === 'unknown')
          name = item.to.split('/').pop() || '' // fallback to last path segment
        // merge with the route meta
        if (routeMeta.breadcrumb) {
          item = {
            ...item,
            ...routeMeta.breadcrumb,
          }
        }
        // allow opt-out of label normalise with `false` value
        // @ts-expect-error untyped
        item.label = item.label || routeMeta.breadcrumbTitle || routeMeta.title
        if (typeof item.label === 'undefined') {
          // try use i18n
          // fetch from i18n
          item.label = item.label || i18n.t(`seoUi.breadcrumb.items.${name}.label`, name === 'index' ? 'Home' : titleCase(name), { missingWarn: false })
          item.ariaLabel = item.ariaLabel || i18n.t(`seoUi.breadcrumb.items.${name}.ariaLabel`, item.label, { missingWarn: false })
        }
        item.ariaLabel = item.ariaLabel || typeof item.label === 'string' ? String(item.label) : undefined
        // mark the current based on the options
        item.current = item.current || item.to === current
        if (options.hideCurrent && item.current)
          return false
        return item
      })
      .filter(Boolean) as BreadcrumbItemProps[]
  })
  return items
}
