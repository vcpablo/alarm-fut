import { gql } from 'apollo-server'

const types = gql`
  type Competition {
    _id: Int
    area: Area
    name: String
    code: String
    emblemUrl: String
    plan: String
    crestUrl: String
    numberOfAvailableSeasons: Int
    lastUpdated: Date
    matches: [Match]
  }

  extend type Query {
    competitions(_id: Int, area: Int): [Competition]
  }
`
export default types
