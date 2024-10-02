export function expandHexColor(hex: string): string {
  if (hex.length === 4) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
  }
  return hex
}

export function formatDate(timestamp: Timestamp): string {
  const date = new Date(timestamp.seconds * 1000)
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
