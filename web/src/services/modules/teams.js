import { gql } from '@apollo/client'

const queries = {
  TEAM_QUERY: gql`
    query teams($name: String, $_id: Int, $area: Int) {
      teams(name: $name, _id: $_id, area: $area) {
        _id
        area {
          _id
          name
        }
        name
        shortName
        tla
        crestUrl
        address
        phone
        website
        email
        founded
        clubColors
        venue
        lastUpdated
      }
    }
  `
}

const mutations = {
  SAVE_USER_TEAMS_MUTATION: gql`
    mutation saveUserTeams($teams: [Int]) {
      saveUserTeams(teams: $teams) {
        _id
        team
        user
      }
    }
  `
}

export default {
  queries,
  mutations
}
