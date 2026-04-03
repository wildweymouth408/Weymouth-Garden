import type { WeatherData } from '@/types'
import { formatSunTime } from '@/lib/dates'
import { Card } from '@/components/ui/Card'
import { HiOutlineSun, HiOutlineArrowPath } from 'react-icons/hi2'

interface WeatherCardProps {
  weather: WeatherData | null
  loading: boolean
  error: boolean
  onRefresh: () => void
}

export function WeatherCard({ weather, loading, error, onRefresh }: WeatherCardProps) {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded-xl" />
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card className="bg-gray-50 dark:bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Gilroy, CA 95020</p>
            <p className="text-xs text-gray-400 mt-0.5">
              Weather unavailable — check{' '}
              <a href="https://weather.com/weather/today/l/Gilroy+CA+USCA0373:1:US"
                target="_blank" rel="noopener noreferrer"
                className="text-garden-600 dark:text-garden-400 underline">
                weather.com
              </a>
            </p>
          </div>
          <button onClick={onRefresh} className="text-gray-400 hover:text-garden-500 p-2">
            <HiOutlineArrowPath className="w-5 h-5" />
          </button>
        </div>
      </Card>
    )
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

  return (
    <Card className="bg-gradient-to-br from-sky-50 to-garden-50 dark:from-sky-900/20 dark:to-garden-900/20 border-sky-100 dark:border-sky-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={iconUrl} alt={weather.description} className="w-14 h-14" />
          <div>
            <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {weather.tempF}°F
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {weather.description}
            </p>
          </div>
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💧 {weather.humidity}% humidity
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💨 {weather.windMph} mph
          </p>
          {weather.rainMm > 0 && (
            <p className="text-xs text-blue-500">🌧 {weather.rainMm.toFixed(1)}mm rain</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-sky-100 dark:border-sky-800">
        <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
          <HiOutlineSun className="w-4 h-4" />
          <span>↑ {formatSunTime(weather.sunrise)}</span>
        </div>
        <p className="text-xs text-gray-400">Gilroy, CA 95020</p>
        <div className="flex items-center gap-1 text-xs text-indigo-500">
          <span>↓ {formatSunTime(weather.sunset)}</span>
          <span>🌙</span>
        </div>
      </div>
    </Card>
  )
}
