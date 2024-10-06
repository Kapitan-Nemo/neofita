<script setup lang="ts">
defineProps<Partial<{
  title: string
  subtitle: string
  buttonText: string
  buttonAction: string
  link: string
  active: boolean
}>>()
const modalStore = useModalStore()
function openCategoryModal() {
  modalStore.openModal('<p>Content from LIST </p>')
}
</script>

<template>
  <div>
    <div class="bg-gray p-6 rounded-lg">
      <div class="flex justify-between items-start">
        <div class="flex flex-col gap-1">
          <h2 v-if="title" class="text-2xl">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-gray-200 text-sm">
            {{ subtitle }}
          </p>
        </div>
        <div class="flex gap-4">
          <NuxtLink v-if="buttonAction && link" :to="link" class="flex items-center gap-4 px-4 py-2 text-sm border border-gray-100 text-white rounded-lg">
            {{ buttonAction }}<Icon name="ion:edit" />
          </NuxtLink>

          <button v-if="buttonText" :disabled="!active" class="px-4 py-2 text-sm border border-gray-100 text-white rounded-lg" @click="openCategoryModal">
            {{ buttonText }}
          </button>
        </div>
      </div>
      <div class="mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>
