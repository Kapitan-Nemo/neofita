<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const auth = useAuth()
const router = useRouter()

function singGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push('/admin')
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
  <div class="flex flex-col justify-center items-center mt-6">
    <div class="bg-gray p-6 rounded-lg flex justify-center items-center flex-col transition-all">
      <img src="/assets/img/neofita.png" alt="logo" class="w-40 h-40">
      <div v-if="!auth.logged" class="flex flex-col items-center gap-6">
        <div class="flex flex-col items-center">
          <h1>Neofita</h1>
          <Sentences />
        </div>

        <button class="cursor-pointer px-8 py-2 border border-gray-100 rounded-lg text-white" @click="singGoogle">
          Open The Ninth Gate
        </button>
      </div>
      <div v-else>
        <div class="">
          <button class="cursor-pointer px-8 py-2 border border-gray-100 rounded-lg text-white" @click="gotoPanel">
            Go to dashboard
          </button>
        </div>
      </div>
    </div>
    <Carousel />
  </div>
</template>
