import { useNuxtApp } from '#app'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore'

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    categories: [] as Category[],
    transactions: [] as Transaction[],
  }),
  actions: {
    async createCategory(name: string, color: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const newCategoryRef = await addDoc(collection(firestore, `users-data/${auth.userID}/finance-category`), { name, color })
      return newCategoryRef.id
    },
    async updateCategory(id: string, name: string, color: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, id)
      await updateDoc(categoryRef, { name, color })
    },
    async fetchCategories() {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')

      const categoriesRef = collection(firestore, `users-data/${auth.userID}/finance-category`)
      onSnapshot(categoriesRef, (querySnapshot) => {
        this.categories = querySnapshot.docs.map((doc) => {
          const data = doc.data()
          return { id: doc.id, name: data.name, color: data.color } as Category
        })
      })
    },
    async deleteCategory(id: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, id)
      await deleteDoc(categoryRef)
    },
    async createTransaction(amount: number, date: Date, categoryId: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryId)
      const newTransactionRef = await addDoc(collection(firestore, `users-data/${auth.userID}/finance-transactions`), { amount, date, category: categoryRef })
      return newTransactionRef.id
    },
    async fetchTransactions() {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')

      const transactionsRef = collection(firestore, `users-data/${auth.userID}/finance-transactions`)
      onSnapshot(transactionsRef, async (querySnapshot) => {
        this.transactions = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data()
          const categoryDoc = await getDoc(data.category)
          const categoryData = categoryDoc.data()
          return { id: doc.id, amount: data.amount, date: data.date, category: { id: categoryDoc.id, ...categoryData } } as Transaction
        }))
      })
    },
    async deleteTransaction(id: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const transactionRef = doc(firestore, `users-data/${auth.userID}/finance-transactions`, id)
      await deleteDoc(transactionRef)
    },
    async updateTransaction(id: string, amount: number, date: Date, categoryId: string) {
      const firestore = useNuxtApp().$firestore
      const auth = useAuth()
      if (!auth)
        throw new Error('User not authenticated')
      const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryId)
      const transactionRef = doc(firestore, `users-data/${auth.userID}/finance-transactions`, id)
      await updateDoc(transactionRef, { amount, date, category: categoryRef })
    },
  },
})
