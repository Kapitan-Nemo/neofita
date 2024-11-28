<script setup lang="ts">
import { ArcElement, CategoryScale, Chart as ChartJS, DoughnutController, Legend, Title, Tooltip } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

const firebaseStore = useFirebaseStore()

const transactions = computed(() => firebaseStore.transactions)
const categories = computed(() => firebaseStore.categories)

onMounted(() => {
  firebaseStore.fetchTransactions()
  firebaseStore.fetchCategories()
})

const totalAmount = computed(() => {
  return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)
})

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

    const text = `$${totalAmount.value.toFixed(2)}` // Display the total amount with a dollar sign at the end
    const textX = Math.round((width - ctx.measureText(text).width) / 2)
    const textY = height / 2

    ctx.fillText(text, textX, textY)
    ctx.save()
  },
}

ChartJS.register(DoughnutController, ArcElement, Title, Tooltip, Legend, CategoryScale, centerTextPlugin)

// Update the chart data
const chartData = computed(() => {
  // Initialize a dictionary to store the total amounts for each category
  const categoryTotals: { [key: string]: number } = {}
  categories.value.forEach((category) => {
    categoryTotals[category.name] = 0
  })

  // Sum the amounts for each category
  transactions.value.forEach((transaction) => {
    const categoryName = transaction.category.name
    categoryTotals[categoryName] += transaction.amount
  })

  // Calculate the total amount of all transactions
  const totalAmount = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0)

  // Calculate the percentage for each category
  const categoryPercentages: { [key: string]: string } = {}
  Object.keys(categoryTotals).forEach((categoryName) => {
    categoryPercentages[categoryName] = ((categoryTotals[categoryName] / totalAmount) * 100).toFixed(2)
  })

  return {
    labels: categories.value.map(category => category.name),
    percentage: categories.value.map(category => categoryPercentages[category.name]),
    datasets: [
      {
        data: categories.value.map(category => categoryTotals[category.name]),
        backgroundColor: categories.value.map(category => category.color),
        borderColor: categories.value.map(category => category.color),
        borderWidth: 1,
      },
    ],
  }
})

const precentageUsedCategories = computed(() => {
  const totalAmount = transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)

  const categoryTotals: { [key: string]: number } = transactions.value.reduce((acc, transaction) => {
    const categoryName = transaction.category.name
    acc[categoryName] = (acc[categoryName] || 0) + transaction.amount
    return acc
  }, {} as { [key: string]: number })

  const categoryPercentages = Object.keys(categoryTotals).reduce((acc, categoryName) => {
    acc[categoryName] = ((categoryTotals[categoryName] / totalAmount) * 100).toFixed(2)
    return acc
  }, {} as { [key: string]: string })

  return categoryPercentages
})

function getCurrentPercentage(category: Category) {
  return precentageUsedCategories.value[category.name]
}

const usedCategories = computed(() => {
  const uniqueCategoriesMap = new Map()

  transactions.value.forEach((transaction) => {
    const category = transaction.category
    const key = `${category.id}-${category.color}-${category.name}`
    if (!uniqueCategoriesMap.has(key)) {
      uniqueCategoriesMap.set(key, category)
    }
  })

  return Array.from(uniqueCategoriesMap.values()).sort((a, b) => a.name.localeCompare(b.name))
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
</script>

<template>
  <div v-if="transactions.length" class="chart-container flex gap-6">
    <div class="w-1/2">
      <Doughnut
        id="summary-chart"
        :options="chartOptions"
        :data="chartData"
      />
    </div>
    <div class="w-1/2">
      <div class="flex flex-col max-h-[200px] overflow-y-auto no-scrollbar">
        <div v-for="(category, index) in usedCategories" :key="category.id" class="flex items-center gap-4 pt-4 pb-4" :class="[{ 'border-b border-dotted border-gray-100': index !== usedCategories.length - 1 }]">
          <div :style="{ backgroundColor: category.color }" class="w-2 h-2 rounded-full" />
          <div class="flex justify-between w-full items-center">
            <span class="text-xs flex">{{ category.name }}</span>
            <span class="text-xs flex text-gray-200">{{ getCurrentPercentage(category) }} %</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <TransactionCategoryEmpty v-else />
</template>
