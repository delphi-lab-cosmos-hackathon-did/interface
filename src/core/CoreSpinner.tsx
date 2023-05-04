import { Backdrop, CircularProgress } from '@mui/material'

type Props = {
  open?: boolean
}

export const CoreSpinner = (props: Props) => {
  const { open = true } = props

  return (
    <Backdrop
      open={open}
      sx={{ zIndex: (theme) => theme.zIndex.tooltip + 1, color: '#ffffff' }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
