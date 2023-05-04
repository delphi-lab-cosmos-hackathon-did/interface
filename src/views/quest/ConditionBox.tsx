import { useTheme } from '@emotion/react'
import { QuestConditionValues } from 'services/types/quest'
import ConditionBoxIcon from './ConditionBoxIcon'
import ConditionStatusBox from './ConditionStatusBox'

export interface ConditionBoxProps {
  title: string
  description: string
  link?: string
  linkType?: QuestConditionValues
  linkDisplay?: string
  displaySecondary?: string
  text?: string
  check?: boolean
  seq: number
  isVerifying?: boolean
  dimmed?: boolean
}

const ConditionBox: React.FC<ConditionBoxProps> = (props) => {
  const theme = useTheme()
  const { dimmed, check, isVerifying = false } = props

  const computeIconBg = (check) => {
    if (check) {
      return theme.palette.gradient.primary
    }
    return
  }
  const iconComp = <ConditionBoxIcon no={props.seq} check={props.check} />

  return (
    <ConditionStatusBox
      primaryText={props.title}
      secondaryText={props.description}
      link={props?.link}
      linkType={props?.linkType}
      linkDisplay={props?.linkDisplay}
      text={props?.text}
      displaySecondary={props?.displaySecondary}
      iconBackground={computeIconBg(check)}
      icon={iconComp}
      isVerifying={isVerifying}
      dimmed={dimmed}
    />
  )
}

export default ConditionBox
