import { gql } from '@apollo/client'

const queries = {}

const mutations = {
  AUTHENTICATE_MUTATION: gql`
    mutation authenticate($email: String, $password: String) {
      authenticate(email: $email, password: $password) {
        token
        user {
          _id
          name
          email
          lastAccess
        }
      }
    }
  `
}

export default {
  queries,
  mutations
}
