import { createModule } from 'graphql-modules'
import typeDefs from './areas.types'
import resolvers from './areas.resolvers'

export const AreasModule = createModule({
  id: 'areasModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
