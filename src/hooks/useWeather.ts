import { useState, useEffect } from 'react'
import type { WeatherData } from '@/types'
import { fetchWeather } from '@/lib/weather'

export function useWeather(enabled: boolean) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!enabled) return
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(false)
      const data = await fetchWeather()
      if (!cancelled) {
        setWeather(data)
        setError(data === null)
        setLoading(false)
      }
    }

    void load()
    return () => { cancelled = true }
  }, [enabled])

  return { weather, loading, error }
}
