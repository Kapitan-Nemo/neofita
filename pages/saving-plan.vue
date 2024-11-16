<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <Nav class="border-b border-gray-100" />
    <p>Saving plan</p>
  </div>
</template>
