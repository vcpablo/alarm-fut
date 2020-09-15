import { compact } from 'lodash/fp'
import { ApolloError } from 'apollo-server'
import { UserMatch } from '../../models/userMatch.model'

const saveUserMatch = async (
  _,
  { match, favorite, notification },
  { user }
) => {
  await UserMatch.deleteOne({ match, user: user._id })
  return await UserMatch.insertMany([
    { match, user: user._id, favorite, notification }
  ])
}

const userMatchesResolvers = {
  Mutation: {
    saveUserMatch
  }
}

export default userMatchesResolvers
