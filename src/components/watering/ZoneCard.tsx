import { useState } from 'react'
import type { WateringZone } from '@/types'
import { formatTime } from '@/lib/utils'
import { Card } from '@/components/ui/Card'
import { HiOutlinePencil, HiOutlineCheck, HiOutlineBeaker } from 'react-icons/hi2'

const ZONE_COLORS = [
  'border-l-garden-500',
  'border-l-blue-500',
  'border-l-orange-500',
  'border-l-purple-500',
]

interface ZoneCardProps {
  zone: WateringZone
  index: number
  onUpdate: (patch: Partial<WateringZone>) => void
}

export function ZoneCard({ zone, index, onUpdate }: ZoneCardProps) {
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(zone.name)
  const [editingNotes, setEditingNotes] = useState(false)
  const [notesInput, setNotesInput] = useState(zone.notes)

  const saveName = () => {
    onUpdate({ name: nameInput.trim() || zone.name })
    setEditingName(false)
  }

  const saveNotes = () => {
    onUpdate({ notes: notesInput })
    setEditingNotes(false)
  }

  return (
    <Card className={`border-l-4 ${ZONE_COLORS[index] ?? 'border-l-gray-300'}`}>
      {/* Zone header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {editingName ? (
            <div className="flex items-center gap-2">
              <input
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                className="text-base font-semibold bg-transparent border-b-2 border-garden-400 outline-none text-gray-900 dark:text-gray-100 w-full"
                autoFocus
              />
              <button onClick={saveName} className="text-garden-600 dark:text-garden-400">
                <HiOutlineCheck className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                {zone.name}
              </h3>
              <button
                onClick={() => { setNameInput(zone.name); setEditingName(true) }}
                className="text-gray-400 hover:text-garden-500 transition-colors"
              >
                <HiOutlinePencil className="w-4 h-4" />
              </button>
            </div>
          )}
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Outlet {zone.outlet} · Pressure Gauge {zone.gauge}
          </p>
        </div>
        <div className="flex items-center gap-1 text-blue-500 dark:text-blue-400">
          <HiOutlineBeaker className="w-5 h-5" />
        </div>
      </div>

      {/* Schedule grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-garden-50 dark:bg-garden-900/20 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
          <p className="text-lg font-bold text-garden-700 dark:text-garden-300">{zone.durationMin}</p>
          <p className="text-xs text-gray-400">min</p>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Start</p>
          <p className="text-base font-bold text-blue-700 dark:text-blue-300">{formatTime(zone.startTime)}</p>
          <p className="text-xs text-gray-400">{zone.frequency}</p>
        </div>
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">Flow</p>
          <p className="text-base font-bold text-amber-700 dark:text-amber-300">{zone.flowRate}</p>
          <p className="text-xs text-gray-400">drip</p>
        </div>
      </div>

      {/* Notes */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
        {editingNotes ? (
          <div className="space-y-2">
            <textarea
              value={notesInput}
              onChange={e => setNotesInput(e.target.value)}
              placeholder="Add notes about this zone..."
              className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-2 outline-none focus:border-garden-400 resize-none text-gray-900 dark:text-gray-100"
              rows={2}
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={saveNotes}
                className="text-xs text-garden-600 dark:text-garden-400 font-medium">Save</button>
              <button onClick={() => { setNotesInput(zone.notes); setEditingNotes(false) }}
                className="text-xs text-gray-400">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => { setNotesInput(zone.notes); setEditingNotes(true) }}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-garden-500 dark:hover:text-garden-400 transition-colors text-left w-full"
          >
            {zone.notes || '+ Add notes for this zone...'}
          </button>
        )}
      </div>
    </Card>
  )
}
