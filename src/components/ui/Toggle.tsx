import { cn } from '@/lib/utils'

interface ToggleProps {
  checked: boolean
  onChange: (val: boolean) => void
  label?: string
  description?: string
}

export function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-4 cursor-pointer">
      {(label || description) && (
        <div>
          {label && <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{label}</p>}
          {description && <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 rounded-full border-2 border-transparent transition-colors',
          checked ? 'bg-garden-600' : 'bg-gray-200 dark:bg-gray-600',
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform',
            checked ? 'translate-x-5' : 'translate-x-0',
          )}
        />
      </button>
    </label>
  )
}
