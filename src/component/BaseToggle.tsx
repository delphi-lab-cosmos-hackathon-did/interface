import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

const BaseToggle: FC<any> = ({ children, image, active, onClick }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        padding: '8px 12px',
        borderRadius: '15px',
        background: 'rgba(217, 217, 217, 0.3)',
        border: active ? '2px solid #FFC83A' : '',
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Box sx={{ marginRight: '8px' }}>
        <img width="30" height="30" src={image} />
      </Box>
      <Typography
        color="white"
        fontSize="20px"
        lineHeight="30px"
        fontWeight="700"
      >
        {children}
      </Typography>
    </Box>
  )
}

export default BaseToggle
