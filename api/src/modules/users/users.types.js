import { gql } from 'apollo-server'

export default gql`
  type User {
    _id: String
    name: String
    email: String
    password: String
    isActive: Boolean
    lastAccess: Date
  }
  extend type Query {
    users: [User]
  }
  extend type Mutation {
    saveUser(name: String, email: String, password: String): [User]
  }
`
