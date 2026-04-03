import { useEffect } from 'react'
import { useStorage } from './useStorage'

export function useTheme() {
  const [darkMode, setDarkMode] = useStorage('wg-dark-mode', false)

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [darkMode])

  return { darkMode, setDarkMode }
}
