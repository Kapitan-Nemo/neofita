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
    <Nav class="border-b border-gray-100" />
    <div class="flex">
      <div class="py-6 w-1/3">
        <Tile title="Revenue" subtitle="Data from 1-12 Apr, 2024" button-text="View Report">
          <div>
            <p>
              Content
            </p>
          </div>
        </tile>
      </div>
    </div>
  </div>
</template>
