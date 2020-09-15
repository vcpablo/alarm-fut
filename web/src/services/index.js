import auth from './modules/auth'
import teams from './modules/teams'
import areas from './modules/areas'
import matches from './modules/matches'

export const queries = {
  ...auth.queries,
  ...teams.queries,
  ...areas.queries,
  ...matches.queries
}

export const mutations = {
  ...auth.mutations,
  ...teams.mutations,
  ...areas.mutations,
  ...matches.mutations
}

export const rest = {
  ...areas.rest
}
