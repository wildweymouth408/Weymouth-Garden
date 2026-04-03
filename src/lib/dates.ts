// Gilroy, CA frost dates
export const LAST_FROST_DATE = new Date('2026-04-15T00:00:00')
export const LOCATION = 'Gilroy, CA 95020'
export const LAT = 37.0058
export const LON = -121.5683

export function getDaysUntilFrostFree(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(LAST_FROST_DATE)
  target.setHours(0, 0, 0, 0)
  const diff = target.getTime() - today.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export function isFrostFree(): boolean {
  return getDaysUntilFrostFree() === 0
}

export function formatSunTime(unixTimestamp: number): string {
  const d = new Date(unixTimestamp * 1000)
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  })
}
