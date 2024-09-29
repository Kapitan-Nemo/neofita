<script setup lang="ts">
import { doc, setDoc } from 'firebase/firestore'

const firestore = useNuxtApp().$firestore
const auth = useAuth()

const categoryName = ref('')
const categoryColor = ref('#000000')

async function createCategory() {
  if (auth && categoryName.value && categoryColor.value) {
    const newCategoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryName.value)
    await setDoc(newCategoryRef, {
      name: categoryName.value,
      color: categoryColor.value,
    })
    categoryName.value = ''
    categoryColor.value = '#000000'
    useToast('Category created successfully', 'success')
  }
  else {
    useToast('Please fill in all fields', 'error')
  }
}
</script>

<template>
  <div class="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
    <input
      v-model="categoryName"
      placeholder="Category Name"
      class="mb-4 p-2 border text-red border-gray-300 rounded-md w-full"
    >
    <input
      v-model="categoryColor"
      type="color"
      class="mb-4 p-2 border text-red border-gray-300 rounded-md w-full"
    >
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      @click="createCategory"
    >
      Create Category
    </button>
  </div>
</template>
