<script setup lang="ts">
import { useI18n } from '#imports'

const i18n = useI18n()
function setLanguage(code: string) {
  i18n.setLocale(code)
}

const locale = i18n.locale

const languageOptions = [
  [
    { label: 'English', click() { setLanguage('en') } },
    { label: 'French', click() { setLanguage('fr') } },
  ],
]
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header class="sticky top-0 z-50 w-full backdrop-blur flex-none border-b border-gray-900/10 dark:border-gray-50/[0.06] bg-white/75 dark:bg-gray-900/75">
      <UContainer class="py-3">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="flex items-end gap-1.5 font-bold text-xl text-gray-900 dark:text-white">
            <Icon name="logos:nuxt-icon" class="w-8 h-8" />
            Nuxt
            <div class="text-primary-500 dark:text-primary-400">
              {{ $t('seoUi.breadcrumbs.label') }}
            </div>
          </NuxtLink>
          <UDropdown :items="languageOptions" :popper="{ placement: 'bottom-start' }">
            <UButton color="white" :label="locale" trailing-icon="i-heroicons-chevron-down-20-solid" />
          </UDropdown>
        </div>
      </UContainer>
    </header>
    <main class="min-h-full h-full flex-grow">
      <UContainer class="mt-4">
        <h1 class="mb-3">
          {{ $t('welcome') }},
        </h1>
        <div>
          <div class="grid grid-cols-2 gap-10">
            <div>
              <h2 class="text-xl font-bold">
                Default
              </h2>
              <div class="rounded flex items-center justify-center w-full h-[300px] bg-green-500 px-10">
                <div class="bg-white px-10 py-7 rounded-xl shadow-xl overflow-hidden">
                  <DefaultExample />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold">
                Automatic
              </h2>
              <div class="rounded flex items-center justify-center w-full h-[300px] bg-green-500 px-10">
                <div class="bg-white px-10 py-7 rounded-xl shadow-xl overflow-hidden">
                  <AutoExample />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold">
                Multiline
              </h2>
              <div class="rounded flex items-center justify-center w-full h-[300px] bg-green-500">
                <div class="bg-white px-10 py-7 rounded-xl shadow-xl overflow-hidden">
                  <MultilineExample />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold">
                Overflow
              </h2>
              <div class="rounded overflow-hidden flex items-center justify-center w-full h-[300px] bg-green-500 p-10">
                <div class="bg-white px-10 py-7 rounded-xl shadow-xl overflow-hidden">
                  <OverflowExample />
                </div>
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold">
                Visible Items
              </h2>
              <div class="rounded overflow-hidden flex items-center justify-center w-full h-[300px] bg-green-500 p-10">
                <div class="bg-white px-10 py-7 rounded-xl shadow-xl overflow-hidden">
                  <VisibleItemsExample />
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </main>
    <footer class="text-sm text-gray-700 flex justify-center items-center py-5">
      Made by <UAvatar src="https://avatars.githubusercontent.com/u/5326365?v=4" size="xs" class="w-5 h-5 mx-1" /> Harlan Wilton
    </footer>
  </div>
</template>
