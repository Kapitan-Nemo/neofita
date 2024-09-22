import { getAuth, signOut } from 'firebase/auth'

const auth = useAuth()
const router = useRouter()

function logout() {
  signOut(getAuth())
    .then(async () => {
      useToast('Wylogowano z systemu', 'success')
      auth.$reset()
      router.push('/')
    })
    .catch((error) => {
      useToast(error, 'error')
    })
}

export default logout
