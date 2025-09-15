<script setup lang="ts">
const { data: aboutMe } = await useAsyncData(() => queryCollection('content').path('/about-me').first())

useSeoMeta({
  title: aboutMe.value?.title,
  description: aboutMe.value?.description
})
</script>

<template>
  <div>
    <ContentRenderer v-if="aboutMe" :value="aboutMe" />
    <div v-else>Page not found</div>
  </div>
</template>