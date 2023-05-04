import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from '@mui/material'
import { GradientBorderButton } from 'components/GradientBorderButton'
import { GradientButton } from 'components/GradientButton'
import React from 'react'

export type Props = {
  title?: string
  onOk?: (close?: (...args: any) => void) => void
  onClose?: () => void
  okText?: string
  cancelText?: string
  divider?: boolean
  center?: boolean
  children: React.ReactNode
}

export const CoreDialog = (props: DialogProps & Props) => {
  const {
    children,
    title,
    center,
    onClose,
    onOk,
    okText = 'OK',
    cancelText,
    divider = false,
    ...restProps
  } = props

  const handleClose = () => {
    onClose?.()
  }

  const handleOk = () => {
    onOk?.(onClose)
  }

  if (!children) {
    return null
  }

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(43, 43, 44, 0.4)',
          p: 2,
          borderRadius: '8px',
        },
      }}
      sx={{ backdropFilter: 'blur(10px)' }}
      {...restProps}
    >
      {title && <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>}
      <DialogContent
        sx={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {typeof children === 'string' ? (
          <Typography
            variant="body1"
            color="textPrimary"
            align={center ? 'center' : 'left'}
          >
            {children}
          </Typography>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions>
        {cancelText && (
          <GradientBorderButton
            onClick={handleClose}
            style={{ minWidth: 100 }}
            fullWidth
          >
            {cancelText}
          </GradientBorderButton>
        )}
        <GradientButton
          style={{ minWidth: 100 }}
          onClick={handleOk}
          variant="contained"
          color="primary"
          fullWidth
        >
          {okText}
        </GradientButton>
      </DialogActions>
    </Dialog>
  )
}
