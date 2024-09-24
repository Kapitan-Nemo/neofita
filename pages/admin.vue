<script setup lang="ts">
const auth = useAuth()
</script>

<template>
  <div>
    <Nav class="border-b border-gray-100" />
    <div class="flex flex-col">
      <div class="py-6 flex flex-row justify-between items-center">
        <div class="flex flex-col gap-1">
          <h1>Dashboard</h1>
          <p class="text-sm text-gray-200">
            Hi, {{ auth.userName }} here are your financial stats
          </p>
        </div>
        <Date />
      </div>

      <div class="py-6 w-1/3">
        <Tile title="Revenue" subtitle="Data from 1-12 Apr, 2024" button-text="View Report">
          <div>
            <p>
              Content
            </p>
          </div>
        </Tile>
      </div>
    </div>
  </div>
</template>
