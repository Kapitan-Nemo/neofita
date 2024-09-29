<script setup lang="ts">
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'

const firestore = useNuxtApp().$firestore
const amount = ref(0)
const description = ref('')
const date = ref(new Date())
const selectedCategory = ref('')
const categories = ref([])

async function fetchCategories() {
  const querySnapshot = await getDocs(collection(firestore, 'finance-category'))
  categories.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

async function createFinance() {
  if (amount.value && description.value && selectedCategory.value) {
    const newFinanceRef = doc(collection(firestore, 'finance'))
    await setDoc(newFinanceRef, {
      amount: amount.value,
      description: description.value,
      date: date.value,
      category: selectedCategory.value,
    })
    amount.value = 0
    description.value = ''
    selectedCategory.value = ''
    useToast('Finance record created successfully', 'success')
  }
  else {
    useToast('Please fill in all fields', 'error')
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<template>
  <div>
    <input v-model="amount" type="number" placeholder="Amount">
    <input v-model="description" placeholder="Description">
    <input v-model="date" type="date">
    <select v-model="selectedCategory">
      <option v-for="category in categories" :key="category.id" :value="category.name">
        {{ category.name }}
      </option>
    </select>
    <button @click="createFinance">
      Create Finance
    </button>
  </div>
</template>
