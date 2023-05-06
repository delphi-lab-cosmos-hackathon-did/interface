import * as React from 'react'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache'
import { ButtonAppBar } from '../components/AppBar'
import '../src/index.css'
import { Box } from '@mui/material'
import { ChakraProvider } from '@chakra-ui/react'
import { ChainProvider, defaultTheme } from '@cosmos-kit/react'
import { chains, assets } from 'chain-registry'
import { wallets } from '@cosmos-kit/keplr'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <ChakraProvider theme={defaultTheme}>
        <ChainProvider
          chains={chains} // supported chains
          assetLists={assets} // supported asset lists
          wallets={wallets} // supported wallets
          wrappedWithChakra={true}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box minHeight="100vh" display="flex" flexDirection="column">
              <ButtonAppBar />

              <Box flexGrow={1}>
                <Component {...pageProps} />
              </Box>
            </Box>
          </ThemeProvider>
        </ChainProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}
