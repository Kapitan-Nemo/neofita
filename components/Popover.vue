<script setup lang="ts">
import { ref } from 'vue'

// Define the emit function
const emit = defineEmits(['confirm'])

const show = ref(false)

function confirm() {
  show.value = false
  emit('confirm')
}

function cancel() {
  show.value = false
}
</script>

<template>
  <div v-if="show" class="popover">
    <p>Are you sure you want to delete this category?</p>
    <button @click="confirm">
      Yes
    </button>
    <button @click="cancel">
      No
    </button>
  </div>
</template>

<style scoped>
.popover {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
