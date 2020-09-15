import { gql } from '@apollo/client'

const fields = `
  _id
  competition {
    _id
    name
    area {
      _id
      name
      ensignUrl
      countryCode
      parentArea {
        _id
      name
      ensignUrl
      countryCode
      }
    }
  }
  utcDate
  status
  matchday
  stage
  group
  lastUpdated
  score {
    winner
    duration
    endDate
    fullTime {
      homeTeam
      awayTeam
    }
    halfTime {
      homeTeam
      awayTeam
    }
    extraTime {
      homeTeam
      awayTeam
    }
    penalties {
      homeTeam
      awayTeam
    }
  }
  homeTeam {
    _id
    name
    shortName
    tla
    crestUrl
  }
  awayTeam {
    _id
    name
    shortName
    tla
    crestUrl
  }
  referees {
    id
    name
  }
  userMatch {
    notification
    favorite
  }
`

const queries = {
  MATCH_QUERY: gql`
    query matches(
      $id: String
      $dateFrom: Date
      $dateTo: Date
      $teamIds: [Int]
      $competitionIds: [Int]
    ) {
      matches(
        id: $id
        dateFrom: $dateFrom
        dateTo: $dateTo
        teamIds: $teamIds
        competitionIds: $competitionIds
      ) { ${fields} }
    }
  `,
  USER_MATCHES_QUERY: gql`
  query userMatches(
    $dateFrom: Date
    $dateTo: Date
  ) {
    userMatches(
      dateFrom: $dateFrom
      dateTo: $dateTo
    ) { ${fields} }
  }
`
}

const mutations = {
  SAVE_USER_MATCH_MUTATION: gql`
    mutation saveUserMatch(
      $match: Int
      $notification: Boolean
      $favorite: Boolean
    ) {
      saveUserMatch(
        match: $match
        notification: $notification
        favorite: $favorite
      ) {
        match
        notification
        favorite
      }
    }
  `
}

export default {
  queries,
  mutations
}
