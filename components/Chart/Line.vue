<script setup lang="ts">
import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

const firebaseStore = useFirebaseStore()
const transactions = computed(() => firebaseStore.transactions)

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

// Generate labels for days from 01.10.2024 to 12.10.2024
const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}.10.2024`)

// Aggregate transaction amounts by date
const aggregatedData = computed(() => {
  const data = Array.from({ length: 12 }).fill(0)
  transactions.value.forEach((transaction) => {
    const date = new Date(transaction.date.seconds * 1000)
    const day = date.getDate()
    if (day >= 1 && day <= 12) {
      data[day - 1] += transaction.amount
    }
  })
  return data
})

const chartData = ref({
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: aggregatedData.value,
      borderColor: '#cd1c21',
      backgroundColor: 'rgba(205, 28, 33, 0.2)',
      fill: true, // Ensure fill is set to true
    },
  ],
})

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
