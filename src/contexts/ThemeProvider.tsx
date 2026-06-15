import { createContext, useContext } from 'react'
import { useTheme } from '../hooks/useTheme'
import type { ReactNode } from 'react'

const ThemeContext = createContext<ReturnType<typeof useTheme> | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme = useTheme()
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    const ctx = useContext(ThemeContext)
    if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider')
    return ctx
}
