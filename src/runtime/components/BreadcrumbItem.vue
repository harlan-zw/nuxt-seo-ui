<script lang="ts" setup>
import { defu } from 'defu'
import type { BreadcrumbItemProps } from '../../types'
import {
  computed,
  resolveComponent,
  useAppConfig, useRoute,
} from '#imports'

// TODO: Remove
// @ts-expect-error
import appConfig from '#build/app.config'

const props = withDefaults(defineProps<BreadcrumbItemProps & { last: boolean; first: boolean; current: boolean }>(), {
  ui: () => appConfig.seoUi.breadcrumbItem,
  separator: 'heroicons-solid:chevron-right',
  hideSeparator: false,
})

const runtimeAppConfig = useAppConfig()

const ui = computed<Partial<typeof appConfig.seoUi.breadcrumbs>>(() => defu({}, props.ui, runtimeAppConfig.seoUi.breadcrumbItem))

const SiteLink = resolveComponent('SiteLink')
const Icon = resolveComponent('Icon')

const linkAttrs = computed(() => {
  const attrs: Record<string, any> = {
    to: props.to,
  }
  if (props.disabled) {
    return {
      ...attrs,
      'disabled': true,
      'aria-disabled': true,
    }
  }
  if (props.ariaLabel)
    attrs.ariaLabel = props.ariaLabel
  if (props.icon && !props.label && props.ariaLabel)
    attrs.title = props.ariaLabel

  const route = useRoute()
  attrs.class = [
    props.disabled ? ui.value.disabled : [],
    props.to === route.path ? ui.value.current : ui.value.default,
  ]
  return attrs
})

const spanAttrs = computed(() => {
  return {
    class: [
      props.disabled ? ui.value.disabled : [],
      ui.value.current,
    ],
  }
})
</script>

<template>
  <SiteLink
    v-if="!current"
    v-bind="linkAttrs"
  >
    <template v-if="icon">
      <Icon :name="icon" :class="[ui.icon, (label ? ui.iconWithLabel : [])]" aria-hidden="true" />
    </template>
    <template v-if="label">
      {{ label }}
    </template>
  </SiteLink>
  <span
    v-else
    v-bind="spanAttrs"
  >
    <template v-if="icon">
      <Icon :name="icon" :class="[ui.icon, (label ? ui.iconWithLabel : [])]" aria-hidden="true" />
    </template>
    <template v-if="label">
      {{ label }}
    </template>
  </span>
  <template v-if="!hideSeparator && separator && !last">
    <slot name="separator">
      <Icon :name="separator" class="text-gray-400" aria-hidden="true" :class="ui.separator" />
    </slot>
  </template>
</template>
