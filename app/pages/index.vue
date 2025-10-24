<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <main class="container mx-auto px-4 flex-1 flex flex-col">
    <slot />
    <ContentRenderer v-if="home" :value="home" class="flex-1" />
    <div v-else class="flex-1">Home not found</div>
  </main>
</template>