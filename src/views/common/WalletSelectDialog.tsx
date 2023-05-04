import { useTheme } from '@emotion/react'
import { Button, Dialog, DialogProps, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { MetamaskIcon, Wallet } from 'svgs'

type Props = DialogProps & {
  onSelectWallet: (s: string) => void
}

export const WalletSelectDialog = (props: Props) => {
  const options = [{ name: 'Metamask', icon: <MetamaskIcon /> }]
  const { onSelectWallet } = props
  const theme = useTheme()

  return (
    <Dialog
      {...props}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { backgroundColor: 'transparent' }, elevation: 0 }}
      sx={{ backdropFilter: 'blur(10px)' }}
    >
      <Stack
        sx={{
          border: '1px solid #242424',
          backgroundColor: 'rgba(43, 43, 44, 0.8)',
          backdropFilter: 'blur(4px)',
          borderRadius: '16px',
          alignItems: 'center',
          textAlign: 'center',
          p: 4,
        }}
      >
        <Wallet />
        <Typography variant="h4" sx={{ mt: 4 }}>
          Connect Wallet
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: 18, mt: 1, fontWeight: 300 }}
        >
          To start using INNOVAT3
        </Typography>
        {options.map((option, index) => {
          return (
            <Button
              key={option.name}
              variant="contained"
              fullWidth
              sx={{
                justifyContent: 'space-between',
                mt: 4,
                py: 1,
                px: { xs: 2, sm: 4 },
                mx: 2,
                maxWidth: 400,
                height: 60,
                borderRadius: 3,
                background: '#FFFFFF0D',
                boxShadow: 'none',
                textTransform: 'none',
                fontWeight: 400,
                '&.MuiButton-contained': {
                  '&:hover': {
                    background: '#FFFFFF1D',
                    boxShadow: 'none',
                  },
                },
              }}
              onClick={() => onSelectWallet(option.name)}
            >
              <Typography
                variant={'h5'}
                sx={{
                  color: theme.palette.common.white,
                  ml: 2,
                  fontWeight: 400,
                }}
              >
                {option.name}
              </Typography>
              {option.icon}
            </Button>
          )
        })}
      </Stack>
    </Dialog>
  )
}
