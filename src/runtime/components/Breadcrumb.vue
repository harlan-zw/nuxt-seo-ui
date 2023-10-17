<script lang="ts" setup>
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
import type { BreadcrumbItemProps, BreadcrumbProps } from '../types'
import BreadcrumbItem from './BreadcrumbItem.vue'
import {
  computed,
  defineSchemaOrgBreadcrumbs,
  ref,
  useI18n,
} from '#imports'

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  ui: () => ({}),
  showRoot: true,
  separator: true,
  hideCurrent: false,
  multiline: false,
})

const MIN_VISIBLE_ITEMS = 1
const MAX_VISIBLE_ITEMS = 4

const i18n = useI18n()

const label = computed(() => props.ariaLabel ?? i18n.t('seoUi.breadcrumb.label', 'Breadcrumbs'))

const resolvedItems = computed<BreadcrumbItemProps[]>(() => {
  // let items: BreadcrumbItemProps[]
  return [...props.items]
  // ensure we're working with objects
    .map(i => typeof i === 'string' ? ({ to: i } as BreadcrumbItemProps) : i)
    .map((i, key) => {
      const classes: (string | string[] | undefined)[] = Array.isArray(i.class) ? i.class : [i.class]
      classes.push(props.ui.li)
      // if is last
      i._props = { first: key === 0, last: key === props.items.length - 1 }
      if (i._props.last) {
        classes.push(props.ui.liLast)
        if (props.multiline)
          classes.push(props.ui.liMultiLine)
      }
      i.class = classes
      return i
    })
    // eslint-disable-next-line ts/no-use-before-define
    .slice(visibleItems.value * -1)
})

// requires nuxt-schma-org, fallback to a noop
defineSchemaOrgBreadcrumbs(
  computed(() => ({
    // unique IDs so we support appending to the same array
    id: `#${label.value?.toLowerCase()}`,
    itemListElement: resolvedItems.value.map(item => ({
      name: item.label || item.ariaLabel,
      item: item.to,
    })),
  })),
)

const list = ref<HTMLUListElement>()
const visibleItems = ref<number>(MAX_VISIBLE_ITEMS)
function computeVisibleItems() {
  if (!list.value)
    return visibleItems.value

  const listItems = Array.from(list.value.children) as HTMLLIElement[]
  if (listItems.length <= 0)
    return visibleItems.value

  const containerWidth = list.value.offsetWidth
  const isShowingMenu = false // childArray.length > visibleItems
  let calculatedWidth = 0
  let newVisibleItems = 0
  let maxVisibleItems = MAX_VISIBLE_ITEMS

  if (props.showRoot) {
    calculatedWidth += (listItems.shift() as HTMLLIElement).offsetWidth
    newVisibleItems++
  }

  if (isShowingMenu) {
    calculatedWidth += (listItems.shift() as HTMLLIElement).offsetWidth
    maxVisibleItems--
  }

  if (props.showRoot && calculatedWidth >= containerWidth)
    newVisibleItems--

  // TODO: what if multiline and only one breadcrumb??
  if (props.multiline) {
    listItems.pop()
    newVisibleItems++
  }
  else {
    if (listItems.length > 0) {
      // Ensure the last breadcrumb isn't truncated when we measure it.
      const last = (listItems.pop() as HTMLLIElement)
      last.style.overflow = 'visible'

      calculatedWidth += last.offsetWidth
      if (calculatedWidth < containerWidth)
        newVisibleItems++

      last.style.overflow = ''
    }
  }

  for (const breadcrumb of listItems.reverse()) {
    calculatedWidth += breadcrumb.offsetWidth
    if (calculatedWidth < containerWidth)
      newVisibleItems++
  }

  visibleItems.value = Math.max(MIN_VISIBLE_ITEMS, Math.min(maxVisibleItems, newVisibleItems))
}

const updateVisibleItems = useDebounceFn(computeVisibleItems, 100)
useResizeObserver(list, updateVisibleItems)

const wrapClass = computed(() => !props.multiline ? 'flex-nowrap' : 'flex-wrap')
</script>

<template>
  <nav v-if="resolvedItems.length >= 1" :aria-label="label" :class="ui.nav">
    <ol ref="list" :class="[ui.ol, wrapClass]">
      <li
        v-for="(item, key) in resolvedItems"
        :key="key"
        :class="item.class"
      >
        <slot name="item" :to="item.to" :title="item.label" v-bind="item._props">
          <BreadcrumbItem :ui="ui.item" v-bind="{ ...item, _props: undefined }" :first="item._props!.first" :last="item._props!.last" :separator="separator">
            <template #icon>
              <slot name="icon" v-bind="item" />
            </template>
            <template #label>
              <slot v-if="key === 0" name="first" v-bind="item" />
              <slot name="label" v-bind="item" />
              <slot v-if="key === resolvedItems.length - 1" name="last" v-bind="item" />
            </template>
            <template #separator>
              <slot name="separator" v-bind="item" />
            </template>
          </BreadcrumbItem>
        </slot>
      </li>
    </ol>
  </nav>
</template>
