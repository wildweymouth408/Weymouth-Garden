import type { PlantEntry, WateringZone, ChecklistItem, AppSettings, WeatherData, BedSettings } from '@/types'

export const KEYS = {
  plants:    'wg-plants',
  checklist: 'wg-checklist',
  zones:     'wg-zones',
  settings:  'wg-settings',
  weather:   'wg-weather-cache',
  bedSettings: 'wg-bed-settings',
} as const

function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    console.warn('localStorage write failed for key:', key)
  }
}

// Plants
export function getPlants(): PlantEntry[] {
  return getItem<PlantEntry[]>(KEYS.plants, [])
}
export function savePlants(plants: PlantEntry[]): void {
  setItem(KEYS.plants, plants)
}

// Checklist
export function getChecklist(): ChecklistItem[] {
  return getItem<ChecklistItem[]>(KEYS.checklist, [])
}
export function saveChecklist(items: ChecklistItem[]): void {
  setItem(KEYS.checklist, items)
}

// Zones
export function getZones(): WateringZone[] {
  return getItem<WateringZone[]>(KEYS.zones, [])
}
export function saveZones(zones: WateringZone[]): void {
  setItem(KEYS.zones, zones)
}

// Settings
export const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  timezone: 'America/Los_Angeles',
  showWeather: true,
  showFrostReminder: true,
  zoneNames: {
    z1: 'Bed 1 (Left)',
    z2: 'Bed 2 (Right)',
    z3: 'Containers',
    z4: 'Hanging Pots',
  },
}

export const DEFAULT_BED_SETTINGS: BedSettings = {
  bed1Spacing: 10,
  bed2Spacing: 10,
}
export function getSettings(): AppSettings {
  const stored = getItem<Partial<AppSettings>>(KEYS.settings, {})
  return { ...DEFAULT_SETTINGS, ...stored, zoneNames: { ...DEFAULT_SETTINGS.zoneNames, ...stored.zoneNames } }
}
export function saveSettings(settings: AppSettings): void {
  setItem(KEYS.settings, settings)
}

// Weather cache
export function getWeatherCache(): WeatherData | null {
  return getItem<WeatherData | null>(KEYS.weather, null)
}
export function saveWeatherCache(data: WeatherData): void {
  setItem(KEYS.weather, data)
}

// Bed settings
export function getBedSettings(): BedSettings {
  const stored = getItem<Partial<BedSettings>>(KEYS.bedSettings, {})
  return { ...DEFAULT_BED_SETTINGS, ...stored }
}
export function saveBedSettings(settings: BedSettings): void {
  setItem(KEYS.bedSettings, settings)
}
