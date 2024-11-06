<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const transactions = computed(() => firebaseStore.transactions)
const categories = computed(() => firebaseStore.categories)

const amount = ref<number | null>(null)
const date = ref(new Date())
const categoryId = ref<string>('')

const isEditMode = ref(false)
const selectedTransactionId = ref<string | null>(null)

async function UpdateTransaction() {
  try {
    if (!amount.value || !date.value || !categoryId.value) {
      useToast('Please fill in all fields', 'error')
      return
    }

    if (isEditMode.value && selectedTransactionId.value) {
      await firebaseStore.updateTransaction(selectedTransactionId.value, amount.value, new Date(date.value), categoryId.value)
    }

    clearForm()
    useToast('Transaction updated successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

async function confirmDeleteTransaction(transactionId: string) {
  try {
    // TODO: WRITE A CONFIRMATION MODAL
    await firebaseStore.deleteTransaction(transactionId)
    useToast('Transaction deleted successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

function selectTransaction(transaction: Transaction) {
  amount.value = transaction.amount
  const timestamp = formatDate(transaction.date)
  date.value = new Date(timestamp)
  categoryId.value = transaction.category.id
  selectedTransactionId.value = transaction.id
  isEditMode.value = true
}

function clearForm() {
  amount.value = null
  date.value = new Date()
  categoryId.value = ''
  selectedTransactionId.value = null
  isEditMode.value = false
}

onMounted(async () => {
  await firebaseStore.fetchTransactions()
  await firebaseStore.fetchCategories()
})
</script>

<template>
  <div class="flex flex-col w-full">
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
      <div class="column justify-end">
        Actions
      </div>
    </div>
    <div v-for="t in transactions" :key="t.id" class="row">
      <div class="column flex gap-4">
        <div v-if="isEditMode && selectedTransactionId === t.id" class="flex items-center w-full gap-[65px]">
          <select v-model="categoryId" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg">
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>

          <VDatePicker
            v-model="date"
            mode="dateTime"
            is24hr
            :time-accuracy="3"
            :style="{ backgroundColor: '#1e1e1e', border: '1px solid #454545' }"
            color="red"
            is-dark
          >
            <template #default="{ togglePopover }">
              <button
                class="cursor-pointer flex justify-between w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
                @click="togglePopover"
              >
                {{ formatDate(date, 'string') }}
                <Icon size="20" name="ion:calendar-sharp" />
              </button>
            </template>
          </VDatePicker>

          <input
            v-model="amount"
            type="number"
            placeholder="Enter amount"
            class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
          >
        </div>
        <div v-else class="flex gap-4 items-center">
          <span class="w-6 h-6 text-xs flex justify-center items-center p-2 rounded-full text-white" :style="{ backgroundColor: t.category.color || '#000' }">
            {{ t.category.name?.trim().charAt(0).toUpperCase() || 'U' }}
          </span>
          {{ t.category.name || 'Uncategorized' }}
        </div>
      </div>
      <div class="column">
        <span v-if="!isEditMode || selectedTransactionId !== t.id">{{ formatDate(t.date, 'string') }}</span>
      </div>
      <div class="column">
        <span v-if="!isEditMode || selectedTransactionId !== t.id">{{ t.amount }}</span>
      </div>
      <div class="column flex gap-4 items-center justify-end">
        <span
          v-if="isEditMode && selectedTransactionId === t.id"
          class="hover:text-red p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="clearForm"
        >
          <Icon size="20" name="ion:close" />
        </span>
        <span
          v-if="isEditMode && selectedTransactionId === t.id"
          class="hover:text-red p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="UpdateTransaction"
        >
          <Icon size="20" name="ion:save-outline" />
        </span>
        <span
          v-if="!isEditMode || selectedTransactionId !== t.id"
          :class="{ disabled: isEditMode && selectedTransactionId !== t.id }"
          class="hover:text-red p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="selectTransaction(t)"
        >
          <Icon size="20" name="ion:edit" />
        </span>
        <span
          v-if="!isEditMode || selectedTransactionId !== t.id"
          :class="{ disabled: isEditMode && selectedTransactionId !== t.id }"
          class="hover:text-red p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="confirmDeleteTransaction(t.id)"
        >
          <Icon size="20" name="ion:trash-outline" />
        </span>
      </div>
    </div>
    <TransactionListEmpty v-if="!transactions.length" />
  </div>
  <Modal modal-id="transactionModal">
    <TransactionListAdd />
  </Modal>
</template>

<style lang="scss" scoped>
.header, .row {
  @apply flex border-t border-gray-300;
}

.column {
  @apply flex flex-1 p-4 text-sm text-gray-200 items-center;
}

.header .column {
  @apply text-white;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
