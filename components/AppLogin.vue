<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const auth = useAuth()
const router = useRouter()

function singGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then(() => {
      router.push('/admin')
      useToast('Poprawnie zalogowano do systemu', 'success')
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
  <div class="mt-8">
    <div v-if="!auth.logged" class="container flex items-center flex-col">
      <div class="cursor-pointer" @click="singGoogle">
        <button class="px-8 py-2 bg-white border-4 border-black text-black font-bold">
          Zaloguj się za pomocą Google
        </button>
      </div>
    </div>
    <div v-else>
      <div class="container flex items-center flex-col">
        <button class="px-8 py-2 bg-white border-4 border-black text-black font-bold" @click="gotoPanel">
          Jesteś zalogowany, kliknij aby przejść do panelu
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wave {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
  display: inline-block;
}

@keyframes wave-animation {
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
}
</style>
