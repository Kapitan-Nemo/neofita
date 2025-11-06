<script setup>
const route = useRoute()
const id = route.params.id

const { data: posts } = await useAsyncData('blog', () => 
  queryCollection('blog').all()
)

const post = computed(() => {
  if (!posts.value) return null
  return posts.value.find(p => p.path === `/blog/${id}`)
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Post nie został znaleziony'
  })
}
</script>

<template>
  <article v-if="post">
    <ContentRenderer :value="post" />
    <NuxtLink to="/news">← Powrót</NuxtLink>
  </article>
</template>
