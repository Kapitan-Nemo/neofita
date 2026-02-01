<template>
    <div class="w-full max-w-4xl px-4">
        <div
            class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-full shadow-2xl border border-white/20 dark:border-gray-700/30">
            <div class="flex items-center justify-between px-6 py-3">
                <!-- Logo -->
                <div class="brand shrink-0">
                    <a href="/" rel="home" class="block transition-transform hover:scale-105 duration-300">
                        <img class="w-12 h-12 drop-shadow-lg" src="~/assets/images/neofita-logo.png" alt="Neofita Logo">
                    </a>
                </div>

                <!-- Navigation -->
                <nav aria-label="Main navigation">
                    <ul class="flex items-center gap-2">
                        <li>
                            <NuxtLink to="/" class="px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:scale-105 active:scale-95">
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/about-me/" class="px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:scale-105 active:scale-95">
                                About Me
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/news/" class="px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:scale-105 active:scale-95">
                                News
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/plugins/" class="px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:scale-105 active:scale-95">
                                Plugins
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
