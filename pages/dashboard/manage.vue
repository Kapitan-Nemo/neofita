<script setup lang="ts">
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
          <Tile class="w-[904px]" title="Transactions" button-text="Add transaction">
            <TransactionList />
          </Tile>
        </div>
        <div class="w-1/3">
          <Tile class="" title="Categories" button-text="Add category">
            <TransactionCategory />
          </Tile>
        </div>
      </div>
    </div>
  </div>
</template>
