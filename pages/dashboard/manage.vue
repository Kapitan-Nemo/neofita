<script setup lang="ts">
const firebaseStore = useFirebaseStore()

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
    <Nav class="border-b border-gray-100" />
    <div class="flex flex-col">
      <div class="py-6 flex flex-row justify-between items-center">
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
      </div>
      <div class="flex-row flex gap-6 py-6">
        <div class="w-2/3">
          <Tile :active="checkCategories" class="w-[904px]" title="Transactions" button-text="Add transaction" modal-id="transactionModal">
            <TransactionListEdit />
          </Tile>
        </div>
        <div class="w-1/3">
          <Tile :active="true" title="Categories" button-text="Add category" modal-id="categoryModal">
            <TransactionCategory />
          </Tile>
        </div>
      </div>
    </div>
  </div>
</template>
