import { withoutTrailingSlash } from 'ufo'
import type { RouteMeta } from 'vue-router'
import type { BreadcrumbItemProps } from '../types'
import { translateSeoUILabel, useRoute, useRouter } from '#imports'

function titleCase(s: string) {
  return s
    .replaceAll('-', ' ')
    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())
}
export function normaliseBreadcrumbItem(options: { current?: string; hideCurrent?: boolean } = {}) {
  const router = useRouter()
  const routes = router.getRoutes()
  const current = options.current || useRoute().path
  return (item: BreadcrumbItemProps) => {
    const route = routes.find(route => withoutTrailingSlash(route.path) === withoutTrailingSlash(item.to))
    const routeMeta = (route?.meta || {}) as RouteMeta & { title?: string; breadcrumbLabel: string }
    // allow opt-out of label normalise with `false` value
    if (typeof item.label === 'undefined') {
      // try use i18n
      if (route) {
        const routeName = String(route.name || route.path)
        // fetch from i18n
        item.label = translateSeoUILabel(`pages.${routeName}.breadcrumbLabel`, routeName)
      }
      // use route meta breadcrumbLabel
      if (routeMeta.breadcrumbLabel && !item.label)
        item.label = routeMeta.breadcrumbLabel

      // use route meta title
      if (routeMeta.title && !item.label)
        item.label = routeMeta.title

      // fallback
      if (!item.label) {
        if (item.to === '/')
          item.label = translateSeoUILabel('seoUi.breadcrumbs.root', 'Home')
        else
          // pop last url segment and title case it
          item.label = titleCase(withoutTrailingSlash(item.to).split('/').pop() || '')
      }
    }
    // mark the current based on the options
    item.current = item.to === current
    if (options.hideCurrent && item.current)
      return false
    return item
  }
}
