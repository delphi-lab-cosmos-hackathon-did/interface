import { Box, Typography } from '@mui/material'
import React, { FC } from 'react'
import PointButton from './PointButton'
import { BaseButton } from './BaseButton'

const Table: FC<any> = ({ list }) => {
  const downloadFile = ({
    data,
    fileName,
    fileType,
  }: {
    data: any
    fileName: string
    fileType: string
  }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType })
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a')
    a.download = fileName
    a.href = window.URL.createObjectURL(blob)
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    a.dispatchEvent(clickEvt)
    a.remove()
  }

  const exportToJson = (e: any) => {
    e.preventDefault()
    downloadFile({
      data: JSON.stringify(list),
      fileName: 'users.json',
      fileType: 'text/json',
    })
  }

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
      <Box marginTop="24px" display="flex" justifyContent="flex-end">
        <BaseButton onClick={exportToJson}>Export</BaseButton>
      </Box>
    </Box>
  )
}

export default Table
