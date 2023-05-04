export type MockQuest = {
  image: string
  name: string
  description: string
  participant: number
  maxParticipant: number
  projectPoint: number
  platformPoint: number
  cryptoReward: number
  endDate: Date
}

export const MockQuests: MockQuest[] = [
  {
    image: '/static/images/mock/quest1.png',
    name: 'DID: OG Gang',
    description:
      'Become the early supporter of DID. Support us in our journey to innovat3 space',
    participant: 417,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-08-01'),
  },
  {
    image: '/static/images/mock/quest2.jpeg',
    name: 'Doodle: Adventure Time',
    description:
      'Write about the best adventure you have experienced and share it in your social media...',
    participant: 320,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-07-21'),
  },
  {
    image: '/static/images/mock/quest3.gif',
    name: '3Landers: On a Trip',
    description:
      'Write about your favorite trip that you go. The more unique the story,',
    participant: 280,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-07-20'),
  },
  {
    image: '/static/images/mock/quest4.jpeg',
    name: 'Goblin: DeLiSt YoUr gOb',
    description: 'DeLiSt At LeAsT 1 GoBliNz NfT tO GaIn SmTh',
    participant: 210,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-07-18'),
  },
  {
    image: '/static/images/mock/quest5.png',
    name: 'Kaiju: Swap $Rwaste',
    description:
      'the community through a series of quest where ach member can contribute support through...',
    participant: 140,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-07-16'),
  },
  {
    image: '/static/images/mock/quest6.png',
    name: 'Pudgy:  Good Character Aw...',
    description:
      'This quest has no requirement, just be a good penguin toward other members in discord.',
    participant: 140,
    maxParticipant: 500,
    projectPoint: 100,
    platformPoint: 20,
    cryptoReward: 120,
    endDate: new Date('2022-07-15'),
  },
]
