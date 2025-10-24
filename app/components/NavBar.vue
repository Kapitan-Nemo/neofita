<template>
    <div class="brand">
        <a href="/" rel="home">
            <img src="~/assets/images/neofita-logo.png" width="50" alt="Neofita Logo">
        </a>
    </div>
    <nav aria-label="Main navigation" class="font-haksen">
        <ul class="flex border px-4 py-2 text-lg">
            <li class="px-4 border-r border-gray-300 last:border-r-0">
                <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            </li>
            <li class="px-4 border-r border-gray-300 last:border-r-0">
                <NuxtLink to="/about-me" class="hover:underline">About Me</NuxtLink>
            </li>
            <li class="px-4 border-r border-gray-300 last:border-r-0">
                <NuxtLink to="/news" class="hover:underline">News</NuxtLink>
            </li>
            <li class="px-4 border-r border-gray-300 last:border-r-0">
                <NuxtLink to="/plugins" class="hover:underline">Plugins</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
