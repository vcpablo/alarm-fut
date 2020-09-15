import GqlBuilder from 'graphql-query-builder'
import { get, pipe, first } from 'lodash/fp'
import { gql } from '@apollo/client'

export function buildGQL(type, { name, find, filter, variables = null }) {
  const query = new GqlBuilder(name, variables)

  if (filter) {
    query.filter(filter)
  }

  query.find(find)

  return gql`
    ${type} ${name} {
      ${name} { ${query.bodyS} }
    }
  `
}

export function parseGraphQLResult({ data, path, unique }) {
  return unique ? pipe(get(path), first)(data) : get(path, data)
}
