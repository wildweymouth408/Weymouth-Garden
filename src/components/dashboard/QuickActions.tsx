import type { TabId } from '@/types'
import { HiOutlineCalendarDays, HiOutlineSparkles, HiOutlineMap, HiOutlineBeaker } from 'react-icons/hi2'

interface QuickActionsProps {
  onNavigate: (tab: TabId) => void
}

const ACTIONS: { id: TabId; label: string; desc: string; Icon: React.ComponentType<{className?: string}>; color: string }[] = [
  {
    id: 'calendar',
    label: 'Planting Tasks',
    desc: 'Check off tasks',
    Icon: HiOutlineCalendarDays,
    color: 'bg-garden-50 dark:bg-garden-900/20 text-garden-600 dark:text-garden-400',
  },
  {
    id: 'tracker',
    label: 'Track Plants',
    desc: 'Log growth stages',
    Icon: HiOutlineSparkles,
    color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
  },
  {
    id: 'layout',
    label: 'Garden Map',
    desc: 'View bed diagrams',
    Icon: HiOutlineMap,
    color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
  },
  {
    id: 'watering',
    label: 'Watering',
    desc: 'Zone schedules',
    Icon: HiOutlineBeaker,
    color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
  },
]

export function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Quick Access</h3>
      <div className="grid grid-cols-2 gap-3">
        {ACTIONS.map(({ id, label, desc, Icon, color }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02] active:scale-[0.98] ${color} border border-transparent hover:border-current/10`}
          >
            <Icon className="w-7 h-7 shrink-0" />
            <div>
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs opacity-70">{desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
