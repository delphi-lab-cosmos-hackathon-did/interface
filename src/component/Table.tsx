import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import PointButton from './PointButton'
import { BaseButton } from './BaseButton'

const Table: FC<any> = ({ list }) => {
  console.log('len ', list.slice(5).length)
  const formattedList = () => {
    let data = [...list]
    let sliceData = data.slice(0, 5)
    return sliceData
  }
  return (
    <Box padding="16px" width="100%">
      <Box
        padding="16px"
        color="#FFC83A"
        display="flex"
        justifyContent="space-between"
        style={{ background: '#000046' }}
      >
        <Box>Wallet</Box>
        <Box>Claim Dated</Box>
      </Box>
      {formattedList().map((d: string) => {
        return (
          <Box
            marginTop="16px"
            padding="16px"
            color="white"
            display="flex"
            justifyContent="space-between"
            style={{ background: 'rgba(217, 217, 217, 0.2)' }}
          >
            <Box>{d}</Box>
            <Box color="#83FF64">May 3, 2023</Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default Table
