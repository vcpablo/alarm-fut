import { get } from 'lodash/fp'
import {
  useMutation as apolloUseMutation,
  useQuery as apolloUseQuery
} from '@apollo/client'
import { parseGraphQLResult } from '../utils/graphQL'

const useMutation = (mutation, { path, unique }) => {
  const [originalRequest, data] = apolloUseMutation(mutation, {
    errorPolicy: 'all'
  })

  const customRequest = async (params) => {
    const { data, ...rest } = await originalRequest(params)
    return { data: parseGraphQLResult({ data, path, unique }), ...rest }
  }

  return [customRequest, data]
}

const useQuery = (query, { path, unique, variables }) => {
  const { loading, error, data, refetch } = apolloUseQuery(query, {
    errorPolicy: 'all',
    variables
  })

  return { loading, error, data: get(path, data), refetch }
}

export { useMutation, useQuery }
