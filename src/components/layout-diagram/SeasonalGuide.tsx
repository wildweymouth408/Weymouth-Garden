import { COMPANION_PLANTS } from '@/lib/companion-data'

interface SeasonalGuideProps {
  month?: number // 1-12, default current month
}

export function SeasonalGuide({ month = new Date().getMonth() + 1 }: SeasonalGuideProps) {
  // Gilroy climate: mild winters, hot dry summers
  const seasonMap: Record<number, string> = {
    1: 'winter', 2: 'winter', 3: 'spring',
    4: 'spring', 5: 'spring', 6: 'summer',
    7: 'summer', 8: 'summer', 9: 'fall',
    10: 'fall', 11: 'fall', 12: 'winter',
  }
  const currentSeason = seasonMap[month]

  // Filter plants that can be planted this season
  const suitablePlants = COMPANION_PLANTS.filter(p =>
    p.season.includes(currentSeason as any)
  )

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
          🌱 Planting now ({currentSeason} season)
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Based on Gilroy, CA climate. Click a plant to see companion tips.
        </p>
      </div>

      {suitablePlants.length === 0 ? (
        <p className="text-xs text-gray-400 italic">No planting recommendations for this season.</p>
      ) : (
        <div className="space-y-3">
          {suitablePlants.map(plant => (
            <div
              key={plant.name}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                    {plant.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {plant.notes}
                  </p>
                </div>
                <span className="text-xs bg-garden-100 dark:bg-garden-900 text-garden-800 dark:text-garden-200 px-2 py-1 rounded-full">
                  {plant.spacingInches}" spacing
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Good neighbors
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {plant.goodNeighbors.map(n => (
                      <span
                        key={n}
                        className="inline-block text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-0.5 rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Avoid planting with
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {plant.badNeighbors.map(n => (
                      <span
                        key={n}
                        className="inline-block text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-0.5 rounded-full"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}