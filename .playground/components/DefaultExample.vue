<script lang="ts" setup>
import { defineBreadcrumbItems, useBreadcrumbsUi } from '#imports'

const items = defineBreadcrumbItems([
  { to: '/', ariaLabel: 'Home', icon: 'material-symbols:home-outline-rounded' },
  { to: '/blog', label: 'Blog', ariaLabel: 'Blog', icon: 'material-symbols:book-outline' },
  { to: '/blog/my-awesome-article', label: 'My Awesome Article', current: true },
])

const breadcrumbUi = useBreadcrumbsUi()
</script>

<template>
  <div>
    <SBreadcrumb id="sub" :items="items" :ui="breadcrumbUi" />
  </div>
</template>
