import { pick } from 'lodash/fp'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server'
import { User } from '../../models/user.model'

const authenticate = async (_, { email, password }) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new ApolloError('User not found', 404)
  }

  if (!user.comparePassword(password)) {
    throw new ApolloError('Invalid password', 401)
  }

  if (!user.isActive) {
    throw new ApolloError('Inactive user', 401)
  }

  const payload = pick(['_id', 'name', 'email', 'isActive', 'lastAccess'], user)
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 7200
  })

  return [{ token, user: payload }]
}

const updatePassword = async (_, { currentPassword, password }, context) => {
  const user = await User.findOne({ email: context.user.email })

  if (!user.comparePassword(currentPassword)) {
    throw new ApolloError('Invalid current password', 400)
  }

  // eslint-disable-next-line fp/no-mutation
  user.password = password
  return [await user.save()]
}

const authResolvers = {
  Mutation: {
    authenticate,
    updatePassword
  }
}

export default authResolvers
