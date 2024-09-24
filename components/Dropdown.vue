<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isDropdownVisible = ref(false)

function toggleDropdown() {
  isDropdownVisible.value = !isDropdownVisible.value
}

function handleClickOutside(event: MouseEvent) {
  const dropdownElement = document.querySelector('.dropdown-container')
  if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
    isDropdownVisible.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative dropdown-container" @click="toggleDropdown">
    <slot name="trigger" />
    <div
      :class="{ 'opacity-100': isDropdownVisible, 'opacity-0': !isDropdownVisible }"
      :style="{ 'pointer-events': isDropdownVisible ? 'auto' : 'none' }"
      class="w-full absolute top-full mt-8 right-0 border-gray-100 border bg-gray rounded shadow-lg transition-opacity duration-300"
    >
      <ul>
        <slot name="items" />
      </ul>
    </div>
  </div>
</template>
