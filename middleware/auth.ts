export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuth()

  if (import.meta.server) {
    return
  }

  if (!auth.logged) {
    await useToast('Access denied', 'error')
    return navigateTo('/')
  }
})
