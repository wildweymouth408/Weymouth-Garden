import { useState, useMemo } from 'react'
import type { PlantEntry } from '@/types'
import { areGoodNeighbors, areBadNeighbors, getRecommendedSpacing } from '@/lib/companion-data'
import { PlantForm } from '@/components/plant-tracker/PlantForm'
import { Modal } from '@/components/ui/Modal'

interface InteractiveBedDiagramProps {
  bedId: number
  widthInches: number
  lengthInches: number
  spacingInches?: number
  plants: PlantEntry[]
  onPlantAdd: (plant: Omit<PlantEntry, 'id' | 'createdAt' | 'updatedAt'>) => void
  onPlantUpdate?: (plantId: string, updates: Partial<PlantEntry>) => void
}

interface GridCell {
  x: number // column index (0-index)
  y: number // row index (0-index)
  cx: number // center x in SVG pixels
  cy: number // center y in SVG pixels
  planted?: PlantEntry
  warning?: 'good' | 'bad' | 'neutral'
  spacingWarning?: boolean
}

// Convert inches to SVG pixels
const INCH_TO_PIXEL = 3.5 // scaling factor for visualization

export function InteractiveBedDiagram({
  bedId,
  widthInches = 21,
  lengthInches = 96,
  spacingInches = 10,
  plants,
  onPlantAdd,
  onPlantUpdate,
}: InteractiveBedDiagramProps) {
  const [selectedCell, setSelectedCell] = useState<GridCell | null>(null)
  const [editingPlant, setEditingPlant] = useState<PlantEntry | null>(null)
  const [showPlantForm, setShowPlantForm] = useState(false)

  // SVG dimensions
  const svgWidth = Math.round(widthInches * INCH_TO_PIXEL)
  const svgHeight = Math.round(lengthInches * INCH_TO_PIXEL)

  // Filter plants that belong to this bed and have grid coordinates
  const bedPlants = useMemo(() => {
    return plants.filter(p => p.bedId === bedId && p.gridX !== undefined && p.gridY !== undefined)
  }, [plants, bedId])

  // Compute grid dimensions
  const cols = Math.floor(widthInches / spacingInches)
  const rows = Math.floor(lengthInches / spacingInches)

  // Generate grid cells with planted info
  const gridCells = useMemo<GridCell[]>(() => {
    const cells: GridCell[] = []
    const paddingX = (widthInches - cols * spacingInches) / 2
    const paddingY = (lengthInches - rows * spacingInches) / 2

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        // Convert inches to SVG pixels
        const cx = Math.round((paddingX + x * spacingInches + spacingInches / 2) * INCH_TO_PIXEL)
        const cy = Math.round((paddingY + y * spacingInches + spacingInches / 2) * INCH_TO_PIXEL)

        // Find plant at this grid coordinate
        const planted = bedPlants.find(p => p.gridX === x && p.gridY === y)

        cells.push({ x, y, cx, cy, planted, warning: 'neutral' })
      }
    }
    return cells
  }, [cols, rows, spacingInches, widthInches, lengthInches, bedPlants])

  // Calculate neighbor warnings
  const cellsWithWarnings = useMemo(() => {
    const cells = [...gridCells]
    // For each planted cell, check adjacent cells (8 directions)
    cells.forEach(cell => {
      if (!cell.planted) return
      const { x, y } = cell
      const adjacent = [
        cells.find(c => c.x === x - 1 && c.y === y),   // left
        cells.find(c => c.x === x + 1 && c.y === y),   // right
        cells.find(c => c.x === x && c.y === y - 1),   // up
        cells.find(c => c.x === x && c.y === y + 1),   // down
        cells.find(c => c.x === x - 1 && c.y === y - 1), // top-left
        cells.find(c => c.x === x + 1 && c.y === y - 1), // top-right
        cells.find(c => c.x === x - 1 && c.y === y + 1), // bottom-left
        cells.find(c => c.x === x + 1 && c.y === y + 1), // bottom-right
      ].filter(Boolean) as GridCell[]

      let hasBad = false
      let hasGood = false
      adjacent.forEach(adj => {
        if (!adj.planted) return
        if (areBadNeighbors(cell.planted!.name, adj.planted!.name)) {
          hasBad = true
        } else if (areGoodNeighbors(cell.planted!.name, adj.planted!.name)) {
          hasGood = true
        }
      })

      if (hasBad) cell.warning = 'bad'
      else if (hasGood) cell.warning = 'good'
      else cell.warning = 'neutral'

      // Check if plant spacing requirements exceed grid spacing
      const recommended = getRecommendedSpacing(cell.planted!.name)
      cell.spacingWarning = recommended > spacingInches
    })
    return cells
  }, [gridCells, spacingInches])

  const handleCellClick = (cell: GridCell) => {
    setSelectedCell(cell)
    if (cell.planted) {
      setEditingPlant(cell.planted)
    } else {
      setEditingPlant(null)
    }
    setShowPlantForm(true)
  }

  const handlePlantSave = (data: Omit<PlantEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingPlant && onPlantUpdate) {
      // Update existing plant (preserve grid coordinates unless changed)
      onPlantUpdate(editingPlant.id, { ...data, bedId, gridX: selectedCell?.x, gridY: selectedCell?.y })
    } else {
      // Add new plant with grid coordinates
      const plantWithGrid = {
        ...data,
        bedId,
        gridX: selectedCell?.x,
        gridY: selectedCell?.y,
      }
      onPlantAdd(plantWithGrid)
    }
    setShowPlantForm(false)
    setSelectedCell(null)
    setEditingPlant(null)
  }

  const handlePlantCancel = () => {
    setShowPlantForm(false)
    setSelectedCell(null)
    setEditingPlant(null)
  }

  // Determine cell fill color based on state
  const getCellFill = (cell: GridCell) => {
    if (cell.planted) {
      if (cell.warning === 'bad') return '#ef4444' // red
      if (cell.warning === 'good') return '#22c55e' // green
      return '#16a34a' // default green
    }
    return 'white'
  }

  const getCellStroke = (cell: GridCell) => {
    if (cell.warning === 'bad') return '#dc2626'
    if (cell.warning === 'good') return '#15803d'
    if (cell.planted && cell.spacingWarning) return '#f59e0b' // amber for spacing warning
    if (cell.planted) return '#15803d'
    return '#9ca3af'
  }

  const getCellStrokeDasharray = (cell: GridCell) => {
    if (cell.planted && cell.spacingWarning) return '4,2'
    return undefined
  }

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="w-full border border-gray-200 rounded-lg"
        role="img"
        aria-label={`Interactive bed ${bedId} layout`}
      >
        {/* Bed outline */}
        <rect x="2" y="2" width={svgWidth - 4} height={svgHeight - 4} rx="8"
          fill="#f0fdf4" stroke="#15803d" strokeWidth="2" />

        {/* Soil texture */}
        <rect x="6" y="6" width={svgWidth - 12} height={svgHeight - 12} rx="4"
          fill="#fef3c7" opacity="0.4" />

        {/* Grid cells */}
        {cellsWithWarnings.map(cell => (
          <circle
            key={`${cell.x}-${cell.y}`}
            cx={cell.cx}
            cy={cell.cy}
            r={spacingInches * INCH_TO_PIXEL * 0.25} // radius proportional
            fill={getCellFill(cell)}
            stroke={getCellStroke(cell)}
            strokeDasharray={getCellStrokeDasharray(cell)}
            strokeWidth={cell.planted ? "2" : "1.5"}
            className="cursor-pointer hover:stroke-garden-500 hover:stroke-2 transition-all"
            onClick={() => handleCellClick(cell)}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-white border border-gray-400"></div>
          <span>Empty cell</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-600 border border-green-800"></div>
          <span>Planted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
          <span>Bad neighbor</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-700"></div>
          <span>Good neighbor</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border border-amber-500 border-dashed bg-amber-100"></div>
          <span>Spacing warning</span>
        </div>
        <div className="text-xs text-gray-400">
          {cols}×{rows} grid • {spacingInches}" spacing
        </div>
      </div>

      {/* Plant Form Modal */}
      {showPlantForm && selectedCell && (
        <Modal open={showPlantForm} onClose={handlePlantCancel} title={editingPlant ? `Edit ${editingPlant.name}` : `Add Plant to Bed ${bedId}`}>
          <PlantForm
            initial={editingPlant ? {
              ...editingPlant,
              // Ensure location string includes grid coordinates
              location: editingPlant.location,
            } : {
              name: '',
              variety: '',
              location: `Bed ${bedId}, Cell (${selectedCell.x},${selectedCell.y})`,
              plantedDate: new Date().toISOString().split('T')[0],
              expectedHarvest: '',
              growthStage: 'seed',
              notes: '',
              gridX: selectedCell.x,
              gridY: selectedCell.y,
              bedId,
            }}
            onSave={handlePlantSave}
            onCancel={handlePlantCancel}
          />
        </Modal>
      )}
    </div>
  )
}