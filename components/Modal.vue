<!-- components/Modal.vue -->
<script setup lang="ts">
const modalStore = useModalStore()

function handleBackgroundClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    modalStore.closeModal()
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="modalStore.showModal" class="transition-all fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50" @click="handleBackgroundClick">
      <div class="bg-gray-300 w-[350px] p-12 rounded-lg relative">
        <button class="border border-gray-100 text-gray-200 p-1 flex rounded-lg justify-center items-center absolute top-2 right-2" @click="modalStore.closeModal">
          <Icon size="30" name="ion:close-outline" />
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* Add any additional styling here */
</style>
