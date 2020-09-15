import { ApolloClient } from '@apollo/client'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { getAppKey } from '@/utils/application'
import { onError } from 'apollo-link-error'

const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_API_URL })

const authorizationLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(getAppKey('token'))
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
  return forward(operation)
})

const errorLink = onError(
  ({ networkError, graphQLErrors, forward, operation }) => {
    // console.error('networkError:', networkError)
    // console.error('graphQLErrors:', graphQLErrors)
    forward(operation)
  }
)

const link = errorLink.concat(authorizationLink).concat(httpLink)
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

export default new ApolloClient({
  cache: new InMemoryCache(),
  link,
  defaultOptions
})
