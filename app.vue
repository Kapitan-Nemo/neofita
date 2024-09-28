<template>
  <main class="container flex flex-col min-h-dvh">
    <NuxtPage class="flex-grow" />
    <Footer />
  </main>
</template>

<style lang="scss">
body {
  @apply bg-black;
  color: #fff;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
