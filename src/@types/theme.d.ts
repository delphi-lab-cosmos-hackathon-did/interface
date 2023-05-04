import { createTheme } from '@mui/system'

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      primary: string
      secondary: string
    }
  }

  interface PaletteOptions {
    gradient?: {
      primary?: string
      secondary?: string
    }
  }
}
