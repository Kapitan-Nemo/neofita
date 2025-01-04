import { defineStore } from 'pinia'

export const useDateStore = defineStore('dateStore', () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999)

  const selectedDates = ref({
    start: startOfMonth,
    end: endOfMonth,
  })

  return {
    selectedDates,
  }
})
