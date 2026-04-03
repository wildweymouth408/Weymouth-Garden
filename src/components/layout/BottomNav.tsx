import type { TabId } from '@/types'
import {
  HiOutlineHome,
  HiOutlineCalendarDays,
  HiOutlineMap,
  HiOutlineBeaker,
  HiOutlineSparkles,
  HiOutlineCog6Tooth,
} from 'react-icons/hi2'
import { cn } from '@/lib/utils'

const TABS: { id: TabId; label: string; Icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'dashboard', label: 'Home',     Icon: HiOutlineHome },
  { id: 'calendar',  label: 'Calendar', Icon: HiOutlineCalendarDays },
  { id: 'layout',    label: 'Layout',   Icon: HiOutlineMap },
  { id: 'watering',  label: 'Water',    Icon: HiOutlineBeaker },
  { id: 'tracker',   label: 'Plants',   Icon: HiOutlineSparkles },
  { id: 'settings',  label: 'Settings', Icon: HiOutlineCog6Tooth },
]

interface BottomNavProps {
  active: TabId
  onChange: (tab: TabId) => void
}

export function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-bottom no-print">
      <div className="flex max-w-lg mx-auto">
        {TABS.map(({ id, label, Icon }) => {
          const isActive = id === active
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 min-h-[56px] py-2 px-1 transition-colors',
                isActive
                  ? 'text-garden-600 dark:text-garden-400'
                  : 'text-gray-400 dark:text-gray-500 hover:text-garden-500 dark:hover:text-garden-400',
              )}
              aria-label={label}
            >
              <Icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
              <span className={cn('text-[10px] font-medium leading-none', isActive ? 'text-garden-600 dark:text-garden-400' : '')}>
                {label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-garden-500 rounded-t-full" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
