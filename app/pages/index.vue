<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <div>
    <div class="min-h-screen bg-gradient-to-b from-zinc-950 to-slate-900 text-zinc-100">
      <NavBar />
      <main class="mx-auto max-w-7xl px-4 py-8">
        <slot />
      </main>
    </div>
    <ContentRenderer v-if="home" :value="home" />
    <div v-else>Home not found</div>
  </div>
</template>