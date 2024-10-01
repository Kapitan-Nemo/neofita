<script setup lang="ts">
const auth = useAuth()
const dateStore = useDateStore()

definePageMeta({
  middleware: ['auth'],
})
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

      <div class="flex py-6 gap-6">
        <div class="w-1/3">
          <Tile title="Revenue" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartLine />
          </Tile>
        </div>

        <div class="w-1/3">
          <Tile title="Daily Expenses" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartBar />
          </Tile>
        </div>

        <div class="w-1/3">
          <Tile title="Summary" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-text="View Report">
            <ChartDoughnut />
          </Tile>
        </div>
      </div>
    </div>
    <div class="flex pb-6 gap-6">
      <div class="w-2/3">
        <Tile class="w-[904px]" title="Daily Transactions" link="/dashboard/manage" :subtitle="`Data from ${dateStore.formatDateRange(dateStore.selectedDates.start, dateStore.selectedDates.end)}`" button-action="Edit" button-text="View Report">
          <TransactionList />
        </Tile>
      </div>
      <div class="w-1/3 flex flex-col gap-6">
        <Tile class="flex flex-col gap-4" title="Saving Goal" subtitle="75% Progress" button-text="View Report">
          <p class="text-2xl mb-2">
            $1052.98 <span class="text-sm text-gray-200"><span class="mx-1">of</span> $1,200</span>
          </p>
          <ChartRange />
        </Tile>

        <Tile class="bg-[#191919] h-full">
          <ChartPlaylist />
        </Tile>
      </div>
    </div>
  </div>
</template>
