<script setup lang="ts">
import { ref } from 'vue'

interface Transaction {
  description: string
  date: string
  type: string
  amount: string
  color: string
}

const transactions = ref<Transaction[]>([
  { description: 'Groceries', date: '2023-10-01', type: 'Expense', amount: '$50.00', color: '#BF2A96' },
  { description: 'Salary', date: '2023-10-01', type: 'Income', amount: '$3000.00', color: '#2BBFA4' },
  { description: 'Electricity Bill', date: '2023-10-02', type: 'Expense', amount: '$75.00', color: '#BF7B2B' },
  { description: 'Internet Bill', date: '2023-10-03', type: 'Expense', amount: '$45.00', color: '#5A2BBF' },
  { description: 'Freelance Work', date: '2023-10-04', type: 'Income', amount: '$500.00', color: '#BF342C' },
])
</script>

<template>
  <div class="transactions">
    <div class="header">
      <div class="column">
        Description
      </div>
      <div class="column">
        Date
      </div>
      <div class="column">
        Type
      </div>
      <div class="column">
        Amount
      </div>
    </div>
    <div v-for="(t, index) in transactions" :key="index" class="row">
      <div class="column flex gap-4">
        <span class="w-6 h-6 text-xs flex justify-center items-center p-2 rounded-full text-white" :style="{ backgroundColor: t.color }">
          {{ t.description.trim().charAt(0).toUpperCase() }}
        </span>
        <div>
          {{ t.description }}
        </div>
      </div>
      <div class="column">
        {{ t.date }}
      </div>
      <div class="column">
        {{ t.type }}
      </div>
      <div class="column">
        {{ t.amount }}
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
    @apply flex-1 p-4 text-left text-sm text-gray-200;
  }

  .header .column {
    @apply text-white;
  }
  </style>
