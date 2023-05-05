export const API_DATA = {
  attributes: [
    {
      items: [
        {
          attribute: 'Governance: Delegator',
          description: 'Currently delegating OSMO to one or more validators',
          type: 'governance',
        },
        {
          attribute: 'Governance: Proposal Voter',
          description: 'Voted on a governance proposal',
          type: 'governance',
        },
        {
          attribute: 'Governance: Proposal Creator',
          description: 'Created a governance proposal',
          type: 'governance',
        },
      ],
      type: 'governance',
    },
    {
      items: [
        { attribute: 'ICNS', description: 'ICNS: dogemos', type: 'icns' },
      ],
      type: 'icns',
    },
    {
      items: [
        {
          attribute: 'Mars: Red Bank User',
          description: 'Have used the Mars Red Bank outpost',
          type: 'mars',
        },
      ],
      type: 'mars',
    },
    {
      items: [
        {
          attribute: 'Source: IBC',
          description: 'Address funded through IBC',
          type: 'source',
        },
      ],
      type: 'source',
    },
    {
      items: [
        {
          attribute: 'Osmosis: Swapper',
          description: 'Performed a swap on Osmosis',
          type: 'osmosis',
        },
        {
          attribute: 'Osmosis: Heavy Swapper',
          description: 'Swapped on Osmosis 10 or more times',
          type: 'osmosis',
        },
      ],
      type: 'osmosis',
    },
  ],
  statistics: {
    first_active_height: 103,
    first_active_timestamp: '2021-06-18T21:54:40.646827+00:00',
    last_active_height: 9470316,
    last_active_timestamp: '2023-05-04T10:25:11.108620+00:00',
    success_count: 687,
  },
}
