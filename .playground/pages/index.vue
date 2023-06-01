<script lang="ts" setup>
import { definePageMeta, defineBreadcrumbItems } from '#imports'

definePageMeta({
  breadcrumbLabel: 'Home'
})

const breadcrumbs = defineBreadcrumbItems([
  { to: '/', label: false, ariaLabel: 'Home', icon: 'material-symbols:home-outline-rounded' },
  { to: '/blog', label: 'Blog' },
  { to: '/blog/my-awesome-article', label: 'My Awesome Article' },
])
</script>
<template>
<h1 class="mb-3">{{ $t('welcome') }},</h1>
<div>
  <SBreadcrumb id="sub" :items="breadcrumbs" />
</div>
</template>
