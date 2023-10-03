<script lang="ts" setup>
import { defineBreadcrumbItems, definePageMeta, ref } from '#imports'

definePageMeta({
  breadcrumbLabel: 'Home',
})

const breadcrumbs = defineBreadcrumbItems([
  { to: '/', label: false, ariaLabel: 'Home', icon: 'material-symbols:home-outline-rounded' },
  { to: '/blog', label: 'Blog' },
  { to: '/blog/my-awesome-article', label: 'My Awesome Article' },
])

const hideCurrent = ref(false)
const hideSeparator = ref(false)

function toggleHideCurrent() {
  hideCurrent.value = !hideCurrent.value
}

function toggleHideSeparator() {
  hideSeparator.value = !hideSeparator.value
}

const current = ref('/blog/my-awesome-article')
</script>

<template>
  <h1 class="mb-3">
    {{ $t('welcome') }},
  </h1>
  <div>
    <SBreadcrumb id="sub" :items="breadcrumbs" :current="current" :hide-separator="hideSeparator" :hide-current="hideCurrent" :ui="{ item: { current: ['bg-blue-500'] } }" />
    <div class="flex items-center">
      <UButton @click="toggleHideCurrent">
        Hide Current - {{ hideCurrent }}
      </UButton>
      <UButton @click="toggleHideSeparator">
        Hide Separators - {{ hideSeparator }}
      </UButton>
      <label>Current - {{ current }}
        <UInput type="text" placeholder="" label="test" name="current" :model-value="current" />
      </label>
    </div>
  </div>
</template>
