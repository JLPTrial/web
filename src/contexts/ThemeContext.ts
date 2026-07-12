import { createContext, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'

export const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null)

export function useThemeContext() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider')
    return ctx
}
