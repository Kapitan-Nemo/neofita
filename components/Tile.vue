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
  <div class="bg-gray p-4 rounded-lg">
    <div class="flex justify-between items-center">
      <div>
        <h2 class="">
          {{ title }}
        </h2>
        <p class="text-gray-200">
          {{ subtitle }}
        </p>
      </div>
      <button class="px-4 py-2 border border-gray-100 text-white rounded">
        {{ buttonText }}
      </button>
    </div>
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>
