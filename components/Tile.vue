<script setup lang="ts">
defineProps<Partial<{
  title: string
  subtitle: string
  buttonText: string
}>>()

// const emit = defineEmits<{
//   (e: 'buttonClick'): void
// }>()

// function handleButtonClick() {
//   emit('buttonClick')
// }
</script>

<template>
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
      <button v-if="buttonText" class="px-4 py-2 text-sm border border-gray-100 text-white rounded">
        {{ buttonText }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
