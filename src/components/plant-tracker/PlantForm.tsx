import { useState } from 'react'
import type { PlantEntry, GrowthStage } from '@/types'
import { GrowthStageBar } from './GrowthStageBar'
import { PhotoUpload } from './PhotoUpload'
import { Button } from '@/components/ui/Button'

type FormData = Omit<PlantEntry, 'id' | 'createdAt' | 'updatedAt'>

interface PlantFormProps {
  initial?: Partial<PlantEntry>
  onSave: (data: FormData) => void
  onCancel: () => void
}

export function PlantForm({ initial, onSave, onCancel }: PlantFormProps) {
  const [name, setName]                   = useState(initial?.name ?? '')
  const [variety, setVariety]             = useState(initial?.variety ?? '')
  const [location, setLocation]           = useState(initial?.location ?? '')
  const [plantedDate, setPlantedDate]     = useState(initial?.plantedDate ?? '')
  const [expectedHarvest, setExpected]    = useState(initial?.expectedHarvest ?? '')
  const [growthStage, setGrowthStage]     = useState<GrowthStage>(initial?.growthStage ?? 'seed')
  const [notes, setNotes]                 = useState(initial?.notes ?? '')
  const [photo, setPhoto]                 = useState(initial?.photoBase64)
  const [gridX, _setGridX]               = useState(initial?.gridX)
  const [gridY, _setGridY]               = useState(initial?.gridY)
  const [bedId, _setBedId]               = useState(initial?.bedId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    onSave({
      name: name.trim(),
      variety: variety.trim() || undefined,
      location: location.trim(),
      plantedDate,
      expectedHarvest,
      growthStage,
      notes,
      photoBase64: photo,
      lastWatered: initial?.lastWatered,
      gridX,
      gridY,
      bedId,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PhotoUpload value={photo} onChange={setPhoto} />

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Plant Name *</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Tomato, Basil..."
            required
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Variety</label>
          <input
            value={variety}
            onChange={e => setVariety(e.target.value)}
            placeholder="e.g. Genovese, Straight Eight..."
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Location</label>
          <input
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="e.g. Bed 1 – Row 1, Container Pot 2..."
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Planted</label>
            <input
              type="date"
              value={plantedDate}
              onChange={e => setPlantedDate(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Harvest Est.</label>
            <input
              type="date"
              value={expectedHarvest}
              onChange={e => setExpected(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2 block">
            Growth Stage
          </label>
          <GrowthStageBar stage={growthStage} onSelect={setGrowthStage} />
        </div>

        <div>
          <label className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">Notes</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Observations, tips from dad/stepmom..."
            rows={3}
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2.5 text-sm outline-none focus:border-garden-400 resize-none text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg" className="flex-1">
          {initial ? 'Save Changes' : 'Add Plant'}
        </Button>
        <Button type="button" variant="secondary" size="lg" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  )
}
