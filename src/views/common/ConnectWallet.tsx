import { ethers, Signer } from 'ethers'
import { useEffect, useState } from 'react'
import { Box, Button, Dialog } from '@mui/material'
import { WalletSelectDialog } from './WalletSelectDialog'
import { authService } from 'services/authService'
import { GradientButton } from 'components/GradientButton'
import { useAuthData } from 'lib/AuthDataContext'
import { appConstants } from 'constants/appConstants'

export const ConnectWallet = ({
  onLoginSuccess,
}: {
  onLoginSuccess?: () => void
}) => {
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false)
  const [openLoginDialog, setOpenLoginDialog] = useState<boolean>(false)
  const { setAuthData } = useAuthData()
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null)

  const loginWithMetamask = async () => {
    try {
      setOpenLoginDialog(true)
      const accounts = await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const { loginKey } = await authService.getLoginKey(accounts[0])
      const signature = await signer.signMessage(loginKey)
      const authData = await authService.login(signature, accounts[0])
      localStorage.setItem(
        appConstants.USER_DATA_LOCAL_STORAGE_KEY,
        JSON.stringify(authData),
      )
      setAuthData(authData)
      onLoginSuccess?.()
    } catch (error) {
      console.error(error)
    } finally {
      setOpenLoginDialog(false)
    }
  }

  const onSelectWallet = async (name: string) => {
    setIsWalletOpen(false)
    switch (name) {
      case 'Metamask':
        await loginWithMetamask()
    }
  }

  useEffect(() => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      setProvider(provider)
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      <Dialog
        open={openLoginDialog}
        onClose={() => setOpenLoginDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: 'transparent', borderRadius: '8px' },
          elevation: 0,
        }}
        sx={{ backdropFilter: 'blur(10px)' }}
        className="flex justify-center"
      >
        <h2>
          Please login and authorize your wallet to register for the account
        </h2>
        <div>
          This application does not ask for access to making any transaction, in
          which the authorization will only be used to validate your ownership
          of the account.
        </div>
      </Dialog>
      <Box>
        <WalletSelectDialog
          open={isWalletOpen}
          onClose={() => setIsWalletOpen(false)}
          onSelectWallet={onSelectWallet}
        />

        <GradientButton onClick={() => setIsWalletOpen(true)} sx={{ px: 3 }}>
          Connect Wallet
        </GradientButton>
      </Box>
    </>
  )
}
