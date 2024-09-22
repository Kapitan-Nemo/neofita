<script setup lang="ts">
const latinSentences = [
  { id: 1, sentence: 'Silentium Est Aurum' },
  { id: 2, sentence: 'Clausae patent' },
  { id: 3, sentence: 'Verbum dimissum custodiat arcanum' },
  { id: 4, sentence: 'Fortuna non omnibus aeque' },
  { id: 5, sentence: 'Frustra' },
  { id: 6, sentence: 'Ditesco mori' },
  { id: 7, sentence: 'Discipulus potior magistro' },
  { id: 8, sentence: 'Victa jacet virtus' },
  { id: 9, sentence: 'Nunc scio tenebris lux' },
]

const currentSentenceIndex = ref(0)
const transitionClass = ref('')

onMounted(() => {
  const interval = setInterval(() => {
    transitionClass.value = 'transition-color'
    setTimeout(() => {
      currentSentenceIndex.value = (currentSentenceIndex.value + 1) % latinSentences.length
      transitionClass.value = ''
    }, 1000)
  }, 10000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <p :class="transitionClass" class="text-gray-200 mt-0 transition-all duration-1000">
    {{ latinSentences[currentSentenceIndex].sentence }}
  </p>
</template>

<style scoped>
.transition-color {
    @apply text-red;
}
</style>
