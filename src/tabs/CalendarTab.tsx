import { useState, useEffect } from 'react'
import type { ChecklistItem } from '@/types'
import { DEFAULT_CHECKLIST } from '@/lib/checklist-data'
import { getChecklist, saveChecklist } from '@/lib/storage'
import { ChecklistSection } from '@/components/calendar/ChecklistSection'
import { Button } from '@/components/ui/Button'
import { HiOutlinePrinter, HiOutlineArrowPath } from 'react-icons/hi2'

function mergeChecklist(saved: ChecklistItem[]): ChecklistItem[] {
  const savedMap = new Map(saved.map(i => [i.id, i]))
  return DEFAULT_CHECKLIST.map(item => ({
    ...item,
    completed: savedMap.get(item.id)?.completed ?? item.completed,
  }))
}

export function CalendarTab() {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    const saved = getChecklist()
    return saved.length > 0 ? mergeChecklist(saved) : DEFAULT_CHECKLIST
  })

  useEffect(() => {
    saveChecklist(items)
  }, [items])

  const toggle = (id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const resetAll = () => {
    if (!confirm('Reset all checklist items to incomplete?')) return
    setItems(DEFAULT_CHECKLIST.map(i => ({ ...i, completed: false })))
  }

  const thisWeek   = items.filter(i => i.timing === 'this-week')
  const april15    = items.filter(i => i.timing === 'april-15-plus')
  const buyItems   = items.filter(i => i.timing === 'buy')
  const doneCount  = items.filter(i => i.completed).length

  return (
    <div className="space-y-5">
      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
          <span className="text-sm font-bold text-garden-600 dark:text-garden-400">
            {doneCount} / {items.length} complete
          </span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-garden-500 rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / items.length) * 100}%` }}
          />
        </div>
      </div>

      <ChecklistSection
        title="🌱 This Week (Do Now)"
        items={thisWeek}
        onToggle={toggle}
        badgeVariant="green"
        badgeLabel="This Week"
      />

      <ChecklistSection
        title="🌞 After April 15"
        items={april15}
        onToggle={toggle}
        badgeVariant="yellow"
        badgeLabel="April 15+"
      />

      <ChecklistSection
        title="🛒 Need to Buy"
        items={buyItems}
        onToggle={toggle}
        badgeVariant="brown"
        badgeLabel="Buy"
      />

      <div className="flex gap-3 no-print">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.print()}
          className="flex-1"
        >
          <HiOutlinePrinter className="w-4 h-4" /> Print Calendar
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="flex-1"
        >
          <HiOutlineArrowPath className="w-4 h-4" /> Reset All
        </Button>
      </div>
    </div>
  )
}
