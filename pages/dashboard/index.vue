<script setup lang="ts">
const auth = useAuth()
const dateStore = useDateStore()

definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div>
    <Nav />
    <div class="flex flex-col">
      <div class="py-6 flex gap-4 lg:gap-0 flex-col lg:flex-row justify-between lg:items-center">
        <div class="flex flex-col gap-1">
          <h1>Dashboard</h1>
          <p class="text-sm text-gray-200">
            Hi, {{ auth.userName }} here are your financial stats
          </p>
        </div>
        <Date />
      </div>

      <div class="flex flex-col lg:flex-row py-6 gap-6">
        <div class="lg:w-1/3 w-full">
          <Tile title="Revenue" :subtitle="`Data from ${dateStore.selectedDates.start.toLocaleDateString('en-GB')} - ${dateStore.selectedDates.end.toLocaleDateString('en-GB')}`" link-text="View Report">
            <ChartLine />
          </Tile>
        </div>

        <div class="lg:w-1/3 w-full">
          <Tile title="Daily Expenses" :subtitle="`Data from ${dateStore.selectedDates.start.toLocaleDateString('en-GB')} - ${dateStore.selectedDates.end.toLocaleDateString('en-GB')}`" link-text="View Report">
            <ChartBar />
          </Tile>
        </div>

        <div class="lg:w-1/3 w-full">
          <Tile class="h-full" title="Summary" :subtitle="`Data from ${dateStore.selectedDates.start.toLocaleDateString('en-GB')} - ${dateStore.selectedDates.end.toLocaleDateString('en-GB')}`" link-text="View Report">
            <ChartDoughnut />
          </Tile>
        </div>
      </div>
    </div>
    <div class="flex flex-col lg:flex-row pb-6 gap-6">
      <div class="lg:w-2/3 w-full">
        <Tile class="flex flex-col h-full lg:w-[904px]" title="Daily Transactions" link="/dashboard/manage" :subtitle="`Data from ${dateStore.selectedDates.start.toLocaleDateString('en-GB')} - ${dateStore.selectedDates.end.toLocaleDateString('en-GB')}`" link-text="Manage">
          <TransactionList />
        </Tile>
      </div>
      <div class="lg:w-1/3 w-full flex flex-col gap-6">
        <Tile class="flex flex-col gap-4" title="Saving Goal" subtitle="75% Progress" link="/saving-plan" link-text="Manage">
          <ChartRange />
        </Tile>

        <Tile class="bg-[#191919]">
          <ChartPlaylist />
        </Tile>
      </div>
    </div>
  </div>
</template>
