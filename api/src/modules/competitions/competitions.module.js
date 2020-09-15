import { createModule } from 'graphql-modules'
import typeDefs from './competitions.types'
import resolvers from './competitions.resolvers'

export const CompetitionsModule = createModule({
  id: 'competitionsModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
