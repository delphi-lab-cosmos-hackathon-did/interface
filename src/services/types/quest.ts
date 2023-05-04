import { IQuestCondition } from '../questService'

export enum QuestConditionValues {
  FOLLOW_TWITTER = 'FOLLOW_TWITTER',
  RETWEET = 'RETWEET',
  LIKE = 'LIKE',
  COMMENT_TWITTER = 'COMMENT_TWITTER',
  HASHTAG = 'HASHTAG',
  QUOTE_TWITTER_AND_TAG_FRIENDS = 'QUOTE_TWITTER_AND_TAG_FRIENDS',
  JOIN_DISCORD = 'JOIN_DISCORD',
  TEXT = 'TEXT',
  URL = 'URL',
  FAN_ART = 'FAN_ART',
  CUSTOM = 'CUSTOM',
}

export enum QuestPreConditionTypeValues {
  SYNC_DISCORD = 'SYNC_DISCORD',
  SYNC_TWITTER = 'SYNC_TWITTER',
  MINIMUM_PROJECT_POINT = 'MINIMUM_PROJECT_POINT',
  MINIMUM_PLATFORM_POINT = 'MINIMUM_PLATFORM_POINT',
  MINIMUM_PROJECT_LEVEL = 'MINIMUM_PROJECT_LEVEL',
  NFT_HOLDER = 'NFT_HOLDER',
}

export enum QuestRewardType {
  NATIVE_TOKEN = 'NATIVE_TOKEN',
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export enum UserRewardStatus {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
}

export enum UserQuestSubmissionStatus {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  WAIT_APPROVE = 'WAIT_APPROVE',
}

export enum FieldInputType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
  NUMBER = 'NUMBER',
  URL = 'URL',
}

export interface MetaDataPreconditionMinimumValue {
  value: number
}

export interface MetaDataPreconditionNFTHolder {
  nftContractAddress: string
}

type MetaDataPrecondition =
  | MetaDataPreconditionMinimumValue
  | MetaDataPreconditionMinimumValue
  | MetaDataPreconditionNFTHolder
  | null
export interface QuestPreCondition {
  seq?: number
  title: string
  description: string
  type: QuestPreConditionTypeValues
  metaData: MetaDataPrecondition
}
export interface RewardNativeToken {
  symbol: string
  amount: number
}

export interface MetaDataRewardERC20 {
  contractAddress: string
  amount: number
}

export type MetaDataRewardERC1155 = MetaDataRewardERC20

export type MetaDataRewardERC721 = MetaDataRewardERC20

export interface QuestReward {
  name: string
  description: string
  imageUrl: string
  type: QuestRewardType
  metaData:
    | MetaDataRewardERC20
    | MetaDataRewardERC721
    | MetaDataRewardERC1155
    | RewardNativeToken
}

export interface UserQuestSubmissionCondition {
  id: number
  title: string
  description: string
  type: QuestConditionValues
  metaData: object
  fields: object
  isAutomated: boolean
  projectId: number
  createdBy: number
}

export class UserQuestSubmissionResponse {
  userId: string
  questId: number
  questConditions: IQuestCondition[]
  status: UserQuestSubmissionStatus
}

export interface ListMyUserQuestSubmissionStatusByUserIdResponseItem {
  questId: number
  status: string
}

export class UserRaffleSubmissionResponse {
  userId: string
  questId: number
  questConditions: IQuestCondition[]
  status: UserQuestSubmissionStatus
  isSelected: boolean
}

export interface QuestConditionMetaData {
  discordServerId?: string
  twitterUserId?: string
  tweetId?: string
  twitterUsername?: string
  url?: string
  roleIds?: string
  roleDisplays?: string
  display?: string
  text?: string
}

export interface QuestConditionField {
  title: string
  inputType: FieldInputType
}
