<template>
    <div class="brand">
        <a href="/" rel="home">
            <img src="~/assets/images/neofita-logo.png" width="80" alt="Blog logo">
        </a>
    </div>
    <nav aria-label="Main navigation">
        <ul class="flex gap-4">
            <li>
                <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/about-me" class="hover:underline">About Me</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/plugins" class="hover:underline">Plugins</NuxtLink>
            </li>
        </ul>
    </nav>
</template>
