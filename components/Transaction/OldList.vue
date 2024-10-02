<script setup lang="ts">
const { transactions, categories, fetchTransactions, fetchCategories, createTransaction } = useFirebase()

const amount = ref<number | null>(null)
const date = ref<string>('')
const categoryId = ref<string>('')

async function handleSubmit() {
  if (amount.value !== null && date.value && categoryId.value) {
    await createTransaction(amount.value, new Date(date.value), categoryId.value)
    await fetchTransactions()
    amount.value = null
    date.value = ''
    categoryId.value = ''
  }
}
</script>

<template>
  <div class="transactions">
    <form class="mb-4" @submit.prevent="handleSubmit">
      <div class="mb-2">
        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
        <input id="amount" v-model="amount" type="number" class="bg-black mt-1 block w-full" required>
      </div>
      <div class="mb-2">
        <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
        <input id="date" v-model="date" type="date" class="mt-1 block bg-black w-full" required>
      </div>
      <div class="mb-2">
        <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
        <select id="category" v-model="categoryId" class="mt-1 block bg-black w-full" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
        Add Transaction
      </button>
    </form>
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
  @apply flex-1 p-4 text-left text-sm text-gray-200;
}

.header .column {
  @apply text-white;
}
</style>
