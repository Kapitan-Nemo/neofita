<script setup lang="ts">
const auth = useAuth()
const dateStore = useDateStore()
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
        <Date />
      </div>

      <div class="flex gap-6">
        <div class="py-6 w-1/3">
          <Tile title="Revenue" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartLine />
          </Tile>
        </div>

        <div class="py-6 w-1/3">
          <Tile title="Daily Expenses" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartBar />
          </Tile>
        </div>

        <div class="py-6 w-1/3">
          <Tile title="Summary" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartDoughnut />
          </Tile>
        </div>
      </div>
    </div>
  </div>
</template>
