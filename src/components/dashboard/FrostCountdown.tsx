import { getDaysUntilFrostFree, isFrostFree, LAST_FROST_DATE } from '@/lib/dates'
import { Card } from '@/components/ui/Card'

export function FrostCountdown({ visible }: { visible: boolean }) {
  if (!visible) return null
  const days = getDaysUntilFrostFree()
  const free = isFrostFree()

  return (
    <Card className={free
      ? 'bg-garden-50 dark:bg-garden-900/20 border-garden-200 dark:border-garden-800'
      : 'bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800'
    }>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl text-xl ${free ? 'bg-garden-100 dark:bg-garden-800' : 'bg-sky-100 dark:bg-sky-800'}`}>
          {free ? '🌞' : '❄️'}
        </div>
        <div>
          {free ? (
            <>
              <p className="text-base font-bold text-garden-700 dark:text-garden-300">
                Frost-free season! 🎉
              </p>
              <p className="text-xs text-garden-600 dark:text-garden-400">
                Last frost date {LAST_FROST_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} has passed
              </p>
            </>
          ) : (
            <>
              <p className="text-base font-bold text-sky-700 dark:text-sky-300">
                {days} day{days !== 1 ? 's' : ''} until frost-free
              </p>
              <p className="text-xs text-sky-500 dark:text-sky-400">
                Last frost: {LAST_FROST_DATE.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · Hold warm-season plants
              </p>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}
