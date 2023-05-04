import { Button, Dialog } from '@mui/material'
import { useMemo } from 'react'
import { UserQuestSubmissionStatus } from 'services/types/quest'

interface VerifyDialogProps {
  open: boolean
  onProceed: () => void
  status?: UserQuestSubmissionStatus
}

const VerifyDialog: React.FC<VerifyDialogProps> = (props) => {
  const { open, onProceed } = props
  const onClickContinue = () => {
    onProceed()
  }

  const data = useMemo(() => {
    switch (props.status) {
      case UserQuestSubmissionStatus.PENDING:
      case UserQuestSubmissionStatus.REJECT:
        return {
          title: 'Please re-check your quest',
          description:
            'Make sure you have followed on the task and submit again',
        }
      case UserQuestSubmissionStatus.COMPLETED:
      case UserQuestSubmissionStatus.APPROVE:
        return {
          title: 'Congratulations',
          description: 'You have successfully completed the quest',
        }
      case UserQuestSubmissionStatus.WAIT_APPROVE:
        return {
          title: 'Wait admin approve',
          description: 'You have submit successfully',
        }
    }
  }, [props.status])

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { backgroundColor: 'transparent', borderRadius: '8px' },
        elevation: 0,
      }}
      sx={{ backdropFilter: 'blur(10px)' }}
      className="flex justify-center"
    >
      <div className="bg-[#2B2B2C66] p-10">
        <div className="text-center text-white font-semibold text-3xl mb-4">
          {data?.title}
        </div>
        <div className="font-normal text-white text-center mb-8 text-sm">
          {data?.description}
        </div>
        <div className="flex justify-center w-full">
          <Button
            className="mt-4 !p-0 !rounded-[35px] w-full"
            onClick={onClickContinue}
          >
            <div className="px-6 py-2 text-white bg-gradient-to-r from-[#00C78B] to-[#00CDDA] rounded-[35px] w-full">
              Continue
            </div>
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default VerifyDialog
