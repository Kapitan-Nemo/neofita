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
    <div class="slideshow">
      <NuxtPicture class="rounded-xl" preload format="avif,webp" src="/assets/img/9_gates/card-1.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-2.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-3.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-4.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-5.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-6.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-7.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-8.png" />
      <NuxtPicture preload format="avif,webp" src="/assets/img/9_gates/card-9.png" />
      <!-- Duplicate images for seamless looping -->
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-1.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-2.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-3.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-4.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-5.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-6.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-7.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-8.png" />
      <NuxtPicture format="avif,webp" src="/assets/img/9_gates/card-9.png" />
    </div>
  </div>
</template>

<style lang="scss">
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
  img {
    width: 30dvh;
    @apply max-sm:w-40;
    border-radius: 20px;
  }
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
