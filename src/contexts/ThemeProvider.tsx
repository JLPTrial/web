import { useTheme } from '../hooks/useTheme'
import { ThemeContext } from './ThemeContext'
import type { ReactNode } from 'react'

export function ThemeProvider({ children }: Readonly<{ children: ReactNode }>) {
    const theme = useTheme()
    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    )
}
