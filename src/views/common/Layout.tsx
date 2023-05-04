import { Box, Stack } from '@mui/material'
import React from 'react'
import { Limit } from './Limit'
import { Navbar } from './Navbar'

export const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      <Box
        sx={{
          position: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          width: '100vw',
          height: '100%',
          minHeight: '100vh',
          backgroundImage: `url("/static/images/bg-main.png")`,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("/static/images/bg-salt-pepper.png")`,
          zIndex: 0,
        }}
      />
      <Stack
        sx={{
          backgroundImage: `url("/static/images/bg-salt-pepper.png")`,
        }}
      >
        <Navbar />
        <Limit sx={{ zIndex: 1 }}>{children}</Limit>
      </Stack>
    </Box>
  )
}
