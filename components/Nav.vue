<script setup lang="ts">
import { getAuth, signOut } from 'firebase/auth'

const auth = useAuth()
const photo = ref()
const router = useRouter()
const showMenu = ref(false)

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
  <nav class="w-full pb-4 lg:pb-0 my-6 border-b border-gray-100">
    <div class="flex items-center justify-between">
      <div>
        <nuxt-link to="/dashboard">
          <img class="w-14 h-14" src="/assets/img/neofita.png" alt="logo">
        </nuxt-link>
      </div>

      <div :class="(showMenu === false ? 'hidden' : 'flex absolute top-0 left-0 m-0 p-5 bg-black w-full h-full z-50')" class=" flex-col lg:flex-row lg:flex lg:gap-12">
        <nuxt-link to="/dashboard" class="menu-link">
          Dashboard
        </nuxt-link>
        <nuxt-link to="/saving-plan" class="menu-link">
          Saving Plan
        </nuxt-link>
        <!-- <nuxt-link to="/" class="menu-link">
          Credit Cards
        </nuxt-link> -->
        <nuxt-link to="/settings" class="menu-link">
          Settings
        </nuxt-link>
        <!-- <nuxt-link to="/" class="menu-link">
          Account
        </nuxt-link> -->
        <!-- Close icon -->
        <Icon size="30" name="ion:close-outline" class="lg:hidden top-10 absolute right-8" @click="showMenu = !showMenu" />
      </div>

      <Icon size="30" name="ion:menu-outline" class="lg:hidden" @click="showMenu = !showMenu" />

      <Dropdown>
        <template #trigger>
          <div class="flex items-center gap-6 hover:text-red cursor-pointer transition-all">
            <img class="w-8 h-8 rounded-full" referrerPolicy="no-referrer" :src="photo" alt="user photo">
            <span>{{ auth.userName }}</span>
            <Icon size="30" name="ion:ios-bell-outline" />
          </div>
        </template>
        <template #items>
          <li class="text-gray-200 border-b border-gray-100">
            <nuxt-link to="/settings">
              <Icon size="20" name="ion:settings-outline" />
              Settings
            </nuxt-link>
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
  @apply border-red text-red border-b-4;
  margin: 0 0 -2px 0;
}
li {
    @apply flex items-center p-4 gap-4 text-gray-200 cursor-pointer hover:text-red;
  }

  li a {
    @apply flex items-center gap-4 !border-b-0 !text-gray-200 cursor-pointer hover:!text-red;
  }
</style>
