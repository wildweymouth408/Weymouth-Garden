import type { ChecklistItem } from '@/types'
import { cn } from '@/lib/utils'
import { HiOutlineCheckCircle, HiOutlineMapPin } from 'react-icons/hi2'
import { Badge } from '@/components/ui/Badge'

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'brown' | 'blue' | 'red'

interface ChecklistItemRowProps {
  item: ChecklistItem
  onToggle: (id: string) => void
  badgeVariant: BadgeVariant
  badgeLabel: string
}

export function ChecklistItemRow({ item, onToggle, badgeVariant, badgeLabel }: ChecklistItemRowProps) {
  return (
    <button
      onClick={() => onToggle(item.id)}
      className={cn(
        'w-full text-left rounded-xl border p-3 transition-all',
        item.completed
          ? 'bg-garden-50 dark:bg-garden-900/20 border-garden-200 dark:border-garden-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-garden-300 dark:hover:border-garden-700',
      )}
    >
      <div className="flex items-start gap-3">
        <HiOutlineCheckCircle
          className={cn(
            'w-6 h-6 mt-0.5 shrink-0 transition-colors',
            item.completed
              ? 'text-garden-500 fill-garden-100 dark:fill-garden-900'
              : 'text-gray-300 dark:text-gray-600',
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn(
              'text-sm font-semibold',
              item.completed
                ? 'line-through text-gray-400 dark:text-gray-500'
                : 'text-gray-900 dark:text-gray-100',
            )}>
              {item.label}
            </span>
            {!item.completed && <Badge variant={badgeVariant}>{badgeLabel}</Badge>}
            {item.completed && <Badge variant="green">Done ✓</Badge>}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
            {item.detail}
          </p>
          {item.location && (
            <div className="flex items-center gap-1 mt-1">
              <HiOutlineMapPin className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400 dark:text-gray-500">{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}
