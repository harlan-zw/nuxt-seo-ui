import { defineBreadcrumb, useSchemaOrg } from '#imports'

export function defineSchemaOrgBreadcrumbs(schemaBreadcrumbs) {
  useSchemaOrg([
    defineBreadcrumb({
      itemListElement: schemaBreadcrumbs,
    }),
  ])
}
