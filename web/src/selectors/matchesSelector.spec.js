import { groupMatchesByCompetition } from './matchesSelector'

describe('groupMatchesByCompetition', () => {
  it('should return an empty array if matches list is empty', () => {
    expect(groupMatchesByCompetition([])).toEqual([])
  })

  it('should return an array grouping matches by competition', () => {
    expect(
      groupMatchesByCompetition([
        {
          id: '5f51747735920806f3c803fc',
          utcDate: '2020-09-03T22:00:00Z',
          competition: {
            id: '2013',
            name: 'Série A'
          },
          homeTeam: {
            id: '1767',
            name: 'Grêmio FBPA'
          },
          awayTeam: {
            id: '1778',
            name: 'SC Recife'
          },
          status: 'PAUSED'
        },
        {
          id: '5f51747735920806f3c80408',
          utcDate: '2020-09-06T22:00:00Z',
          competition: {
            id: '2014',
            name: 'La Liga'
          },
          homeTeam: {
            id: '3989',
            name: 'Real Madrid FC'
          },
          awayTeam: {
            id: '1768',
            name: 'Barcelona FC'
          },
          status: 'SCHEDULED'
        }
      ])
    ).toEqual([
      {
        id: '2013',
        name: 'Série A',
        matches: [
          {
            id: '5f51747735920806f3c803fc',
            utcDate: '2020-09-03T22:00:00Z',
            competition: {
              id: '2013',
              name: 'Série A'
            },
            homeTeam: {
              id: '1767',
              name: 'Grêmio FBPA'
            },
            awayTeam: {
              id: '1778',
              name: 'SC Recife'
            },
            status: 'PAUSED'
          }
        ]
      },
      {
        id: '2014',
        name: 'La Liga',
        matches: [
          {
            id: '5f51747735920806f3c80408',
            utcDate: '2020-09-06T22:00:00Z',
            competition: {
              id: '2014',
              name: 'La Liga'
            },
            homeTeam: {
              id: '3989',
              name: 'Real Madrid FC'
            },
            awayTeam: {
              id: '1768',
              name: 'Barcelona FC'
            },
            status: 'SCHEDULED'
          }
        ]
      }
    ])
  })
})
