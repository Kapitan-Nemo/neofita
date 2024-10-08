<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const modalStore = useModalStore()
const categories = computed(() => firebaseStore.categories)
const amount = ref(0)

// Function to format date to 'yyyy-MM-ddTHH:mm:ss'
function formatDateToLocal(date: Date): string {
  const pad = (num: number) => num.toString().padStart(2, '0')
  const year = date.getFullYear()
  const month = pad(date.getMonth() + 1)
  const day = pad(date.getDate())
  const hours = pad(date.getHours())
  const minutes = pad(date.getMinutes())
  const seconds = pad(date.getSeconds())
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
}

const date = ref(formatDateToLocal(new Date())) // Format for datetime-local with seconds
const selectedCategory = ref('')

async function createFinance() {
  try {
    if (!amount.value || !date.value || !selectedCategory.value) {
      useToast('Please fill in all fields', 'error')
      return
    }

    const dateObject = new Date(date.value)
    console.log(dateObject)

    await firebaseStore.createTransaction(
      amount.value,
      dateObject,
      selectedCategory.value,
    )
    modalStore.closeModal()
    useToast('Transaction created successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

onMounted(() => {
  firebaseStore.fetchCategories()
  selectedCategory.value = categories.value[0].id
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col">
      <label for="add_amount" class="">Amount</label>
      <input id="add_amount" v-model="amount" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg" type="number" placeholder="Amount">
    </div>
    <div class="flex flex-col">
      <label for="add_date" class="">Date</label>
      <input id="add_date" v-model="date" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg" type="datetime-local">
    </div>
    <div class="flex flex-col">
      <label for="add_category" class="">Category</label>
      <select id="add_category" v-model="selectedCategory" class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg">
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <button class="mt-4 px-4 border-gray-100 py-2 text-sm border text-white rounded-lg" @click="createFinance">
      Add Finance
    </button>
  </div>
</template>

<style lang="scss" scoped>
label {
  @apply mb-2 text-sm;
}
</style>
