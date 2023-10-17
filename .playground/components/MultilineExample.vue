<script lang="ts" setup>
import { ref, useBreadcrumbItems, useBreadcrumbsUi } from '#imports'

const path = ref('/blog/my-awesome-article')

const items = useBreadcrumbItems({ path })
const breadcrumbUi = useBreadcrumbsUi()
</script>

<template>
  <div>
    <SBreadcrumb label="Multiple Example" multiline :items="items" :ui="breadcrumbUi" />
  </div>
</template>
