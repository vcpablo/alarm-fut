import { includes } from 'lodash/fp'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server'

export default ({ req }) => {
  if (!includes(req.body.operationName, ['authenticate', 'saveUser'])) {
    const token = String(req.headers.authorization).replace('Bearer ', '')
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      return { user }
    } catch (error) {
      throw new ApolloError('Session expired', 401)
    }
  }
}
