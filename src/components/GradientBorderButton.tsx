import { useTheme } from '@emotion/react'
import { ButtonBase, Box, Button } from '@mui/material'

interface GradientBorderButtonProps {
  onClick: () => void
  children?: React.ReactNode
  disable?: boolean
  fullWidth?: boolean
}
export const GradientBorderButton: React.FC<GradientBorderButtonProps> = (
  props,
) => {
  const theme = useTheme()
  return (
    <Button
      disabled={props.disable}
      onClick={() => props.onClick?.()}
      sx={{ borderRadius: '20px' }}
      fullWidth={props.fullWidth}
    >
      <Box
        sx={{
          height: 40,
          width: '100%',
          position: 'relative',
          px: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textTransform: 'none',
          color: theme.palette.common.white,
          fontWeight: 500,
          '&:before': {
            content: '"test"',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            border: '1px solid transparent',
            borderRadius: '20px',
            background: `${theme.palette.gradient.primary} border-box`,
            mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            maskComposite: 'destination-out',
          },
        }}
      >
        {props.children}
      </Box>
    </Button>
  )
}
