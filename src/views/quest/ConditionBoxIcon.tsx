import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { faCheck, faLock } from '@fortawesome/pro-solid-svg-icons'

export interface ConditionBoxIconProps {
  check: boolean
  no: number
}

const ConditionBoxIcon: React.FC<ConditionBoxIconProps> = (props) => {
  const { check, no } = props
  if (check) {
    return (
      <Box
        component={FontAwesomeIcon}
        icon={faCheck}
        sx={{ fontSize: 20, fontWeight: 900 }}
      />
    )
  } else {
    return (
      <Box
        sx={{
          fontSize: 20,
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%2300C78BFF' stroke-width='3' stroke-dasharray='4' stroke-dashoffset='86' stroke-linecap='butt'/%3e%3c/svg%3e")`,
          borderRadius: '22px',
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'text.secondary',
        }}
      >
        {/* {no} */}
      </Box>
    )
  }
}

export default ConditionBoxIcon
