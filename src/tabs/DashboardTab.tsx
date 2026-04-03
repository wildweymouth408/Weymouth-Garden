import { useState, useCallback } from 'react'
import type { TabId } from '@/types'
import { useWeather } from '@/hooks/useWeather'
import { useStorage } from '@/hooks/useStorage'
import { DEFAULT_SETTINGS } from '@/lib/storage'
import { DEFAULT_ZONES } from '@/lib/zones-data'
import { getZones } from '@/lib/storage'
import { WeatherCard } from '@/components/dashboard/WeatherCard'
import { FrostCountdown } from '@/components/dashboard/FrostCountdown'
import { WateringSummary } from '@/components/dashboard/WateringSummary'
import { QuickActions } from '@/components/dashboard/QuickActions'

// DashboardTab receives a navigation callback from App
// We use a global event as a simple cross-tab nav trigger
function useTabNavigate() {
  return useCallback((tab: TabId) => {
    window.dispatchEvent(new CustomEvent('wg-navigate', { detail: tab }))
  }, [])
}

export function DashboardTab() {
  const [settings] = useStorage('wg-settings', DEFAULT_SETTINGS)
  const [weatherEnabled, setWeatherEnabled] = useState(
    typeof settings === 'object' && 'showWeather' in settings
      ? (settings as typeof DEFAULT_SETTINGS).showWeather
      : true
  )
  const [refreshKey, setRefreshKey] = useState(0)
  const { weather, loading, error } = useWeather(weatherEnabled && refreshKey >= 0)
  const navigate = useTabNavigate()

  const zones = (() => {
    const saved = getZones()
    return saved.length > 0 ? saved : DEFAULT_ZONES
  })()

  return (
    <div className="space-y-4">
      {/* Header greeting */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to Weymouth Garden 🌿
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Gilroy, CA 95020</p>
      </div>

      {/* Weather */}
      {(typeof settings === 'object' && 'showWeather' in settings
        ? (settings as typeof DEFAULT_SETTINGS).showWeather
        : true) && (
        <WeatherCard
          weather={weather}
          loading={loading}
          error={error}
          onRefresh={() => { setWeatherEnabled(false); setTimeout(() => { setWeatherEnabled(true); setRefreshKey(k => k + 1) }, 100) }}
        />
      )}

      {/* Frost countdown */}
      <FrostCountdown
        visible={
          typeof settings === 'object' && 'showFrostReminder' in settings
            ? (settings as typeof DEFAULT_SETTINGS).showFrostReminder
            : true
        }
      />

      {/* Watering summary */}
      <WateringSummary zones={zones} />

      {/* Quick actions */}
      <QuickActions onNavigate={navigate} />
    </div>
  )
}
