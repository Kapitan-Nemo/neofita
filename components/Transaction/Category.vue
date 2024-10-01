<script setup lang="ts">
import { collection, getDocs } from 'firebase/firestore'
import { onMounted, ref } from 'vue'

interface Category {
  id: string
  name: string
  color: string
}

const firestore = useNuxtApp().$firestore
const auth = useAuth()
const categories = ref<Category[]>([])

async function fetchCategories() {
  if (auth) {
    const querySnapshot = await getDocs(collection(firestore, `users-data/${auth.userID}/finance-category`))
    categories.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name,
        color: data.color,
      } as Category
    })
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div class="transactions">
    <div class="header">
      <div class="column">
        Name
      </div>
      <div class="column text-right">
        Actions
      </div>
    </div>
    <div v-for="category in categories" :key="category.id" class="row">
      <div class="column flex gap-4">
        <span class="w-6 h-6 text-xs flex justify-center items-center p-2 rounded-full text-white" :style="{ backgroundColor: category.color }">
          {{ category.name.trim().charAt(0).toUpperCase() }}
        </span>
        <div>
          {{ category.name }}
        </div>
      </div>
      <div class="column flex gap-4 items-center justify-end">
        <span class="p-2 border flex items-center hover:text-red cursor-pointer transition-all border-gray-100 rounded-lg">
          <Icon size="20" name="ion:edit" />
        </span>
        <span class="p-2 border flex items-center hover:text-red cursor-pointer transition-all border-gray-100 rounded-lg">
          <Icon size="20" name="ion:trash-outline" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions {
  @apply flex flex-col w-full;
}

.header, .row {
  @apply flex border-t border-gray-300;
}

.column {
  @apply flex-1 p-4 text-sm text-gray-200;
}

.header .column {
  @apply text-white;
}
</style>
