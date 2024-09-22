<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: [
    'admin',
  ],
})
</script>

<template>
  <div>
    <AdminNav class="border-b border-gray-100" />
    <div class="flex">
      <div class="p-6 w-full" />
    </div>
  </div>
</template>
