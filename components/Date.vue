<script setup lang="ts">
function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const now = new Date()
const start = new Date(now.getFullYear(), now.getMonth(), 1)
const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

const selectedDates = ref({
  start,
  end,
})

const showDatePicker = ref(false)
</script>

<template>
  <div class="flex bg-gray rounded-lg border border-gray-100 relative">
    <p class="border-r py-2 px-4 border-gray-100 text-gray-200">
      Showing data
    </p>
    <p class="text-gray-200 py-2 px-4 cursor-pointer gap-4 flex hover:text-red transition-all" @click="showDatePicker = !showDatePicker">
      {{ formatDate(selectedDates.start) }} - {{ formatDate(selectedDates.end) }}
      <Icon size="20" name="ion:calendar-sharp" />
    </p>
    <div class="absolute top-16 right-0">
      <VDatePicker v-if="showDatePicker" v-model="selectedDates" transparent color="red" is-range is-dark />
    </div>
  </div>
</template>
