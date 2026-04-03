// Companion planting data for common vegetables
// Based on traditional gardening knowledge

export interface CompanionPlant {
  name: string
  goodNeighbors: string[]
  badNeighbors: string[]
  family?: string
  spacingInches: number
  season: ('spring' | 'summer' | 'fall' | 'winter')[]
  notes?: string
}

export const COMPANION_PLANTS: CompanionPlant[] = [
  {
    name: 'Tomato',
    goodNeighbors: ['Basil', 'Carrot', 'Onion', 'Garlic', 'Lettuce', 'Marigold'],
    badNeighbors: ['Cabbage', 'Corn', 'Potato', 'Fennel'],
    family: 'Solanaceae',
    spacingInches: 24,
    season: ['spring', 'summer'],
    notes: 'Basil improves flavor and repels pests.'
  },
  {
    name: 'Basil',
    goodNeighbors: ['Tomato', 'Pepper', 'Asparagus', 'Marigold'],
    badNeighbors: ['Rue', 'Sage'],
    family: 'Lamiaceae',
    spacingInches: 12,
    season: ['spring', 'summer'],
    notes: 'Repels flies and mosquitoes.'
  },
  {
    name: 'Carrot',
    goodNeighbors: ['Tomato', 'Lettuce', 'Onion', 'Peas', 'Rosemary'],
    badNeighbors: ['Dill', 'Parsnip'],
    family: 'Apiaceae',
    spacingInches: 3,
    season: ['spring', 'fall'],
    notes: 'Onions help repel carrot fly.'
  },
  {
    name: 'Lettuce',
    goodNeighbors: ['Carrot', 'Radish', 'Strawberry', 'Cucumber'],
    badNeighbors: ['Cabbage', 'Parsley'],
    family: 'Asteraceae',
    spacingInches: 8,
    season: ['spring', 'fall'],
    notes: 'Fast grower; can be interplanted.'
  },
  {
    name: 'Cucumber',
    goodNeighbors: ['Beans', 'Corn', 'Peas', 'Radish', 'Sunflower'],
    badNeighbors: ['Potato', 'Aromatic herbs'],
    family: 'Cucurbitaceae',
    spacingInches: 18,
    season: ['summer'],
    notes: 'Tall plants provide shade.'
  },
  {
    name: 'Beans',
    goodNeighbors: ['Corn', 'Cucumber', 'Potato', 'Strawberry'],
    badNeighbors: ['Onion', 'Garlic', 'Shallot'],
    family: 'Fabaceae',
    spacingInches: 6,
    season: ['spring', 'summer'],
    notes: 'Fix nitrogen in soil.'
  },
  {
    name: 'Corn',
    goodNeighbors: ['Beans', 'Cucumber', 'Peas', 'Potato', 'Squash'],
    badNeighbors: ['Tomato'],
    family: 'Poaceae',
    spacingInches: 12,
    season: ['summer'],
    notes: 'Tall; can provide support for beans.'
  },
  {
    name: 'Pepper',
    goodNeighbors: ['Basil', 'Carrot', 'Onion', 'Spinach'],
    badNeighbors: ['Fennel', 'Kohlrabi'],
    family: 'Solanaceae',
    spacingInches: 18,
    season: ['spring', 'summer'],
    notes: 'Similar needs to tomatoes.'
  },
  {
    name: 'Onion',
    goodNeighbors: ['Carrot', 'Lettuce', 'Tomato', 'Pepper'],
    badNeighbors: ['Beans', 'Peas'],
    family: 'Amaryllidaceae',
    spacingInches: 6,
    season: ['spring', 'fall'],
    notes: 'Repels many pests.'
  },
  {
    name: 'Strawberry',
    goodNeighbors: ['Beans', 'Lettuce', 'Spinach', 'Thyme'],
    badNeighbors: ['Cabbage', 'Broccoli'],
    family: 'Rosaceae',
    spacingInches: 12,
    season: ['spring', 'summer'],
    notes: 'Perennial; plant edges of beds.'
  },
  {
    name: 'Beets',
    goodNeighbors: ['Lettuce', 'Onion', 'Cabbage'],
    badNeighbors: ['Pole Beans'],
    family: 'Amaranthaceae',
    spacingInches: 4,
    season: ['spring', 'fall'],
    notes: 'Tolerate partial shade.'
  },
  {
    name: 'Arugula',
    goodNeighbors: ['Beets', 'Carrot', 'Lettuce'],
    badNeighbors: ['Strawberry'],
    family: 'Brassicaceae',
    spacingInches: 6,
    season: ['spring', 'fall'],
    notes: 'Fast growing; succession planting.'
  },
  {
    name: 'Cilantro',
    goodNeighbors: ['Tomato', 'Pepper', 'Spinach'],
    badNeighbors: ['Fennel'],
    family: 'Apiaceae',
    spacingInches: 8,
    season: ['spring', 'fall'],
    notes: 'Attracts beneficial insects.'
  },
  {
    name: 'Summer Squash',
    goodNeighbors: ['Corn', 'Beans', 'Radish'],
    badNeighbors: ['Potato'],
    family: 'Cucurbitaceae',
    spacingInches: 24,
    season: ['summer'],
    notes: 'Needs plenty of space.'
  },
]

// Helper functions
export function findCompanion(name: string): CompanionPlant | undefined {
  return COMPANION_PLANTS.find(p => p.name.toLowerCase() === name.toLowerCase())
}

export function areGoodNeighbors(plantA: string, plantB: string): boolean {
  const a = findCompanion(plantA)
  const b = findCompanion(plantB)
  if (!a || !b) return true // default to neutral if unknown
  return a.goodNeighbors.some(n => n.toLowerCase() === b.name.toLowerCase()) ||
         b.goodNeighbors.some(n => n.toLowerCase() === a.name.toLowerCase())
}

export function areBadNeighbors(plantA: string, plantB: string): boolean {
  const a = findCompanion(plantA)
  const b = findCompanion(plantB)
  if (!a || !b) return false
  return a.badNeighbors.some(n => n.toLowerCase() === b.name.toLowerCase()) ||
         b.badNeighbors.some(n => n.toLowerCase() === a.name.toLowerCase())
}

export function getRecommendedSpacing(plantName: string): number {
  return findCompanion(plantName)?.spacingInches ?? 12
}

export function isInSeason(plantName: string, month: number): boolean {
  const plant = findCompanion(plantName)
  if (!plant) return true
  const seasonMap: Record<'spring' | 'summer' | 'fall' | 'winter', number[]> = {
    spring: [3,4,5],
    summer: [6,7,8],
    fall: [9,10,11],
    winter: [12,1,2]
  }
  return plant.season.some(s => seasonMap[s].includes(month))
}