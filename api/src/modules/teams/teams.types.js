import { gql } from 'apollo-server'

const types = gql`
  type Team {
    _id: Int
    area: Area
    name: String
    shortName: String
    tla: String
    crestUrl: String
    address: String
    phone: String
    website: String
    email: String
    founded: Int
    clubColors: String
    venue: String
    lastUpdated: Date
  }

  extend type Query {
    teams(_id: Int, name: String, area: Int): [Team]
  }
`
export default types
