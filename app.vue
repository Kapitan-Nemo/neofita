<template>
  <main class="container flex flex-col min-h-dvh">
    <NuxtLayout>
      <NuxtPage class="flex-grow" />
      <Footer />
    </NuxtLayout>
  </main>
</template>

<style lang="scss">
body {
  @apply bg-black;
  color: #fff;

}

  ::-webkit-scrollbar {
    width: 12px;
  }
  ::-webkit-scrollbar-track {
    background: #333;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 10px;
    border: 3px solid #333;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #777;
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
