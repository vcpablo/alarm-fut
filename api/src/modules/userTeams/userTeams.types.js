import { gql } from 'apollo-server'

const types = gql`
  type UserTeam {
    team: Team
    user: User
  }

  type SaveUserTeam {
    _id: String
    team: Int
    user: String
  }

  extend type Query {
    userTeams: [UserTeam]
  }

  extend type Mutation {
    saveUserTeams(teams: [Int]): [SaveUserTeam]
  }
`
export default types
