import { createModule } from 'graphql-modules'
import typeDefs from './userTeams.types'
import resolvers from './userTeams.resolvers'

export const UserTeamsModule = createModule({
  id: 'userTeamsModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
