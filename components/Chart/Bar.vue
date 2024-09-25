<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Generate labels for days from 01.09.2024 to 12.09.2024
const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}.09.2024`)

// Example data for current month and previous month
const currentMonthData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
const previousMonthData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) * -1) // Make values negative

const chartData = ref({
  labels,
  datasets: [
    {
      label: 'Expenses',
      barThickness: 10,
      data: currentMonthData,
      backgroundColor: '#cd1c21',
    },
    {
      label: 'Compare to last month',
      barThickness: 10,
      data: previousMonthData,
      backgroundColor: '#4B4B4B',
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
      :height="250"
    />
  </div>
</template>
