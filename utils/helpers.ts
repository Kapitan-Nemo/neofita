import type { DirectiveBinding } from 'vue'

export function expandHexColor(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  return hex
}

type FormatType = 'string' | 'date'

export function formatDate(input: Timestamp | Date, formatType: FormatType = 'date'): string | Date {
  let date: Date

  if (input instanceof Date) {
    date = input
  }
  else {
    date = new Date(input.seconds * 1000 + input.nanoseconds / 1000000)
  }

  if (formatType === 'string') {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  }

  return date
}

export function formatNumber(value: number): string {
  return Number(value).toLocaleString('pl-PL', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, ' ')
}

let isFormatting = false

export function formatNumberInput(event: Event): void {
  if (isFormatting)
    return

  isFormatting = true
  const target = event.target as HTMLInputElement
  let value = target.value.replace(/\s+/g, '').replace(/,/g, '.')
  if (!Number.isNaN(Number(value)) && value !== '') {
    value = formatNumber(Number(value))
    target.value = value
    target.dispatchEvent(new Event('input'))
  }
  isFormatting = false
}
