import { createModule } from 'graphql-modules'
import typeDefs from './teams.types'
import resolvers from './teams.resolvers'

export const TeamsModule = createModule({
  id: 'teamsModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
