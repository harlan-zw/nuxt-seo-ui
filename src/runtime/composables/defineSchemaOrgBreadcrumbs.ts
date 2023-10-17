import type { MaybeRefOrGetter } from '@vueuse/shared'

// @ts-expect-error runtime type
import { defineBreadcrumb, useSchemaOrg } from '#imports'

export function defineSchemaOrgBreadcrumbs(schemaBreadcrumbs: MaybeRefOrGetter<{ id: string; itemListElement: { name: string; item: string }[] }>) {
  useSchemaOrg([
    defineBreadcrumb(schemaBreadcrumbs),
  ])
}
