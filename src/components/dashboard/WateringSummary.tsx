import type { WateringZone } from '@/types'
import { formatTime } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { HiOutlineBeaker } from 'react-icons/hi2'

interface WateringSummaryProps {
  zones: WateringZone[]
}

export function WateringSummary({ zones }: WateringSummaryProps) {
  const next = [...zones].sort((a, b) => a.startTime.localeCompare(b.startTime))[0]

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <HiOutlineBeaker className="w-5 h-5 text-blue-500" />
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Today's Watering
        </h3>
      </div>
      <div className="space-y-2">
        {zones.map((zone) => (
          <div key={zone.id} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-gray-700 last:border-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{zone.name}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {formatTime(zone.startTime)}
              </span>
              <span className="text-xs text-gray-400 ml-1">({zone.durationMin}min)</span>
            </div>
          </div>
        ))}
      </div>
      {next && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Next: {next.name} at {formatTime(next.startTime)}
        </p>
      )}
    </Card>
  )
}
