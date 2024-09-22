<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'

const auth = useAuth()
const photo = ref()
const router = useRouter()

function logout() {
  signOut(getAuth())
    .then(async () => {
      auth.$reset()
      router.push('/')
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

onMounted(() => {
  photo.value = auth.userPhoto
})
</script>

<template>
  <nav class="w-full my-6">
    <div class="flex items-center justify-between">
      <div>
        <nuxt-link to="/admin">
          <img class="w-14 h-14" src="/assets/img/neofita.png" alt="logo">
        </nuxt-link>
      </div>

      <div class="flex gap-12">
        <nuxt-link to="/admin" class="menu-link">
          Dashboard
        </nuxt-link>
        <nuxt-link to="/" class="menu-link">
          Saving Plan
        </nuxt-link>
        <nuxt-link to="/" class="menu-link">
          Credit Cards
        </nuxt-link>
        <nuxt-link to="/" class="menu-link">
          Settings
        </nuxt-link>
        <nuxt-link to="/" class="menu-link">
          Account
        </nuxt-link>
      </div>

      <AppDropdown>
        <template #trigger>
          <div class="flex items-center gap-6 cursor-pointer">
            <img class="w-8 h-8 rounded-full" :src="photo" alt="user photo">
            <span class="text-white">{{ auth.userName }}</span>
          </div>
        </template>
        <template #items>
          <li class="px-4 py-2 text-black cursor-pointer" @click="logout()">
            Logout
          </li>
        </template>
      </AppDropdown>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.menu-link {
  @apply py-6;
}
.router-link-active  {
  @apply border-red;
  @apply text-red;
  @apply border-b-2;
  margin: 0 0 -1px 0;
}
</style>
