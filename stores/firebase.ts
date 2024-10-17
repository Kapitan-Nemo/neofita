import { useNuxtApp } from '#app'
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc, where } from 'firebase/firestore'

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    categories: [] as Category[],
    transactions: [] as Transaction[],
    previousTransactions: [] as Transaction[],
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
      const orderedCategoriesRef = query(categoriesRef, orderBy('name'))

      onSnapshot(orderedCategoriesRef, (querySnapshot) => {
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

      const dateStore = useDateStore()

      const startDateObj = new Date(dateStore.selectedDates.start)
      startDateObj.setMonth(startDateObj.getMonth() - 1)

      const endDateObj = new Date(dateStore.selectedDates.end)
      endDateObj.setMonth(endDateObj.getMonth() - 1)

      const startDate = Timestamp.fromDate(dateStore.selectedDates.start)
      const endDate = Timestamp.fromDate(dateStore.selectedDates.end)

      const startPreviousDate = Timestamp.fromDate(startDateObj)
      const endPreviousDate = Timestamp.fromDate(endDateObj)

      const transactionsRef = collection(firestore, `users-data/${auth.userID}/finance-transactions`)
      const transactionsQuery = query(
        transactionsRef,
        orderBy('date', 'desc'),
        where('date', '>=', startDate),
        where('date', '<=', endDate),
      )

      const previousTransactionsQuery = query(
        transactionsRef,
        orderBy('date', 'desc'),
        where('date', '>=', startPreviousDate),
        where('date', '<=', endPreviousDate),
      )

      onSnapshot(transactionsQuery, async (querySnapshot) => {
        this.transactions = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data()
          const categoryDoc = await getDoc(data.category)
          const categoryData = categoryDoc.data()

          return {
            id: doc.id,
            amount: data.amount,
            date: data.date,
            category: { id: categoryDoc.id, ...categoryData },
          } as Transaction
        }))
      })

      onSnapshot(previousTransactionsQuery, async (querySnapshot) => {
        this.previousTransactions = await Promise.all(querySnapshot.docs.map(async (doc) => {
          const data = doc.data()
          const categoryDoc = await getDoc(data.category)
          const categoryData = categoryDoc.data()

          return {
            id: doc.id,
            amount: data.amount,
            date: data.date,
            category: { id: categoryDoc.id, ...categoryData },
          } as Transaction
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
  persist: true,
})
