import type { ParsedURL } from 'ufo'
import { hasTrailingSlash, parseURL, stringifyParsedURL, withTrailingSlash, withoutTrailingSlash } from 'ufo'
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import type { RouteMeta } from 'vue-router'
import type { BreadcrumbItemProps } from '../types'
import { translateSeoUILabel, useRoute, useRouter } from '#imports'

function titleCase(s: string) {
  return s
    .replaceAll('-', ' ')
    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())
}

export function pathBreadcrumbSegments(path: string) {
  const startNode = parseURL(path)
  const appendsTrailingSlash = hasTrailingSlash(startNode.pathname)

  const stepNode = (node: ParsedURL, nodes: string[] = []) => {
    const fullPath = stringifyParsedURL(node)
    // the pathname will always be without the trailing slash
    const currentPathName = node.pathname
    // when we hit the root the path will be an empty string; we swap it out for a slash
    nodes.push(fullPath || '/')
    // strip the last path segment (/my/cool/path -> /my/cool)
    node.pathname = currentPathName.substring(0, currentPathName.lastIndexOf('/'))
    // if the input was provided with a trailing slash we need to honour that
    if (appendsTrailingSlash)
      node.pathname = withTrailingSlash(node.pathname.substring(0, node.pathname.lastIndexOf('/')))

    // if we still have a pathname, and it's different, traverse
    if (node.pathname !== currentPathName)
      stepNode(node, nodes)
    return nodes
  }
  return stepNode(startNode)
}

export function generateBreadcrumbsFromRoute(): ComputedRef<BreadcrumbItemProps[]> {
  const router = useRouter()
  return computed(() => {
    const route = router.currentRoute.value
    return pathBreadcrumbSegments(route.path)
      .reverse()
      .map(path => ({
        to: path,
      }) as BreadcrumbItemProps)
  })
}

export function normaliseBreadcrumbItem(options: { current?: string; hideCurrent?: boolean } = {}) {
  const router = useRouter()
  const routes = router.getRoutes()
  const current = options.current || useRoute().path
  return (item: BreadcrumbItemProps) => {
    const route = routes.find(route => withoutTrailingSlash(route.path) === withoutTrailingSlash(item.to))
    const routeMeta = (routes.find(route => route.path === item.to)?.meta || {}) as RouteMeta & { title?: string; breadcrumbLabel: string }
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
          item.label = titleCase(item.to.split('/').pop() || '')
      }
    }
    // mark the current based on the options
    item.current = item.to === current
    if (options.hideCurrent && item.current)
      return false
    return item
  }
}

export function defineBreadcrumbItems(items: BreadcrumbItemProps[]) {
  return items
}
