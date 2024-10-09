<script setup lang="ts">
import { useFirebaseStore } from '@/stores/firebase'
import { ref } from 'vue'

const firebaseStore = useFirebaseStore()
const name = ref('')
const color = ref('#000000')

async function addCategory() {
  if (name.value.trim() === '') {
    useToast('Category name cannot be empty', 'error')
    return
  }
  await firebaseStore.createCategory(name.value, color.value)
  useToast('Category added successfully', 'success')
  name.value = ''
  color.value = '#000000'
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <label for="category-name">Category Name</label>
      <input id="category-name" v-model="name" type="text" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg" placeholder="Enter category name">
    </div>
    <div class="flex flex-col">
      <label for="category-color">Category Color</label>
      <input id="category-color" v-model="color" type="color" class="w-8 h-8 p-0 border-none bg-transparent ml-2">
    </div>
    <button class="mt-4 px-4 border-gray-100 py-2 text-sm border text-white rounded-lg" @click="addCategory">
      Add Category
    </button>
  </div>
</template>

<style lang="scss" scoped>
label {
  @apply mb-2 text-sm;
}
</style>
