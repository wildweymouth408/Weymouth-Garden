import type { ReactNode } from 'react'
import type { TabId } from '@/types'
import { BottomNav } from './BottomNav'
import { useThemeContext } from './ThemeProvider'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'

interface AppShellProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
  children: ReactNode
}

const TAB_TITLES: Record<TabId, string> = {
  dashboard: 'Weymouth Garden',
  calendar:  'Planting Calendar',
  layout:    'Garden Layout',
  watering:  'Watering Schedule',
  tracker:   'Plant Tracker',
  settings:  'Settings',
}

export function AppShell({ activeTab, onTabChange, children }: AppShellProps) {
  const { darkMode, setDarkMode } = useThemeContext()

  return (
    <div className="min-h-screen bg-garden-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 no-print">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>🌿</span>
            <h1 className="text-lg font-semibold text-garden-800 dark:text-garden-300">
              {TAB_TITLES[activeTab]}
            </h1>
          </div>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main content with bottom nav padding */}
      <main className="max-w-lg mx-auto px-4 pt-4 pb-24">
        {children}
      </main>

      <BottomNav active={activeTab} onChange={onTabChange} />
    </div>
  )
}
