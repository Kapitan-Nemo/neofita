<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = useAuth()
const router = useRouter()

function singGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push('/admin')
      useToast('Zalogowano do systemu', 'success')
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

function gotoPanel() {
  router.push('/admin')
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <div class="flex justify-center items-center mt-6">
    <div class="bg-gray p-6 rounded-lg flex justify-center items-center flex-col">
      <img src="/assets/img/neofita.png" alt="logo" class="w-32 h-32">
      <div v-if="!auth.logged" class="flex flex-col items-center gap-6">
        <h1>Welcome back!</h1>
        <button class="cursor-pointer px-8 py-2 border border-gray-100 rounded-lg text-white" @click="singGoogle">
          Login with Google
        </button>
      </div>
      <div v-else>
        <div class="">
          <button class="px-8 py-2 bg-white border-4 border-black text-black font-bold" @click="gotoPanel">
            Go to panel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
