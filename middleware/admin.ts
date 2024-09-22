export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (!auth.logged) {
    await useToast('Access denied', 'error')
    return navigateTo('/')
  }
})
