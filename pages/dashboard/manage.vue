<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const dateStore = useDateStore()

const checkCategories = computed(() => {
  if (firebaseStore.categories.length === 0) {
    return false
  }
  else {
    return true
  }
})

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <Nav />
    <div class="flex flex-col">
      <div class="py-6 gap-4 lg:gap-0 flex flex-col lg:flex-row justify-between lg:items-center">
        <div class="flex flex-col gap-1">
          <h1>Add / Edit finances</h1>
          <p class="text-sm text-gray-200 flex items-center">
            <NuxtLink to="/dashboard/">
              Dashboard
            </NuxtLink> <Icon class="mx-2" name="ion:chevron-forward-outline" /> <NuxtLink to="/dashboard/manage">
              Manage
            </NuxtLink>
          </p>
        </div>
        <Date />
      </div>
      <div class="flex-col lg:flex-row flex gap-6 py-6">
        <div class="lg:w-2/3 w-full">
          <Tile :subtitle="`Data from ${dateStore.selectedDates.start.toLocaleDateString()} - ${dateStore.selectedDates.end.toLocaleDateString()}`" :active="checkCategories" class="lg:w-[904px] w-full" title="Transactions" link-text="Add transaction" modal-id="transactionModal">
            <TransactionListEdit />
          </Tile>
        </div>
        <div class="lg:w-1/3 w-full">
          <Tile :active="true" title="Categories" link-text="Add category" modal-id="categoryModal">
            <TransactionCategory />
          </Tile>
        </div>
      </div>
    </div>
  </div>
</template>
