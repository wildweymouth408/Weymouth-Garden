import { useStorage } from '@/hooks/useStorage'
import { DEFAULT_SETTINGS } from '@/lib/storage'
import type { AppSettings } from '@/types'
import { useThemeContext } from '@/components/layout/ThemeProvider'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'
import { HiOutlineCog6Tooth } from 'react-icons/hi2'

export function SettingsTab() {
  const { darkMode, setDarkMode } = useThemeContext()
  const [settings, setSettings] = useStorage<AppSettings>('wg-settings', DEFAULT_SETTINGS)

  const update = (patch: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...patch }))
  }

  const updateZoneName = (id: string, name: string) => {
    setSettings(prev => ({
      ...prev,
      zoneNames: { ...prev.zoneNames, [id]: name },
    }))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <HiOutlineCog6Tooth className="w-5 h-5 text-gray-400" />
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">App Settings</h2>
      </div>

      {/* Appearance */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-xs">
          Appearance
        </h3>
        <div className="space-y-4">
          <Toggle
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark Mode"
            description="Easier on the eyes at night"
          />
        </div>
      </Card>

      {/* Dashboard widgets */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-xs">
          Dashboard
        </h3>
        <div className="space-y-4">
          <Toggle
            checked={settings.showWeather}
            onChange={(val) => update({ showWeather: val })}
            label="Weather Widget"
            description="Show current Gilroy weather"
          />
          <Toggle
            checked={settings.showFrostReminder}
            onChange={(val) => update({ showFrostReminder: val })}
            label="Frost Date Reminder"
            description="Countdown to April 15 frost-free date"
          />
        </div>
      </Card>

      {/* Zone names */}
      <Card>
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide text-xs">
          Garden Zone Names
        </h3>
        <div className="space-y-3">
          {Object.entries(settings.zoneNames).map(([id, name]) => (
            <div key={id}>
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                Zone {id.replace('z', '')}
              </label>
              <input
                value={name}
                onChange={e => updateZoneName(id, e.target.value)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Location info */}
      <Card className="bg-garden-50 dark:bg-garden-900/20 border-garden-100 dark:border-garden-800">
        <h3 className="text-sm font-semibold text-garden-800 dark:text-garden-300 mb-2">
          Garden Info
        </h3>
        <div className="space-y-1 text-xs text-garden-700 dark:text-garden-400">
          <p>📍 Gilroy, CA 95020</p>
          <p>🕐 Timezone: America/Los_Angeles (Pacific)</p>
          <p>❄️ Last frost date: April 15, 2026</p>
          <p>💧 System: Orbit B-Hyve 4-outlet timer</p>
        </div>
      </Card>

      {/* Reset */}
      <div className="text-center">
        <button
          onClick={() => {
            if (!confirm('Clear ALL app data? This cannot be undone.')) return
            const keys = Object.keys(localStorage).filter(k => k.startsWith('wg-'))
            keys.forEach(k => localStorage.removeItem(k))
            window.location.reload()
          }}
          className="text-xs text-red-400 hover:text-red-600 underline"
        >
          Clear all app data
        </button>
      </div>

      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        Weymouth Garden · All data stored locally on your device
      </p>
    </div>
  )
}
