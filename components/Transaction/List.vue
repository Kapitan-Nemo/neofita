<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const transactions = computed(() => firebaseStore.transactions)

onMounted(() => {
  firebaseStore.fetchTransactions()
})

// Function to format date
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString()
}
</script>

<template>
  <div class="transactions">
    <div class="header">
      <div class="column">
        Category
      </div>
      <div class="column">
        Date
      </div>
      <div class="column">
        Amount
      </div>
    </div>
    <div v-for="t in transactions" :key="t.id" class="row">
      <div class="column flex gap-4">
        <span class="w-6 h-6 text-xs flex justify-center items-center p-2 rounded-full text-white" :style="{ backgroundColor: t.category.color || '#000' }">
          {{ t.category.name?.trim().charAt(0).toUpperCase() || 'U' }}
        </span>
        <div>
          {{ t.category.name || 'Uncategorized' }}
        </div>
      </div>
      <div class="column">
        {{ formatDate(t.date) }}
      </div>
      <div class="column">
        {{ t.amount }}
      </div>
    </div>
    <div v-if="!transactions.length" class="p-4 flex flex-row items-center">
      <img src="/assets/img/no_found.jpg" alt="No data" class="w-40 rounded-lg">
      <p class="text-center text-gray-200 w-full">
        Whoops... There is no data, ask the devil to add some.
      </p>
    </div>
  </div>
</template>

  <style lang="scss" scoped>
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
