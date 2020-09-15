import { map, pipe, sortBy } from 'lodash/fp'

export const parseTeams = teams =>
  pipe(
    map(team => ({ ...team.toObject() })),
    sortBy('name')
  )(teams)
