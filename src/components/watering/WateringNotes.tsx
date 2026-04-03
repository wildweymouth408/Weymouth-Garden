import { useStorage } from '@/hooks/useStorage'
import { Card } from '@/components/ui/Card'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'

export function WateringNotes() {
  const [notes, setNotes] = useStorage('wg-watering-notes', '')

  return (
    <Card>
      <div className="flex items-center gap-2 mb-3">
        <HiOutlineClipboardDocumentList className="w-5 h-5 text-garden-600 dark:text-garden-400" />
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Manual Notes
        </h3>
      </div>
      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notes about your watering setup, adjustments, observations..."
        className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-xl p-3 outline-none focus:border-garden-400 resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400"
        rows={4}
      />
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        Tip: Set schedules manually in your Orbit B-Hyve app on your phone.
      </p>
    </Card>
  )
}
