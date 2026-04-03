import type { PlantEntry } from '@/types'
import { formatDate } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GrowthStageBar } from './GrowthStageBar'
import {
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineBeaker,
  HiOutlineMapPin,
  HiOutlineCalendar,
} from 'react-icons/hi2'

const STAGE_BADGE: Record<string, 'green' | 'yellow' | 'gray' | 'brown' | 'blue' | 'red'> = {
  seed:       'gray',
  seedling:   'green',
  vegetative: 'green',
  flowering:  'yellow',
  fruiting:   'blue',
  mature:     'green',
}

interface PlantCardProps {
  plant: PlantEntry
  onEdit: () => void
  onDelete: () => void
  onWatered: () => void
}

export function PlantCard({ plant, onEdit, onDelete, onWatered }: PlantCardProps) {
  const daysSinceWatered = plant.lastWatered
    ? Math.floor((Date.now() - new Date(plant.lastWatered).getTime()) / 86400000)
    : null

  return (
    <Card>
      <div className="flex items-start gap-3">
        {plant.photoBase64 ? (
          <img
            src={plant.photoBase64}
            alt={plant.name}
            className="w-16 h-16 object-cover rounded-xl shrink-0 border border-gray-100"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-garden-50 dark:bg-garden-900/20 flex items-center justify-center text-2xl shrink-0">
            🌱
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {plant.name}
                {plant.variety && (
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-1">
                    · {plant.variety}
                  </span>
                )}
              </h3>
              {plant.location && (
                <div className="flex items-center gap-1 mt-0.5">
                  <HiOutlineMapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{plant.location}</span>
                </div>
              )}
            </div>
            <Badge variant={STAGE_BADGE[plant.growthStage] ?? 'gray'}>
              {plant.growthStage}
            </Badge>
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            {plant.plantedDate && (
              <div className="flex items-center gap-1">
                <HiOutlineCalendar className="w-3 h-3" />
                <span>Planted {formatDate(plant.plantedDate)}</span>
              </div>
            )}
            {plant.expectedHarvest && (
              <div className="flex items-center gap-1">
                <span>🌾 {formatDate(plant.expectedHarvest)}</span>
              </div>
            )}
          </div>

          {daysSinceWatered !== null && (
            <p className={`text-xs mt-1 ${daysSinceWatered > 2 ? 'text-orange-500' : 'text-blue-400'}`}>
              💧 {daysSinceWatered === 0 ? 'Watered today' : `Watered ${daysSinceWatered}d ago`}
            </p>
          )}
        </div>
      </div>

      {plant.notes && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-2 leading-relaxed">
          {plant.notes}
        </p>
      )}

      <div className="mt-3">
        <GrowthStageBar stage={plant.growthStage} />
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mt-3 border-t border-gray-100 dark:border-gray-700 pt-3">
        <button
          onClick={onWatered}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg py-2 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
        >
          <HiOutlineBeaker className="w-4 h-4" /> Watered
        </button>
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 text-xs font-medium text-garden-600 dark:text-garden-400 bg-garden-50 dark:bg-garden-900/20 rounded-lg py-2 hover:bg-garden-100 dark:hover:bg-garden-900/40 transition-colors"
        >
          <HiOutlinePencil className="w-4 h-4" /> Edit
        </button>
        <button
          onClick={onDelete}
          className="flex items-center justify-center text-xs font-medium text-red-400 bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
        >
          <HiOutlineTrash className="w-4 h-4" />
        </button>
      </div>
    </Card>
  )
}
