import styled from '@emotion/styled'
import { faXmark } from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  Dialog,
  IconButton,
  Stack,
  TextField as TextFieldMui,
  Typography,
} from '@mui/material'
import { GradientBorderButton } from 'components/GradientBorderButton'
import { Regex } from 'constants/regex'
import React, { useEffect, useState } from 'react'
import { QuestConditionValues } from 'services/types/quest'

interface DialogTextSubmissionProps {
  type: QuestConditionValues.TEXT | QuestConditionValues.URL
  action: 'view' | 'edit'
  open: boolean
  loading?: boolean
  initialText?: string
  onClose: () => void
  onSubmit: (text: string) => void
}

const TextField = styled(TextFieldMui)(() => ({
  '& input': {
    paddingLeft: '10px',
  },
  '& fieldset': {
    borderRadius: '10px',
  },
}))

const DialogTextSubmission: React.FC<DialogTextSubmissionProps> = ({
  open,
  type,
  loading,
  initialText,
  action,
  onClose,
  onSubmit,
}) => {
  const [text, setText] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    if (open && !initialText) {
      setText('')
    } else if (open && initialText) {
      setText(initialText)
    }
  }, [open, initialText])

  const handleSubmission = () => {
    // Submit case url
    if (type === QuestConditionValues.URL)
      if (Regex.url.test(text)) {
        onSubmit(text)
      } else {
        setError(true)
      }
    // Submit case text
    else if (type === QuestConditionValues.TEXT) {
      onSubmit(text)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { backgroundColor: 'transparent', borderRadius: '14px' },
          elevation: 0,
        }}
        sx={{ backdropFilter: 'blur(10px)' }}
      >
        {action === 'edit' && (
          <Stack spacing={2} className="bg-[#2B2B2C66] p-4 md:p-10">
            <Typography variant="h5">Enter contest</Typography>
            {type === QuestConditionValues.URL && (
              <Stack spacing={0.5}>
                <TextField
                  value={text}
                  onChange={(e) => {
                    setError(false)
                    setText(e.target.value)
                  }}
                  fullWidth
                  label="Submission URL"
                  error={error}
                  sx={{
                    backgroundColor: 'rgba(43, 43, 44, 0.4)',
                    borderRadius: '10px',
                  }}
                />
                {error && (
                  <span className="text-[#dd1205] text-xs">Invalid format</span>
                )}
              </Stack>
            )}
            {type === QuestConditionValues.TEXT && (
              <TextField
                value={text}
                onChange={(e) => setText(e.target.value)}
                fullWidth
                label="Submission Content"
                id="fullWidth"
                sx={{
                  backgroundColor: 'rgba(43, 43, 44, 0.4)',
                  borderRadius: '10px',
                }}
                multiline
                rows={3}
                maxRows={3}
              />
            )}
            <Stack
              direction="row"
              sx={{ width: '100%', pt: 2 }}
              justifyContent="flex-end"
            >
              <GradientBorderButton onClick={onClose} disable={loading}>
                <div className="px-2">Cancel</div>
              </GradientBorderButton>
              <Button
                className="mt-4 !p-0 !rounded-[35px]"
                disabled={!text || loading}
                onClick={handleSubmission}
              >
                <div className="px-6 py-2 text-white bg-gradient-to-r from-[#00C78B] to-[#00CDDA] rounded-[35px] w-full">
                  Submit
                </div>
              </Button>
            </Stack>
          </Stack>
        )}
        {action === 'view' && (
          <Stack
            spacing={2}
            className="bg-[#2B2B2C66] p-4 md:p-10"
            sx={{ position: 'relative' }}
          >
            <Typography variant="h5">My Submission</Typography>
            {type === QuestConditionValues.URL && (
              <a
                href={text}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-50 text-ellipsis overflow-hidden"
              >
                {text}
              </a>
            )}
            {type === QuestConditionValues.TEXT && (
              <span className="opacity-50 text-ellipsis overflow-hidden">
                {text}
              </span>
            )}
            <Stack sx={{ position: 'absolute', right: 14, top: 0 }}>
              <IconButton sx={{ color: '#fff' }} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} fontSize={24} />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </Dialog>
    </>
  )
}

export default DialogTextSubmission
