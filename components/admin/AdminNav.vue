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
  <nav class="w-full">
    <div class="p-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <div class="flex ml-2">
            <span class="text-2xl text-white">Witaj, {{ auth.userName }}</span>
          </div>
        </div>
        <div class="flex gap-6 justify-center items-center">
          <AppDropdown>
            <template #trigger>
              <Icon class="text-red-300 cursor-pointer" size="30" name="ion:settings-outline" />
            </template>
            <template #items>
              <li class="px-4 py-2 text-black cursor-pointer" @click="logout()">
                Logout
              </li>
            </template>
          </AppDropdown>
          <img class="w-8 h-8" :src="photo" alt="user photo">
        </div>
      </div>
    </div>
  </nav>
</template>
