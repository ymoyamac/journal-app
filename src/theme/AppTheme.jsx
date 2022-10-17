import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { primaryTheme } from './'

export function AppTheme({ children }) {
  return (
    <div>
        <ThemeProvider theme={primaryTheme}>
            <CssBaseline />
            { children }
        </ThemeProvider>
    </div>
  )
}
