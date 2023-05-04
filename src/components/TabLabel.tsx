import { useTheme } from '@emotion/react'
import { Stack, Typography, Box } from '@mui/material'

export const TabLabel = ({
  text,
  num,
  active,
}: {
  text: string
  num?: number
  active?: boolean
}) => {
  const theme = useTheme()
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ px: 3, opacity: active ? 1 : 0.4 }}
    >
      <Typography
        sx={{
          color: theme.palette.common.white,
          fontWeight: active ? 600 : 400,
        }}
      >
        {text}
      </Typography>
      {num > 0 && (
        <Box
          sx={{
            border: `1px solid ${theme.palette.common.white}`,
            display: 'flex',
            alignItems: 'center',
            px: 1,
            borderRadius: 100,
            color: theme.palette.common.white,
            fontWeight: 400,
          }}
        >
          {num}
        </Box>
      )}
    </Stack>
  )
}
