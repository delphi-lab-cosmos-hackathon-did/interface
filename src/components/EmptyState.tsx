import { Box, Typography } from '@mui/material'
import { useMemo } from 'react'
import { SadIcon } from 'svgs'

interface EmptyStateProps {
  category: 'quest' | 'point' | 'reward'
  text?: string
  subtitle?: string
}

export const EmptyState = ({ category, text, subtitle }: EmptyStateProps) => {
  const emptyPic = useMemo(() => {
    let pic = null
    switch (category) {
      case 'quest':
      case 'point':
        pic = <SadIcon fill="#fff" />
        break
    }

    return pic
  }, [category])

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      m={2}
      className="opacity-20"
    >
      <Box>{emptyPic}</Box>
      <Box>
        <Typography
          variant="h5"
          sx={{
            pt: 2,
            color: '#fff',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
          }}
        >
          {text}
        </Typography>
      </Box>
      <Box>
        {subtitle && (
          <Typography variant="body1" sx={{ color: '#fff' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
