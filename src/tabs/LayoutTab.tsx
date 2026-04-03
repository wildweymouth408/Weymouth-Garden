import { useState } from 'react'
import { useStorage } from '@/hooks/useStorage'
import type { PlantEntry, BedSettings } from '@/types'
import { generateId } from '@/lib/utils'
import { DEFAULT_BED_SETTINGS } from '@/lib/storage'
import { InteractiveBedDiagram } from '@/components/layout-diagram/InteractiveBedDiagram'
import { SeasonalGuide } from '@/components/layout-diagram/SeasonalGuide'
import { ContainerGrid } from '@/components/layout-diagram/ContainerGrid'
import { HangingPotsGrid } from '@/components/layout-diagram/HangingPotsGrid'
import { GazeboArea } from '@/components/layout-diagram/GazeboArea'
import { Card } from '@/components/ui/Card'
import { Toggle } from '@/components/ui/Toggle'

const SPACING_OPTIONS = [3, 4, 6, 8, 10, 12, 18, 24]

export function LayoutTab() {
  const [plants, setPlants] = useStorage<PlantEntry[]>('wg-plants', [])
  const [bedSettings, setBedSettings] = useStorage<BedSettings>('wg-bed-settings', DEFAULT_BED_SETTINGS)
  const [useInteractive, setUseInteractive] = useState(true)

  const handleAddPlant = (plantData: Omit<PlantEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newPlant: PlantEntry = {
      ...plantData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    }
    setPlants(prev => [...prev, newPlant])
  }

  const handleUpdatePlant = (plantId: string, updates: Partial<PlantEntry>) => {
    setPlants(prev => prev.map(p =>
      p.id === plantId ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
    ))
  }

  const updateBedSpacing = (bedId: number, spacing: number) => {
    setBedSettings(prev => ({
      ...prev,
      [`bed${bedId}Spacing`]: spacing,
    }))
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Visual layout of your Weymouth Garden — Gilroy, CA
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Interactive grid</span>
          <Toggle checked={useInteractive} onChange={setUseInteractive} />
        </div>
      </div>

      {useInteractive ? (
        <>
          <Card>
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300">
                Bed 1 (Left) — 21&quot; × 8&apos; × 10&quot; soil
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Grid spacing:</label>
                <select
                  value={bedSettings.bed1Spacing}
                  onChange={e => updateBedSpacing(1, parseInt(e.target.value, 10))}
                  className="text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800"
                >
                  {SPACING_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}&quot;</option>
                  ))}
                </select>
              </div>
            </div>
            <InteractiveBedDiagram
              bedId={1}
              widthInches={21}
              lengthInches={96}
              spacingInches={bedSettings.bed1Spacing}
              plants={plants}
              onPlantAdd={handleAddPlant}
              onPlantUpdate={handleUpdatePlant}
            />
          </Card>

          <Card>
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300">
                Bed 2 (Right) — 21&quot; × 8&apos; × 10&quot; soil
              </h2>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500">Grid spacing:</label>
                <select
                  value={bedSettings.bed2Spacing}
                  onChange={e => updateBedSpacing(2, parseInt(e.target.value, 10))}
                  className="text-xs border border-gray-300 dark:border-gray-600 rounded-md px-2 py-1 bg-white dark:bg-gray-800"
                >
                  {SPACING_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}&quot;</option>
                  ))}
                </select>
              </div>
            </div>
            <InteractiveBedDiagram
              bedId={2}
              widthInches={21}
              lengthInches={96}
              spacingInches={bedSettings.bed2Spacing}
              plants={plants}
              onPlantAdd={handleAddPlant}
              onPlantUpdate={handleUpdatePlant}
            />
          </Card>
        </>
      ) : (
        <>
          {/* Original static layout (keep as fallback) */}
          <Card>
            <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
              Bed 1 (Left) — 21&quot; × 8&apos; × 10&quot; soil
            </h2>
            <div className="text-sm text-gray-500 italic p-4 text-center">
              Static view disabled — toggle interactive grid on
            </div>
          </Card>
          <Card>
            <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
              Bed 2 (Right) — 21&quot; × 8&apos; × 10&quot; soil
            </h2>
            <div className="text-sm text-gray-500 italic p-4 text-center">
              Static view disabled — toggle interactive grid on
            </div>
          </Card>
        </>
      )}

      {/* Seasonal planting guide */}
      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Seasonal Planting Guide
        </h2>
        <SeasonalGuide />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Container Pots (4 pots along fence)
        </h2>
        <ContainerGrid />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Hanging Pots (4 pots around gazebo)
        </h2>
        <HangingPotsGrid />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Gazebo Area
        </h2>
        <GazeboArea />
      </Card>

      <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
        Drip irrigation: 4 separate ½&quot; lines · Orbit B-Hyve 4-outlet timer
      </p>
    </div>
  )
}