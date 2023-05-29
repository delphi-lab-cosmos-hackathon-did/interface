import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import PointButton from './PointButton'
import { BaseButton } from './BaseButton'
import Link from 'next/link'

const ExploreBadge: FC<any> = ({
  image,
  header,
  description,
  protocol,
  attribute,
}) => {
  return (
    <Box
      width="calc(50% - 32px)"
      height="260px"
      style={{
        background: 'rgba(217, 217, 217, 0.3)',
      }}
      marginTop="32px"
      marginRight="24px"
      borderRadius="16px"
      padding="24px 48px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box display="flex" marginBottom="16px">
        <img
          style={{ width: '84px', height: '84px', borderRadius: '50%' }}
          src={image}
        />
        <Box marginLeft="24px">
          <Typography
            fontSize="21px"
            lineHeight="25px"
            fontWeight="700"
            color="#00CDDA"
            textTransform="capitalize"
          >
            {header}
          </Typography>
          <Typography
            style={{ marginTop: '14px' }}
            color="white"
            fontWeight="300"
            fontSize="18px"
            lineHeight="25px"
          >
            {description}
          </Typography>
          <Typography
            style={{ marginTop: '24px' }}
            color="rgba(255, 255, 255, 0.5)"
            fontWeight="300"
            fontSize="18px"
            lineHeight="25px"
          >
            {' '}
            Issue Date: May 7 2023
          </Typography>
        </Box>
      </Box>
      <Box borderTop="0.5px solid #242424" />
      <Box display="flex" justifyContent="space-between" marginTop="16px">
        <Box display="flex">
          <PointButton image="/logo.png">100 Spirito Points</PointButton>
          <Box marginLeft="8px" />
          <PointButton image="/logo.png">100 {protocol} Points</PointButton>
        </Box>
        <Link href={`badge/${btoa(attribute)}`}>
          <BaseButton>View Detail</BaseButton>
        </Link>
      </Box>
    </Box>
  )
}

export default ExploreBadge
