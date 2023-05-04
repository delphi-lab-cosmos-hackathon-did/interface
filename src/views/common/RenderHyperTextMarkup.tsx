import styled from '@emotion/styled'
import { Box } from '@mui/system'

interface RenderHyperTextMarkupProps {
  data: string
}

export const WrapBox = styled(Box)`
  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  p {
    margin: 0;
  }
  p {
    font-weight: 300;
  }
  strong,
  b {
    font-weight: 600;
  }
  a {
    color: #00c78b;
  }
`

const RenderHyperTextMarkup: React.FC<RenderHyperTextMarkupProps> = ({
  data,
}) => {
  return (
    <div className="flex">
      <WrapBox
        dangerouslySetInnerHTML={{ __html: data }}
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          width: {
            xs: '260px',
            sm: '612px',
            md: '470px',
            lg: '588px',
          },
        }}
      />
    </div>
  )
}

export default RenderHyperTextMarkup
