import { useTheme } from '@emotion/react'
import { Tabs, TabsProps } from '@mui/material'

export const DIDTabs = (props: TabsProps) => {
  const theme = useTheme()

  return (
    <Tabs
      centered
      {...props}
      sx={{
        width: '100%',
        borderBottom: '0.5px solid #FFFFFF66',
        '& .MuiTabs-indicator': {
          background: theme.palette.gradient.primary,
        },
        '& .MuiButtonBase-root': {
          textTransform: 'none',
        },
        ...props.sx,
      }}
    />
  )
}
