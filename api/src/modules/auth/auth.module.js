import { createModule } from 'graphql-modules'
import typeDefs from './auth.types'
import resolvers from './auth.resolvers'

export const AuthModule = createModule({
  id: 'authModule',
  dirname: __dirname,
  typeDefs,
  resolvers
})
