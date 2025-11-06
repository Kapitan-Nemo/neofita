<script setup>
const { data: posts } = await useAsyncData('blog', () => 
  queryCollection('blog').all()
)
</script>

<template>
  <div class="news-tile">
    <ul>
      <li v-for="post in posts" :key="post.id">
        <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>