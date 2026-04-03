import type { GrowthStage } from '@/types'
import { cn } from '@/lib/utils'

const STAGES: { id: GrowthStage; label: string; emoji: string }[] = [
  { id: 'seed',       label: 'Seed',    emoji: '🌰' },
  { id: 'seedling',   label: 'Seedling', emoji: '🌱' },
  { id: 'vegetative', label: 'Growing', emoji: '🌿' },
  { id: 'flowering',  label: 'Flower',  emoji: '🌸' },
  { id: 'fruiting',   label: 'Fruit',   emoji: '🍅' },
  { id: 'mature',     label: 'Harvest', emoji: '✂️' },
]

interface GrowthStageBarProps {
  stage: GrowthStage
  onSelect?: (stage: GrowthStage) => void
}

export function GrowthStageBar({ stage, onSelect }: GrowthStageBarProps) {
  const activeIndex = STAGES.findIndex(s => s.id === stage)

  return (
    <div className="flex gap-1">
      {STAGES.map((s, i) => {
        const isActive = s.id === stage
        const isPast   = i < activeIndex
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect?.(s.id)}
            title={s.label}
            className={cn(
              'flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg transition-all text-xs',
              isActive
                ? 'bg-garden-500 text-white shadow-sm'
                : isPast
                ? 'bg-garden-100 dark:bg-garden-900/30 text-garden-700 dark:text-garden-400'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500',
              onSelect && 'cursor-pointer hover:opacity-80',
            )}
          >
            <span className="text-base leading-none">{s.emoji}</span>
            <span className="hidden sm:block font-medium">{s.label}</span>
          </button>
        )
      })}
    </div>
  )
}
