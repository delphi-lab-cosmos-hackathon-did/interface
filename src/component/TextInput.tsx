import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'

const TextInput: FC<any> = ({ placeholder }) => {
  return (
    <input
      style={{
        padding: '8.5px 20px',
        border: '1px solid #241D2D',
        borderRadius: '8px',
        width: '75%',
      }}
      placeholder={placeholder}
    />
  )
}

export default TextInput
