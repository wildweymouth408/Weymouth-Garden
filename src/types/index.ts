export type TabId = 'dashboard' | 'calendar' | 'layout' | 'watering' | 'tracker' | 'settings'

export type GrowthStage = 'seed' | 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'mature'

export type ChecklistTiming = 'this-week' | 'april-15-plus' | 'buy'

export interface PlantEntry {
  id: string
  name: string
  variety?: string
  location: string
  plantedDate: string
  expectedHarvest: string
  growthStage: GrowthStage
  notes: string
  photoBase64?: string
  lastWatered?: string
  // Grid coordinates (optional, for interactive layout)
  gridX?: number
  gridY?: number
  bedId?: number
  createdAt: string
  updatedAt: string
}

export interface WateringZone {
  id: string
  name: string
  outlet: number
  gauge: number
  durationMin: number
  startTime: string
  frequency: string
  flowRate: string
  notes: string
}

export interface ChecklistItem {
  id: string
  label: string
  detail: string
  timing: ChecklistTiming
  location: string
  completed: boolean
}

export interface AppSettings {
  darkMode: boolean
  timezone: string
  showWeather: boolean
  showFrostReminder: boolean
  zoneNames: Record<string, string>
}

export interface BedSettings {
  bed1Spacing: number
  bed2Spacing: number
}

export interface WeatherData {
  tempF: number
  humidity: number
  description: string
  icon: string
  rainMm: number
  windMph: number
  sunrise: number
  sunset: number
  fetchedAt: number
}
