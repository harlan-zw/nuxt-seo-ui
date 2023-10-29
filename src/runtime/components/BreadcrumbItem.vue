<script lang="ts" setup>
import type { BreadcrumbItemProps } from '../types'
import {
  computed,
  resolveComponent,
} from '#imports'

const props = withDefaults(defineProps<BreadcrumbItemProps & { last: boolean; first: boolean }>(), {
  ui: () => ({}),
  separator: 'heroicons-solid:chevron-right',
})

const ui = computed(() => props.ui)

const SiteLink = resolveComponent('SiteLink')
const Icon = resolveComponent('Icon')

const linkAttrs = computed(() => {
  const attrs: BreadcrumbItemProps & Record<string, any> = {
    to: props.to,
    label: props.label,
  }
  if (props.disabled) {
    return {
      ...attrs,
      'disabled': true,
      'aria-disabled': true,
    }
  }
  else {
    attrs.tabindex = 0
  }
  attrs['aria-label'] = props.ariaLabel || typeof props.label === 'string' ? String(props.label) : undefined
  if (props.icon && !props.label && props.ariaLabel)
    attrs.title = props.ariaLabel

  attrs.class = [
    props.disabled ? ui.value.disabled : [],
    props.current ? ui.value.current : ui.value.default,
    props.last ? ui.value.last : [],
  ]
  return attrs
})

const spanAttrs = computed(() => {
  return {
    'class': [
      props.disabled ? ui.value.disabled : [],
      ui.value.current,
      props.last ? ui.value.last : [],
    ],
    'label': props.label,
    'aria-disabled': true,
    'aria-current': props.current ? (props.ariaCurrent || 'page') : undefined,
  }
})

const separatorIcon = computed(() => props.separator === true ? 'heroicons-solid:chevron-right' : props.separator)
</script>

<template>
  <SiteLink
    v-if="!current"
    v-bind="linkAttrs"
  >
    <slot v-if="icon" name="icon">
      <Icon :name="icon" :class="[ui.icon, (label ? ui.iconWithLabel : [])]" aria-hidden="true" role="img" />
    </slot>
    <slot v-if="label" name="label">
      <span :class="last ? ui.last : []">
        {{ label }}
      </span>
    </slot>
  </SiteLink>
  <a
    v-else
    v-bind="spanAttrs"
  >
    <slot v-if="icon" name="icon">
      <Icon :name="icon" :class="[ui.icon, (label ? ui.iconWithLabel : [])]" aria-hidden="true" role="img" />
    </slot>
    <slot v-if="label" name="label">
      {{ label }}
    </slot>
  </a>
  <slot v-if="separatorIcon && !last" name="separator">
    <Icon :name="separatorIcon" aria-hidden="true" :class="ui.separator" role="img" />
  </slot>
</template>
