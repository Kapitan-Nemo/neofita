<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const categories = computed(() => firebaseStore.categories)

const amount = ref(0)
const date = ref(new Date().toISOString().split('T')[0])
const selectedCategory = ref('')

async function createFinance() {
  try {
    if (!amount.value || !date.value || !selectedCategory.value) {
      useToast('Please fill in all fields', 'error')
      return
    }

    const dateObject = new Date(date.value) // Convert string to Date object

    await firebaseStore.createTransaction(
      amount.value,
      dateObject, // Pass the Date object
      selectedCategory.value,
    )

    useToast('Transaction created successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

onMounted(() => {
  firebaseStore.fetchCategories()
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <input v-model="amount" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg" type="number" placeholder="Amount">
    <input v-model="date" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg" type="date">
    <select v-model="selectedCategory" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg">
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
    <button @click="createFinance">
      Create Finance
    </button>
  </div>
</template>
