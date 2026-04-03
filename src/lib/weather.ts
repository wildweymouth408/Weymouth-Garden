import type { WeatherData } from '@/types'
import { getWeatherCache, saveWeatherCache } from './storage'
import { LAT, LON } from './dates'

const CACHE_TTL_MS = 10 * 60 * 1000 // 10 minutes

export async function fetchWeather(): Promise<WeatherData | null> {
  // Use Vite environment variable (set in .env.local or Vercel)
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string | undefined

  // Return cache if fresh
  const cached = getWeatherCache()
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
    return cached
  }

  if (!apiKey || apiKey === 'undefined' || apiKey.startsWith('your-api-key')) {
    console.warn('OpenWeatherMap API key missing. Set VITE_OPENWEATHER_API_KEY in environment.')
    return null
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${apiKey}&units=imperial`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json() as {
      main: { temp: number; humidity: number }
      weather: { description: string; icon: string }[]
      wind: { speed: number }
      rain?: { '1h'?: number }
      sys: { sunrise: number; sunset: number }
    }

    const data: WeatherData = {
      tempF: Math.round(json.main.temp),
      humidity: json.main.humidity,
      description: json.weather[0]?.description ?? '',
      icon: json.weather[0]?.icon ?? '',
      rainMm: json.rain?.['1h'] ?? 0,
      windMph: Math.round(json.wind.speed),
      sunrise: json.sys.sunrise,
      sunset: json.sys.sunset,
      fetchedAt: Date.now(),
    }
    saveWeatherCache(data)
    return data
  } catch {
    return null
  }
}
