import { Poppins } from 'next/font/google'
import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

export const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#436CD6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    MuiButton: {
      // Name of the component ⚛️ / style sheet
      styleOverrides: {
        contained: {
          height: '52px',
          background:
            'linear-gradient(88.92deg, #49F5C2 0.92%, #00CDDA 97.41%)',
          borderRadius: '35px !important',
          color: 'black',
        },
      },
    },
  },
})

export default theme
