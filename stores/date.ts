import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateStore = defineStore('dateStore', () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  const startOfMonth = new Date(year, month, 1)
  const endOfMonth = new Date(year, month + 1, 0)
  const middleOfMonth1 = new Date(year, month, 12)
  const middleOfMonth2 = new Date(year, month, 22)
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

  function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0')
    const monthNames = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ]
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  function formatDateRange(start: Date, end: Date): string {
    const startDay = start.getDate()
    const endDay = end.getDate()
    const monthNames = [
      'Styczeń',
      'Luty',
      'Marzec',
      'Kwiecień',
      'Maj',
      'Czerwiec',
      'Lipiec',
      'Sierpień',
      'Wrzesień',
      'Październik',
      'Listopad',
      'Grudzień',
    ]
    const month = monthNames[start.getMonth()]
    const year = start.getFullYear()
    return `${startDay}-${endDay} ${month}, ${year}`
  }

  return {
    selectedDates,
    formatDate,
    formatDateRange,
  }
})
