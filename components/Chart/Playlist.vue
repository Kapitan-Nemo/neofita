<script setup lang="ts">
import { filename } from 'pathe/utils'

const playlist = [
  {
    title: 'Evigheten',
    subtitle: 'We built towers to visit them in their divine fortress, but heaven was empty.',
    link: 'https://www.youtube.com/watch?v=1zVXHocw9Ro',
    image: 'evigheten.jpg',
  },
  {
    title: 'Shadowlorn',
    subtitle: 'As the last wisps of sunlight fade, the Whitebark forest.',
    link: 'https://www.youtube.com/watch?v=QyYOrvygOzA',
    image: 'shadowlorn.jpg',
  },
  {
    title: 'Sorgeberget',
    subtitle: 'In this age of malevolence and turmoil, the gods are long gone.',
    link: 'https://www.youtube.com/watch?v=x-m39xXwq1A',
    image: 'sorgeberget.jpg',
  },
]

// Define the type for the imported images
interface ImageModule {
  default: string
}

const glob = import.meta.glob('@/assets/img/playlist/*.jpg', { eager: true }) as Record<string, ImageModule>
const images = Object.fromEntries(
  Object.entries(glob).map(([key, value]) => [filename(key), value.default]),
)
</script>

<template>
  <div>
    <div class="flex flex-row gap-6">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl">
          {{ playlist[0].title }}
        </h2>
        <p class="text-sm text-gray-200">
          {{ playlist[0].subtitle }}
        </p>
        <a :href="playlist[0].link" target="blank" class="self-start inline-flex px-4 py-2 text-sm border border-gray-100 text-white rounded">
          Listen
        </a>
      </div>

      <img :src="images[playlist[0].image.replace('.jpg', '')]" alt="" class="rounded-lg w-40 h-40 object-cover">
    </div>
  </div>
</template>
