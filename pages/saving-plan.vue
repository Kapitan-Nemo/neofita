<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const financeGoal = computed(() => firebaseStore.financeGoal)

const collected = ref(formatNumber(financeGoal.value.collected))
const goal = ref(formatNumber(financeGoal.value.goal))

function putFinanceGoal() {
  try {
    if (!financeGoal.value.collected || !financeGoal.value.goal) {
      useToast('Please fill in all fields', 'error')
      return
    }

    const collectedNumber = Number.parseFloat(collected.value.replace(/\s/g, '').replace(/,/g, ''))
    const goalNumber = Number.parseFloat(goal.value.replace(/\s/g, '').replace(/,/g, ''))

    firebaseStore.updateFinanceGoal(collectedNumber, goalNumber, financeGoal.value.description)
    useToast('Finance goal updated successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

onMounted(async () => {
  await firebaseStore.fetchFinanceGoal()
})

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <Nav />
    <div class="flex flex-col">
      <div class="py-6 flex flex-row justify-between items-center">
        <div class="flex flex-col gap-1">
          <h1>Saving plan</h1>
          <p class="text-sm text-gray-200 flex items-center">
            <NuxtLink to="/dashboard/">
              Dashboard
            </NuxtLink>
            <Icon class="mx-2" name="ion:chevron-forward-outline" />
            Saving Plan
          </p>
        </div>
      </div>
      <div class="flex-col lg:flex-row flex gap-6 py-6">
        <div class="w-full lg:w-1/3">
          <Tile link-text="Save" :action="putFinanceGoal" subtitle="Enter collected and goal amount" title="Saving Goal">
            <div class="flex gap-4 mb-8">
              <div class="w-1/2">
                <p class="mb-2">
                  Collected amount
                </p>
                <input
                  v-model="collected"
                  placeholder="Enter amount"
                  class="w-full min-w-[150px] p-2 mb-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
                  @input="formatNumberInput"
                >
              </div>
              <div class="w-full lg:w-1/2">
                <p class="mb-2">
                  Goal amount
                </p>
                <input
                  v-model="goal"
                  placeholder="Enter amount"
                  class="w-full min-w-[150px] p-2 mb-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
                  @input="formatNumberInput"
                >
              </div>
            </div>
            <div class="w-full">
              <p class="mb-2">
                Description
              </p>
              <textarea
                v-model="financeGoal.description"
                placeholder="Enter description"
                class="w-full p-2 mb-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
              />
            </div>
          </Tile>
        </div>
      </div>
    </div>
  </div>
</template>
