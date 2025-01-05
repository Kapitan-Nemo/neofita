<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const transactions = computed(() => firebaseStore.transactions)

onMounted(async () => {
  await firebaseStore.fetchTransactions()
})
</script>

<template>
  <div class="flex flex-col w-full h-full max-h-[340px] overflow-y-auto no-scrollbar">
    <div v-if="transactions.length" class="header">
      <div class="column">
        Category
      </div>
      <div class="column">
        Date
      </div>
      <div class="column">
        Amount
      </div>
      <div class="column">
        Description
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
        {{ formatDate(t.date, 'string') }}
      </div>
      <div class="column">
        {{ t.amount }}
      </div>
      <div class="column">
        {{ t.description }}
      </div>
    </div>
    <TransactionListEmpty v-if="!transactions.length" />
  </div>
</template>

  <style lang="scss" scoped>
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
