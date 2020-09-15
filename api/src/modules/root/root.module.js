import { gql } from 'apollo-server'
import { createModule } from 'graphql-modules'

export const RootModule = createModule({
  id: 'rootModule',
  dirname: __dirname,
  typeDefs: gql`
    scalar Date

    type Base {
      id: Int
      name: String
    }

    type Query {
      dummy: String
    }

    type Mutation {
      dummy: String
    }
  `
})
