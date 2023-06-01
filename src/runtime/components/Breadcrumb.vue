<script lang="ts" setup>
import { defu } from 'defu'
import type { BreadcrumbItemProps, BreadcrumbProps } from '../../types'
import { normaliseBreadcrumbItem } from '../composables'
import BreadcrumbItem from './BreadcrumbItem.vue'
import {
  computed,
  defineSchemaOrgBreadcrumbs,
  generateBreadcrumbsFromRoute,
  resolveComponent,
  translateSeoUILabel,
  useAppConfig,
} from '#imports'

// TODO: Remove
// @ts-expect-error
import appConfig from '#build/app.config'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  ui: () => appConfig.seoUi.breadcrumb,
  homeIcon: true,
})

const runtimeAppConfig = useAppConfig()

const ui = computed<Partial<typeof appConfig.seoUi.breadcrumbs>>(() => defu({}, props.ui, runtimeAppConfig.seoUi.breadcrumb))

const label = computed(() => props.ariaLabel ?? translateSeoUILabel('seoUi.breadcrumbs.breadcrumbs', 'Breadcrumbs'))

const items = computed<BreadcrumbItemProps[]>(() => {
  let items = []
  if (props.items) {
    items = props.items
      // ensure we're working with objects
      .map(i => typeof i === 'string' ? ({ to: i } as BreadcrumbItemProps) : i)
      .map(normaliseBreadcrumbItem)
  }
  else {
    items = generateBreadcrumbsFromRoute().value
  }
  if (props.homeIcon) {
    items[0] = {
      ...items[0],
      icon: 'material-symbols:home-outline-rounded',
      label: false,
      ariaLabel: translateSeoUILabel('seoUi.breadcrumbs.homeLabel', 'Home'),
    }
  }
  return items
})

// requires nuxt-schma-org, fallback to a noop
defineSchemaOrgBreadcrumbs(
  computed(() => ({
    // unique IDs so we support appending to the same array
    id: `#${label.value.toLowerCase()}`,
    itemListElement: items.value.map(item => ({
      name: item.label,
      item: item.to,
    })),
  })),
)
</script>

<template>
  <nav v-if="showAtRoot || items.length > 1" :aria-label="label" :class="ui.nav">
    <ol :class="ui.list">
      <template
        v-for="(item, key) in items"
        :key="key"
      >
        <li :class="ui.itemContainer">
          <slot name="item" :to="item.to" :title="item.label" :last="key === items.length - 1" :first="key === 0">
            <BreadcrumbItem :last="key === items.length - 1" :first="key === 0" v-bind="item" />
          </slot>
        </li>
      </template>
    </ol>
  </nav>
</template>
