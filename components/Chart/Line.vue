<script setup lang="ts">
import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs' // Adjust the import path as necessary

const firebaseStore = useFirebaseStore()
const dateStore = useDateStore()
const transactions = computed(() => firebaseStore.transactions)

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

// Generate labels based on the selected date range
const labels = computed(() => {
  const start = new Date(dateStore.selectedDates.start)
  const end = new Date(dateStore.selectedDates.end)
  const labelsArray = []
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    labelsArray.push(`${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`)
  }
  return labelsArray
})

//  Aggregate transaction amounts by date
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

const chartData = computed(() => ({
  labels: labels.value,
  datasets: [
    {
      label: 'Expenses',
      data: aggregatedData.value,
      borderColor: '#cd1c21',
      backgroundColor: 'rgba(205, 28, 33, 0.2)',
      fill: true,
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
      display: false,
    },
    y: {
      display: true,
    },
  },
})
</script>

<template>
  <div class="chart-container">
    <Line
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :height="165"
    />
  </div>
</template>
