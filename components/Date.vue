<script setup lang="ts">
const dateStore = useDateStore()
</script>

<template>
  <div class="flex bg-gray rounded-lg border border-gray-100 relative">
    <p class="border-r py-2 px-6 text-sm border-gray-100 text-gray-200">
      Showing data
    </p>

    <VDatePicker
      v-model="dateStore.selectedDates"
      expanded
      :style="{ backgroundColor: '#1e1e1e', border: '1px solid #454545' }"
      color="red"
      is-range
      is-dark
    >
      <template #default="{ togglePopover }">
        <button
          class="text-gray-200 text-sm py-2 px-6 cursor-pointer gap-4 flex hover:text-red transition-all"
          @click="togglePopover"
        >
          {{ dateStore.formatDate(dateStore.selectedDates.start) }} - {{ dateStore.formatDate(dateStore.selectedDates.end) }}
          <Icon size="20" name="ion:calendar-sharp" />
        </button>
      </template>
    </VDatePicker>
  </div>
</template>
