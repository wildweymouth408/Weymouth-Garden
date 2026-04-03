import { useState, useEffect } from 'react'
import type { TabId } from '@/types'
import { AppShell } from '@/components/layout/AppShell'
import { DashboardTab } from '@/tabs/DashboardTab'
import { CalendarTab } from '@/tabs/CalendarTab'
import { LayoutTab } from '@/tabs/LayoutTab'
import { WateringTab } from '@/tabs/WateringTab'
import { PlantTrackerTab } from '@/tabs/PlantTrackerTab'
import { SettingsTab } from '@/tabs/SettingsTab'

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')

  // Allow dashboard quick actions to navigate via custom event
  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent<TabId>).detail
      if (tab) setActiveTab(tab)
    }
    window.addEventListener('wg-navigate', handler)
    return () => window.removeEventListener('wg-navigate', handler)
  }, [])

  return (
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'dashboard' && <DashboardTab />}
      {activeTab === 'calendar'  && <CalendarTab />}
      {activeTab === 'layout'    && <LayoutTab />}
      {activeTab === 'watering'  && <WateringTab />}
      {activeTab === 'tracker'   && <PlantTrackerTab />}
      {activeTab === 'settings'  && <SettingsTab />}
    </AppShell>
  )
}

export default App
