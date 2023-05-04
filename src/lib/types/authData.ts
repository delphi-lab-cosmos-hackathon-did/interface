export class TwitterUserDto {
  id: string
  name: string
  username: string
  profile_image_url: string
}

export interface UserMetaDataTwitter {
  user_id: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

export interface UserMetaDataDiscord {
  user_id: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
  token_type: string
}

export interface DiscordUserIdentityResponse {
  id: string
  username: string
  avatar: string
  avatar_decoration: string | null
  discriminator: string
  public_flags: number
  flags: number
  banner: null
  banner_color: null
  accent_color: null
  locale: string
  mfa_enabled: boolean
  premium_type: number
}

export interface UserMetaData {
  discord?: UserMetaDataDiscord & DiscordUserIdentityResponse
  twitter?: UserMetaDataTwitter & TwitterUserDto
}

export interface UserData {
  address: string
  totalPlatformPoint: number
  usedPlatformPoint: number
  metaData: UserMetaData
  email?: string
}

export type AuthData = {
  access_token: string
  user: UserData
}
