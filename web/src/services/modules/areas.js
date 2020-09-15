import { gql } from '@apollo/client'

const queries = {
  AREA_QUERY: gql`
    query areas($_id: Int) {
      areas(_id: $_id) {
        _id
        name
        countryCode
        ensignUrl
        parentArea {
          _id
          name
          countryCode
          ensignUrl
        }
      }
    }
  `
}

const mutations = {}

export default {
  queries,
  mutations
}
