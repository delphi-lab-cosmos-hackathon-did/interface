import dayjs, { Dayjs } from 'dayjs'
import duration from 'dayjs/plugin/duration'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(duration)
dayjs.extend(timezone)
dayjs.extend(utc)

export const formatNumber = (value: number | string, decimals = 2) => {
  return value?.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  })
}

export const formatDataCountdown = (start, end) => {
  const startDayjs = dayjs(start)
  const endDayjs = dayjs(end)
  const nowDayjs = dayjs()
  const startDif = startDayjs.diff(nowDayjs, 'minutes')

  // END TIME
  if (startDif < 0) {
    const minutesDiff = endDayjs.diff(nowDayjs, 'minutes')
    const hourDiff = endDayjs.diff(nowDayjs, 'hour')
    const dayDiff = endDayjs.diff(nowDayjs, 'days')

    const hour = hourDiff % 24

    if (minutesDiff <= 0) {
      return 'End in : Finished'
    } else if (hourDiff === 0) {
      return 'End in : an hour'
    } else if (hourDiff <= 24) {
      return `End in : ${hourDiff} Hour`
    } else if (dayDiff >= 0 && hour > 0) {
      return `End in : ${dayDiff} Day ${hour} Hour`
    } else if (dayDiff >= 0 && hour <= 0) {
      return `End in : ${dayDiff} Day`
    }
  }
  // START TIME
  else {
    const hourDiff = startDayjs.diff(nowDayjs, 'hour')
    const dayDiff = startDayjs.diff(nowDayjs, 'days')

    const hour = hourDiff % 24

    if (hourDiff === 0) {
      return 'Start in : an hour'
    } else if (hourDiff > 0 && hourDiff < 24) {
      return `Start in : ${hour} Hour`
    } else if (dayDiff >= 0 && hour > 0) {
      return `Start in : ${dayDiff} Day ${hour} Hour`
    } else if (dayDiff >= 0 && hour <= 0) {
      return `Start in : ${dayDiff} Day`
    }
  }
}

export const formatDate = (data) => {
  return dayjs(data).format('YYYY-MM-DD HH:mm')
}

export const truncateAddress = (address?: string, length = 4) => {
  if (!address) return ''
  const left = address.substr(0, length)
  const right = address.substr(address.length - length)
  return `${left}...${right}`
}

export enum MintPriceType {
  TBA = 'tba',
  FREE = 'free',
  ETH = 'eth',
  BNB = 'bnb',
  MATIC = 'matic',
}

export const formatMintPrice = (value) => {
  switch (value) {
    case MintPriceType.FREE:
      return 'Free'
    case null:
    case undefined:
    case '':
      return 'TBA'
    default:
      return String(value)?.toUpperCase()
  }
}
