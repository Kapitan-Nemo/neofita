<script setup lang="ts">
const firebaseStore = useFirebaseStore()
const categories = computed(() => firebaseStore.categories)

const categoryName = ref('')
const categoryColor = ref('#000000')
const isEditMode = ref(false)
const selectedCategoryId = ref<string | null>(null)
const colorPickerRef = ref(null)

async function UpdateCategory() {
  try {
    if (!categoryName.value || !categoryColor.value) {
      useToast('Please fill in all fields', 'error')
      return
    }

    if (isEditMode.value && selectedCategoryId.value) {
      await firebaseStore.updateCategory(selectedCategoryId.value, categoryName.value, categoryColor.value)
      firebaseStore.fetchTransactions()
    }

    clearForm()
    useToast('Category updated successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

async function confirmDeleteCategory(categoryId: string) {
  try {
    // TODO: WRITE A CONFIRMATION MODAL
    // await firebaseStore.deleteCategory(categoryId)
    await firebaseStore.deleteCategory(categoryId)
    useToast('Category deleted successfully', 'success')
  }
  catch (error: any) {
    useToast(error.message, 'error')
  }
}

function selectCategory(category: Category) {
  categoryName.value = category.name
  categoryColor.value = expandHexColor(category.color)
  selectedCategoryId.value = category.id
  isEditMode.value = true
}

function clearForm() {
  categoryName.value = ''
  categoryColor.value = '#000000'
  selectedCategoryId.value = null
  isEditMode.value = false
}

onMounted(async () => {
  await firebaseStore.fetchCategories()
})

watch(categoryColor, (newColor) => {
  categoryColor.value = expandHexColor(newColor)
  if (colorPickerRef.value) {
    colorPickerRef.value = categoryColor.value as any
  }
})
</script>

<template>
  <div class="transactions">
    <div class="header">
      <div class="column">
        Name
      </div>
      <div class="column text-right">
        Actions
      </div>
    </div>
    <div v-for="category in categories" :key="category.id" class="row">
      <div class="column flex gap-4 items-center">
        <span class="w-6 h-6 text-xs flex justify-center items-center p-2 rounded-full text-white" :style="{ backgroundColor: category.color }">
          {{ category.name.trim().charAt(0).toUpperCase() }}
        </span>
        <div v-if="isEditMode && selectedCategoryId === category.id" class="flex items-center">
          <input
            v-model="categoryName"
            placeholder="Enter category name"
            class="w-full min-w-[150px] p-2 text-gray-200 outline-none placeholder-gray-200 border border-gray-100 bg-transparent rounded-lg"
          >
          <input ref="colorPickerRef" v-model="categoryColor" type="color" class="w-8 h-8 p-0 border-none bg-transparent ml-2">
        </div>
        <div v-else>
          {{ category.name }}
        </div>
      </div>
      <div class="column flex gap-4 items-center justify-end">
        <span
          v-if="isEditMode && selectedCategoryId === category.id"
          class="p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="clearForm"
        >
          <Icon size="20" name="ion:close" />
        </span>
        <span
          v-if="isEditMode && selectedCategoryId === category.id"
          class="p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="UpdateCategory"
        >
          <Icon size="20" name="ion:save-outline" />
        </span>
        <span
          v-if="!isEditMode || selectedCategoryId !== category.id"
          :class="{ disabled: isEditMode && selectedCategoryId !== category.id }"
          class="p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="selectCategory(category)"
        >
          <Icon size="20" name="ion:edit" />
        </span>
        <span
          v-if="!isEditMode || selectedCategoryId !== category.id"
          :class="{ disabled: isEditMode && selectedCategoryId !== category.id }"
          class="p-2 border flex items-center cursor-pointer transition-all border-gray-100 rounded-lg"
          @click="confirmDeleteCategory(category.id)"
        >
          <Icon size="20" name="ion:trash-outline" />
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transactions {
  @apply flex flex-col w-full;
}

.header, .row {
  @apply flex border-t border-gray-300;
}

.column {
  @apply flex-1 p-4 text-sm text-gray-200;
}

.header .column {
  @apply text-white;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
}
</style>
