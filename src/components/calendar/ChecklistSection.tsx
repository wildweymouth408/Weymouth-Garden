import type { ChecklistItem } from '@/types'
import { ChecklistItemRow } from './ChecklistItemRow'

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'brown' | 'blue' | 'red'

interface ChecklistSectionProps {
  title: string
  items: ChecklistItem[]
  onToggle: (id: string) => void
  badgeVariant: BadgeVariant
  badgeLabel: string
}

export function ChecklistSection({ title, items, onToggle, badgeVariant, badgeLabel }: ChecklistSectionProps) {
  if (items.length === 0) return null
  const doneCount = items.filter(i => i.completed).length

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
        <span className="text-xs text-gray-400">{doneCount}/{items.length}</span>
      </div>
      <div className="space-y-2">
        {items.map(item => (
          <ChecklistItemRow
            key={item.id}
            item={item}
            onToggle={onToggle}
            badgeVariant={badgeVariant}
            badgeLabel={badgeLabel}
          />
        ))}
      </div>
    </div>
  )
}
