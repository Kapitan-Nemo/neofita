<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

let intervalId: ReturnType<typeof setInterval>

onMounted(() => {
  const slideshow = document.querySelector('.slideshow') as HTMLElement
  const scrollAmount = slideshow.scrollWidth / 2 // Scroll half of the total width

  intervalId = setInterval(() => {
    slideshow.scrollBy({
      left: scrollAmount,
      behavior: 'smooth',
    })

    if (slideshow.scrollLeft + slideshow.clientWidth >= slideshow.scrollWidth / 2) {
      setTimeout(() => {
        slideshow.scrollTo({ left: 0, behavior: 'auto' })
      }, 1000) // Adjust this timeout to match the animation duration
    }
  }, 3000) // Adjust this interval to control the speed of scrolling
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div class="slideshow-container">
    <div class="slideshow gap-6">
      <img src="/assets/img/9_gates/card-1.png" alt="image">
      <img src="/assets/img/9_gates/card-2.png" alt="image">
      <img src="/assets/img/9_gates/card-3.png" alt="image">
      <img src="/assets/img/9_gates/card-4.png" alt="image">
      <img src="/assets/img/9_gates/card-5.png" alt="image">
      <img src="/assets/img/9_gates/card-6.png" alt="image">
      <img src="/assets/img/9_gates/card-7.png" alt="image">
      <img src="/assets/img/9_gates/card-8.png" alt="image">
      <img src="/assets/img/9_gates/card-9.png" alt="image">
      <!-- Duplicate images for seamless looping -->
      <img src="/assets/img/9_gates/card-1.png" alt="image">
      <img src="/assets/img/9_gates/card-2.png" alt="image">
      <img src="/assets/img/9_gates/card-3.png" alt="image">
      <img src="/assets/img/9_gates/card-4.png" alt="image">
      <img src="/assets/img/9_gates/card-5.png" alt="image">
      <img src="/assets/img/9_gates/card-6.png" alt="image">
      <img src="/assets/img/9_gates/card-7.png" alt="image">
      <img src="/assets/img/9_gates/card-8.png" alt="image">
      <img src="/assets/img/9_gates/card-9.png" alt="image">
    </div>
  </div>
</template>

<style scoped>
.slideshow-container {
  @apply mt-6;
  overflow: hidden;
  width: 100%;
}

.slideshow {
  display: flex;
  width: max-content;
  @apply gap-6;
  animation: scroll 30s linear infinite;
}

.slideshow img {
  height: auto;
  max-height: 50vh;
  width: 300px; /* Adjust to your desired width */
  border-radius: 20px;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
