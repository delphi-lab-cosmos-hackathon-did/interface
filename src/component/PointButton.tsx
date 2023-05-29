import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

const PointButton: FC<any> = ({ children, image, onClick }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        padding: '7px',
        borderRadius: '35px',
        background: '#7363D5',
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
        style={{
          textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        }}
      >
        {children}
      </Typography>
    </Box>
  )
}

export default PointButton
