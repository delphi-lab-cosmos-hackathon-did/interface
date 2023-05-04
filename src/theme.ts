import { createTheme } from '@mui/material/styles'
import { TypographyOptions } from '@mui/material/styles/createTypography'
import { deepmerge } from '@mui/utils'

const getTheme = () => {
  let theme = createTheme({
    palette: {
      text: {
        primary: '#ffffff',
        secondary: '#769ea2',
      },
      background: {
        default: '#000000',
      },
      primary: {
        main: '#00C78B',
        contrastText: '#ffffff',
      },
      secondary: {
        main: '#00CDDA',
      },
      error: {
        main: '#dd1205',
      },
      gradient: {
        primary: 'linear-gradient(88.92deg, #00C78B 0.92%, #00CDDA 97.41%)',
        secondary: 'linear-gradient(to right, white, #99b1ff 96.5%, #20326b)',
      },
    },
  })

  const fontFamily = [
    'Work Sans',
    'Inter',
    'Roboto',
    'Prompt',
    'sans-serif',
  ].join(',')

  const customTypography: TypographyOptions = {
    htmlFontSize: 16,
    fontFamily,
    h1: {
      fontFamily,
      fontSize: 60,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 40,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 32,
      },
    },
    h2: {
      fontFamily,
      fontSize: 48,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 24,
      },
    },
    h3: {
      fontFamily,
      fontSize: 36,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
      },
    },
    h4: {
      fontFamily,
      fontSize: 24,
      fontWeight: 600,
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    h5: {
      fontFamily,
      fontSize: 20,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 18,
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
    h6: {
      fontFamily,
      fontSize: 18,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 16,
      },
    },
    subtitle1: {
      fontFamily,
      fontSize: 18,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },
    subtitle2: {
      fontFamily,
      fontSize: 16,
      fontWeight: 'bold',
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },
    body1: {
      fontFamily,
      fontSize: 16,
      fontWeight: 'normal',
      [theme.breakpoints.down('md')]: {
        fontSize: 14,
      },
    },
    body2: {
      fontFamily,
      fontSize: 14,
      fontWeight: 'normal',
    },
    button: {
      fontFamily,
      fontSize: 14,
      fontWeight: 'bold',
    },
    caption: {
      fontFamily,
      fontSize: 12,
      fontWeight: 'bold',
    },
  }

  theme = deepmerge(theme, {
    typography: customTypography,
  })

  return theme
}

export const theme = getTheme()
