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
  <div class="border border-gray-300 p-4 rounded-lg">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-xl font-bold">
          {{ title }}
        </h1>
        <h2 class="text-sm text-gray-600">
          {{ subtitle }}
        </h2>
      </div>
      <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        {{ buttonText }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
