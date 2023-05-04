// import App, { AppProps, AppContext } from 'next/app'
import '../styles/global.css'
import {
  CssBaseline,
  ThemeProvider as MaterialThemeProvider,
} from '@mui/material'
import { StylesProvider } from '@mui/styles'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { CoreSpinner } from 'core/CoreSpinner'
import createEmotionCache from 'createEmotionCache'
import { GlobalStyle } from 'GlobalStyle'
import { useAuth } from 'hooks/useAuth'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { SnackbarProvider } from 'notistack'
import { useEffect } from 'react'
import { theme } from 'theme'
import { GlobalDialog } from 'views/common/GlobalDialog'
import { GlobalSpinner } from 'views/common/GlobalSpinner'
import { AuthDataProvider } from 'lib/AuthDataContext'
import ProgressBar from '@badrap/bar-of-progress'
import { Router, useRouter } from 'next/router'

// Prevent over sized icon
// this ensures that the icon CSS is loaded immediately before attempting to render icons
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const progress = new ProgressBar({
  size: 4,
  className: 'bar-of-progress',
  color: '#1EEEB1',
  delay: 100,
})

const CustomApp = (props: MyAppProps) => {
  const router = useRouter()
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  useEffect(() => {
    const handleRouteChange = (url) => {}
    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.pathname, router.events])

  Router.events.on('routeChangeStart', progress.start)
  Router.events.on('routeChangeComplete', progress.finish)
  Router.events.on('routeChangeError', progress.finish)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>DID</title>
      </Head>
      <GlobalStyle />
      <StylesProvider injectFirst>
        <MaterialThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalSpinner />
          <GlobalDialog />
          <SnackbarProvider maxSnack={5}>
            <AuthDataProvider>
              <Component {...pageProps} />
            </AuthDataProvider>
          </SnackbarProvider>
        </MaterialThemeProvider>
      </StylesProvider>
    </CacheProvider>
  )
}

export default CustomApp
