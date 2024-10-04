import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, updateDoc } from 'firebase/firestore'

export function useFirebase() {
  const firestore = useNuxtApp().$firestore
  const auth = useAuth()

  const categories = ref<Category[]>([])
  const transactions = ref<Transaction[]>([])

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

  async function deleteCategory(id: string) {
    if (!auth)
      throw new Error('User not authenticated')
    const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, id)
    await deleteDoc(categoryRef)
  }

  async function createTransaction(amount: number, date: Date, categoryId: string) {
    console.log('createTransaction', amount, date, categoryId)
    if (!auth)
      throw new Error('User not authenticated')
    const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryId)
    const newTransactionRef = await addDoc(collection(firestore, `users-data/${auth.userID}/finance-transactions`), { amount, date, category: categoryRef })
    return newTransactionRef.id
  }

  async function fetchTransactions() {
    if (!auth)
      throw new Error('User not authenticated')

    const transactionsRef = collection(firestore, `users-data/${auth.userID}/finance-transactions`)
    onSnapshot(transactionsRef, async (querySnapshot) => {
      transactions.value = await Promise.all(querySnapshot.docs.map(async (doc) => {
        const data = doc.data()
        const categoryDoc = await getDoc(data.category)
        const categoryData = categoryDoc.data()
        return { id: doc.id, amount: data.amount, date: data.date, category: { id: categoryDoc.id, ...categoryData } } as Transaction
      }))
    })
  }

  async function deleteTransaction(id: string) {
    if (!auth)
      throw new Error('User not authenticated')
    const transactionRef = doc(firestore, `users-data/${auth.userID}/finance-transactions`, id)
    await deleteDoc(transactionRef)
  }

  async function updateTransaction(id: string, amount: number, date: Date, categoryId: string) {
    if (!auth)
      throw new Error('User not authenticated')
    const categoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryId)
    const transactionRef = doc(firestore, `users-data/${auth.userID}/finance-transactions`, id)
    await updateDoc(transactionRef, { amount, date, category: categoryRef })
  }

  return { categories, transactions, createCategory, updateCategory, deleteCategory, fetchCategories, createTransaction, fetchTransactions, deleteTransaction, updateTransaction }
}
