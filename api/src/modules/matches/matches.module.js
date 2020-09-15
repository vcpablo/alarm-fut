import { createModule } from 'graphql-modules'
import typeDefs from './matches.types'
import resolvers from './matches.resolvers'

export const MatchesModule = createModule({
  id: 'matchesModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
