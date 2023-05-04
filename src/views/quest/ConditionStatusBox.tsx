import { faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  BoxProps,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material'
import { TranslucentBlurBox } from 'components/TranslucentBlurBox'
import { useMemo } from 'react'
import { QuestConditionValues } from 'services/types/quest'
import RenderHyperTextMarkup from 'views/common/RenderHyperTextMarkup'

const CircleStatus = ({
  children,
  background,
}: {
  children: React.ReactNode
  background: string
}) => {
  return (
    <Box
      sx={{
        background,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: 44,
        borderRadius: '22px',
      }}
    >
      {children}
    </Box>
  )
}

const ConditionStatusBox = ({
  primaryText,
  secondaryText,
  link,
  linkType,
  linkDisplay,
  displaySecondary,
  icon,
  text,
  iconBackground = '#FFFFFF0D',
  dimmed = false,
  actionButton,
  isVerifying = false,
  BoxProps,
}: {
  primaryText: string
  secondaryText: string
  link?: string
  linkType?: QuestConditionValues
  linkDisplay?: string
  displaySecondary?: string
  icon?: React.ReactNode
  text?: string
  iconBackground?: string
  dimmed?: boolean
  actionButton?: React.ReactNode
  isVerifying?: boolean
  BoxProps?: BoxProps
}) => {
  const statusIcon = useMemo(() => {
    if (isVerifying) {
      return (
        <Box
          sx={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )
    }
    if (icon) {
      return <CircleStatus background={iconBackground}>{icon}</CircleStatus>
    }
  }, [icon, isVerifying, iconBackground])

  return (
    <TranslucentBlurBox
      {...BoxProps}
      sx={{
        p: {
          xs: 2,
          md: 4,
        },
        opacity: dimmed ? 0.4 : 1,
        ...BoxProps?.sx,
      }}
    >
      <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
        <Box sx={{ mr: { xs: 2, md: 4 } }}>{statusIcon}</Box>
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          sx={{ width: '100%' }}
          spacing={{
            xs: 1,
            sm: 2,
          }}
          justifyContent="space-between"
        >
          <Stack sx={{ flex: 1 }}>
            <div className="space-y-0 md:space-y-2">
              <Typography variant="h5" className="break-all">
                {primaryText}
              </Typography>
              <Typography
                variant="body1"
                className="break-all"
                color="text.secondary"
              >
                {secondaryText}
              </Typography>
              <div>
                {linkType === QuestConditionValues.JOIN_DISCORD && (
                  <div className="flex md:items-center space-x-2">
                    <FontAwesomeIcon icon={faDiscord} />
                    <div className="text-xs sm:text-sm">
                      Join the
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00C78B]"
                      >
                        {` ${linkDisplay} `}
                      </a>
                      Discord
                      {displaySecondary && (
                        <span>
                          {` and have the`}
                          <span className="text-[#00C78B]">{` ${displaySecondary} `}</span>
                          role
                        </span>
                      )}
                    </div>
                  </div>
                )}
                {linkType === QuestConditionValues.FOLLOW_TWITTER && (
                  <div className="flex md:items-center space-x-2">
                    <FontAwesomeIcon icon={faTwitter} />
                    <div className="text-xs sm:text-sm">
                      Follow
                      <a
                        // TODO: Return this link from backend
                        href={`https://twitter.com/${linkDisplay}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00C78B]"
                      >
                        {` @${linkDisplay} `}
                      </a>
                      on Twitter
                    </div>
                  </div>
                )}
                {linkType === QuestConditionValues.LIKE && (
                  <div className="flex md:items-center space-x-2">
                    <FontAwesomeIcon icon={faTwitter} />
                    <div className="text-xs sm:text-sm">
                      Like
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00C78B]"
                      >
                        {` ${linkDisplay} `}
                      </a>
                      on Twitter
                    </div>
                  </div>
                )}
                {linkType === QuestConditionValues.RETWEET && (
                  <div className="flex items-center space-x-2">
                    <FontAwesomeIcon icon={faTwitter} />
                    <div className="text-xs sm:text-sm">
                      Retweet
                      <a
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#00C78B]"
                      >
                        {` ${linkDisplay} `}
                      </a>
                      on Twitter
                    </div>
                  </div>
                )}

                {/* <div>
              <FontAwesomeIcon icon={faDiscord} /> Join the{' '}
              <span className="text-green-400">Cornerstone</span> Discord
            </div> */}
              </div>
            </div>
          </Stack>
          <Stack justifyContent="center">{actionButton}</Stack>
        </Stack>
      </Stack>
      {text && (
        <Stack direction="row">
          <Box
            sx={{ mr: { xs: 2, md: 4 }, width: 44, height: 44, minWidth: 44 }}
          ></Box>
          <Stack sx={{ mt: 2 }}>
            <RenderHyperTextMarkup data={text} />
          </Stack>
        </Stack>
      )}
    </TranslucentBlurBox>
  )
}

export default ConditionStatusBox
