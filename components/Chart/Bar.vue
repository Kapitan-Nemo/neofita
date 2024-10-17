<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { computed, ref } from 'vue'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const firebaseStore = useFirebaseStore()
const dateStore = useDateStore()
const transactions = computed(() => firebaseStore.transactions)
const previousTransactions = computed(() => firebaseStore.previousTransactions)

// Generate labels based on the selected date range
const labels = computed(() => {
  const start = new Date(dateStore.selectedDates.start)
  const end = new Date(dateStore.selectedDates.end)
  const labelsArray = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    labelsArray.push(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)
  }
  return labelsArray
})

// Aggregate transaction amounts by date
const aggregatedData = computed(() => {
  const data = Array.from({ length: labels.value.length }).fill(0) as number[]
  transactions.value.forEach((transaction) => {
    const date = new Date(transaction.date.seconds * 1000)
    const index = labels.value.indexOf(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
    if (index !== -1) {
      data[index] += transaction.amount
    }
  })
  return data
})

// Generate labels for the previous month
const previousMonthLabels = computed(() => {
  const start = new Date(dateStore.selectedDates.start)
  start.setMonth(start.getMonth() - 1)
  const end = new Date(dateStore.selectedDates.end)
  end.setMonth(end.getMonth() - 1)
  const labelsArray = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    labelsArray.push(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)
  }
  return labelsArray
})

// Aggregate previous transaction amounts by date and make them negative
const previousMonthData = computed(() => {
  const data = Array.from({ length: previousMonthLabels.value.length }).fill(0) as number[]
  previousTransactions.value.forEach((transaction) => {
    const date = new Date(transaction.date.seconds * 1000)
    const index = previousMonthLabels.value.indexOf(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`)
    if (index !== -1) {
      data[index] += transaction.amount * -1
    }
  })
  return data
})

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Expenses',
      barThickness: 10,
      data: aggregatedData.value,
      backgroundColor: '#cd1c21',
    },
    {
      label: 'Compare to last month',
      barThickness: 10,
      data: previousMonthData.value,
      backgroundColor: '#4B4B4B',
    },
  ],
}))

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
      },
    },
  },
  scales: {
    x: {
      stacked: true,
      display: false,
    },
    y: {
      stacked: true,
    },
  },
})
</script>

<template>
  <div class="chart-container">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :height="165"
    />
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100%;
}
</style>
