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
      <div class="p-6 w-full">
        <Tile title="Admin" subtitle="Manage your site" button-text="Create new user">
          <div>
            <p>
              You can manage your site here.
            </p>
          </div>
        </tile>
      </div>
    </div>
  </div>
</template>
