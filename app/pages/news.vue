<script setup lang="ts">
const { data: news } = await useAsyncData(() => queryCollection('content').path('/news').first())

useSeoMeta({
    title: news.value?.title,
    description: news.value?.description
})
</script>

<template>
    <main class="container mx-auto px-4">
        <ContentRenderer v-if="news" :value="news" />
        <div v-else>Page not found</div>
    </main>
</template>