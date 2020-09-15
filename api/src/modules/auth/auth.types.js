import { gql } from 'apollo-server'

const types = gql`
  type Authentication {
    token: String
    user: User
  }

  extend type Mutation {
    authenticate(email: String, password: String): [Authentication]
    updatePassword(currentPassword: String, password: String): [User]
  }
`
export default types
