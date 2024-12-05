import { defineStore } from 'pinia'

export const useDateStore = defineStore('dateStore', () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0, 23, 59, 59, 999)
  const middleOfMonth1 = new Date(year, month, 12, 23, 59, 59, 999)
  const middleOfMonth2 = new Date(year, month, 22, 23, 59, 59, 999)
  let start, end
  switch (true) {
    case now <= middleOfMonth1:
      start = startOfMonth
      end = middleOfMonth1
      break
    case now <= middleOfMonth2:
      start = new Date(year, month, 13)
      end = middleOfMonth2
      break
    default:
      start = new Date(year, month, 23)
      end = endOfMonth
      break
  }
  const selectedDates = ref({
    start,
    end,
  })

  return {
    selectedDates,
  }
})
