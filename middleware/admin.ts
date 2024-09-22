export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAuth()

  if (!auth.logged) {
    await useToast('Access denied', 'error')
    return navigateTo('/')
  }
})
