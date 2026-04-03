import { useState, useEffect } from 'react'
import type { WateringZone } from '@/types'
import { DEFAULT_ZONES } from '@/lib/zones-data'
import { getZones, saveZones } from '@/lib/storage'
import { ZoneCard } from '@/components/watering/ZoneCard'
import { WateringNotes } from '@/components/watering/WateringNotes'
import { Card } from '@/components/ui/Card'
import { HiOutlineInformationCircle } from 'react-icons/hi2'

function initZones(): WateringZone[] {
  const saved = getZones()
  if (saved.length === 0) return DEFAULT_ZONES
  // Merge saved names/notes into defaults
  const savedMap = new Map(saved.map(z => [z.id, z]))
  return DEFAULT_ZONES.map(def => ({
    ...def,
    name: savedMap.get(def.id)?.name ?? def.name,
    notes: savedMap.get(def.id)?.notes ?? def.notes,
  }))
}

export function WateringTab() {
  const [zones, setZones] = useState<WateringZone[]>(initZones)

  useEffect(() => {
    saveZones(zones)
  }, [zones])

  const updateZone = (id: string, patch: Partial<WateringZone>) => {
    setZones(prev => prev.map(z => z.id === id ? { ...z, ...patch } : z))
  }

  return (
    <div className="space-y-4">
      {/* Info banner */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
        <div className="flex gap-2">
          <HiOutlineInformationCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Orbit B-Hyve 4-Outlet Timer
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
              Set these schedules manually in your B-Hyve app. Each outlet has its own pressure gauge.
            </p>
          </div>
        </div>
      </Card>

      {zones.map((zone, i) => (
        <ZoneCard
          key={zone.id}
          zone={zone}
          index={i}
          onUpdate={(patch) => updateZone(zone.id, patch)}
        />
      ))}

      <WateringNotes />
    </div>
  )
}
