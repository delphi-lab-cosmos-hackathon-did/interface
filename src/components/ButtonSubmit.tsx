import { Button } from '@mui/material'

interface ButtonSubmitProps {
  disabled?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
  disabled,
  onClick,
  children,
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant="contained"
      sx={{
        borderRadius: 999,
        py: 1.5,
        width: '100%',
        textTransform: 'none',
        background: 'linear-gradient(88.92deg, #00C78B 0.92%, #00CDDA 97.41%)',
      }}
      className="disabled:opacity-40"
    >
      <div className="font-bold select-none text-white">{children}</div>
    </Button>
  )
}

export default ButtonSubmit
