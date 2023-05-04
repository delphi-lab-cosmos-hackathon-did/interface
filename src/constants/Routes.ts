export const Routes = {
  QuestBoard: '/quest-board',
  QuestDetail: (slug: string) => `/quest/${slug}`,
  RaffleDetail: (slug: string) => `/raffle/${slug}`,
  Raffle: '/raffle-board',
  Reward: '/reward',
  Profile: '/profile',
}
