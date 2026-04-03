import { createContext, useContext, type ReactNode } from 'react'
import { useTheme } from '@/hooks/useTheme'

interface ThemeContextValue {
  darkMode: boolean
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  darkMode: false,
  setDarkMode: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { darkMode, setDarkMode } = useTheme()
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  return useContext(ThemeContext)
}
