<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const auth = useAuth()
</script>

<template>
  <div>
    <Nav />
    <div class="flex flex-col">
      <div class="py-6 flex flex-row justify-between items-center">
        <div class="flex flex-col gap-1">
          <h1>Settings</h1>
          <p class="text-sm text-gray-200 flex items-center">
            <NuxtLink to="/dashboard/">
              Dashboard
            </NuxtLink>
            <Icon class="mx-2" name="ion:chevron-forward-outline" />
            Settings
          </p>
        </div>
      </div>
      <div class="flex-col lg:flex-row flex gap-6 py-6">
        <Tile subtitle="Your personal information" title="User settings">
          <div class="flex flex-col gap-4">
            <p>
              Name: <span class="ml-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">{{ auth.userName }}</span>
            </p>
            <p>
              Email: <span class="ml-4 inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">{{ auth.userEmail }} </span>
            </p>
          </div>
        </Tile>
      </div>
    </div>
  </div>
</template>
