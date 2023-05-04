import { Container, ContainerProps } from '@mui/material'

export const Limit = (props: ContainerProps) => {
  return (
    <Container maxWidth="lg" {...props}>
      {props.children}
    </Container>
  )
}
