<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const modalStore = useModalStore()
const categories = computed(() => firebaseStore.categories)
const amount = ref(0)

const date = ref(new Date())
const selectedCategory = ref('')

async function createFinance() {
  try {
    if (!amount.value || !date.value || !selectedCategory.value) {
      useToast('Please fill in all fields', 'error')
      return
    }

    const dateObject = new Date(date.value)

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
