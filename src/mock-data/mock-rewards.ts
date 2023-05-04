export type MockReward = {
  image: string
  name: string
  projectPoint: number
  platformPoint: number
  remaining?: string
  expiryDate: Date
}

export const MockRewards: MockReward[] = [
  {
    image: '/static/images/mock/reward1.png',
    name: 'Boki: Allowlist spot',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '3/10',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward2.png',
    name: 'Twitter Follow from DID',
    projectPoint: 100,
    platformPoint: 20,
    remaining: 'Unlimited',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward3.jpeg',
    name: 'Doodle Giveaway (NFT)',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '1/2',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward4.png',
    name: 'BBRC Merchandise: Hoodie',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '1/50',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward5.jpeg',
    name: 'Azuki: NFT NYC 2022 Pass',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '100/200',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward6.jpeg',
    name: 'GoblinTown: Secret Airdrop',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '23/690',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward7.png',
    name: 'Nansen:3 Months Pro Access',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '3/5',
    expiryDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/reward8.jpeg',
    name: 'community throh member can contribute in quests',
    projectPoint: 100,
    platformPoint: 20,
    remaining: '',
    expiryDate: new Date('2022-07-21'),
  },
]
