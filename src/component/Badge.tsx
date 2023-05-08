import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

const Badge: FC<any> = ({ image, header, description, date }) => {
  return (
    <Box
      sx={{
        borderRadius: '15px',
        border: '2px solid #000000',
        background: ' rgba(217, 217, 217, 0.4)',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        // height: '200px',
      }}
    >
      <img
        src={image}
        style={{
          objectFit: 'cover',
          zIndex: '-1',
          width: '100%',
          height: '200px',
        }}
      />
      <Box sx={{ padding: '12px 15px', zIndex: '1' }}>
        <Typography fontWeight="700" fontSize="20px" color="white">
          {header}
        </Typography>
        <Typography
          fontWeight="700"
          fontSize="10px"
          lineHeight="15px"
          color="black"
        >
          {description}
        </Typography>
      </Box>
      {/* <Box
        sx={{
          padding: '8px 12px',
          borderRadius: '15px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          position: 'absolute',
          left: '50%',
        }}
      >
        <Typography
          fontWeight="700"
          fontSize="10px"
          lineHeight="15px"
          color="white"
        >
          {date}
        </Typography>
      </Box> */}
    </Box>
  )
}

export default Badge
