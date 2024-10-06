<script setup lang="ts">
import { useFirebaseStore } from '@/stores/firebase'
import { ref } from 'vue'

const firebaseStore = useFirebaseStore()
const name = ref('')
const color = ref('#000000')

async function addCategory() {
  if (name.value.trim() === '') {
    alert('Category name cannot be empty')
    return
  }
  await firebaseStore.createCategory(name.value, color.value)
  name.value = ''
  color.value = '#000000'
}
</script>

<template>
  <div class="category-add">
    <div class="form-group">
      <label for="category-name">Category Name</label>
      <input id="category-name" v-model="name" type="text" class="input" placeholder="Enter category name">
    </div>
    <div class="form-group">
      <label for="category-color">Category Color</label>
      <input id="category-color" v-model="color" type="color" class="input">
    </div>
    <button class="btn" @click="addCategory">
      Add Category
    </button>
  </div>
</template>

<style lang="scss" scoped>
.category-add {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      font-size: 0.875rem;
      color: #ABABAB;
    }

    .input {
      padding: 0.5rem;
      border: 1px solid #454545;
      border-radius: 0.5rem;
      background-color: #1e1e1e;
      color: #fff;
    }
  }

  .btn {
    padding: 0.5rem;
    background-color: #cd1c21;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #a3161b;
    }
  }
}
</style>
