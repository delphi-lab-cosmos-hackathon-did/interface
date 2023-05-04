import styled from '@emotion/styled'
import { Button } from '@mui/material'

export const GradientButton = styled(Button)`
  background: ${({ theme }) => theme.palette.gradient.primary};
  height: 40px;
  border-radius: 20px;
  color: ${({ theme }) => theme.palette.common.white};
  text-transform: none;
  padding-bottom: 8px;
`
