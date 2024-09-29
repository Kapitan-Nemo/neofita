<script setup lang="ts">
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { computed, onMounted, ref, watch } from 'vue'

const firestore = useNuxtApp().$firestore
const auth = useAuth()

const categoryName = ref('')
const categoryColor = ref('#000000')
const searchQuery = ref('')
const isDropdownVisible = ref(false)
const categories = ref([])
const isEditMode = ref(false)

const colorPickerRef = ref(null)
const searchInputRef = ref(null)

const filteredCategories = computed(() => {
  return categories.value.filter(category =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const chevronClass = computed(() => {
  return isDropdownVisible.value ? 'rotate-180' : ''
})

async function createOrUpdateCategory() {
  if (auth && categoryName.value && categoryColor.value) {
    const newCategoryRef = doc(firestore, `users-data/${auth.userID}/finance-category`, categoryName.value)
    await setDoc(newCategoryRef, {
      name: categoryName.value,
      color: categoryColor.value,
    })
    clearForm()
    useToast('Category created/updated successfully', 'success')
    fetchCategories()
  }
  else {
    useToast('Please fill in all fields', 'error')
  }
}

async function fetchCategories() {
  if (auth) {
    const querySnapshot = await getDocs(collection(firestore, `users-data/${auth.userID}/finance-category`))
    categories.value = querySnapshot.docs.map(doc => doc.data())
  }
}

onMounted(() => {
  fetchCategories()
})

function selectCategory(category) {
  categoryName.value = category.name
  categoryColor.value = expandHexColor(category.color)
  isDropdownVisible.value = false
  isEditMode.value = true
  if (searchInputRef.value) {
    searchInputRef.value.blur()
  }
}

function expandHexColor(hex) {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  return hex
}

function clearForm() {
  searchQuery.value = ''
  categoryName.value = ''
  categoryColor.value = '#000000'
  isDropdownVisible.value = false
  isEditMode.value = false
}

watch(searchQuery, (newQuery) => {
  if (newQuery && !categories.value.some(category => category.name.toLowerCase() === newQuery.toLowerCase())) {
    categoryName.value = newQuery
  }
})

watch(categoryColor, (newColor) => {
  categoryColor.value = expandHexColor(newColor)
  if (colorPickerRef.value) {
    colorPickerRef.value.value = categoryColor.value
  }
})
</script>

<template>
  <div>
    <div class="relative mb-4 p-2 border border-gray-100 rounded-lg w-full">
      <input
        ref="searchInputRef"
        v-model="searchQuery"
        placeholder="Search or select a category"
        class="w-full p-2 text-gray-200 outline-none placeholder-gray-200 border-none bg-transparent rounded-lg"
        @focus="isDropdownVisible = true"
        @blur="isDropdownVisible = false"
      >
      <Icon class="absolute right-2 top-1/2 text-gray-200 transform -translate-y-1/2 pointer-events-none transition-transform duration-300" :class="[chevronClass]" name="ion:chevron-down-outline" />
      <button v-if="searchQuery" class="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-200" @click="clearForm">
        <Icon name="ion:close-circle-outline" />
      </button>
      <ul v-if="isDropdownVisible && (searchQuery !== '' || filteredCategories.length > 0)" class="absolute top-16 left-0 right-0 bg-gray border-gray-100 text-gray-200 border rounded-lg max-h-52 overflow-y-auto z-10">
        <li
          v-for="category in filteredCategories"
          :key="category.name"
          class="p-4 border-b border-gray-100 cursor-pointer"
          @mousedown.prevent="selectCategory(category)"
        >
          {{ category.name }}
        </li>
      </ul>
    </div>
    <div class="mb-4">
      <label class="block text-gray-200 mb-2">Category Name</label>
      <input
        v-model="categoryName"
        placeholder="Enter category name"
        class="w-full p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
      >
    </div>
    <div class="mb-4">
      <label class="block text-gray-200 mb-2">Category Color</label>
      <input ref="colorPickerRef" v-model="categoryColor" type="color" class="w-8 h-8 p-0 border-none bg-transparent">
    </div>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      @click="createOrUpdateCategory"
    >
      {{ isEditMode ? 'Update Category' : 'Create Category' }}
    </button>
    <button
      v-if="isEditMode"
      class="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      @click="clearForm"
    >
      Cancel
    </button>
  </div>
</template>

<style scoped>
/* No additional styles needed as Tailwind CSS classes are used */
</style>
