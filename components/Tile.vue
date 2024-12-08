<script setup lang="ts">
const props = defineProps<Partial<{
  title: string
  subtitle: string
  link: string
  linkText: string
  action: () => void
  active: boolean
  modalId: string
  class: string
}>>()
const modalStore = useModalStore()

function openModal() {
  if (props.modalId) {
    modalStore.openModal(props.modalId)
  }
  else {
    console.error('modalId is undefined')
  }
}
</script>

<template>
  <div :class="props.class" class="bg-gray p-6 rounded-lg">
    <div class="flex justify-between items-start mb-4">
      <div class="flex flex-col gap-1">
        <h2 v-if="title" class="text-2xl">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-gray-200 text-sm">
          {{ subtitle }}
        </p>
      </div>
      <div class="flex whitespace-nowrap gap-4">
        <NuxtLink v-if="linkText && link" :to="link" class="flex items-center gap-4 px-4 py-2 text-sm border border-gray-100 text-white rounded-lg">
          {{ linkText }}<Icon name="ion:edit" />
        </NuxtLink>
        <button v-if="linkText && !link && !action" :disabled="!active" class="px-4 py-2 text-sm border border-gray-100 text-white rounded-lg" @click="openModal">
          {{ linkText }}
        </button>
        <button v-if="props.action" class="px-4 py-2 text-sm border border-gray-100 text-white rounded-lg" @click="props.action">
          {{ linkText }}
        </button>
      </div>
    </div>
    <slot />
  </div>
</template>
