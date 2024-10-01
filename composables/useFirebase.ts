import { addDoc, collection, doc, getDocs, updateDoc } from 'firebase/firestore'

export function useFirebase() {
  const firestore = useNuxtApp().$firestore
  const auth = useAuth()

  const categories = ref<Category[]>([])

  async function createCategory(name: string, color: string) {
    if (!auth)
      throw new Error('User not authenticated')
    const newCategoryRef = await addDoc(collection(firestore, `users-data/${auth.userID}/finance-category`), { name, color })
    return newCategoryRef.id
  }

  async function updateCategory(id: string, name: string, color: string) {
    if (!auth)
      throw new Error('User not authenticated')
    const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, id)
    await updateDoc(categoryRef, { name, color })
  }

  async function fetchCategories() {
    if (!auth)
      throw new Error('User not authenticated')
    const querySnapshot = await getDocs(collection(firestore, `users-data/${auth.userID}/finance-category`))
    categories.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return { id: doc.id, name: data.name, color: data.color } as Category
    })
  }

  return { categories, createCategory, updateCategory, fetchCategories }
}
