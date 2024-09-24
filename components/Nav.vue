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
      useToast('You have been logged out', 'success')
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
        <nuxt-link to="/dashboard">
          <img class="w-14 h-14" src="/assets/img/neofita.png" alt="logo">
        </nuxt-link>
      </div>

      <div class="flex gap-12">
        <nuxt-link to="/dashboard" class="menu-link">
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

      <Dropdown>
        <template #trigger>
          <div class="flex items-center gap-6 hover:text-red cursor-pointer transition-all">
            <img class="w-8 h-8 rounded-full" :src="photo" alt="user photo">
            <span>{{ auth.userName }}</span>
            <Icon size="30" name="ion:ios-bell-outline" />
          </div>
        </template>
        <template #items>
          <li class="text-gray-200 border-b border-gray-100">
            <Icon size="20" name="ion:settings-outline" />
            Settings
          </li>
          <li @click="logout()">
            <Icon size="20" name="ion:log-out-outline" />
            Logout
          </li>
        </template>
      </Dropdown>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.menu-link {
  @apply py-6 text-gray-200 hover:text-red;
}
.router-link-active  {
  @apply border-red text-red border-b-2;
  margin: 0 0 -1px 0;
}
li {
    @apply flex items-center p-4 gap-4 text-gray-200 cursor-pointer hover:text-red;
  }
</style>
