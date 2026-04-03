import { useState } from 'react'
import type { PlantEntry } from '@/types'
import { useStorage } from '@/hooks/useStorage'
import { generateId } from '@/lib/utils'
import { PlantCard } from '@/components/plant-tracker/PlantCard'
import { PlantForm } from '@/components/plant-tracker/PlantForm'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { HiOutlinePlus, HiOutlineSparkles } from 'react-icons/hi2'

export function PlantTrackerTab() {
  const [plants, setPlants] = useStorage<PlantEntry[]>('wg-plants', [])
  const [showForm, setShowForm] = useState(false)
  const [editingPlant, setEditingPlant] = useState<PlantEntry | null>(null)

  const handleSave = (data: Omit<PlantEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    if (editingPlant) {
      setPlants(prev => prev.map(p =>
        p.id === editingPlant.id ? { ...editingPlant, ...data, updatedAt: now } : p
      ))
    } else {
      const newPlant: PlantEntry = {
        ...data,
        id: generateId(),
        createdAt: now,
        updatedAt: now,
      }
      setPlants(prev => [...prev, newPlant])
    }
    setShowForm(false)
    setEditingPlant(null)
  }

  const handleEdit = (plant: PlantEntry) => {
    setEditingPlant(plant)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (!confirm('Remove this plant?')) return
    setPlants(prev => prev.filter(p => p.id !== id))
  }

  const handleWatered = (id: string) => {
    setPlants(prev => prev.map(p =>
      p.id === id ? { ...p, lastWatered: new Date().toISOString(), updatedAt: new Date().toISOString() } : p
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {plants.length} plant{plants.length !== 1 ? 's' : ''} tracked
        </p>
        <Button onClick={() => { setEditingPlant(null); setShowForm(true) }} size="md">
          <HiOutlinePlus className="w-5 h-5" /> Add Plant
        </Button>
      </div>

      {plants.length === 0 ? (
        <div className="text-center py-16 text-gray-400 dark:text-gray-500">
          <HiOutlineSparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-base font-medium">No plants yet</p>
          <p className="text-sm">Tap "Add Plant" to start tracking your garden</p>
        </div>
      ) : (
        <div className="space-y-3">
          {plants.map(plant => (
            <PlantCard
              key={plant.id}
              plant={plant}
              onEdit={() => handleEdit(plant)}
              onDelete={() => handleDelete(plant.id)}
              onWatered={() => handleWatered(plant.id)}
            />
          ))}
        </div>
      )}

      <Modal
        open={showForm}
        onClose={() => { setShowForm(false); setEditingPlant(null) }}
        title={editingPlant ? 'Edit Plant' : 'Add Plant'}
      >
        <PlantForm
          initial={editingPlant ?? undefined}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditingPlant(null) }}
        />
      </Modal>
    </div>
  )
}
