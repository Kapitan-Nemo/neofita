<script setup lang="ts">
const { data: plugins } = await useAsyncData(() => queryCollection('content').path('/plugins').first())

useSeoMeta({
    title: plugins.value?.title,
    description: plugins.value?.description
})
</script>

<template>
    <main class="container mx-auto px-4">
        <ContentRenderer v-if="plugins" :value="plugins" />
        <div v-else>Page not found</div>
    </main>
</template>