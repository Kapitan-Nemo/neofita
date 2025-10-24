<script setup lang="ts">
const { data: aboutMe } = await useAsyncData(() => queryCollection('content').path('/about-me').first())

useSeoMeta({
  title: aboutMe.value?.title,
  description: aboutMe.value?.description
})
</script>

<template>
  <main class="container mx-auto px-4">
    <ContentRenderer v-if="aboutMe" :value="aboutMe" />
    <div v-else>Page not found</div>
  </main>
</template>