<script setup lang="ts">
import { CategoryScale, Chart as ChartJS, Filler, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, Filler)

// Generate labels for days from 01.09.2024 to 12.09.2024
const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}.09.2024`)

// Example data for current month
const currentMonthData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))

const chartData = ref({
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: currentMonthData,
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
