import { gql } from 'apollo-server'

const types = gql`
  type ScoreTime {
    homeTeam: Int
    awayTeam: Int
  }

  type Score {
    winner: String
    duration: String
    endDate: Date
    fullTime: ScoreTime
    halfTime: ScoreTime
    extraTime: ScoreTime
    penalties: ScoreTime
  }

  type Match {
    _id: String
    id: String
    matchId: Int
    competition: Competition
    utcDate: Date
    status: String
    matchday: Int
    stage: String
    group: String
    lastUpdated: Date
    score: Score
    homeTeam: Team
    awayTeam: Team
    referees: [Base]
    notification: Boolean
    favorite: Boolean
    userMatch: UserMatch
  }

  extend type Query {
    matches(_id: Int, dateFrom: Date, dateTo: Date): [Match]
    userMatches(dateFrom: Date, dateTo: Date): [Match]
  }
`
export default types
