<script setup lang="ts">
const dateStore = useDateStore()
const showDatePicker = ref(false)
</script>

<template>
  <div class="flex bg-gray rounded-lg border border-gray-100 relative">
    <p class="border-r py-2 px-6 text-sm border-gray-100 text-gray-200">
      Showing data
    </p>
    <p class="text-gray-200 text-sm py-2 px-6 cursor-pointer gap-4 flex hover:text-red transition-all" @click="showDatePicker = !showDatePicker">
      {{ dateStore.formatDate(dateStore.selectedDates.start) }} - {{ dateStore.formatDate(dateStore.selectedDates.end) }}
      <Icon size="20" name="ion:calendar-sharp" />
    </p>
    <div class="absolute top-16 right-0">
      <VDatePicker v-if="showDatePicker" v-model="dateStore.selectedDates" :style="{ backgroundColor: '#1e1e1e', border: '1px solid #454545' }" color="red" is-range is-dark />
    </div>
  </div>
</template>
