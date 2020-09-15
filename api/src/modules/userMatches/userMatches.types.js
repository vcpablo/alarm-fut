import { gql } from 'apollo-server'

const types = gql`
  type UserMatch {
    notification: Boolean
    favorite: Boolean
  }

  type SaveUserMatch {
    match: Int
    user: String
    notification: Boolean
    favorite: Boolean
  }

  extend type Mutation {
    saveUserMatch(
      match: Int
      notification: Boolean
      favorite: Boolean
    ): [SaveUserMatch]
  }
`
export default types
