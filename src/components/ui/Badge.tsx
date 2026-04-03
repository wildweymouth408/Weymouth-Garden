import { cn } from '@/lib/utils'

type BadgeVariant = 'green' | 'yellow' | 'gray' | 'brown' | 'blue' | 'red'

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  green:  'bg-garden-100 text-garden-800 dark:bg-garden-900 dark:text-garden-200',
  yellow: 'bg-earth-100 text-earth-500 dark:bg-yellow-900/30 dark:text-yellow-300',
  gray:   'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  brown:  'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  blue:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  red:    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
}

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'gray', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', VARIANT_CLASSES[variant], className)}>
      {children}
    </span>
  )
}
