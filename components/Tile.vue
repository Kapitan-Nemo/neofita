<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  buttonText: string
}>()

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
        <h2 class="text-2xl font-bold">
          {{ title }}
        </h2>
        <p class="text-gray-200 text-sm">
          {{ subtitle }}
        </p>
      </div>
      <button class="px-4 py-2 text-sm border border-gray-100 text-white rounded">
        {{ buttonText }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
