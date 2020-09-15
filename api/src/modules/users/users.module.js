import { createModule } from 'graphql-modules'
import typeDefs from './users.types'
import resolvers from './users.resolvers'

export const UsersModule = createModule({
  id: 'usersModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
