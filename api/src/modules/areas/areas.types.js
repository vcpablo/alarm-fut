import { gql } from 'apollo-server'

const types = gql`
  type Area {
    _id: Int
    name: String
    countryCode: String
    ensignUrl: String
    parentArea: Area
    active: Boolean
  }

  extend type Query {
    areas(_id: Int): [Area]
  }
`
export default types
