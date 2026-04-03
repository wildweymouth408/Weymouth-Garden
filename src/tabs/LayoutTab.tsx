import { BedDiagram } from '@/components/layout-diagram/BedDiagram'
import { ContainerGrid } from '@/components/layout-diagram/ContainerGrid'
import { HangingPotsGrid } from '@/components/layout-diagram/HangingPotsGrid'
import { GazeboArea } from '@/components/layout-diagram/GazeboArea'
import { Card } from '@/components/ui/Card'

export function LayoutTab() {
  return (
    <div className="space-y-5">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Visual layout of your Weymouth Garden — Gilroy, CA
      </p>

      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Bed 1 (Left) — 21&quot; × 8&apos; × 10&quot; soil
        </h2>
        <BedDiagram
          rows={[
            { label: 'Row 1', plant: 'Beets', variety: 'Detroit Dark Red & Ruby Queen', color: '#dc2626', timing: 'Sow now' },
            { label: 'Row 2', plant: 'Arugula', variety: 'Rocket — succession every 2 wks', color: '#16a34a', timing: 'Sow now' },
            { label: 'Row 3', plant: 'Cilantro', variety: 'Direct sow', color: '#15803d', timing: 'Sow now' },
            { label: 'Row 4', plant: 'Carrots', variety: 'Thin to 2–3" apart', color: '#ea580c', timing: 'Sow now' },
          ]}
        />
      </Card>

      <Card>
        <h2 className="text-base font-semibold text-garden-800 dark:text-garden-300 mb-3">
          Bed 2 (Right) — 21&quot; × 8&apos; × 10&quot; soil
        </h2>
        <BedDiagram
          rows={[
            { label: 'Row 1', plant: 'Beans', variety: 'Stringless — direct sow', color: '#65a30d', timing: 'April 15+' },
            { label: 'Row 2', plant: 'Cucumber', variety: 'Straight Eight', color: '#16a34a', timing: 'April 15+' },
            { label: 'Row 3', plant: 'Summer Squash', variety: 'Butterstick Hybrid', color: '#ca8a04', timing: 'April 15+' },
          ]}
        />
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
