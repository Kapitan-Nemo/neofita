<script setup lang="ts">
const auth = useAuth()

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
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
  <div>
    <Nav class="border-b border-gray-100" />
    <div class="flex flex-col">
      <div class="py-6 flex flex-row justify-between items-center">
        <div class="flex flex-col gap-1">
          <h1>Dashboard</h1>
          <p class="text-sm text-gray-200">
            Hi, {{ auth.userName }} here are your financial stats
          </p>
        </div>

        <div class="flex bg-gray rounded-lg border border-gray-100 relative">
          <p class="border-r py-2 px-4 border-gray-100 text-gray-200">
            Showing data
          </p>
          <p class="text-gray-200 py-2 px-4 cursor-pointer gap-4 flex hover:text-red transition-all" @click="showDatePicker = !showDatePicker">
            {{ formatDate(selectedDates.start) }} - {{ formatDate(selectedDates.end) }}
            <Icon size="20" name="ion:calendar-sharp" />
          </p>
          <div class="absolute top-16 right-0">
            <VDatePicker v-if="showDatePicker" v-model="selectedDates" is-range is-dark />
          </div>
        </div>
      </div>

      <div class="py-6 w-1/3">
        <Tile title="Revenue" subtitle="Data from 1-12 Apr, 2024" button-text="View Report">
          <div>
            <p>
              Content
            </p>
          </div>
        </Tile>
      </div>
    </div>
  </div>
</template>
