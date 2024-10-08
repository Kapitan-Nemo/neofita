<script setup lang="ts">
import { ArcElement, CategoryScale, Chart as ChartJS, DoughnutController, Legend, Title, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

// Custom plugin to display text in the center of the doughnut chart
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw(chart: any) {
    if (chart.config.type !== 'doughnut')
      return // Only apply to doughnut charts
    const { ctx, width, height } = chart
    ctx.restore()
    const fontSize = (height / 114).toFixed(2)
    ctx.font = `${fontSize}em Montserrat`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = '#FFF' // Set text color to white

    const text = '$8,295'
    const textX = Math.round((width - ctx.measureText(text).width) / 2)
    const textY = height / 2

    ctx.fillText(text, textX, textY)
    ctx.save()
  },
}

ChartJS.register(DoughnutController, ArcElement, Title, Tooltip, Legend, CategoryScale, centerTextPlugin)

// Example data for different categories
const foodAndDrinkData = Math.floor(Math.random() * 100)
const groceryData = Math.floor(Math.random() * 100)
const shoppingData = Math.floor(Math.random() * 100)
const transportData = Math.floor(Math.random() * 100)

const total = foodAndDrinkData + groceryData + shoppingData + transportData
const foodAndDrinkPercentage = ((foodAndDrinkData / total) * 100).toFixed(2)
const groceryPercentage = ((groceryData / total) * 100).toFixed(2)
const shoppingPercentage = ((shoppingData / total) * 100).toFixed(2)
const transportPercentage = ((transportData / total) * 100).toFixed(2)

const chartData = ref({
  labels: ['Food & Drink', 'Grocery', 'Shopping', 'Transport'],
  percentage: [foodAndDrinkPercentage, groceryPercentage, shoppingPercentage, transportPercentage],
  datasets: [
    {
      data: [foodAndDrinkData, groceryData, shoppingData, transportData],
      backgroundColor: ['#2CC07E', '#926BF9', '#FB4C61', '#FE9E2C'],
      borderColor: ['#2CC07E', '#926BF9', '#FB4C61', '#FE9E2C'],
      borderWidth: 1,
    },
  ],
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    centerText: {}, // Enable the custom plugin
  },
  cutout: '90%', // Thin doughnut border
})

const categories = computed(() => {
  const labels = chartData.value.labels
  const colors = chartData.value.datasets[0].backgroundColor
  const percentages = chartData.value.percentage
  return labels.map((label, index) => ({
    label,
    color: colors[index],
    percentage: percentages[index],
  }))
})
</script>

<template>
  <div class="chart-container flex gap-6">
    <div class="w-1/2">
      <Doughnut
        id="summary-chart"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <div class="w-1/2">
      <div class="flex flex-col">
        <div v-for="(category, index) in categories" :key="index" class="flex items-center gap-4 pt-4 pb-4" :class="[{ 'border-b border-dotted border-gray-100': index !== categories.length - 1 }]">
          <div :style="{ backgroundColor: category.color }" class="w-2 h-2 rounded-full" />
          <div class="flex justify-between w-full items-center">
            <span class="text-sm flex">{{ category.label }}</span>
            <span class="text-xs flex text-gray-200">{{ category.percentage }} %</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
