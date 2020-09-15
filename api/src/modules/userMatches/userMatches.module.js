import { createModule } from 'graphql-modules'
import typeDefs from './userMatches.types'
import resolvers from './userMatches.resolvers'

export const UserMatchesModule = createModule({
  id: 'userMatchesModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
