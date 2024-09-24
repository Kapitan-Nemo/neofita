<script setup lang="ts">
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// Generate labels for days from 01.09.2024 to 12.09.2024
const labels = Array.from({ length: 12 }, (_, i) => `${i + 1}.09.2024`)

const chartData = ref({
  labels,
  datasets: [{
    barThickness: 15,
    data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
    ],
  }],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
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
