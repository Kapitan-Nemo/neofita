<script setup lang="ts">
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const auth = useAuth()
const router = useRouter()
const firestore = useNuxtApp().$firestore

async function singGoogle() {
  const provider = new GoogleAuthProvider()
  try {
    const result = await signInWithPopup(getAuth(), provider)
    const user = result.user

    // Store user data in Firestore
    await setDoc(doc(firestore, 'users-data', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    })

    router.push('/dashboard')
    useToast('Welcome to the Ninth Gate', 'success')
  }
  catch (error) {
    if (error instanceof Error) {
      useToast(error.message, 'error')
    }
    else {
      useToast('An unknown error occurred', 'error')
    }
  }
}

function gotoPanel() {
  router.push('/dashboard')
}

onMounted(() => {
  auth.onAuth()
})
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-6">
    <div class="p-6 gap-6 rounded-lg flex justify-center items-center flex-col transition-all">
      <img src="/assets/img/neofita.png" alt="logo" class="w-24 h-24">
      <div class="flex flex-col items-center gap-6">
        <div class="flex flex-col items-center">
          <Sentences />
        </div>
        <button v-if="!auth.logged" class="cursor-pointer px-8 py-2 border border-gray-100 rounded-lg text-white" @click="singGoogle">
          Open The Ninth Gate
        </button>
        <button v-else class="cursor-pointer px-8 py-2 border border-gray-100 rounded-lg text-white" @click="gotoPanel">
          Open The Ninth Gate
        </button>
      </div>
    </div>
    <Carousel />
  </div>
</template>
